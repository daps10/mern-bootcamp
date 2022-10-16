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

// creating methods
productSchema.methods = {
    transform: function() {
        const transformed = {};
        const fields = ['_id', 'name','description','price','stock','sold','photo', 'createdAt'];

        fields.forEach((field) => {
            transformed[field] = this[field];
        });

        return transformed;
    }
}

module.exports = mongoose.model("Product", productSchema);