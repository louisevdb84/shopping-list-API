const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const items = require('./controllers/items');
const shops = require('./controllers/shops');
const status = require('./controllers/status');
const register = require('./controllers/register');

const local = require('./auth/local');
require('dotenv').config()

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.shoppingList_MongoDB);

app.post('/register', (req, res) => { register.newUser(req, res) })

app.get('/items', (req, res) => { items.getItems(req, res) })
app.post('/items', (req, res) => { items.getItemsByStatus(req, res) })
app.post('/items/new', (req, res) => { items.newItem(req, res) })
app.post('/items/copy', (req, res) => { items.newItems(req, res) })
app.put('/items/:id/edit', (req, res) => { items.updateItem(req, res) })
app.delete('/items/delete', (req, res) => { items.deleteItem(req, res) })
app.delete('/items/deleteAll', (req, res) => { items.deleteAllItems(req, res) })

app.get('/shops', (req, res) => { shops.getShops(req, res) })
app.get('/:id/shop', (req, res) => { shops.getShop(req, res) })
app.post('/shops/new', (req, res) => { shops.newShop(req, res) })
app.put('/shops/:id/edit', (req, res) => { shops.updateShop(req, res) })
app.delete('/shops/delete', (req, res) => { shops.deleteShop(req, res) })

app.get('/status', (req, res) => { status.getStatus(req, res) })

local.decodeToken(local.encodeToken(5), (err, res) => {
    console.log(res);
});

app.listen(process.env.PORT || 3050, () => {
    console.log('app is running');
})
