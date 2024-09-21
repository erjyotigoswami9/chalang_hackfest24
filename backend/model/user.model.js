const mongoose = require("mongoose") ;

const userSchema = mongoose.Schema({
    email : {type : String, required : true},
    password : {type : String, required : true} ,
    username : {type: String, required : true}
},{
    versionKey : false
})

const UserModel = mongoose.model('users',userSchema) ;

module.exports = UserModel ;