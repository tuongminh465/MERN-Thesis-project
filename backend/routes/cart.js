const router = require('express').Router();
const { verifyTokenAndAuthorization,verifyTokenAndAdmin, verifyToken } = require('./token');

const Cart = require("../models/Cart");

//Add
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body)

    try {
        const savedCart = await newCart.save();

        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Update
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {

    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body
            }, 
            {   
                new: true
            },
        );
        res.status(200).json(updatedCart);
    } catch(err) {
        res.status(500).json(err)
    }
})

//Delete
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted!")
    } catch {
        res.status(500).json(err)
    }
})

//get Cart by user id
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({userId: req.params.userId});

        res.status(200).json(cart);
    } catch {
        res.status(500).json(err)
    }
    
})

//get all cart 
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        let carts = await Cart.find()

        res.status(200).json(carts);
    } catch {
        res.status(500).json(err)
    }
})

module.exports = router;