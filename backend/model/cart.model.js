const mongoose = require("mongoose") ;

const cartSchema = mongoose.Schema({
    productId : {type: String, required : true},
    userId : {type : String, required : true},
    userName : {type: String, required: true},
    quantity : {type: Number, required : true},
    productName : {type : String, required : true},
    productPrice : {type : Number, required : true},
    imgSrc : {type:String, required: true}
},{
    versionKey : false
})

const CartModel = mongoose.model('carts',cartSchema) ;

module.exports = CartModel ;