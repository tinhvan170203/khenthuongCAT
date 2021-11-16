let mongoose = require('mongoose');
let loaivanban = mongoose.Schema({
    loaiVB: String
});
const Loaivanban = mongoose.model('Loaivanban', loaivanban);
module.exports = Loaivanban;