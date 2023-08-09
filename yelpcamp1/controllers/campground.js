const Campground= require("../model/campground")
const {cloudinary}=require('../cloudinary/index')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')

const mapBoxToken=process.env.MAPBOX_TOKEN
const geoCoder=mbxGeocoding({accessToken:mapBoxToken})
module.exports.home= (req,res)=>{
  res.render('Campgrounds/home')
}
module.exports.index=async (req,res)=>{

    
    const campground = await Campground.find({})
    res.render('Campgrounds/index',{campground})
}
module.exports.new = async (req, res) => {
  const geoData=await geoCoder.forwardGeocode({
    query:req.body.location,
    limit:1

  }).send();
   req.body.geometry=geoData.body.features[0].geometry
 
  const imageFiles = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  const campgroundData = {
    ...req.body,
    Image: imageFiles,
    author: req.user._id,
  };
  console.log(campgroundData)
  
  const campground = new Campground(campgroundData);
  try {
    await campground.save();
   
    req.flash('success', "You've successfully created a new Campground.");
    res.redirect('/campgrounds/' + campground._id);
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to create a new Campground.');
    res.redirect('/campgrounds'); // Redirect to an appropriate error page or back to the form, as desired
  }
};
   module.exports.renderNewForm=(req,res)=>{
    res.render('Campgrounds/new');
  
  }
  module.exports.renderCampground=async (req,res)=>{
    const campground = await Campground.findById(req.params.id)
     .populate({
       path: 'reviews',
       populate: {
         path: 'author',
       },
     })
     .populate('author');
 
     if(!campground){
     req.flash('error',"Campground not found");
     return res.redirect('/campgrounds')
    }
     res.render('Campgrounds/show',{campground })
   }

   module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    const { name, location,description,price } = req.body;
    
    try { 
      const campground = await Campground.findById(id).populate('author');
      
      if (!campground) {
        req.flash('error', 'Campground not found.');
        return res.redirect('/campgrounds'); // Redirect to an appropriate page when the campground is not found
      }
      
      // Check if the current user is the author of the campground
      if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You are not authorized to update this campground.');
        return res.redirect(`/campgrounds/${id}`);
      }
     
     
      const imageFiles = req.files.map((f) => ({ url: f.path, filename: f.filename }));
      campground.Image.push(...imageFiles);
      campground.name = name;
      campground.location = location;
      campground.description=description;
      campground.price=price;  
      
      // Save the updated campground
      await campground.save();
      if(req.body.deleteImages){
       for(let filename of req.body.deleteImages){
       await cloudinary.uploader.destroy(filename)
       }
        await campground.updateOne({$pull:{Image:{filename:{$in:req.body.deleteImages}}}})
         
      } 
      req.flash('success', "You've successfully updated the campground.");
      res.redirect(`/campgrounds/${campground._id}`);
    } catch (err) {
      console.error(err);
      req.flash('error', 'Failed to update the campground.');
      res.redirect(`/campgrounds/${id}`); // Redirect to an appropriate error page or back to the form, as desired
    }
   };
  module.exports.deleteCampground=async(req,res)=>{
    const {id} = req.params; 
  
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds')
  
  }
  module.exports.renderEditForm=async (req,res)=>{
    const campground = await Campground.findById(req.params.id);
   
    res.render('Campgrounds/edit',{campground})
  }