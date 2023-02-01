const express = require('express');

const { Post, User, Intro, Comment } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /posts
  try {
    const posts = await Post.findAll({
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
        as: 'Liker',
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