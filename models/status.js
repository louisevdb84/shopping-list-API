var mongoose = require("mongoose");

var statusSchema = new mongoose.Schema({
   name: String,   
});

module.exports = mongoose.model("Status", statusSchema);