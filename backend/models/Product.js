const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {   
        name: {type: String, require: true, unique: true},
        img: {type: String, require: true},
        manufacturer: {type: String, require: true},
        type: {type: String, require: true},
        price: {type: Number, require: true},
        releaseYear: {type: Number, default: false},
    },
    { timestamps: true }
)

module.exports = mongoose.model("Product", productSchema);