const router = require('express').Router();
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./token');

const Order = require("../models/Order");

//Add
router.post("/", verifyTokenAndAuthorization, async (req, res) => {
    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save();

        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body
            }, 
            {   
                new: true
            },
        );
        res.status(200).json(updatedOrder);
    } catch(err) {
        res.status(500).json(err)
    }
})

//User update
router.put("/:userid/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            }, 
            {
                new: true
            }
        )

        req.status(200).json(updatedOrder)
    } catch (err) {
        res.status(500).json(err)
    }
})

//Delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted!")
    } catch {
        res.status(500).json(err)
    }
})

//get Order by user id
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find({userId: req.params.userId});

        res.status(200).json(orders);
    } catch {
        res.status(500).json(err)
    }
    
})

//get all Order 
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        let orders = await Order.find()

        res.status(200).json(orders);
    } catch {
        res.status(500).json(err)
    }
})

//get monthly income
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const monthBefore = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
        {   $match: { 
                createdAt: { $gte: monthBefore } 
            } 
        },
        {
            $project: {
                month: { $month: "$createdAt" },
                sales: "$total",
            },
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: "$sales" },
            },
        },
    ]);
    res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;