const Campground= require("../model/campground")

module.exports.index=async (req,res)=>{

    
    const campground = await Campground.find({})
    res.render('Campgrounds/index',{campground})
}
module.exports.new=async (req,res)=>{

    const campground =  new Campground(req.body);
    campground.author= req.user._id;
    await campground.save();
    req.flash('success',"You've success made a new Campground ")
 
     res.redirect('/campgrounds/' + campground._id);
   }
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
     console.log(campground )
     if(!campground){
     req.flash('error',"Campground not found");
     return res.redirect('/campgrounds')
    }
     res.render('Campgrounds/show',{campground })
   }

   module.exports.updateCampground=async (req, res) => {
    const { id } = req.params;
    const { name, location } = req.body;
    const campground = await Campground.findById({id}).populate('author')
    
    const updatedCampground = await Campground.findByIdAndUpdate(id, { name, location }, { new: true });
    req.flash('success',"You've successfully updated the campground")
    res.redirect(`/campgrounds/${updatedCampground._id}`);
  }
  module.exports.deleteCampground=async(req,res)=>{
    const {id} = req.params; 
  
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds')
  
  }
  module.exports.renderEditForm=async (req,res)=>{
    const campground = await Campground.findById(req.params.id);
   
    res.render('Campgrounds/edit',{campground})
  }