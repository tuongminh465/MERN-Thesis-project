const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {   
        userId: { type: String, require: true, unique: true},
        products: [
            {
                productId: {
                    type: String,
                    require: true
                },
                name: {
                    type: String,
                    require: true
                },
                img: {
                    type: String,
                    require: true
                },
                manufacturer: {
                    type: String,
                    require: true
                },
                price: {
                    type: String,
                    require: true
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        quantity: { type: Number, require: true, default: 0},
        total: { type: Number, require: true, default: 0}
    },
    { timestamps: true }
)

module.exports = mongoose.model("Cart", cartSchema);