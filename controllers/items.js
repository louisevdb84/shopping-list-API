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
    })
}

const addEditItems = () => {
    Shop.findOne({ name: 'Food Lovers Market' }, (err, shop) => {
        Status.findOne({ name: 'Permanent' }, (err, status) => {
            Item.create({
                name: "Rice",
                shop: shop,
                sorting: 90,
                isRepeating: true,
                status: status
            }, (err, item) => {
                if (err) {
                    console.log(err);
                 } else {
                     console.log(item);
                 }
            })
        })
    });    
}

module.exports = {
    getItems,
    addEditItems
}

