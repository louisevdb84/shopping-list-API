const Shop = require('../models/shop');
const Status = require('../models/status');
const Item = require('../models/item');
const local = require('../auth/local');

const getItems = (req, res) => {    
    local.decodeToken(local.getToken(req.headers), (err, user) => {
        
        Item.find({userId:user.sub}, (err, item) => {
            if (err) {
                res.json(err);
            } else {
                res.json(item);
            }
        }).sort({ sorting: 'asc' })
    })
}

const getItemsByStatus = (req, res) => { 
    const { status } = req.body;    
    local.decodeToken(local.getToken(req.headers), (err, user) => {        
        //Item.find({ $or: [{ userId: user.sub, 'status.name': status }, { 'userId.id': user.sub }] }, (err, item) => {
            Item.find({userId: user.sub, 'status.name': status}, (err, item) => {
            if (err) {
                res.json(err);
            } else {                
                res.json(item);                
            }
        }).sort({ sorting: 'asc' })
    })
}

const getItemByName = (req, res) => { 
    const { name, status } = req.body;    
    local.decodeToken(local.getToken(req.headers), (err, user) => {                
            Item.find({userId: user.sub, 'name': name, 'status.name' : status}, (err, item) => {
            if (err) {
                res.json(err);
            } else {                
                res.json(item[0]);                
            }
        })
    })
}

const newItem = (req, res) => {      
    const { name, shop, sorting, isRepeating, status } = req.body;    
    if (!name || !shop) {
        return res.status(400).json('incorrect form submission');
    }
    local.decodeToken(local.getToken(req.headers), (err, user) => {                
        Item.create({
            name: name,
            userId:  user.sub, 
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
    })
}

const newItems = (req, res) => {    
    
    
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
    deleteAllItems,
    getItemByName
}

