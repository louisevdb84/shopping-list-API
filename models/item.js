var mongoose = require("mongoose");

var itemSchema = new mongoose.Schema({
    userId: String,
    name: String, 
    shop: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shop"
        },
        _id: String,
        name: String,        
    },    
    sorting: Number,
    isRepeating: Boolean,    
    status: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Status"
        },
        _id: String,
        name: String
    }
});

module.exports = mongoose.model("Item", itemSchema);