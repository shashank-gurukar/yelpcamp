const mongoose= require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review')
const imageSchema= new Schema({
  url:  String,
  filename:String

})
imageSchema.virtual('thumbnail').get(function(){
  return this.url.replace('/upload','/upload/w_200');
})
const opts={toJSON:{virtuals:true}};

const CampgroundSchema = new Schema({
name:String,
price:Number,
description:String,
location:String,
geometry:{
  coordinates: {
    type: [Number], // Array of arrays of arrays of numbers
    required: true
  },
type: {
  type: String,
  enum: ['Point'],
  required: true
}

},
Image: [imageSchema],
author:{
  type:Schema.Types.ObjectId,
  ref:'User'
},
reviews:
    [{type: Schema.Types.ObjectId,ref:"Review"}],

 

},opts);
CampgroundSchema.virtual('properties.popUp').get(function(){
  return `<a href="/campgrounds/${this._id}"> ${this.name} </a>`
})
CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
      try {
        await Review.deleteMany({
          _id: {
            $in: doc.reviews
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  });
  

module.exports=mongoose.model('Campground',CampgroundSchema)