const express = require("express") ;
const ProductModel = require("../model/product.model") ;
const auth = require('../middleware/auth') ;

const productRouter = express.Router() ;

productRouter.get('/all', async (req,res)=>{
    try {
        let {pageNo, limitNo} = req.query ;
        // console.log(pageNo,limitNo) ;
        if(pageNo<=0){
            pageNo = 1 ;
        }
        if(limitNo<=0){
            limitNo = 5 ;
        }
        let data = await ProductModel.find().skip((pageNo-1)*limitNo).limit(limitNo) ;
        res.status(200).send({data:data});
    } catch (error) {
        console.log(error) ;
        res.status(404).send({err:"error occurred !"}) ;
    }
})

productRouter.get('/full', async (req,res)=>{
    try {
       
        let data = await ProductModel.find() ;
        res.status(200).send({data:data});
    } catch (error) {
        console.log(error) ;
        res.status(404).send({err:"error occurred !"}) ;
    }
})

productRouter.post('/create', auth ,async(req,res)=>{
    try {
        let data = req.body ;
        console.log(data) ;
        let sendingData = new ProductModel({name:data.name, description:data.description, price:data.price, imgSrc : data.imgSrc}) ;
        await sendingData.save() ;
        res.status(200).send({message: "created"});
    } catch (error) {
        console.log(error) ;
        res.status(404).send({err:"error occurred !"}) ;
    }
})

productRouter.patch('/update/:id', auth ,async(req,res)=>{
    try {
        let data = req.body ;
        let productId = req.params.id ;
        let checkData = await ProductModel.findOne({_id : productId}) ;
        if(checkData!=null){
                let fixData = await ProductModel.findByIdAndUpdate({_id:productId},{...data}) ;
                res.status(200).send({message : "updated"}) ;
        }
        else {
            res.status(200).send({message : "Data not found in the Database"}) ;
        }
    } catch (error) {
        console.log(error) ;
        res.status(404).send({err:"error occurred !"}) ;
    }
})

productRouter.delete('/delete/:id', auth , async(req,res)=>{
    try {
        let productId = req.params.id ;
        let isCheckData = await ProductModel.findOne({_id: productId}) ;
        if(isCheckData!=null){
                let deletedData = await ProductModel.findByIdAndDelete({_id:productId}) ;
                res.status(200).send({message : "deleted"}) ;
        }
        else{
            res.status(200).send({message : "Data not found in the Database"}) ;
        }
    } catch (error) {
        console.log(error) ;
        res.status(404).send({err:"error occurred !"}) ;
    }
})

module.exports = productRouter