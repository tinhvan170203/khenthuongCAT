let mongoose = require('mongoose');

let person = mongoose.Schema({
    hoten: String,
    ngaysinh: String,
    sohieuCAND: String,
    dangvien: String,
    capbac: String,
    chucvu: String,
    img: String,
    vitri: String, // lanh dao phong, chi huy doi, can bo
    donvicongtac: { //Id đội, công an xã công tác
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doi"
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Phong"
    }, //Id của phòng, huyện
    thiduanam: [{
        nam: Number,
        xeploai: String,
        ghichu: String,
        dangkithidua: String,
        dangkixeploaidangvien: String,
        xeploaidangvien: String
    }],
    thiduathang: [{
        nam: Number,
        thang1: {
            flag: String,
            ghichu: String
        },
        thang2: {
            flag: String,
            ghichu: String
        },
        thang3: {
            flag: String,
            ghichu: String
        },
        thang4: {
            flag: String,
            ghichu: String
        },
        thang5: {
            flag: String,
            ghichu: String
        },
        thang6: {
            flag: String,
            ghichu: String
        },
        thang7: {
            flag: String,
            ghichu: String
        },
        thang8: {
            flag: String,
            ghichu: String
        },
        thang9: {
            flag: String,
            ghichu: String
        },
        thang10: {
            flag: String,
            ghichu: String
        },
        thang11: {
            flag: String,
            ghichu: String
        },
        thang12: {
            flag: String,
            ghichu: String
        }
    }],
    khenthuongcanhan: [{
        soQD: String,
        ngayQD: String,
        capkhenthuong: String,
        hinhthuckhenthuong: String,
        loaikhenthuong: String,
        noidungkhenthuong: String
    }],
    kiluatcanhan: [{
        soQD: String,
        ngayQD: String,
        hinhthuckiluat: String,
        noidungkiluat: String
    }]
})
let Person = mongoose.model('Person', person);
module.exports = Person;