const Status = require('../models/status');

const getStatus = (req, res) => {
    Status.find({}, (err, status) => {
        if (err) {
            res.json(err);
        } else {
            res.json(status);
        }
    })
}

module.exports = {
    getStatus
}

