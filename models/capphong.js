let mongoose = require('mongoose');
let phong = mongoose.Schema({
    kyhieu: String,
    ten: String,
    khoi: String,
    khenthuong: [{
        capkhenthuong: String,
        hinhthuckhenthuong: String,
        loaikhenthuong: String, // 
        soQD: String,
        ngayQD: String,
        noidungkhenthuong: String,
    }],
    thiduanam: [{
        nam: Number,
        xeploai: String,
        ghichu: String
    }]

});

const Phong = mongoose.model('Phong', phong);

module.exports = Phong;