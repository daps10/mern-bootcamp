import mongoose, { ObjectId } from 'mongoose';
const { Schema } = mongoose;

const ProductCartSchema = new Schema ({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema)

const orderSchema = new Schema({
    products: [ProductCartSchema],
    transactionId: {},
    amount: {
        type: Number
    },
    address: {
        type: String
    },
    updated: {
        type: Date
    },
    user : {
        type: ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

const Order = mongoose.model("OrderSchema", orderSchema)

module.exports = { Order, ProductCart };