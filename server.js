const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const Shop = require('./models/shop');
const Status = require('./models/status');
const Item = require('./models/item');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://louise:shoppinglist000@ds119049.mlab.com:19049/shoppinglist");




app.listen(3050, () => {
    console.log('app is running on port 3050');
})
