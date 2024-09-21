const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name : {type: String, required : true},
    price : {type: Number, required : true},
    description : {type: String, required : true},
    imgSrc : {type: Object, required: true}
},{
    versionKey : false 
})

const ProductModel = mongoose.model("products",productSchema) ;

module.exports = ProductModel ;