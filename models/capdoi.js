let mongoose = require('mongoose');
let doi = mongoose.Schema({
    donvicaptren: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Phong"
    },
    ten: String,
    khenthuong: [{
        capkhenthuong: String,
        hinhthuckhenthuong: String,
        loaikhenthuong: String, // 
        soQD: String,
        ngayQD: String,
        noidungkhenthuong: String,
    }]
});

const Doi = mongoose.model('Doi', doi);

module.exports = Doi;