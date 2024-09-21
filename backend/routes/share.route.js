const express = require("express")
const auth = require("../middleware/auth")
const ProductModel = require("../model/product.model")
const UserModel = require("../model/user.model")
const ShareModel = require("../model/share.model")

const shareRouter = express.Router()

shareRouter.get('/get',auth, async(req,res)=>{
    try {
        let { productId, sharedUserId } = req.query
        let data = await ShareModel.findOne({productId, sharedUserId})
        res.status(200).send({data})
    } catch (error) {
        console.log(error)
        res.status(400).send({error})
    }
})

shareRouter.post('/create',auth, async(req,res)=>{
    try {
        let { productId, sharedUserId } = req.query 
        console.log({productId,sharedUserId})
        let dataProduct = await ProductModel.findOne({_id: productId})
        console.log(dataProduct)
        let userObj = { username : req.user.username, userId : req.user._id } 
        console.log(userObj) 
        if(dataProduct!=null){
            let dataSharedUser = await UserModel.findOne({_id:sharedUserId})
            console.log(dataSharedUser)
            if(dataSharedUser!=null){
                let objFinal = { productId : productId, productImgSrc: dataProduct.imgSrc, productName : dataProduct.name, productPrice : dataProduct.price, sharedUserId, sharedUserName : userObj.username, otherAccountHoldersId : [], comments : [] }
                console.log(objFinal)
                let checkDataPresent = await ShareModel.findOne({productId, sharedUserId})
                console.log(checkDataPresent)
                if(checkDataPresent!=null){
                    res.status(200).send({message:"data already present!"})
                }else{
                    if(sharedUserId==req.user._id){
                        let dataSend = new ShareModel(objFinal)
                        await dataSend.save()
                        res.status(200).send(dataSend)
                    }else{
                        res.status(400).send({message:"userId not matched!"})
                    }
                }
            }
            else{
                res.status(400).send({message : "shared userId not found!"})
            }
        }else{
            res.status(400).send({message : "product not found for given req.query.productId"})
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({error})
    }
})

shareRouter.patch('/others',auth, async(req,res)=>{
    try {
        let { productId , sharedUserId } = req.query 
        let {commentLine} = req.body
        let t = new Date()
        console.log(t)
        let nt = String(t)
        console.log(nt)
        let tnt = nt.slice(0,21)
        console.log(tnt)
        let userObj = { userId : String(req.user._id), username : req.user.username, commentLine : commentLine, time : tnt }
        console.log(userObj)
        let checkSharedData = await ShareModel.findOne({productId,sharedUserId})
        console.log("--------------")
        console.log(checkSharedData)
        console.log("----share collection data for given shared id----------")
        if(checkSharedData!=null){
            
            console.log("existing array",checkSharedData.otherAccountHoldersId)
            console.log("userid",userObj.userId)
            let uIdStr = String(userObj.userId)
            let checkIdExist = checkSharedData.otherAccountHoldersId.includes(uIdStr)
            console.log(checkIdExist)
            console.log(uIdStr)
            if(checkIdExist){
                let commentsBox = [...checkSharedData.comments,userObj]
                console.log(commentsBox)
                let nData = { comments : commentsBox}
                console.log("--------final changing data------------")
                console.log(nData)
                let dataSend = await ShareModel.findByIdAndUpdate({_id:checkSharedData._id},{...nData})
                res.status(200).send({data:dataSend})
            }else{
                let otherAccountHoldersIdArray = [...checkSharedData.otherAccountHoldersId, userObj.userId]
                console.log(otherAccountHoldersIdArray)
                let commentsBox = [...checkSharedData.comments,userObj]
                console.log(commentsBox)
                let nData = { otherAccountHoldersId : otherAccountHoldersIdArray, comments : commentsBox}
                console.log("--------final changing data------------")
                console.log(nData)
                let dataSend = await ShareModel.findByIdAndUpdate({_id:checkSharedData._id},{...nData})
                res.status(200).send({data:dataSend})
            }
        }
        else{
            res.status(400).send({message: "sharedId not found!"})
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({error})
    }
})

module.exports = shareRouter