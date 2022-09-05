const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {   
        title: {type: String, require: true, unique: true},
        type: {type: String, require: true},
        img: {type: String, require: true},
        price: {type: Number, require: true},
        manufacturer: {type: String, require: true},
        releaseYear: {type: Number, default: false},
    },
    { timestamps: true }
)

module.exports = mongoose.model("Product", productSchema);