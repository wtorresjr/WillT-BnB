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

//CREATE REVIEW IMAGE FOR SPOT BY ID

router.post("/:reviewId/review-images", async (req, res) => {
  if (req.user) {
    const { url, preview } = req.body;
    const { reviewId } = req.params;
    const thisUser = req.user.id;

    const thisReview = await Review.findByPk(reviewId, {
      include: {
        model: Review_Image,
        required: false,
      },
    });

    if (thisReview) {
      if (thisReview.userId === thisUser) {
        const imageCount = thisReview.Review_Images.length;
        if (imageCount < 10) {
          try {
            const newRevImage = await Review_Image.create({
              reviewId: reviewId,
              url: url,
            });
            return res.status(200).json({

              id: newRevImage.id,
              url: newRevImage.url,
            }
            );
          } catch (err) {
            const errors = {};
            err.errors.map((err) => {
              errors[err.path] = err.message;
            });

            return res.status(400).json({ message: "Bad Request", errors });
          }
        } else {
          return res.status(403).json({
            message: "Maximum number of images for this resource was reached",
          });
        }
      } else {
        return res.status(403).json({
          message: "Review must belong to current-user",
        });
      }
    } else {
      return res.status(404).json({ message: "Review couldn't be found" });
    }
  } else {
    return res.status(403).json({ message: "Authentication required" });
  }
});

module.exports = router;
