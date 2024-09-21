const mongoose = require("mongoose")

const shareSchema = mongoose.Schema({
    sharedUserId : {type: String, required : true},
    sharedUserName : { type: String, required : true},
    productName : {type : String, required: true},
    productId : {type: String, required : true},
    productImgSrc : {type: String, required : true},
    productPrice : {type: Number, required : true},
    otherAccountHoldersId : { type : Object, required : true },
    comments : {type: Object, required : true}    // [{userId, username, commentLine}]
},{
    versionKey : false,
    timeStamps : true 
})

const ShareModel = mongoose.model('share',shareSchema)

module.exports = ShareModel