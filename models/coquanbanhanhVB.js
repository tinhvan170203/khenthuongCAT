let mongoose = require('mongoose');
let coquanbanhanh = mongoose.Schema({
    coquanbanhanh: String
});
const Coquanbanhanh = mongoose.model('Coquanbanhanh', coquanbanhanh);
module.exports = Coquanbanhanh;