const express = require('express');
const router = express.Router({ mergeParams:true});
const Review= require("../model/review");
const Campground= require("../model/campground");


router.delete("/:reviewId", async (req, res) => {
    console.log(req.params)
    const { id, reviewId } = req.params;
    try {
      await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
      await Review.findByIdAndDelete(reviewId);
      res.redirect(`/campgrounds/${id}`);
    } catch (error) {
      console.log(error);
      // Handle errors and send an appropriate response
      res.status(500).send("Internal Server Error");
    }
  });
  


router.post("/", async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  console.log(req.params.id)
  try {
    const review = await Review.create(req.body.review);
    campground.reviews.push(review);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  } catch (error) {
    console.error(error); // Log any errors that occur
   // Redirect to the home page if there is an error
  }
});
module.exports=router;
