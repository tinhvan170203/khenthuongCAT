let mongoose = require('mongoose');

let user = mongoose.Schema({
    tentaikhoan: String,
    matkhau: String,
    roles: [{
        type: mongoose.Types.ObjectId,
        ref: "Nhomquyen"
    }],
    chucnangrieng: [],
    trangthai: Boolean
})

let User = mongoose.model('User', user);
module.exports = User;