let mongoose = require('mongoose');

let nhomquyen = mongoose.Schema({
    tennhomquyen: String,
    mota: String,
    quyenList: []
})

let Nhomquyen = mongoose.model('Nhomquyen', nhomquyen);
module.exports = Nhomquyen;