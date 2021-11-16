let mongoose = require('mongoose');

let hoatdong = mongoose.Schema({
    nam: Number,
    list: [{
        ten: String,
        trichyeu: String,
        create: {
            taikhoan: String,
            time: String
        },
        update: {
            taikhoan: String,
            time: String
        }
    }]
})

let HoatdongTieubieu = mongoose.model('HoatdongTieubieu', hoatdong);
module.exports = HoatdongTieubieu;