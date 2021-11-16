let mongoose = require('mongoose');

let tinhhuong = mongoose.Schema({
    ten: String,
    create: {
        taikhoan: String,
        time: String
    },
    update: {
        taikhoan: String,
        time: String
    }
})

let Tinhhuong = mongoose.model('Tinhhuong', tinhhuong);
module.exports = Tinhhuong;