const Store = require('../models/store');

module.exports = {
    show,
    create,
    updateOne,
    deleteProduct,
};

async function show(req, res){
    const store = await Store.findById(req.params.id);
    const product = store.products.id(req.params.productId);
    res.json(product);
}

async function create (req, res) {
    console.log("Request body:", req.body);
    console.log("Request params:", req.params);
    const store = await Store.findById(req.params.id);
    store.products.push(req.body);
    // const {name, image} = req.body;
    try {
        await store.save();
        res.status(200).json({ title: "Store Detail", store });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ errorMsg: err.message });
    }
}
async function updateOne (req, res) {
    try {
        const store = await Store.findById(req.params.id);
        
        // Find the specific product inside the store
        const product = store.products.id(req.params.productId);
        if(!product) {
            return res.status(404).json({ errorMsg: "Product not found." });
        }
        
        // Update the product details
        product.quantity = req.body.quantity;
        product.price = req.body.price;
        product.description = req.body.description;
        product.category = req.body.category;
        product.image = req.body.image;

        await store.save();
        
        res.json({ title: "Store Detail", store });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ errorMsg: err.message });
    }
}


async function deleteProduct(req, res){
    console.log("Request params:", req.params);
    const store = await Store.findById(req.params.id);
    store.products.pull(req.params.productId);
    try {
        await store.save();
        res.json({ title: "Store Detail", store });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ errorMsg: err.message });
    }
}
