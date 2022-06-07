const express = require("express");
const router = express.Router();

const Product = require("../models/product.model");



router.get('/',async(req,res)=>{
    try {
        let page = req.query.page ||1
        let pagesize = req.query.pagesize||5
        let filter = req.query.filter
        let sort = req.query.sort
        const skip=(page-1)*pagesize;
        if(filter!=="all"){
        const product = await Product
          .find({brand:{$eq:filter}})
          .skip(skip).limit(pagesize)
          .sort({price:sort})
          .lean()
          .exec()
        const total_pages=Math.ceil((await Product.find({brand:{$eq:filter}}).countDocuments())/pagesize)
        return res.send({total_pages,product})
        }
        else{
            const product = await Product
              .find()
              .skip(skip)
              .limit(pagesize)
              .sort({price:sort})
              .lean()
              .exec()
            const total_pages = Math.ceil((await Product.find().sort({price:sort}).countDocuments())/pagesize)
          
            return res.send({total_pages,product})
           
        }
    } 
    catch (error) {
        res.send(error)
    }
})
router.get("/listing", async(req,res)=>{
    try {
        const page = req.query.page || 1;
        const pagesize = req.query.pagesize || 10; 
        const skip = (page - 1) * pagesize;
        const product = await Product.find().skip(skip).limit(pagesize).lean().exec();
        const totalPages = Math.ceil((await Product.find().countDocuments()))
        return res.status(201).send({product:product});
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
});



module.exports = router;