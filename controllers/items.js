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

const getItemsByStatus = (req, res) => { 
    const { status } = req.body;    
    Item.find({'status.name' : status}, (err, item) => {
        if (err) {
            res.json(err);
        } else {
            res.json(item);            
        }
    })
}

const newItem = (req, res) => {
    console.log("SOMETHING")
    const { name, shop, sorting, isRepeating, status } = req.body;
    console.log(req.body);
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

// const addEditItems = () => {
//     Shop.findOne({ name: 'Food Lovers Market' }, (err, shop) => {
//         Status.findOne({ name: 'Permanent' }, (err, status) => {
//             Item.create({
//                 name: "Rice",
//                 shop: shop,
//                 sorting: 90,
//                 isRepeating: true,
//                 status: status
//             }, (err, item) => {
//                 if (err) {
//                     console.log(err);
//                  } else {
//                      console.log(item);
//                  }
//             })
//         })
//     });    
// }

module.exports = {
    getItems,
    //addEditItems,
    getItemsByStatus,
    newItem
}

