const Shop = require('../models/shop');

const newShop = (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json('incorrect form submission');
    }
    Shop.create({
        name: name
    }, (err, shop) => {
        if (err) {
            res.json(err);
        } else {
            res.json(shop);
        }
    });
}

const getShops = (req, res) => {
    Shop.find({}, (err, shops) => {
        if (err) {
            res.json(err);
        } else {
            res.json(shops);
        }
    })
}

const updateShop = (req, res) => {    
    Shop.findByIdAndUpdate(req.params.id,
         // the change to be made. Mongoose will smartly combine your existing 
    // document with this change, which allows for partial updates too
        req.body,
         // an option that asks mongoose to return the updated version 
    // of the document instead of the pre-updated one.
        { new: true },
        (err, shop) => {
            if (err) {
                res.json(err);
            } else {
                res.json(shop);
            }
    })
}

const deleteShop = (req, res) => {
    const { id } = req.body;
    Shop.findByIdAndRemove(id, (err, shop) => {
        if (err) {
            res.json(err);
        } else {
            res.json(shop);
        }
    })
}

module.exports = {
    getShops,    
    newShop,
    updateShop,
    deleteShop
}



