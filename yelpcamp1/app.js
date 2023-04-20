 const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require('path');
const Campground= require("./model/campground")

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(()=>{
          console.log('database connected');
    })
    .catch(err=>{
        console.log(err);
    })

app.use(express.urlencoded({extended:true}))    
// const db = mongoose.connection;
// db.on("error",console.error.bind(console,"connection error:"));
// db.once("open",()=>{
//     console.log("database connected");
// });

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


app.get('/',(req,res)=>{
    // res.send('hello from yelpcamp')
    res.render('home')
})
app.get('/campgrounds', async (req,res)=>{

    
    const campground = await Campground.find({})
    res.render('Campgrounds/index',{campground})
})
app.post('/campgrounds',async (req,res)=>{
  // res.send(req.body)
  // const {name,location} = req.body;

   const campground =  new Campground(req.body);
    await campground.save();
    res.redirect('/campgrounds/' + campground._id);
  })

app.get('/campgrounds/new',(req,res)=>{
  res.render('Campgrounds/new');
})
app.get('/campgrounds/:id',async (req,res)=>{
 
  
  const campground = await Campground.findById(req.params.id);
  res.render('show',{campground})
})



try {
    app.listen(3000, () => {
      console.log('serving on 3000')
    })
  } catch (error) {
    console.error(error)
  }