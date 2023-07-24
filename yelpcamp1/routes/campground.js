const express = require('express');
const router = express.Router();
const {isLoggedIn,isAuthor}= require('../middleware')

const Campground= require("../model/campground")



router.get('/', async (req,res)=>{

    
    const campground = await Campground.find({})
    res.render('Campgrounds/index',{campground})
})
router.post('/',async (req,res)=>{
  // res.send(req.body)
  // const {name,location} = req.body;
 
   const campground =  new Campground(req.body);
   campground.author= req.user._id;
   await campground.save();
   req.flash('success',"You've success made a new Campground ")

    res.redirect('/campgrounds/' + campground._id);
  })

router.get('/new',isLoggedIn,(req,res)=>{
  res.render('Campgrounds/new');
  console.log(isLoggedIn)
})
router.get('/:id',async (req,res)=>{
 
  
  const campground = await Campground.findById(req.params.id)
  .populate({
    path: 'reviews',
    populate: {
      path: 'author',
    },
  })
  .populate('author');
  console.log(campground )
  if(!campground){
  req.flash('error',"Campground not found");
  return res.redirect('/campgrounds')
 }
  res.render('show',{campground })
})
 
router.put('/:id',isLoggedIn,isAuthor,async (req, res) => {
  const { id } = req.params;
  const { name, location } = req.body;
  const campground = await Campground.findById({id}).populate('author')
  
  const updatedCampground = await Campground.findByIdAndUpdate(id, { name, location }, { new: true });
  req.flash('success',"You've successfully updated the campground")
  res.redirect(`/campgrounds/${updatedCampground._id}`);
});

router.delete("/:id",isAuthor,async(req,res)=>{
  const {id} = req.params; 

  await Campground.findByIdAndDelete(id);
  res.redirect('/campgrounds')

})
router.get('/:id/edit',isLoggedIn,isAuthor, async (req,res)=>{
    const campground = await Campground.findById(req.params.id);
   
    res.render('Campgrounds/edit',{campground})
  })
  
module.exports=router;