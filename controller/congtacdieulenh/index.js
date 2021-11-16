let Phong = require('../../models/capphong');
let Doi = require('../../models/capdoi');
let DieulenhCAT = require('../../models/congtacdieulenh/kiemtradieulenh');
let Tinhhuong = require('../../models/congtacdieulenh/tinhhuong');
let KiemtraTinhhuong = require('../../models/congtacdieulenh/kiemtratinhhuong');
let Theluc = require('../../models/congtacdieulenh/kiemtratheluc');
let Bansung = require('../../models/congtacdieulenh/kiemtrabansung');
let Quansu = require('../../models/congtacdieulenh/kiemtraquansu');
let badList = require('../../models/congtacdieulenh/khongdatList');
const Person = require('../../models/person');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');


module.exports = {
    getDieulenhPage: async(req, res) => {
        let allRole = req.allRole;
        let user = req.user;
        let date = new Date()
        let list = await Phong.find().sort({ kyhieu: 1 })
        let nam = new Date().getFullYear()
        let phongList = await Phong.find().sort({ kyhieu: 1 }) //sắp xếp theo thư tự tăng dần
        let maxDate = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
        res.render('./congtacdieulenh/dieulenh', { maxDate, nam, phongList, allRole, user, list })
    },
    addKetquaKTDieuLenh: async(req, res) => {
        let { thoigian, donviduockiemtra, ketqua, xuli } = req.body;
        let newItem = new DieulenhCAT({
            thoigian,
            donviduockiemtra,
            ketqua,
            xuli,
            tep: req.file.path.slice(39),
            create: {
                taikhoan: req.user,
                time: new Date()
            },
            update: {
                taikhoan: req.user,
                time: new Date()
            }
        })
        await newItem.save()
        res.send('Thêm thành công')
    },
    tableKetquaKTDieulenh: async(req, res) => {
        let nam = req.params.nam;
        let list = await DieulenhCAT.find({ thoigian: { $regex: nam } }); // tìm kiếm thoigian chứa năm
        res.send(list)
    },
    downloadKTDieulenh: async(req, res) => {
        let file = req.params.file;
        let path = './public/Congtacdieulenh/kiemtradieulenh/' + file
        res.download(path, file, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('downloading successful');
            }
        });
    },
    editKetquaKTDieulenh: async(req, res) => {
        let { thoigian_Edit, donviduockiemtra_Edit, ketqua_Edit, xuli_Edit } = req.body;
        let id = req.params.id;
        let item = await DieulenhCAT.findById(id);
        item.thoigian = thoigian_Edit;
        item.donviduockiemtra = donviduockiemtra_Edit;
        item.ketqua = ketqua_Edit;
        item.xuli = xuli_Edit;
        item.update = {
            taikhoan: req.user,
            time: new Date()
        }
        let link_tep_cu = item.tep;
        if (req.file !== undefined) {
            fs.readdirSync(path.join(__dirname, '../../public/Congtacdieulenh/kiemtradieulenh'), 'utf-8').forEach(file => {
                if (file === link_tep_cu) {
                    fs.unlinkSync(path.join(__dirname, '../../public/Congtacdieulenh/kiemtradieulenh/' + link_tep_cu));
                }
            });
            item.tep = req.file.path.slice(39)
        };
        await item.save()
        res.send('Update thành công...')
    },
    deleteKetquaKTDieulenh: async(req, res) => {
        let id = req.params.id;
        let item = await DieulenhCAT.findById(id);
        let link_tep_cu = item.tep;
        fs.readdirSync(path.join(__dirname, '../../public/Congtacdieulenh/kiemtradieulenh'), 'utf-8').forEach(file => {
            if (file === link_tep_cu) {
                fs.unlinkSync(path.join(__dirname, '../../public/Congtacdieulenh/kiemtradieulenh/' + link_tep_cu));
            }
        });
        await item.remove();
        res.send('Delete thành công...')
    },
    getQuantriTinhhuongPage: async(req, res) => {
        let allRole = req.allRole;
        let user = req.user;
        let list = await Phong.find().sort({ kyhieu: 1 })
        res.render('./congtacdieulenh/quantritinhhuonggiadinh', {
            allRole,
            user,
            list
        })
    },
    tableTinhhuong: async(req, res) => {
        let list = await Tinhhuong.find().sort({ ten: 1 });
        res.send(list)
    },
    addTinhhuong: async(req, res) => {
        let newItem = new Tinhhuong({
            ten: req.body.ten,
            create: {
                taikhoan: req.user,
                time: new Date()
            },
            update: {
                taikhoan: req.user,
                time: new Date()
            }
        });
        await newItem.save();
        res.send('ok..')
    },
    editTinhhuong: async(req, res) => {
        let id = req.params.id;
        let item = await Tinhhuong.findById(id);
        item.ten = req.body.ten;
        ite.update = {
            taikhoan: req.user,
            time: new Date()
        }
        await item.save()
        res.send('Update thành công...')
    },
    deleteTinhhuong: async(req, res) => {
        let id = req.params.id;
        await Tinhhuong.findByIdAndDelete(id);
        res.send('Delete thành công...')
    },
    getKiemtraTinhhuongPage: async(req, res) => {
        let allRole = req.allRole;
        let user = req.user;
        let date = new Date()
        let nam = new Date().getFullYear()
        let tinhhuongList = await Tinhhuong.find().sort({ ten: 1 });
        let list = await Phong.find().sort({ kyhieu: 1 })
        let phongList = await Phong.find().sort({ kyhieu: 1 }) //sắp xếp theo thư tự tăng dần
        let maxDate = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
        let doiList = await Doi.find().sort({ donvicaptren: 1 }).populate('donvicaptren')
        res.render('./congtacdieulenh/kiemtratinhhuong', { list, phongList, doiList, maxDate, nam, tinhhuongList, allRole, user })
    },
    tableKiemtraTinhhuong: async(req, res) => {
        let nam = req.params.nam;
        let list = await KiemtraTinhhuong.find({ thoigian: { $regex: nam } }).populate('donviduockiemtra')
            .populate({
                path: 'donviduockiemtra',
                populate: { path: 'donvicaptren' }
            })
            .populate('tinhhuong'); // tìm kiếm thoigian chứa năm
        res.send(list)
    },
    addKetquaKTTinhhuong: async(req, res) => {
        let { thoigian, donviduockiemtra, ketqua, xuli, tinhhuong } = req.body;
        let newItem = new KiemtraTinhhuong({
            thoigian,
            donviduockiemtra,
            ketqua,
            xuli,
            tinhhuong,
            tep: req.file.path.slice(40),
            create: {
                taikhoan: req.user,
                time: new Date()
            },
            update: {
                taikhoan: req.user,
                time: new Date()
            }
        })
        await newItem.save()
        res.send('Thêm thành công')
    },
    downloadKTTinhhuong: async(req, res) => {
        let file = req.params.file;
        let path = './public/Congtacdieulenh/kiemtratinhhuong/' + file
        res.download(path, file, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('downloading successful');
            }
        });
    },
    editKetquaKTTinhhuong: async(req, res) => {
        let { thoigian_Edit, donviduockiemtra_Edit, ketqua_Edit, xuli_Edit, tinhhuong_Edit } = req.body;
        let id = req.params.id;
        let item = await KiemtraTinhhuong.findById(id);
        item.thoigian = thoigian_Edit;
        item.donviduockiemtra = donviduockiemtra_Edit;
        item.ketqua = ketqua_Edit;
        item.tinhhuong = tinhhuong_Edit;
        item.xuli = xuli_Edit;
        item.update = {
            taikhoan: req.user,
            time: new Date()
        }
        let link_tep_cu = item.tep;
        if (req.file !== undefined) {
            fs.readdirSync(path.join(__dirname, '../../public/Congtacdieulenh/kiemtratinhhuong'), 'utf-8').forEach(file => {
                if (file === link_tep_cu) {
                    fs.unlinkSync(path.join(__dirname, '../../public/Congtacdieulenh/kiemtratinhhuong/' + link_tep_cu));
                }
            });
            item.tep = req.file.path.slice(40)
        };
        await item.save()
        res.send('Update thành công...')
    },
    deleteKetquaKTTinhhuong: async(req, res) => {
        let id = req.params.id;
        let item = await KiemtraTinhhuong.findById(id);
        let link_tep_cu = item.tep;
        fs.readdirSync(path.join(__dirname, '../../public/Congtacdieulenh/kiemtratinhhuong'), 'utf-8').forEach(file => {
            if (file === link_tep_cu) {
                fs.unlinkSync(path.join(__dirname, '../../public/Congtacdieulenh/kiemtratinhhuong/' + link_tep_cu));
            }
        });
        await item.remove();
        res.send('Delete thành công...')
    },
    getChiensikhoePage: async(req, res) => {
        let allRole = req.allRole;
        let user = req.user;
        let list = await Phong.find().sort({ kyhieu: 1 })
        let nam = new Date().getFullYear();
        let phongList = await Phong.find().sort({ kyhieu: 1 }) //sắp xếp theo thư tự tăng dần
        res.render('./congtacdieulenh/chiensikhoe', { nam, phongList, allRole, user, list })
    },
    addKTTheluc: async(req, res) => {
        let nam = parseInt(req.params.nam);
        let { donviduockiemtra, ghichu } = req.body;
        let newItem = new Theluc({
            nam,
            donviduockiemtra,
            ghichu,
            tep: req.file.path.slice(37)
        })
        await newItem.save()
        res.send('Thêm thành công')
    },
    tableTheluc: async(req, res) => {
        let nam = parseInt(req.params.nam);
        let list = await Theluc.find({ nam: nam }).populate('donviduockiemtra');
        res.send(list)
    },
    downloadKTTheluc: async(req, res) => {
        let file = req.params.file;
        let path = './public/Congtacdieulenh/kiemtratheluc/' + file
        res.download(path, file, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('downloading successful');
            }
        });
    },
    editKetquaKTTheluc: async(req, res) => {
        let { donviduockiemtra_Edit, ghichu_Edit } = req.body;
        let id = req.params.id;
        let item = await Theluc.findById(id);
        item.donviduockiemtra = donviduockiemtra_Edit;
        item.ghichu = ghichu_Edit;
        let link_tep_cu = item.tep;
        if (req.file !== undefined) {
            fs.readdirSync(path.join(__dirname, '../../public/Congtacdieulenh/kiemtratheluc'), 'utf-8').forEach(file => {
                if (file === link_tep_cu) {
                    fs.unlinkSync(path.join(__dirname, '../../public/Congtacdieulenh/kiemtratheluc/' + link_tep_cu));
                }
            });
            item.tep = req.file.path.slice(37)
        };
        await item.save()
        res.send('Update thành công...')
    },
    deleteKetquaKTTheluc: async(req, res) => {
        let id = req.params.id;
        let item = await Theluc.findById(id);
        let link_tep_cu = item.tep;
        fs.readdirSync(path.join(__dirname, '../../public/Congtacdieulenh/kiemtratheluc'), 'utf-8').forEach(file => {
            if (file === link_tep_cu) {
                fs.unlinkSync(path.join(__dirname, '../../public/Congtacdieulenh/kiemtratheluc/' + link_tep_cu));
            }
        });
        await item.remove();
        res.send('Delete thành công...')
    },
    // Quản trị bắn súng
    getBansungPage: async(req, res) => {
        let allRole = req.allRole;
        let user = req.user;
        let nam = new Date().getFullYear();
        let list = await Phong.find().sort({ kyhieu: 1 })
        let phongList = await Phong.find().sort({ kyhieu: 1 }) //sắp xếp theo thư tự tăng dần
        res.render('./congtacdieulenh/kiemtrabansung', { nam, phongList, allRole, user, list })
    },
    addKTBansung: async(req, res) => {
        let nam = parseInt(req.params.nam);
        let { donviduockiemtra, ghichu } = req.body;
        let newItem = new Bansung({
            nam,
            donviduockiemtra,
            ghichu,
            tep: req.file.path.slice(38),
            create: {
                taikhoan: req.user,
                time: new Date()
            },
            update: {
                taikhoan: req.user,
                time: new Date()
            },
        })
        await newItem.save()
        res.send('Thêm thành công')
    },
    tableBansung: async(req, res) => {
        let nam = parseInt(req.params.nam);
        let list = await Bansung.find({ nam: nam }).populate('donviduockiemtra');
        res.send(list)
    },
    downloadKTBansung: async(req, res) => {
        let file = req.params.file;
        let path = './public/Congtacdieulenh/kiemtrabansung/' + file
        res.download(path, file, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('downloading successful');
            }
        });
    },
    editKetquaKTBansung: async(req, res) => {
        let { donviduockiemtra_Edit, ghichu_Edit } = req.body;
        let id = req.params.id;
        let item = await Bansung.findById(id);
        item.donviduockiemtra = donviduockiemtra_Edit;
        item.ghichu = ghichu_Edit;
        item.update = {
            taikhoan: req.user,
            time: new Date()
        }
        let link_tep_cu = item.tep;
        if (req.file !== undefined) {
            fs.readdirSync(path.join(__dirname, '../../public/Congtacdieulenh/kiemtrabansung'), 'utf-8').forEach(file => {
                if (file === link_tep_cu) {
                    fs.unlinkSync(path.join(__dirname, '../../public/Congtacdieulenh/kiemtrabansung/' + link_tep_cu));
                }
            });
            item.tep = req.file.path.slice(37)
        };
        await item.save()
        res.send('Update thành công...')
    },
    deleteKetquaKTBansung: async(req, res) => {
        let id = req.params.id;
        let item = await Bansung.findById(id);
        let link_tep_cu = item.tep;
        fs.readdirSync(path.join(__dirname, '../../public/Congtacdieulenh/kiemtrabansung'), 'utf-8').forEach(file => {
            if (file === link_tep_cu) {
                fs.unlinkSync(path.join(__dirname, '../../public/Congtacdieulenh/kiemtrabansung/' + link_tep_cu));
            }
        });
        await item.remove();
        res.send('Delete thành công...')
    },

    // Quản trị quân sự, võ thuật 

    getQuansuPage: async(req, res) => {
        let allRole = req.allRole;
        let user = req.user;
        let nam = new Date().getFullYear();
        let list = await Phong.find().sort({ kyhieu: 1 })
        let phongList = await Phong.find().sort({ kyhieu: 1 }) //sắp xếp theo thư tự tăng dần
        res.render('./congtacdieulenh/kiemtraquansu', { nam, phongList, allRole, user, list })
    },
    addKTQuansu: async(req, res) => {
        let nam = parseInt(req.params.nam);
        let { donviduockiemtra, ghichu } = req.body;
        let newItem = new Quansu({
            nam,
            donviduockiemtra,
            ghichu,
            tep: req.file.path.slice(37),
            create: {
                taikhoan: req.user,
                time: new Date()
            },
            update: {
                taikhoan: req.user,
                time: new Date()
            }
        })
        await newItem.save()
        res.send('Thêm thành công')
    },
    tableQuansu: async(req, res) => {
        let nam = parseInt(req.params.nam);
        let list = await Quansu.find({ nam: nam }).populate('donviduockiemtra');
        res.send(list)
    },
    downloadKTQuansu: async(req, res) => {
        let file = req.params.file;
        let path = './public/Congtacdieulenh/kiemtraquansu/' + file
        res.download(path, file, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('downloading successful');
            }
        });
    },
    editKetquaKTQuansu: async(req, res) => {
        let { donviduockiemtra_Edit, ghichu_Edit } = req.body;
        let id = req.params.id;
        let item = await Quansu.findById(id);
        item.donviduockiemtra = donviduockiemtra_Edit;
        item.ghichu = ghichu_Edit;
        item.update = {
            taikhoan: req.user,
            time: new Date()
        }
        let link_tep_cu = item.tep;
        if (req.file !== undefined) {
            fs.readdirSync(path.join(__dirname, '../../public/Congtacdieulenh/kiemtraquansu'), 'utf-8').forEach(file => {
                if (file === link_tep_cu) {
                    fs.unlinkSync(path.join(__dirname, '../../public/Congtacdieulenh/kiemtraquansu/' + link_tep_cu));
                }
            });
            item.tep = req.file.path.slice(37)
        };
        await item.save()
        res.send('Update thành công...')
    },
    deleteKetquaKTQuansu: async(req, res) => {
        let id = req.params.id;
        let item = await Quansu.findById(id);
        let link_tep_cu = item.tep;
        fs.readdirSync(path.join(__dirname, '../../public/Congtacdieulenh/kiemtraquansu'), 'utf-8').forEach(file => {
            if (file === link_tep_cu) {
                fs.unlinkSync(path.join(__dirname, '../../public/Congtacdieulenh/kiemtraquansu/' + link_tep_cu));
            }
        });
        await item.remove();
        res.send('Delete thành công...')
    },

    //dùng chung cho cả danh sách k đạt thể lực, bắn đạn thật, và kiểm tra điều lệnh quân sự võ thuật
    //dùng cả cho thể lực, bắn đạn thật và võ thuật
    tableThelucKhongdat: async(req, res) => {
        let nam = parseInt(req.params.nam);
        let noidungkhongdat = req.params.noidungkhongdat;
        let noidungList = await badList.findOne({ noidungkhongdat: noidungkhongdat });
        let list = [];
        if (noidungList === null) {
            return res.send([])
        }
        let item = noidungList.hotList.find(i => i.nam === nam);
        if (item === undefined) {
            return res.send([])
        };
        let personList = item.persons;
        for (let i of personList) {
            let canbo = await Person.findById(i)
                .populate('donvicongtac', { ten: 1 })
                .populate('room', { kyhieu: 1 });
            list.push(canbo)
        };
        res.send(list)
    },
    tableCanboOfDonvi: async(req, res) => {
        let list = await Person.find({}, { hoten: 1, capbac: 1, chucvu: 1, donvicongtac: 1, room: 1 }).sort({ donvicongtac: 1 })
            .populate('room', { kyhieu: 1 }).populate('donvicongtac', { ten: 1 });
        res.send(list)
    },
    updateKhongdatList: async(req, res) => {
        let arr = JSON.parse(req.body.arr);
        let noidungkhongdat = req.params.noidungkhongdat;
        let nam = parseInt(req.params.nam);
        let item = await badList.findOne({ noidungkhongdat });
        if (item === null) {
            let newItem = new badList({
                noidungkhongdat,
                create: {
                    taikhoan: req.user,
                    time: new Date()
                },
                update: {
                    taikhoan: req.user,
                    time: new Date()
                },
                hotList: [{
                    nam: nam,
                    persons: arr
                }]
            });
            await newItem.save();
        } else {
            let checkedNam = item.hotList.find(i => i.nam === nam);
            if (checkedNam === undefined) {
                item.hotList.push({
                    nam: nam,
                    create: {
                        taikhoan: req.user,
                        time: new Date()
                    },
                    update: {
                        taikhoan: req.user,
                        time: new Date()
                    },
                    persons: arr
                })
            } else {
                let oldList = checkedNam.persons.map(i => i.toString()); // biến từ ObjId thành String.prototype
                let newList = Array.from(new Set([...oldList, ...arr])); //Gộp 2 mảng loại bỏ phần tử giống nhau 
                checkedNam.persons = newList;
                checkedNam.update = {
                    taikhoan: req.user,
                    time: new Date()
                }
            };
            await item.save()
        }
        res.send('update thành công danh sách k đạt')
    },
    deleteKhongdatList: async(req, res) => {
        let noidungkhongdat = req.params.noidungkhongdat;
        let id1 = req.params.id1;
        let nam = parseInt(req.params.nam);
        let item = await badList.findOne({ noidungkhongdat });
        let checkedNam = item.hotList.find(i => i.nam === nam);
        let oldList = checkedNam.persons.map(i => i.toString()); // biến từ ObjId thành String.prototype
        let x = oldList.filter(i => i !== id1); //trả về array k chứa id1
        checkedNam.persons = x;
        checkedNam.update = {
            taikhoan: req.user,
            time: new Date()
        }
        await item.save();
        res.send('Xóa thành công')
    },
}