const express = require('express');
const cors = require('cors');
// const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');
const passportConfig = require('./passport');
const app = express();

db.sequelize
  .sync() // 서버 실행시 디비 연결
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json()); // 아래 코드와 함께 routes에서 req.body를 사용하기 위한 코드, json형식을 req.body안에 넣어줌
app.use(express.urlencoded({ extended: true })); // form submit을 했을때 데이터를 req.body안에 넣어줌.

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