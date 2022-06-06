const express = require("express");
const router = express.Router();

const Product = require("../models/product.model");

router.get("", async(req,res)=>{
    try {
        const product = await Product.find().lean().exec();
        return res.status(201).send({product:product});
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
});

router.post("/",async(req,res)=>{
    try {
        const item = await Product.create(req.body);
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
});

//single products
router.get("/:id", async (req, res) => {
    const product = await Product
        .findById(req.params.id)
        .lean()
        .exec()
    return res.status(201).send({ product })
})

// fabric 
router.get("/sort/fabric", async (req, res) => {
    const fabric = req.query.fabric;
    const product = await Product
        .find({ gender: { $eq: `${fabric}` } })
        .lean()
        .exec();
    return res.status(201).send({ product:product });
})

//colors
router.get("/sort/color", async (req, res) => {
    const color = req.query.color;
    const prodColor = await Product
        .find({ color: { $eq: `${color}` } })
        .lean()
        .exec();
    return res.status(201).send({ product:prodColor });
})

// brands
router.get("/sort/brand", async (req, res) => {
    try {
        const brand = req.query.brand;
    const prodBrand = await Product
        .find({ brand: { $eq: `${brand}` } })
        .lean()
        .exec();
    return res.status(200).send({ product:prodBrand });
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
});

//types
router.get("/sort/type", async (req, res) => {
    const type = req.query.type;
    const prodBrand = await Product
        .find({ type: { $eq: `${type}` } })
        .lean()
        .exec();
    return res.status(201).send({ product:prodBrand });
})

// price
router.get("/sort/price", async (req, res) => {
    const from = req.query.from;
    const to = req.query.to;
    const prodPrice = await Product
        .find({ $and: [{ price: { $gt: `${from}` } }, { price: { $lt: `${to}` } }] })
        .lean()
        .exec();
    return res.status(201).send({ product:prodPrice });
})

module.exports = router;