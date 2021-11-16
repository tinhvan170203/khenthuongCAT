let mongoose = require('mongoose');

let vannghe = mongoose.Schema({
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

let Vannghe = mongoose.model('Vannghe', vannghe);
module.exports = Vannghe;