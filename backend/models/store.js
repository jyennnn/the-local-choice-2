const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        default: ''
    },
    price:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        default: ''
    },
    category:{
        type: String,
        default: ''
    },
}, {
    timestamps: true
});


const storeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        default: ''
    },
    products: [productSchema],
}, {
    timestamps: true
});


module.exports = mongoose.model('Store', storeSchema);