const Review= require("../model/review");
const Campground= require("../model/campground");

module.exports.deleteReview=async (req, res) => {
    
    const { id, reviewId } = req.params;
    try {
      await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
      await Review.findByIdAndDelete(reviewId);
      req.flash('success','Your review was successfully deleted')
      res.redirect(`/campgrounds/${id}`);
    } catch (error) {
      console.log(error);
      // Handle errors and send an appropriate response
      res.status(500).send("Internal Server Error");
    }
  }
  module.exports.createReview= async (req, res) => {
    const campgroundId = req.params.id;
    try {
     
      const campground = await Campground.findById(campgroundId);
      if (!campground) {
        req.flash('error', 'Campground not found');
        return res.redirect('/campgrounds');
      }
  
       const reviewData = {
        ...req.body.review,
        author: req.user._id,
      };
  
      // Create the review using the modified reviewData
      const review = await Review.create(reviewData);
  
      // Push the newly created review to the campground's reviews array
      campground.reviews.push(review);
  
      // Save the updated campground with the new review
      await campground.save();
  
      req.flash('success', 'Your review was successfully posted');
      res.redirect(`/campgrounds/${campgroundId}`);
    } catch (error) {
      console.error(error);
      req.flash('error', 'Failed to create review.');
      res.redirect(`/campgrounds/${campgroundId}`);
    }
  }