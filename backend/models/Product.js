const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {   
        name: {type: String, require: true, unique: true},
        img: {type: String, require: true},
        manufacturer: {type: String, require: true},
        type: {type: String, require: true},
        info: [String],
        price: {type: Number, require: true},
        releaseYear: {type: Number, default: false},
        inStock: {type: Boolean, default: true}
    },
    { timestamps: true }
)

module.exports = mongoose.model("Product", productSchema);

