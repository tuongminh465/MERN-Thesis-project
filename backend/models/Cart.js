const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {   
        userId: { type: String, require: true},
        product: [
            {
                productId: {
                    type: String
                },
                name: {
                    type: String
                },
                img: {
                    type: String
                },
                manufacturer: {
                    type: String
                },
                price: {
                    type: String
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
    },
    { timestamps: true }
)

module.exports = mongoose.model("Cart", cartSchema);