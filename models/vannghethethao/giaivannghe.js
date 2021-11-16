let mongoose = require('mongoose');

let giaiVannghe = mongoose.Schema({
    tengiai: String,
    diadiemtochuc: String,
    ngaytochuc: String,
    donvitochuc: String,
    ketqua: String,
    update: {
        taikhoan: String,
        time: String
    },
    create: {
        taikhoan: String,
        time: String
    }
})

let GiaiVannghe = mongoose.model('GiaiVannghe', giaiVannghe);
module.exports = GiaiVannghe;