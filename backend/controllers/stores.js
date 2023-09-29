const Store = require('../models/store');
const User = require('../models/user');

module.exports = {
    index,
    show,
    create,
    updateOne,
    deleteStore,
};

// // @desc Get all stores
// // @route GET /stores
// // @access 

async function index(req, res){
    const stores = await Store.find({});
    // res.render("movies/index", { title: "All Movies", movies });
    res.json({ title: "All Stores", stores });
}

// // @desc Get store by id
// // @route GET /stores/:id
// // @access 

async function show(req, res){
    const store = await Store.findById(req.params.id);
    // res.render("movies/show", { title: "Movie Detail", movie });
    res.json({ title: "Store Detail", store });
}


// // @desc create new store
// // @route POST /stores
// // @access 

async function create (req, res) {
    console.log("Request body:", req.body);
    // const {name, image} = req.body;
    try {
        await Store.create(req.body);
        const stores = await Store.find({});
        res.json({ title: "All Stores", stores });

    } catch (err) {
      console.log(err);
      res.status(500).json({ errorMsg: err.message });
    }
}

// // @desc update a store
// // @route PUT /stores/id:
// // @access 


async function updateOne (req, res) {
    console.log("Request body:", req.body);
    console.log("Request params:", req.params);
    
    const {name, image} = req.body;
    try {
        const store = await Store.findById(req.params.id);
        store.name = name;
        store.image = image;
        await store.save();
        res.json({ title: "Store Detail", store });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ errorMsg: err.message });
    }
    
}


// // @desc delete a store
// // @route DELETE /stores/id:
// // @access 

async function deleteStore(req, res){
    console.log("Request params:", req.params);
    try {
        await Store.findByIdAndDelete(req.params.id);
        const stores = await Store.find({});
        res.json({ title: "All Stores", stores });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ errorMsg: err.message });
    }
}

// function newStore(req, res){
//     res.render('stores/new');
// }