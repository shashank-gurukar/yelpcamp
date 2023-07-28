const express = require('express');
const router = express.Router();
const {isLoggedIn,isAuthor}= require('../middleware')
const campground= require('../controllers/campground')
const Campground= require("../model/campground")
const multer = require('multer');
const {storage}=require('../cloudinary/index')
const upload = multer({storage });



router.get('/',campground.index )
router.post('/',upload.single('image'),(req,res)=>{
  console.log(req.file,req.body)
  res.send('workinbg')

})
router.get('/new',isLoggedIn,campground.renderNewForm)
router.get('/:id',campground.renderCampground)
router.put('/:id',isLoggedIn,isAuthor,campground.updateCampground);
router.delete("/:id",isAuthor,campground.deleteCampground)
router.get('/:id/edit',isLoggedIn,isAuthor, campground.renderEditForm)
  
module.exports=router;