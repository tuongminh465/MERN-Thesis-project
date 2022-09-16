const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {   
        userId: { type: String, require: true},
        products: [
            {
                productId: {
                    type: String
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        total: { type: Number, required: true },
        address: { type: Object, require: true },
        status: { type: String, default: "pending" },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Order", orderSchema);