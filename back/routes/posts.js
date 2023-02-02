const express = require('express');
const { Op } = require('sequelize');

const { Post, User, Intro, Comment } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /posts
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐때, 게시물을 더 불러오는 상황
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10)} // where.id가 last보다 작은것으로 10개 불러와라
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC']
      ],
      include: [{
        model: User,
        attributes: ['id'],
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id'],
        }]
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id'],
      }],
    });
    res.status(200).json(posts);
  } catch(error) {
    console.error(error);
    next(error);
  }
  
});

module.exports = router;