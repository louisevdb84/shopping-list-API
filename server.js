const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const items = require('./controllers/items');
const shops = require('./controllers/shops');
const status = require('./controllers/status');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://louise:shoppinglist000@ds119049.mlab.com:19049/shoppinglist");

app.get('/items', (req, res) => { items.getItems(req, res) })
app.post('/items', (req, res) => { items.getItemsByStatus(req, res) })
app.post('/items/new', (req, res) => { items.newItem(req, res) })

app.get('/shops', (req, res) => { shops.getShops(req, res) })
app.post('/shops/new', (req, res) => { shops.newShop(req, res) })
app.put('/shops/:id/edit', (req, res) => { shops.updateShop(req, res) })
app.delete('/shops/delete', (req, res) => { shops.deleteShop(req, res) })

app.get('/status', (req, res) => { status.getStatus(req, res) })


app.listen(3050, () => {
    console.log('app is running on port 3050');
})
