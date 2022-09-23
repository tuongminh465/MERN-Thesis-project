const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY)


router.post("/payment", (req, res) => {
    stripe.charges.create({
        source: req.body.tokeId,
        amount: req.body.total,
        currency:"usd",
    }, (stripeErr, stripeRes) => {
        if(stripeErr) { res.status(500).json(stripeErr); }
        else if(stripeRes) { res.status(200).json(stripeRes); }
    })
})

module.exports = router