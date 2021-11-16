let mongoose = require('mongoose');

let thethao = mongoose.Schema({
    monthethao: String,
    create: {
        taikhoan: String,
        time: String
    },
    update: {
        taikhoan: String,
        time: String
    },
    hotList: [{
        nam: Number,
        update: {
            taikhoan: String,
            time: String
        },
        persons: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Person"
        }]
    }]
})

let Thethao = mongoose.model('Thethao', thethao);
module.exports = Thethao;