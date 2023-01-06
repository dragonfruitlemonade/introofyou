const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User } = require('../models');

const router = express.Router();

router.post('/login', (req, res, next) => { // req, res, next를 사용하기 위해 미들웨어 확장.
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
      return res.status(200).json(user);
    })
  })
});

router.post('/', async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      }
    });
    
    if (exUser) {
      return res.status(403).send('이미 사용 중인 아이디입니다.');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10); // 비밀번호 해쉬화
    await User.create({
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(200).send("ok");
  } catch(error) {
    console.error(error);
    next(error);
  }
});

router.post('/user/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('logoutOK');
})

module.exports = router