let mongoose = require('mongoose');

let theluc = mongoose.Schema({
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

let Theluc = mongoose.model('Theluc', theluc);
module.exports = Theluc;