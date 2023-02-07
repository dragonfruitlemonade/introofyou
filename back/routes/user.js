const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User, Post, Intro } = require('../models');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

router.get('/', async (req, res, next) => {
  console.log(req.headers);
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
            attributes: ["id"],
          },
          // {
          //   model: Intro,
          //   attributes: [
          //     "field",
          //     "major",
          //     "job",
          //     "call",
          //     "income",
          //     "portfolio",
          //     "academic",
          //     "intro",
          //     "skill",
          //     "reason",
          //     "other",
          //   ],
          // },
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

router.get("/intros", isLoggedIn, async (req, res, next) => {
  try {
    if (req.user) {
      const intros = await Intro.findOne({
        where: { id: req.user.id },
          attributes: [
            "field",
            "major",
            "job",
            "call",
            "income",
            "portfolio",
            "academic",
            "intro",
            "skill",
            "reason",
            "other",
          ],
      });
      res.status(200).json(intros);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:userId", async (req, res, next) => { // 특정 사용자의 정보
  try {
    const fullUserWithoutPassword = await User.findOne({
      where: { id: req.params.userId },
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: Post,
          attributes: ["id"],
        },
        {
          model: Intro,
          attributes: ["id"],
        },
      ],
    });
    if (fullUserWithoutPassword) {
      const data = fullUserWithoutPassword.toJSON();
      data.Posts = data.Posts.length;
      data.Followings = data.Followings.length;
      data.Followers = data.Followers.length;
      res.status(200).json(fullUserWithoutPassword);
    }
    else {
      res.status(404).json('존재하지 않는 사용자입니다.');
    }
  } catch (error) {
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

router.patch("/intro", async (req, res, next) => {
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
    }, {
      where: { id: req.user.id },
    });
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// router.patch('./nickname', isLoggedIn, async (req, res, next) => {
//   try {
//     await User.update({
//       nickname: req.body.nickname,
//     }, {
//       where: { id: req.user.id },
//     });
//     res.status(200).json({ nickname: req.body.nickname });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });


module.exports = router;