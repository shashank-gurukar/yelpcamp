const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
name:String,
price:Number,
description:String,
location:String,
Image: String,
reviews:
    [{type: Schema.Types.ObjectId,ref:"Review"}]


});

module.exports=mongoose.model('Campground',CampgroundSchema)