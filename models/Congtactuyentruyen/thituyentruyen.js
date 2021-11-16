const mongoose = require('mongoose');

const ketquathi = mongoose.Schema({
    ten: String,
    captochuc: String,
    ngaytochuc: String,
    ketqua: String,
    trichyeu: String,
    diadiemtochuc: String,
    year: Number,
    create: {
        taikhoan: String,
        time: String
    },
    update: {
        taikhoan: String,
        time: String
    }
});

const Cuocthi = mongoose.model('Cuocthi', ketquathi);
module.exports = Cuocthi;