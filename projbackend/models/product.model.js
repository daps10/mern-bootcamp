const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 32,
    },
    description: {
        type: String,
        required: true,
        trim: true,        
        maxlength: 2000
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 32
    },
    category: {
        type: ObjectId,
        required: true,
        ref: "Category"
    },
    stock: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        type: Buffer,
        contentType: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);