const express = require('express');

const { Post, Comment, User, Intro } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
      IntroId: req.user.id, //
    });
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Comment,
          include: [
            {
              model: User, // 댓글 작성자
              attributes: ["id"],
            },
          ],
        },
        {
          model: User, // 게시글 작성자
          attributes: ["id"],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id"],
        },
        {
          model: Intro,
          attributes: ["id"],
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.post("/:postId/comment", isLoggedIn, async (req, res, next) => { // POST /post/1/comment
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }
    })
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId),
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{
        model: User,
        attributes: ['id'],
      }],
    })
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId }});
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id })
  } catch(error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:postId/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId }});
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id })
  } catch(error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    await Post.destroy({
      where: { 
        id: req.params.postId, // 게시글의 아이디
        UserId: req.user.id, // 게시글의 작성자 아이디, 본인이 쓴 글만 삭제할 수 있도록
      },
    });
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) }); // params가 문자열이기 때문에 parseInt
  } catch (error) {
    console.error(error);
    next(error);
  }
})

module.exports = router;