let Chuyenmuc = require('../../models/Congtactuyentruyen/chuyenmuc_tinbai');
let Cuocthi = require('../../models/Congtactuyentruyen/thituyentruyen');
let Phong = require('../../models/capphong');
const moment = require('moment')
moment().format();

module.exports = {
    getChuyenmucPage: async(req, res) => {
        let allRole = req.allRole;
        let user = req.user;
        let list = await Phong.find().sort({ kyhieu: 1 })
        res.render('./congtactuyentruyen/quantrichuyenmuc', { allRole, user, list })
    },
    tableChuyenmucList: async(req, res) => {
        let list = [];
        let chuyenmucList = await Chuyenmuc.find().sort({ tenchuyenmuc: 1 });
        chuyenmucList.map(i => list.push({
            _id: i._id,
            tenchuyenmuc: i.tenchuyenmuc
        }));
        res.send(list)
    },
    addChuyenmuc: async(req, res) => {
        let newChuyenmuc = new Chuyenmuc({
            tenchuyenmuc: req.body.tenchuyenmuc,
            create: {
                taikhoan: req.user,
                time: new Date()
            },
            update: {
                taikhoan: req.user,
                time: new Date()
            }
        });
        await newChuyenmuc.save();
        res.send(newChuyenmuc._id)
    },
    editChuyenmuc: async(req, res) => {
        let idEdit = req.params.id;
        let { tenchuyenmuc } = req.body;
        let chuyenmucEdit = await Chuyenmuc.findById(idEdit);
        chuyenmucEdit.tenchuyenmuc = tenchuyenmuc;
        chuyenmucEdit.update = {
            taikhoan: req.user,
            time: new Date()
        }
        chuyenmucEdit.muctinList.forEach(muctin => {
            muctin.tinbai.forEach(tinbai => {
                tinbai.chuyenmuc = tenchuyenmuc
            })
        });
        await chuyenmucEdit.save();
        res.send('Update thành công...')
    },
    deleteChuyenmuc: async(req, res) => {
        let idDelete = req.params.id;
        await Chuyenmuc.findByIdAndDelete(idDelete);
        res.send('Remove thành công...')
    },
    getMuctinPage: async(req, res) => {
        let user = req.user;
        let allRole = req.allRole;
        let chuyenmucList = await Chuyenmuc.find().sort({ tenchuyenmuc: 1 });
        let list = await Phong.find().sort({ kyhieu: 1 })
        res.render('./congtactuyentruyen/quantrimuctin', { chuyenmucList, user, allRole, list })
    },
    getMuctin: async(req, res) => {
        let id_chuyenmuc = req.params.id;
        let chuyenmuc = await Chuyenmuc.findById(id_chuyenmuc);
        let muctinList = chuyenmuc.muctinList;
        res.send(muctinList)
    },
    addMuctin: async(req, res) => {
        let id_chuyenmuc = req.params.id;
        let chuyenmuc = await Chuyenmuc.findById(id_chuyenmuc);
        chuyenmuc.muctinList.push({
            muctin: req.body.muctin,
            create: {
                taikhoan: req.user,
                time: new Date()
            },
            update: {
                taikhoan: req.user,
                time: new Date()
            }
        });
        await chuyenmuc.save();
        res.send('Thêm mới thành công')
    },
    editMuctin: async(req, res) => {
        let id = req.params.id;
        let id1 = req.params.id1;
        let chuyenmuc = await Chuyenmuc.findById(id);
        let muctinEdit = chuyenmuc.muctinList.find(muctin => { return muctin._id == id1 });
        muctinEdit.muctin = req.body.muctinEdit;
        muctinEdit.update = {
            taikhoan: req.user,
            time: new Date()
        }
        muctinEdit.tinbai.forEach(tinbai => {
            tinbai.muctin = req.body.muctinEdit
        });
        await chuyenmuc.save();
        res.send('Cập nhật thành công')
    },
    deleteMuctin: async(req, res) => {
        let id = req.params.id;
        let id1 = req.params.id1;
        let chuyenmuc = await Chuyenmuc.findById(id);
        let muctinDelete = chuyenmuc.muctinList.find(muctin => { return muctin._id == id1 });
        await muctinDelete.remove()
        await chuyenmuc.save();
        res.send('Xóa thành công')
    },
    getAdminTinbai: async(req, res) => {
        let year = new Date().getFullYear();
        let allRole = req.allRole;
        let user = req.user;
        let chuyenmucList = await Chuyenmuc.find();
        chuyenmucList.forEach(chuyenmuc => {
            let newMuctinList = []; //khai báo mục tin mới, thỏa mãn chưa các tin bài đăng trong năm === year
            let sotinbai = 0;
            chuyenmuc.muctinList.forEach(muctin => {
                muctin.tinbai.sort(function(a, b) {
                    var aa = a.ngaydang.split('-').join(),
                        bb = b.ngaydang.split('-').join();
                    return bb < aa ? -1 : (aa > bb ? 1 : 0);
                });
                let tinbai_inYear = muctin.tinbai.filter(tinbai => { // trả về các tin bài được đăng trong năm year
                    return tinbai.year === year;
                });
                if (tinbai_inYear.length > 0) {
                    sotinbai += tinbai_inYear.length
                    muctin.tinbai = [...tinbai_inYear] //biến đổi mục tin chỉ chứa các tin bài trong năm year
                    newMuctinList.push(muctin) // mục tin mới này sẽ chỉ chứa các mục tin có tin bài thỏa mãn đăng trong năm year
                }
            });
            chuyenmuc.muctinList = [...newMuctinList]; //biến đổi lại muctinList của từng chuyên mục
            chuyenmuc.sotinbai = sotinbai;
        });
        let date = new Date();
        let list = await Phong.find().sort({ kyhieu: 1 })
        let maxDate = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
        res.render('./congtactuyentruyen/quantritinbai', {
            chuyenmucList,
            maxDate,
            year,
            allRole,
            user,
            list
        })

    },
    fetchMuctinList: async(req, res) => {
        let id_chuyenmuc = req.params.id;
        let chuyenmuc = await Chuyenmuc.findById(id_chuyenmuc);
        let muctinList = chuyenmuc.muctinList;
        res.send(muctinList)
    },
    addTinbai: async(req, res) => {
        let id_chuyenmuc = req.params.id1;
        let id_muctin = req.params.id2;
        let chuyenmuc = await Chuyenmuc.findById(id_chuyenmuc);
        let muctin = chuyenmuc.muctinList.find(muctin => muctin._id == id_muctin);
        muctin.tinbai.push({
            tieude: req.body.tieude,
            tacgia: req.body.tacgia,
            donviphoihop: req.body.donviphoihop,
            trichyeunoidung: req.body.trichyeunoidung,
            ngaydang: req.body.ngaydang,
            year: parseInt(req.body.ngaydang.slice(0, 4)),
            month: parseInt(req.body.ngaydang.slice(5, 7)),
            create: {
                taikhoan: req.user,
                time: new Date()
            },
            update: {
                taikhoan: req.user,
                time: new Date()
            },
            muctin: {
                muctin: muctin.muctin,
                id_muctin
            },
            chuyenmuc: {
                chuyenmuc: chuyenmuc.tenchuyenmuc,
                id_chuyenmuc
            }
        });
        await chuyenmuc.save();
        res.send('Thêm tin bài thành công')
    },
    getTinbaiTable: async function(req, res) {
        let year = req.params.year;
        let allTinbai = []
        let chuyenmucList = await Chuyenmuc.find().sort({ tenchuyenmuc: 1 });
        chuyenmucList.forEach(chuyenmuc => {
            chuyenmuc.muctinList.forEach(muctin => {
                muctin.tinbai.sort(function(a, b) {
                    var aa = a.ngaydang.split('-').join(''),
                        bb = b.ngaydang.split('-').join('');
                    return bb < aa ? -1 : (aa > bb ? 1 : 0);
                });
                let tinbai_inYear = muctin.tinbai.filter(tinbai => { // trả về các tin bài được đăng trong năm year
                    return tinbai.year === parseInt(year);
                });
                if (tinbai_inYear.length > 0) {
                    allTinbai = allTinbai.concat(tinbai_inYear)
                }
            });
        });
        res.send(allTinbai)
    },
    editTinbai: async(req, res) => {
        let { id1, id2, id3 } = req.params;
        let {
            tieudeEdit,
            tacgiaEdit,
            trichyeunoidungEdit,
            ngaydangEdit,
            donviphoihopEdit,
            NewIdOfChuyenmuc,
            NewIdOfMuctin
        } = req.body;
        let chuyenmucCurrent = await Chuyenmuc.findById(id1); //chuyên mục chứa tin bài cập nhật
        let muctinCurrent = chuyenmucCurrent.muctinList.find(muctin => { return muctin._id == id2 }); //mục tin chứa tin bài cập nhật
        let indexTinbai = muctinCurrent.tinbai.findIndex(tinbai => tinbai._id == id3); //index tin bài trong array chuyen mục chứa nó
        let tinbaiCurrent = muctinCurrent.tinbai[indexTinbai]; //lấy ra tin bài đó=
        tinbaiCurrent.tieude = tieudeEdit; //cập nhật lại tiêu đề...
        tinbaiCurrent.tacgia = tacgiaEdit;
        tinbaiCurrent.trichyeunoidung = trichyeunoidungEdit;
        tinbaiCurrent.donviphoihop = donviphoihopEdit;
        tinbaiCurrent.ngaydang = ngaydangEdit;
        tinbaiCurrent.update = {
            taikhoan: req.user,
            time: new Date()
        };
        tinbaiCurrent.year = parseInt(req.body.ngaydangEdit.slice(0, 4));
        tinbaiCurrent.month = parseInt(req.body.ngaydangEdit.slice(5, 7));
        if (NewIdOfMuctin != id2) { //nếu thay đổi mục tin thì cần di chuyển tin bài đó đến chuyên mục và mục tin mới
            let newChuyenmuc = await Chuyenmuc.findById(NewIdOfChuyenmuc); //chuyên mục mới
            let newMuctin = newChuyenmuc.muctinList.find(muctin => muctin._id == NewIdOfMuctin); //mục tin mới
            let newTinbai = { //Tạo bản tin bài sao chép
                tieude: tieudeEdit,
                tacgia: tacgiaEdit,
                trichyeunoidung: trichyeunoidungEdit,
                donviphoihop: donviphoihopEdit,
                ngaydang: ngaydangEdit,
                year: parseInt(req.body.ngaydangEdit.slice(0, 4)),
                month: parseInt(req.body.ngaydangEdit.slice(5, 7)),
                muctin: {
                    muctin: newMuctin.muctin,
                    id_muctin: newMuctin._id
                },
                chuyenmuc: {
                    chuyenmuc: newChuyenmuc.tenchuyenmuc,
                    id_chuyenmuc: newChuyenmuc._id
                }
            }
            newMuctin.tinbai.push(newTinbai); // thêm tin bài đó vào mục tin mới, chuyên mục mới
            tinbaiCurrent.remove(); // xóa tin bài ở mục tin cũ đi
            await newChuyenmuc.save(); //lưu lại 
        }
        await chuyenmucCurrent.save(); //lưu lại
        res.send('Cập nhật tin bài thành công')
    },
    deleteTinbai: async(req, res) => {
        let { id1, id2, id3 } = req.params;
        let chuyenmucCurrent = await Chuyenmuc.findById(id1); //chuyên mục chứa tin bài cần delete
        let muctinCurrent = chuyenmucCurrent.muctinList.find(muctin => { return muctin._id == id2 }); //mục tin chứa tin bài cần delete
        await muctinCurrent.tinbai.id(id3).remove();
        await chuyenmucCurrent.save();
        res.send('Delete thành công...')
    },
    // Kết quả các cuộc thi tuyên truyền: 
    getCuocthiPage: async(req, res) => {
        let allRole = req.allRole;
        let user = req.user;
        let year = new Date().getFullYear();
        let date = new Date();
        let maxDate = date.toISOString().slice(0, 10)
        let list = await Phong.find().sort({ kyhieu: 1 })
        res.render('./congtactuyentruyen/quantricuocthi.ejs', {
            year,
            maxDate,
            allRole,
            user,
            list
        })
    },
    addCuocthi: async(req, res) => {
        let { ten, captochuc, trichyeu, ketqua, ngaytochuc, diadiemtochuc } = req.body;
        let newCuocthi = new Cuocthi({
            ten,
            captochuc,
            trichyeu,
            ketqua,
            ngaytochuc,
            year: parseInt(ngaytochuc.slice(0, 4)),
            diadiemtochuc,
            create: {
                taikhoan: req.user,
                time: new Date()
            },
            update: {
                taikhoan: req.user,
                time: new Date()
            }
        })
        await newCuocthi.save()
        res.send('Thêm kết quả cuộc thi thành công...')
    },
    getCuocthiList: async(req, res) => {
        let year = req.params.year;
        let cuocthiList = await Cuocthi.find({ year: parseInt(year) }).sort({ ngaytochuc: -1 });
        res.send(cuocthiList)
    },
    editCuocthi: async(req, res) => {
        let id = req.params.id;
        let { ten, captochuc, trichyeu, ketqua, ngaytochuc, diadiemtochuc } = req.body;
        let item = await Cuocthi.findById(id);
        item.ten = ten;
        item.captochuc = captochuc;
        item.trichyeu = trichyeu;
        item.ketqua = ketqua;
        item.ngaytochuc = ngaytochuc;
        item.diadiemtochuc = diadiemtochuc;
        item.update = {
            taikhoan: req.user,
            time: new Date()
        }
        await item.save()
        res.send('Update thành công')
    },
    deleteCuocthi: async(req, res) => {
        let id = req.params.id;
        await Cuocthi.findByIdAndDelete(id);
        res.send('Xóa thành công...')
    }
}