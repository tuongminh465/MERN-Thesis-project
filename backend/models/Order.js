const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {   
        userId: { type: String, require: true},
        products: [
            {
                name: {
                    type: String
                },
                img: {
                    type: String
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
                subtotal: {
                    type: Number
                }
            },
        ],
        total: { type: Number, required: true },
        address: { type: Object, require: true },
        status: { type: String, default: "pending" },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Order", orderSchema);