let mongoose = require('mongoose');

let giaithethao = mongoose.Schema({
    tengiai: String,
    diadiemtochuc: String,
    ngaytochuc: String,
    donvitochuc: String,
    ketqua: String,
    create: {
        taikhoan: String,
        time: String
    },
    update: {
        taikhoan: String,
        time: String
    }
})

let GiaiThethao = mongoose.model('GiaiThethao', giaithethao);
module.exports = GiaiThethao;