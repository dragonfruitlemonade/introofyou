const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User, Post, Intro } = require('../models');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
          {
            model: Intro,
            attributes: ['id'],
          },
        ],
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch(error) {
    console.error(error);
    next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => { // req, res, next를 사용하기 위해 미들웨어 확장.
  passport.authenticate('local', (err, user, info) => { // local에서 done으로 넘어온 정보.
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
        }, {
          model: Intro,
        }]
      })
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post('/', async (req, res, next) => { // 회원가입라우터
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      }
    });
    
    if (exUser) {
      return res.status(403).send('이미 사용 중인 아이디입니다.');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12); // 비밀번호 해쉬화
    await User.create({
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(201).send("ok");
  } catch(error) {
    console.error(error);
    next(error);
  }
});

router.post('/logout', isLoggedIn, (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
  req.session.destroy();
  res.send('logoutOK');
});

router.post("/intro", async (req, res, next) => {
  try {
    await Intro.create({
      field: req.body.field,
      major: req.body.major,
      job: req.body.job,
      call: req.body.call,
      income: req.body.income,
      portfolio: req.body.portfolio,
      academic: req.body.academic,
      intro: req.body.intro,
      skill: req.body.skill,
      reason: req.body.reason,
      other: req.body.other,
      UserId: req.user.id,
    });
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});


module.exports = router;