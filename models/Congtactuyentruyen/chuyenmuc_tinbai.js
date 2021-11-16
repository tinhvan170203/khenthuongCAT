let mongoose = require('mongoose');
let chuyenmuc_tinbai = mongoose.Schema({
    tenchuyenmuc: String,
    create: {
        taikhoan: String,
        time: String
    },
    update: {
        taikhoan: String,
        time: String
    },
    muctinList: [{
        muctin: String,
        create: {
            taikhoan: String,
            time: String
        },
        update: {
            taikhoan: String,
            time: String
        },
        tinbai: [{
            tieude: String,
            trichyeunoidung: String,
            tacgia: String,
            donviphoihop: String,
            ngaydang: String,
            month: Number,
            year: Number,
            create: {
                taikhoan: String,
                time: String
            },
            update: {
                taikhoan: String,
                time: String
            },
            muctin: {
                muctin: String,
                id_muctin: String
            },
            chuyenmuc: {
                chuyenmuc: String,
                id_chuyenmuc: String
            }
        }]
    }]
});
let Chuyenmuc = mongoose.model('Chuyenmuc', chuyenmuc_tinbai);
module.exports = Chuyenmuc;