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
        Image: [
           {
              url: 'https://res.cloudinary.com/dzpmxal4n/image/upload/v1690615936/Yelpcamp/syctmq2e3ddf3mlrnjej.jpg',
              filename: 'Yelpcamp/syctmq2e3ddf3mlrnjej'
             
            },
            {
              url: 'https://res.cloudinary.com/dzpmxal4n/image/upload/v1690615935/Yelpcamp/j4eyfml9mdkrrlxuoof3.jpg',
              filename: 'Yelpcamp/j4eyfml9mdkrrlxuoof3'
            }
           
          ],
            description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore quibusdam similique est animi facere, blanditiis obcaecati repellat iure! Dolor vitae aut ducimus fugiat, porro iste. Explicabo earum sint blanditiis ut.",
            price:price,
            geometry:{
              type:'Point',
              coordinates:[
                cities[rand].longitude,cities[rand].latitude

              ]
            },
            author: '64b6c59e9399909ca3eb364d'
        
        
        })
        
        await camp.save()}
      
        
    }
   seedDb();