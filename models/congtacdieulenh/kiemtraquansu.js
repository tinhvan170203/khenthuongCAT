let mongoose = require('mongoose');

let quansu = mongoose.Schema({
    donviduockiemtra: {
        type: mongoose.Types.ObjectId,
        ref: 'Phong'
    },
    ghichu: String,
    nam: Number,
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

let Quansu = mongoose.model('Quansu', quansu);
module.exports = Quansu;