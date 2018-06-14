var mongoose = require("mongoose");

var shopSchema = new mongoose.Schema({
   name: String,   
});

module.exports = mongoose.model("Shop", shopSchema);