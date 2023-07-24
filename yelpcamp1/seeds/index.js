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
            const price= Math.floor(Math.random()*1000)
        const camp = new Campground({name:`${sample(descriptors) } ${sample(places)}`,location:`${ cities[rand].city } ,${ cities[rand].state }`,
            Image:'https://source.unsplash.com//collection/483251/1600x900',
            description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore quibusdam similique est animi facere, blanditiis obcaecati repellat iure! Dolor vitae aut ducimus fugiat, porro iste. Explicabo earum sint blanditiis ut.",
            price:price,
            author: '64b6c59e9399909ca3eb364d'
        
        
        })
        
        await camp.save()}
      
        
    }
   seedDb();