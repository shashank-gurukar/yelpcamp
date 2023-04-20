const mongoose = require("mongoose");
const Campground= require("../model/campground")
const cities = require('./cities');

const { places,descriptors } = require("./seedhelpers");

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(()=>{
        console.log('database connected');
    })
    .catch(err=>{
        console.log(err);
    })

    const sample =(array)=>array[Math.floor(Math.random()*array.length)];  
    const seedDb=async ()=>{
        
        for(let i=0;i<50;i++){
            const rand = Math.floor(Math.random()*1000);
        
        const camp = new Campground({name:`${sample(descriptors) } ${sample(places)}`,location:`${ cities[rand].city } ,${ cities[rand].state }`})
        
        await camp.save()}
      
        
    }
   seedDb();