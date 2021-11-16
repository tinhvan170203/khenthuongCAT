let mongoose = require('mongoose');
let vanban = mongoose.Schema({
    soVB: String,
    tenVB: String,
    loaiVB: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Loaivanban"
    },
    kyhieuVB: String,
    trichyeu: String,
    nguoiky: String,
    ngaybanhanh: String,
    coquanbanhanh: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coquanbanhanh"
    },
    tep: String
});
const Vanban = mongoose.model('Vanban', vanban);
module.exports = Vanban;