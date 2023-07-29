const mongoose= require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review')

const CampgroundSchema = new Schema({
name:String,
price:Number,
description:String,
location:String,
Image: [
  {
  url:  String,
  filename:String
   }
  ],
author:{
  type:Schema.Types.ObjectId,
  ref:'User'
},
reviews:
    [{type: Schema.Types.ObjectId,ref:"Review"}]


});
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