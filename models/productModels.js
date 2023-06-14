// to create a product model we need aproduct schema
// models used to store product information in database
// product schema is inside product module and determines what kind of daat is inside product model

const mongoose= require('mongoose')

//Schema
const productSchema = mongoose.Schema({
    name:{
        type: String,
        required :[true, "Please enter a product name "]
    },
    quantity:{
        type: Number,
        required:[true],
        default: 0
    },
    price:{
        type: Number,
        required:[true]
    }

}, 

// to track when data is saved to the databse 
{
timestamps:true
}
)
//model

const Product =mongoose.model('Product',productSchema); //model named schema

//export model
module.exports = Product;

