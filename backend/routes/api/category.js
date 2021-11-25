const express = require("express");
const asyncHandler = require("express-async-handler");
const { Category } = require("../../db/models");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async function (req, res) {
    const category = await Category.findAll();
    return res.json({ category });
  })
);

module.exports = router;
