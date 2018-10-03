const Shop = require('../models/shop');
const Status = require('../models/status');
const Item = require('../models/item');

const getItems = (req, res) => {    
    Item.find({}, (err, item) => {
        if (err) {
            res.json(err);
        } else {
            res.json(item);
        }
    }).sort({sorting: 'asc'})
}

const getItemsByStatus = (req, res) => { 
    const { status } = req.body;    
    Item.find({'status.name' : status}, (err, item) => {
        if (err) {
            res.json(err);
        } else {
            res.json(item);            
        }
    }).sort({sorting: 'asc'})
}

const newItem = (req, res) => {    
    const { name, shop, sorting, isRepeating, status } = req.body;    
    if (!name) {
        return res.status(400).json('incorrect form submission');
    }
    Item.create({
        name: name,
        shop: {
            id: shop.id,
            name: shop.name
        },
        sorting: sorting,
        isRepeating: isRepeating,
        status: {
            id: status.id,
            name: status.name
        }
    }, (err, item) => {
        if (err) {
            res.json(err);
        } else {
            res.json(item);
        }
    });
}

const newItems = (req, res) => {    
    
    console.log(req.body);
    // if (!req.body) {
    //     return res.status(400).json('incorrect form submission');
    // }
    Item.collection.insert(req.body, (err, item) => {
        if (err) {
            res.json(err);
        } else {
            res.json(item);
        }
    });
}

const updateItem = (req, res) => {    
    console.log(req.params.id);
    console.log(req.body);
    Item.findByIdAndUpdate(req.params.id,       
        req.body,         
        { new: true },
        (err, item) => {
            if (err) {
                res.json(err);
            } else {
                res.json(item);
            }
    })
}

const deleteItem = (req, res) => {    
    const { id } = req.body;    
    console.log(id);
    Item.findByIdAndRemove(id, (err, item) => {
        if (err) {
            res.json(err);
        } else {
            console.log(item);
            res.json(item);
        }
    })
}
const deleteAllItems = (req, res) => {    
    const { status } = req.body; 
    Item.deleteMany({'status.name': status}, (err, item) => {
        if (err) {
            res.json(err);
        } else {
            console.log(item);
            res.json(item);
        }
    })
}

module.exports = {
    getItems,    
    getItemsByStatus,
    newItem,
    newItems,
    deleteItem,
    updateItem,
    deleteAllItems
}

