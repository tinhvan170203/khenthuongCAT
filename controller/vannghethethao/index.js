const MohinhVNTT = require('../../models/vannghethethao/mohinhVNTT');
const GiaiThethao = require('../../models/vannghethethao/giaithethao');
const GiaiVannghe = require('../../models/vannghethethao/giaivannghe');
const Thethao = require('../../models/vannghethethao/thethao');
const Vannghe = require('../../models/vannghethethao/vannghe');
const HoatdongTieubieu = require('../../models/vannghethethao/hoatdongtieubieu');
const Person = require('../../models/person');
const Phong = require('../../models/capphong');
const sharp = require('sharp');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

module.exports = {
    getMohinhPage: async(req, res) => {
        let allRole = req.allRole;
        let user = req.user;
        let list = await Phong.find().sort({ kyhieu: 1 })
        res.render('./vannghethethao/mohinhtieubieu.ejs', { allRole, user, list })
    },
    addMohinh: async(req, res) => {
        let { mohinh, trangthai } = req.body;
        let all = await MohinhVNTT.find();
        let newMohinh = new MohinhVNTT({
            mohinh,
            trangthai: trangthai == "true" ? true : false,
            index: all.length + 1,
            img: req.file.path.slice(22),
            create: {
                taikhoan: req.user,
                time: new Date()
            },
            update: {
                taikhoan: req.user,
                time: new Date()
            }
        });
        let filename = req.file.path.slice(22)
        await sharp('./public/Vannghethethao/' + filename).resize(150, 100, {
            fit: 'fill'
        }).toFile("./public/Vannghethethao/thumnail/" + filename); // đường dẫn tính từ tệp app.js
        newMohinh.save();
        res.send(newMohinh)
    },
    getImg: async(req, res) => {
        let imgs = await MohinhVNTT.find().sort({ index: 1 })
        res.send(imgs)
    },
    changeTrangthai: async(req, res) => {
        let id = req.params.id;
        let mohinh = await MohinhVNTT.findById({ _id: id });
        mohinh.trangthai = !mohinh.trangthai;
        await mohinh.save();
        res.send('Successly!')
    },
    editMohinh: async(req, res) => {
        let id = req.params.id;
        let { mohinh, trangthai } = req.body
        let mohinhEdit = await MohinhVNTT.findById(id);
        mohinhEdit.mohinh = mohinh;
        mohinhEdit.trangthai = trangthai === "true" ? true : false;
        mohinhEdit.update = {
            taikhoan: req.user,
            time: new Date()
        };
        if (req.file !== undefined) {
            let imgLink = mohinhEdit.img;
            let filename = req.file.path.slice(22);
            fs.readdirSync(path.join(__dirname, '../../public/Vannghethethao/'), 'utf-8').forEach(file => {
                if (file === imgLink) {
                    fs.unlinkSync(path.join(__dirname, '../../public/Vannghethethao/' + imgLink));
                }
            });
            fs.readdirSync(path.join(__dirname, '../../public/Vannghethethao/thumnail'), 'utf-8').forEach(file => {
                if (file === imgLink) {
                    fs.unlinkSync(path.join(__dirname, '../../public/Vannghethethao/thumnail/' + imgLink));
                }
            });
            await sharp('./public/Vannghethethao/' + filename).resize(150, 100, {
                fit: 'fill'
            }).toFile("./public/Vannghethethao/thumnail/" + filename); // đường dẫn tính từ tệp app.js
            mohinhEdit.img = req.file.path.slice(22);
        }
        await mohinhEdit.save();
        res.send(mohinhEdit)
    },
    deleteMohinh: async(req, res) => {
        let id = req.params.id;
        let mohinhDelete = await MohinhVNTT.findById(id);
        imgLink = mohinhDelete.img;
        fs.readdirSync(path.join(__dirname, '../../public/Vannghethethao/'), 'utf-8').forEach(file => {
            if (file === imgLink) {
                fs.unlinkSync(path.join(__dirname, '../../public/Vannghethethao/' + imgLink));
            }
        });
        fs.readdirSync(path.join(__dirname, '../../public/Vannghethethao/thumnail'), 'utf-8').forEach(file => {
            if (file === imgLink) {
                fs.unlinkSync(path.join(__dirname, '../../public/Vannghethethao/thumnail/' + imgLink));
            }
        });
        await mohinhDelete.remove();
        res.send('Xóa thành công...')
    },
    sortTT: async(req, res) => {
        let data = JSON.parse(req.body.data);
        for (i of data) {
            await MohinhVNTT.findByIdAndUpdate(i.id, { index: i.index })
        };
        res.send('Lưu trạng thái thành công')
    },
    thethaoPage: async(req, res) => {
        let allRole = req.allRole;
        let user = req.user;
        let list = await Phong.find().sort({ kyhieu: 1 })
        let date = new Date()
        let maxDate = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
        res.render('./vannghethethao/giaithethao', { maxDate, allRole, user, list })
    },
    tableGiaithethao: async(req, res) => {
        let list = await GiaiThethao.find()
        let giaiThethaoList = list.sort(function(a, b) {
            var aa = a.ngaytochuc.split('-').join(),
                bb = b.ngaytochuc.split('-').join();
            return bb < aa ? -1 : (aa > bb ? 1 : 0);
        });
        res.send(giaiThethaoList)
    },
    addGiaiThethao: async(req, res) => {
        let {
            tengiai,
            ngaytochuc,
            donvitochuc,
            ketqua,
            diadiemtochuc
        } = req.body;
        let newKetqua = new GiaiThethao({
            tengiai,
            ngaytochuc,
            donvitochuc,
            ketqua,
            diadiemtochuc,
            create: {
                taikhoan: req.user,
                time: new Date()
            },
            update: {
                taikhoan: req.user,
                time: new Date()
            }
        });
        await newKetqua.save();
        res.send('Thêm thành công...')
    },
    editGiaiThethao: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let {
            tengiai,
            ngaytochuc,
            donvitochuc,
            ketqua,
            diadiemtochuc
        } = req.body;
        let item = await GiaiThethao.findById(id);
        item.tengiai = tengiai;
        item.ngaytochuc = ngaytochuc;
        item.donvitochuc = donvitochuc;
        item.diadiemtochuc = diadiemtochuc;
        item.ketqua = ketqua;
        item.update = {
            taikhoan: req.user,
            time: new Date()
        }
        await item.save()
        res.send('Cập nhật thành công...')
    },
    deleteGiaiThethao: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        await GiaiThethao.findByIdAndDelete(id);
        res.send('Xóa thành công...')
    },
    tableThethaoList: async(req, res) => {
        let thethaoList = await Thethao.find();
        let list = thethaoList.map(i => { return { id: i._id, monthethao: i.monthethao } })
        res.send(list)
    },
    addMonThethao: async(req, res) => {
        let newSport = new Thethao({
            monthethao: req.body.monthethao,
            update: {
                taikhoan: req.user,
                time: new Date()
            },
            create: {
                taikhoan: req.user,
                time: new Date()
            }
        });
        await newSport.save()
        res.send('Thêm thành công...')
    },
    editMonThethao: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let i = await Thethao.findById(id);
        i.monthethao = req.body.monthethao;
        i.update = {
            taikhoan: req.user,
            time: new Date()
        }
        i.save();
        res.send('update thành công..')
    },
    deleteMonThethao: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        await Thethao.findByIdAndDelete(id);
        res.send('Xóa môn thể thao thành công..')
    },
    tableTieubieu: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let nam = parseInt(req.params.nam);
        let list = [];
        let monthethao = await Thethao.findById(id);
        let checkedNam = monthethao.hotList.find(i => i.nam === nam);
        if (checkedNam === undefined) {
            return res.send([])
        } else {
            if (checkedNam.persons.length > 0) {
                for (i of checkedNam.persons) {
                    let canbo = await Person.findById(i)
                        .populate('donvicongtac')
                        .populate('room');
                    list.push(canbo)
                }
            }
        }
        res.send(list)
    },
    updateTieubieuList: async(req, res) => {
        let arr = JSON.parse(req.body.arr);
        let id = mongoose.Types.ObjectId(req.params.id);
        let nam = parseInt(req.params.nam);
        let monthethao = await Thethao.findById(id);
        let checkedNam = monthethao.hotList.find(i => i.nam === nam);
        if (checkedNam === undefined) {
            monthethao.hotList.push({
                nam: nam,
                persons: arr,
                update: {
                    taikhoan: req.user,
                    time: new Date()
                }
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
        await monthethao.save()
        res.send('update thành công cá nhân thể thao tiêu biểu')
    },
    getAllCanbo: async(req, res) => {
        let allCB = await Person.find().sort({ room: 1 }).sort({ hoten: 1 }).populate('donvicongtac')
            .populate('room');
        let data = [];
        for (i of allCB) {
            data.push({ _id: i._id, hoten: i.hoten, capbac: i.capbac, chucvu: i.chucvu, room: i.room.kyhieu })
        }
        res.send(data)
    },
    deleteCanhanTieubieu: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let id1 = req.params.id1;
        let nam = parseInt(req.params.nam);
        let monthethao = await Thethao.findById(id);
        let checkedNam = monthethao.hotList.find(i => i.nam === nam);
        let oldList = checkedNam.persons.map(i => i.toString()); // biến từ ObjId thành String.prototype
        let x = oldList.filter(i => i !== id1); //trả về array k chứa id1
        checkedNam.persons = x;
        await monthethao.save();
        res.send('Xóa cá nhân tiêu biểu thành công')
    },
    // hoạt động văn nghệ 
    vannghePage: async(req, res) => {
        let allRole = req.allRole;
        let user = req.user;
        let list = await Phong.find().sort({ kyhieu: 1 })
        let date = new Date();
        let maxDate = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
        res.render('./vannghethethao/quantrivannghe', { maxDate, allRole, user, list })
    },
    tableGiaiVannghe: async(req, res) => {
        let list = await GiaiVannghe.find()
        let giaiVanngheList = list.sort(function(a, b) {
            var aa = a.ngaytochuc.split('-').join(),
                bb = b.ngaytochuc.split('-').join();
            return bb < aa ? -1 : (aa > bb ? 1 : 0);
        });
        res.send(giaiVanngheList)
    },
    addGiaiVannghe: async(req, res) => {
        let {
            tengiai,
            ngaytochuc,
            donvitochuc,
            ketqua,
            diadiemtochuc,
        } = req.body;
        let newKetqua = new GiaiVannghe({
            tengiai,
            ngaytochuc,
            donvitochuc,
            ketqua,
            diadiemtochuc,
            update: {
                taikhoan: req.user,
                time: new Date()
            },
            create: {
                taikhoan: req.user,
                time: new Date()
            }
        });
        await newKetqua.save();
        res.send('Thêm thành công...')
    },
    editGiaiVannghe: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let {
            tengiai,
            ngaytochuc,
            donvitochuc,
            ketqua,
            diadiemtochuc
        } = req.body;
        let item = await GiaiVannghe.findById(id);
        item.tengiai = tengiai;
        item.ngaytochuc = ngaytochuc;
        item.donvitochuc = donvitochuc;
        item.diadiemtochuc = diadiemtochuc;
        item.ketqua = ketqua;
        item.update = {
            taikhoan: req.user,
            time: new Date()
        }
        await item.save()
        res.send('Cập nhật thành công...')
    },
    deleteGiaiVannghe: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        await GiaiVannghe.findByIdAndDelete(id);
        res.send('Xóa thành công...')
    },
    tableThethaoList: async(req, res) => {
        let thethaoList = await Thethao.find();
        let list = thethaoList.map(i => { return { id: i._id, monthethao: i.monthethao } })
        res.send(list)
    },
    // quản trị môn thể thao  
    tableVanngheList: async(req, res) => {
        let vanngheList = await Vannghe.find();
        let list = vanngheList.map(i => { return { id: i._id, monthethao: i.monthethao } })
        res.send(list)
    },
    addLoaiVannghe: async(req, res) => {
        let newSport = new Vannghe({
            monthethao: req.body.monthethao,
            update: {
                taikhoan: req.user,
                time: new Date()
            },
            create: {
                taikhoan: req.user,
                time: new Date()
            }
        });
        await newSport.save()
        res.send('Thêm thành công...')
    },
    editLoaiVannghe: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let i = await Vannghe.findById(id);
        i.monthethao = req.body.monthethao;
        i.update = {
            taikhoan: req.user,
            time: new Date()
        }
        i.save();
        res.send('update thành công..')
    },
    deleteLoaiVannghe: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        await Vannghe.findByIdAndDelete(id);
        res.send('Xóa môn thể thao thành công..')
    },
    tableVanngheTieubieu: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let nam = parseInt(req.params.nam);
        let list = [];
        let monthethao = await Vannghe.findById(id);
        let checkedNam = monthethao.hotList.find(i => i.nam === nam);
        if (checkedNam === undefined) {
            return res.send([])
        } else {
            if (checkedNam.persons.length > 0) {
                for (i of checkedNam.persons) {
                    let canbo = await Person.findById(i)
                        .populate('donvicongtac')
                        .populate('room');
                    list.push(canbo)
                }
            }
        }
        res.send(list)
    },
    updateVanngheTieubieuList: async(req, res) => {
        let arr = JSON.parse(req.body.arr);
        let id = mongoose.Types.ObjectId(req.params.id);
        let nam = parseInt(req.params.nam);
        let monthethao = await Vannghe.findById(id);
        let checkedNam = monthethao.hotList.find(i => i.nam === nam);
        if (checkedNam === undefined) {
            monthethao.hotList.push({
                nam: nam,
                persons: arr,
                update: {
                    taikhoan: req.user,
                    time: new Date()
                }
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
        await monthethao.save()
        res.send('update thành công cá nhân thể thao tiêu biểu')
    },
    deleteVanngheCanhanTieubieu: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let id1 = req.params.id1;
        let nam = parseInt(req.params.nam);
        let monthethao = await Vannghe.findById(id);
        let checkedNam = monthethao.hotList.find(i => i.nam === nam);
        let oldList = checkedNam.persons.map(i => i.toString()); // biến từ ObjId thành String.prototype
        let x = oldList.filter(i => i !== id1); //trả về array k chứa id1
        checkedNam.persons = x;
        await monthethao.save();
        res.send('Xóa cá nhân tiêu biểu thành công')
    },
    hoatdongTieubieuPage: async(req, res) => {
        let allRole = req.allRole;
        let user = req.user;
        let nam = new Date().getFullYear();
        let list = await Phong.find().sort({ kyhieu: 1 })
        res.render('./vannghethethao/hoatdongtieubieu', { nam, allRole, user, list })
    },
    addHoatdong: async(req, res) => {
        let nam = parseInt(req.params.nam);
        let checkNam = await HoatdongTieubieu.findOne({ nam: nam });
        if (checkNam === null) {
            let newItem = new HoatdongTieubieu({
                nam: nam,
                list: [{
                    ten: req.body.ten,
                    trichyeu: req.body.trichyeu,
                    create: {
                        taikhoan: req.user,
                        time: new Date()
                    },
                    update: {
                        taikhoan: req.user,
                        time: new Date()
                    }
                }]
            });
            await newItem.save()
        } else {
            checkNam.list.push({
                ten: req.body.ten,
                trichyeu: req.body.trichyeu,
                create: {
                    taikhoan: req.user,
                    time: new Date()
                },
                update: {
                    taikhoan: req.user,
                    time: new Date()
                }
            });
            await checkNam.save()
        }
        res.send('Thêm họa động thành công...')
    },
    tableHoatdongTieubieu: async(req, res) => {
        let nam = parseInt(req.params.nam);
        let checkNam = await HoatdongTieubieu.findOne({ nam: nam });
        if (checkNam === null) {
            return res.send([])
        } else {
            let data = checkNam.list;
            res.send(data)
        }
    },
    editHoatdong: async(req, res) => {
        let nam = parseInt(req.params.nam);
        let checkNam = await HoatdongTieubieu.findOne({ nam: nam });
        let id1 = req.params.id1;
        let item = checkNam.list.find(i => i._id == id1);
        item.ten = req.body.ten;
        item.trichyeu = req.body.trichyeu;
        item.update = {
            taikhoan: req.user,
            time: new Date()
        }
        await checkNam.save()
        res.send('Cập nhật thành công...')
    },
    deleteHoatdong: async(req, res) => {
        let nam = parseInt(req.params.nam);
        let checkNam = await HoatdongTieubieu.findOne({ nam: nam });
        let id1 = req.params.id1;
        let item = checkNam.list.find(i => i._id == id1);
        item.remove()
        await checkNam.save()
        res.send('Xóa thành công...')
    }
}