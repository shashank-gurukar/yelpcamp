const express = require('express');
const router = express.Router({ mergeParams:true});
const { isLoggedIn,isAuthor,risAuthor }= require('../middleware');
const Reviews = require('../controllers/review')

router.delete("/:reviewId",risAuthor, Reviews.deleteReview);
router.post('/', isLoggedIn,Reviews.createReview);
  
module.exports=router;
