let mongoose = require('mongoose');

let danhsachkhongdat = mongoose.Schema({
    noidungkhongdat: String,
    hotList: [{
        nam: Number,
        persons: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Person"
        }],
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

let badList = mongoose.model('badList', danhsachkhongdat);
module.exports = badList;