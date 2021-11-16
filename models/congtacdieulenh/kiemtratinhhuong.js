let mongoose = require('mongoose');

let kiemtratinhhuong = mongoose.Schema({
    thoigian: String,
    tinhhuong: {
        type: mongoose.Types.ObjectId,
        ref: 'Tinhhuong'
    },
    donviduockiemtra: {
        type: mongoose.Types.ObjectId,
        ref: 'Doi'
    },
    ketqua: String,
    xuli: String,
    tep: String,
    create: {
        taikhoan: String,
        time: String
    },
    update: {
        taikhoan: String,
        time: String
    }
})

let KiemtraTinhhuong = mongoose.model('KiemtraTinhhuong', kiemtratinhhuong);
module.exports = KiemtraTinhhuong;