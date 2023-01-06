const express = require('express');
const cors = require('cors');
// const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');
const passport = require('./passport');
const passportConfig = require('./passport');
const dotenv = require('dotenv');

const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

dotenv.config(); // .env값 치환시켜서 적용.
db.sequelize
  .sync() // 서버 실행시 디비 연결
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

passportConfig();
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json()); // 아래 코드와 함께 routes에서 req.body를 사용하기 위한 코드, json형식을 req.body안에 넣어줌
app.use(express.urlencoded({ extended: true })); // form submit을 했을때 데이터를 req.body안에 넣어줌.
app.use(cookieParser());
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello express");
});

app.get("/", (req, res) => {
  res.send("hello api");
});

// app.use('/post', postRouter);
app.use('/user', userRouter);


app.listen(3065, () => {
  console.log("서버 실행 중");
});