let mongoose = require('mongoose');

let dieulenh = mongoose.Schema({
    thoigian: String,
    donviduockiemtra: String,
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

let DieulenhCAT = mongoose.model('DieulenhCAT', dieulenh);
module.exports = DieulenhCAT;