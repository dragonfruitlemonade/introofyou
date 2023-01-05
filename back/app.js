const express = require('express');
const db = require('./models');
const app = express();

db.sequelize
  .sync() // 서버 실행시 디비 연결
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

app.get("/", (req, res) => {
  res.send("hello express");
});

app.get("/", (req, res) => {
  res.send("hello api");
});


app.listen(3065, () => {
  console.log("서버 실행 중");
});