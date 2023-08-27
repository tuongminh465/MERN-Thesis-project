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

//get Product
router.get("/", async (req, res) => {

    try {
        // let products = [];
        
        // if (req.query) { 
        //     products =  await Product.find(req.query); 
        // }
        // else {
        //     products = await Product.find();
        // } 

        const queryObj = { ...req.query }
        const excludedFields = ['pageIndex', 'pageSize', 'sortBy', 'sortOrder']

        excludedFields.forEach(ef => delete queryObj[ef])

        let products = await Product.find(queryObj);

        if (req.query.sortBy) {
            const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

            products.sort((a, b) => {
                const propA = a[req.query.sortBy];
                const propB = b[req.query.sortBy];
                
                if (propA < propB) return -1 * sortOrder;
                if (propA > propB) return 1 * sortOrder;
                return 0;
            });
        }

        const searchString = req.query.search
        console.log(searchString)

        if (searchString) {
            products = products.filter(product => 
                product.name.includes(searchString) || 
                product.name.includes(searchString.toUpperCase()) || 
                product.name.includes(searchString.toLowerCase()) 
            )
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})

module.exports = router;