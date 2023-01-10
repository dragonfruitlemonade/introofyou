const express = require("express");

const { Intro } = require("../models");

const router = express.Router();

router.intro("/", async (req, res, next) => {
  try {
    const intro = await Intro.create({
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
    res.status(201).json(intro);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
