var mongoose = require("mongoose");

var shopSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"    
    },
   name: String,   
});

module.exports = mongoose.model("Shop", shopSchema);