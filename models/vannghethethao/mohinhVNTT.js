let mongoose = require('mongoose');

let mohinh = mongoose.Schema({
    mohinh: String,
    img: String,
    index: Number,
    trangthai: Boolean,
    create: {
        taikhoan: String,
        time: String
    },
    update: {
        taikhoan: String,
        time: String
    }
})

let MohinhVNTT = mongoose.model('MohinhVNTT', mohinh);
module.exports = MohinhVNTT;