const Campground= require("./model/campground")
const Review= require("./model/review")

module.exports.isLoggedIn=  (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.returnTo=req.originalUrl
        console.log(req.session)
        req.flash('error','Need to Login first!')
        return res.redirect('/login')
    }
    next();

}
module.exports.isAuthor = async (req, res,next) => {
    const { id } = req.params;
    try {
      const campground = await Campground.findById(id);
      console.log(req.user._id)
      console.log(campground.author)
  
      // Assuming currentUser is defined and contains the user's information, including the ID
      if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to edit this campground!ss ');
        return res.redirect(`/campgrounds/${id}`);
      }
      next();
      
      // Add the rest of the logic here for the case where the user is the author
      // ...
      
    } catch (err) {
      console.error('Error finding campground:', err);
      req.flash('error', 'Campground not found.');
      return res.redirect('/campgrounds');
    }
  };
  module.exports.risAuthor = async (req, res,next) => {
    const { id,reviewId } = req.params;
    try {
      const review = await Review.findById(reviewId);
     
      
      // Assuming currentUser is defined and contains the user's information, including the ID
      if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to edit thisadsas campground!');
        return res.redirect(`/campgrounds/${id}`);
      }
      next();
      
      // Add the rest of the logic here for the case where the user is the author
      // ...
      
    } catch (err) {
      console.error('Error finding campground:', err);
      req.flash('error', 'Campground notssss found.');
      return res.redirect('/campgrounds');
    }
  };
  
  