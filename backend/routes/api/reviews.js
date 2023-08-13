const express = require("express");
const router = express.Router();

const { Sequelize, Op } = require("sequelize");

const {
  Review,
  User,
  Spot,
  Review_Image,
  Booking,
  Spot_Image,
} = require("../../db/models");

//CREATE REVIEW FOR SPOT BY ID
router.post("/:reviewId/review-images", async (req, res) => {
  const { reviewId } = req.params;
  const thisUser = req.user.id;

  const thisReview = await Review.findByPk(reviewId, {
    include: {
      model: Review_Image,
      required: false,
    },
  });

  //Code to write, check if this review has less than 10 images and if the user owns the particular review then add images to this revierwId

  res.json(thisReview);
});

module.exports = router;
