const { verifyTokenAndAdmin } = require('./token');
const router = require('express').Router();

const Product = require("../models/Product");

//Add
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body)

    try {
        const savedProduct = await newProduct.save();

        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body
            }, 
            {   
                new: true
            },
        );
        res.status(200).json(updatedProduct);
    } catch(err) {
        res.status(500).json(err)
    }
})

//Delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted!")
    } catch {
        res.status(500).json(err)
    }
})

//get Product by id
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        res.status(200).json(product);
    } catch {
        res.status(500).json(err)
    }
    
})

//get Product by query
router.get("/", async (req, res) => {
    const newQuery = req.query.new 
    const typeQuery = req.query.type

    try {
        let products = [];
        
        if (newQuery) { products = await Product.find().sort({ createdAt: -1 }).limit(1); }
        else if (typeQuery) { products =  await Product.find({type: typeQuery}); } 
        else { products = await Product.find(); }

        res.status(200).json(products);
    } catch {
        res.status(500).json(err)
    }
})

module.exports = router;