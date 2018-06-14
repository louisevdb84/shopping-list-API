var mongoose = require("mongoose");

var itemSchema = new mongoose.Schema({
    name: String, 
    shop: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shop"
        },
        name: String,        
    },    
    sorting: Number,
    isRepeating: Boolean,    
    status: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Status"
        },
        name: String
    }
});

module.exports = mongoose.model("Item", itemSchema);