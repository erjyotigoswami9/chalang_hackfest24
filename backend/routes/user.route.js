const express = require("express") ;
const bcrypt = require("bcrypt") ;
const jwt = require("jsonwebtoken") ;
const dotenv = require("dotenv").config() ;

const auth = require('../middleware/auth') ;
const UserModel = require("../model/user.model");
const blacklistedArr = require('../blacklist/blacklist') ;

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ;
const JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY ;

const userRouter = express.Router() ;

userRouter.get('/getId', auth ,(req,res)=>{
    try {
        let userId = req.user._id
        res.status(200).send({data: {userId}})
    } catch (error) {
        console.log(error)
        res.status(400).send({error})
    }
})

userRouter.post('/signup', async(req,res)=>{
    try {
        let {username, email, password} = req.body ;
        
        let checkExistingUser = await UserModel.findOne({email}) ;
        if(checkExistingUser!=null){
            res.status(200).send({message : "user already exists in database"}) ;
        }else{
            const pswd = await bcrypt.hash(password, 3) ;
            let sendingData = new UserModel({username,email, password: pswd}) ;
            await sendingData.save() ;
            res.status(200).send({message : "created"}) ;
        }
    } catch (error) {
        console.log(error) ;
        res.status(404).send({err:"error occurred !"})
    }
})

userRouter.delete('/delete/:id', auth ,async(req,res)=>{
    try {
        let userId = req.params.id ;
        let checkData = await UserModel.findOne({_id:userId}) ;
        if(checkData!=null){
            if(req.user._id==userId){
                let deletedData = await UserModel.findByIdAndDelete({_id:userId}) ;
                res.status(200).send({message: "deleted"}) ;
            }else{
                res.status(400).send({message: "userId not matched !"}) ;
            }
        }
        else{
            res.status(400).send({message : "user not found !"}) ;
        }
    } catch (error) {
        console.log(error) ;
        res.status(404).send({err:"error occurred !"})
    }
})

userRouter.post('/signin', async(req,res)=>{
    try {
        let {email, password} = req.body ;
        let checkData = await UserModel.findOne({email}) ;
        if(checkData!=null && password!=""){
            bcrypt.compare(password, checkData.password, (err,result)=>{
                if(err){
                    console.log(err) ;
                    res.status(404).send({err:"error occurred !"})
                }else{
                    if(!result){
                        res.status(200).send({message : "password not matched ! invalid credential"}) ;
                    }else{
                        const accessToken = jwt.sign({email, username : checkData.username,}, JWT_SECRET_KEY, {expiresIn : '1hr'}) ;
                        const refreshToken = jwt.sign({email, username : checkData.username}, JWT_REFRESH_KEY, {expiresIn : '1hr'}) ;
                        res.status(200).send({accessToken, refreshToken}) ;
                    }
                }
            })
        }
        else{
            res.status(400).send({message : "email not found ! user not exists in the database"})
        }
    } catch (error) {
        console.log(error) ;
        res.status(404).send({err:"error occurred !"})
    }
})

userRouter.get('/logout', auth ,(req,res)=>{
    try {
        const token = req.headers.authorization.split(" ")[1] ;
        blacklistedArr.push(token) ;
        // console.log(blacklistedArr) ;
        res.status(200).send({message: "logged out"}) ;
    } catch (error) {
        console.log(error) ;
        res.status(404).send({err:"error occurred !"})
    }
})

userRouter.get('/token' , (req,res)=>{
    try {
        const refreshToken = req.headers.authorization.split(" ")[1] ;
        if(refreshToken in blacklistedArr){
            res.status(200).send({message : "pls login !"}) ;
        }else{
            jwt.verify(refreshToken, JWT_REFRESH_KEY, (err, decoded)=>{
                if(err){
                    console.log(err) ;
                    res.status(404).send({err:"error occurred !"})
                }else{
                    console.log(decoded) ;
                    const accessToken = jwt.sign({username:decoded.username,email:decoded.email}, JWT_SECRET_KEY,{expiresIn: '1hr'}) ;
                    res.status(200).send({accessToken}) ;
                }
            })
        }
    } catch (error) {
        console.log(error) ;
        res.status(404).send({err:"error occurred !"}) ;
    }
} )

module.exports = userRouter ;