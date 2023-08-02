 if(process.env.NODE_ENV!='production'){
  require('dotenv').config();
 }
 
 const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require('path');
const ejsMate =require('ejs-mate')
const Campground= require("./model/campground")
const methodOverride=require("method-override")
const Review= require("./model/review");
const campgrounds=require('./routes/campground')
const reviews = require('./routes/review');
const session = require('express-session')
const flash = require('connect-flash')
const passport=require("passport")
const LocalStrategy=require('passport-local')
const User = require('./model/user')
const userRoutes = require('./routes/user')
mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(()=>{
          console.log('database connected');
    })
    .catch(err=>{
        console.log(err);
    })

app.use(express.urlencoded({extended:true}))    


app.engine('ejs',ejsMate);
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.set('views',path.join(__dirname,'views'));
app.use(methodOverride('_method'))
const sessionConfig = {
  secret: "thisshouldbeabettersecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24,
    maxAge: 1000 * 60 * 60 * 24
  }
};


app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use((req,res,next)=>{
  console.log(req.session)
  res.locals.currentUser=req.user;
  res.locals.success=req.flash('success');
  res.locals.error=req.flash('error');
  next();
}) 

app.use('/',userRoutes );

app.use('/campgrounds',campgrounds );

app.use('/campgrounds/:id/reviews',reviews)



try {
    app.listen(3000, () => {
      console.log('serving on 3000')
    })
  } catch (error) {
    console.error(error)
  }