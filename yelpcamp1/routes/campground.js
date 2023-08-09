const express = require('express');
const router = express.Router();
const {isLoggedIn,isAuthor}= require('../middleware')
const campground= require('../controllers/campground')
 
const multer = require('multer');
const {storage}=require('../cloudinary/index')
const upload = multer({storage });


router.get('/home',campground.home)
router.get('/',campground.index )
router.post('/',upload.array('image'),campground.new)
router.get('/new',isLoggedIn,campground.renderNewForm)
router.get('/:id',campground.renderCampground)
router.put('/:id',upload.array('image'),isLoggedIn,isAuthor,campground.updateCampground);
router.delete("/:id",isAuthor,campground.deleteCampground)
router.get('/:id/edit',isLoggedIn,isAuthor, campground.renderEditForm)
  
module.exports=router;