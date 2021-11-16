let mongoose = require('mongoose');

let bansung = mongoose.Schema({
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

let Bansung = mongoose.model('Bansung', bansung);
module.exports = Bansung;