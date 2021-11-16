let Phong = require('../../models/capphong');
let Doi = require('../../models/capdoi');
const Thethao = require('../../models/vannghethethao/thethao');
const Vannghe = require('../../models/vannghethethao/vannghe');
let badList = require('../../models/congtacdieulenh/khongdatList');
let Person = require('../../models/person');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs')
let mongoose = require('mongoose')
module.exports = {
    getPhongPage: async(req, res) => {
        let allRole = req.allRole;
        let user = req.user;
        let list = await Phong.find().sort({ kyhieu: 1 })
        let year = parseInt(new Date().getFullYear());
        res.render('./admin/phongbase.ejs', {
            year,
            allRole,
            user,
            list
        })
    },
    add: async(req, res) => {
        let { ten, kyhieu, khoi } = req.body;
        let phong = new Phong({
            ten,
            kyhieu,
            khoi
        });
        phong.save();
        res.send('Ok')
    },
    getPhong: async(req, res) => {
        let phongList = await Phong.find().sort({
            khoi: 1
        });
        res.send(phongList)
    },
    edit: async(req, res) => {
        let { ten, kyhieu, khoi } = req.body;
        await Phong.findByIdAndUpdate(req.params.id, {
            ten,
            khoi,
            kyhieu
        });
        res.send('Update thành công...')
    },
    delete: async(req, res) => {
        let id = req.params.id;
        await Phong.findByIdAndDelete(id)
        res.send('Xóa thành công...')
    },
    //chi tiết cấp phòng
    getDetailPhongPage: async(req, res) => {
        let allRole = req.allRole;
        let user = req.user;
        let date = new Date();
        let list = await Phong.find().sort({ kyhieu: 1 })
        let year = parseInt(new Date().getFullYear());
        let phong = await Phong.findById(req.params.id);
        let maxDate = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
        res.render('./admin/quantrichitietphong', {
            maxDate,
            year,
            phong,
            allRole,
            user,
            list
        })
    },

    tableKhenthuongPhong: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let phong = await Phong.findById(id);
        let khenthuongphongList = phong.khenthuong.sort(function(a, b) {
            var aa = a.ngayQD.split('-').join(''),
                bb = b.ngayQD.split('-').join('');
            return bb < aa ? -1 : (aa > bb ? 1 : 0);
        });
        res.send(khenthuongphongList)
    },
    addKhenthuongPhong: async(req, res) => {
        let id = req.params.id;
        let { soQD, ngayQD, hinhthuckhenthuong, capkhenthuong, noidungkhenthuong } = req.body;
        let phong = await Phong.findById(id);
        phong.khenthuong.push({
            soQD,
            ngayQD,
            hinhthuckhenthuong: hinhthuckhenthuong,
            capkhenthuong,
            noidungkhenthuong,
            loaikhenthuong: "Tập thể"
        });
        await phong.save();
        res.send('Thêm khen thưởng phòng thành công..')
    },
    deleteKhenthuongPhong: async(req, res) => {
        let id = req.params.id;
        let id1 = req.params.id1;
        let phong = await Phong.findById(id);
        let khenthuongList = phong.khenthuong;
        let itemDelete = khenthuongList.find(i => {
            return i._id == id1
        });
        await itemDelete.remove();
        await phong.save();
        res.send('Xóa thành công...')
    },
    editKhenthuongPhong: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let id1 = req.params.id1;
        let { soQD, ngayQD, hinhthuckhenthuong, capkhenthuong, noidungkhenthuong } = req.body;
        let phong = await Phong.findById(id);
        let khenthuongList = phong.khenthuong;
        let itemEdit = khenthuongList.find(i => {
            return i._id == id1
        });
        itemEdit.soQD = soQD;
        itemEdit.ngayQD = ngayQD;
        itemEdit.hinhthuckhenthuong = hinhthuckhenthuong;
        itemEdit.capkhenthuong = capkhenthuong;
        itemEdit.noidungkhenthuong = noidungkhenthuong;
        phong.save();
        res.send('Update thành công')
    },
    tableThiduaPhong: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let phong = await Phong.findById(id);
        let thiduaList = phong.thiduanam.sort((a, b) => {
            return b.nam - a.nam
        });
        res.send(thiduaList)
    },
    addThiduaPhong: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let { nam, xeploai, ghichu } = req.body;
        let phong = await Phong.findById(id);
        phong.thiduanam.push({
            nam,
            xeploai,
            ghichu
        });
        await phong.save();
        res.send('Thêm thành công...')
    },
    deleteThiduaPhong: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let id1 = req.params.id1;
        let phong = await Phong.findById(id);
        let thiduanamList = phong.thiduanam;
        let itemDelete = thiduanamList.find(i => {
            return i._id == id1
        });
        await itemDelete.remove();
        await phong.save();
        res.send('Xóa thành công...')
    },
    editThiduaPhong: async(req, res) => {
        let { nam, xeploai, ghichu } = req.body;
        let id = mongoose.Types.ObjectId(req.params.id);
        let id1 = req.params.id1;
        let phong = await Phong.findById(id);
        let thiduanamList = phong.thiduanam;
        let itemEdit = thiduanamList.find(i => {
            return i._id == id1
        });
        itemEdit.nam = nam;
        itemEdit.xeploai = xeploai;
        itemEdit.ghichu = ghichu;
        phong.save();
        res.send('Update thành công...')
    },
    tableQuantriDoi: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let doiList = await Doi.find({ donvicaptren: id })
            // ktra xem đội có bao nhiêu cán bộ qua vòng lặp for
        let detailDoi = [];
        for (doi of doiList) {
            let idDoi = doi._id;
            let personsOfDoi = await Person.find({ donvicongtac: idDoi })
            detailDoi.push({ doi, total: personsOfDoi.length })
        }
        res.send(detailDoi)
    },
    addDoi: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let { ten } = req.body;
        let newDoi = new Doi({
            ten,
            donvicaptren: id
        })
        await newDoi.save();
        res.send('Thêm đội thành công...')
    },
    editDoi: async(req, res) => {
        let id1 = mongoose.Types.ObjectId(req.params.id1);
        await Doi.findByIdAndUpdate(id1, req.body)
        res.send('Update thành công...')
    },
    deleteDoi: async(req, res) => {
        let id1 = mongoose.Types.ObjectId(req.params.id1);
        await Doi.findByIdAndDelete(id1)
        res.send('Xóa thành công...')
    },
    addKhenthuongDoi: async(req, res) => {
        let id1 = mongoose.Types.ObjectId(req.params.id1);
        let doi = await Doi.findById(id1);
        let {
            soQD,
            ngayQD,
            hinhthuckhenthuong,
            capkhenthuong,
            noidungkhenthuong
        } = req.body;
        doi.khenthuong.push({
            soQD,
            ngayQD,
            hinhthuckhenthuong: hinhthuckhenthuong,
            capkhenthuong,
            noidungkhenthuong,
            loaikhenthuong: "Tập thể"
        })
        doi.save();
        res.send('Thêm thành công...')
    },
    //fetch danh sách đội thuộc phòng
    getDoiList: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let doiList = await Doi.find({ donvicaptren: id }).sort({ ten: 1 });
        res.send(doiList)
    },
    tableKhenthuongDoi: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let doiList = await Doi.find({ donvicaptren: id }).sort({ ten: 1 });
        let allKhenthuong = [];
        for (doi of doiList) {
            let sortKhenthuong = doi.khenthuong.sort(function(a, b) {
                var aa = a.ngayQD.split('-').join(),
                    bb = b.ngayQD.split('-').join();
                return bb < aa ? -1 : (aa > bb ? 1 : 0)
            });
            if (sortKhenthuong.length > 0) {
                sortKhenthuong.forEach(khenthuong => {
                    allKhenthuong.push({
                        id_doi: doi._id,
                        ten: doi.ten,
                        khenthuong: khenthuong
                    });
                })
            }
        };
        res.send(allKhenthuong)
    },
    deleteKhenthuongDoi: async(req, res) => {
        let id1 = mongoose.Types.ObjectId(req.params.id1);
        let id2 = req.params.id2;
        let doi = await Doi.findById(id1);
        let khenthuongItem = doi.khenthuong.find(i => i._id == id2)
        await khenthuongItem.remove();
        await doi.save();
        res.send('Xóa thành công...')
    },
    editKhenthuongDoi: async(req, res) => {
        let id1 = mongoose.Types.ObjectId(req.params.id1);
        let id2 = req.params.id2;
        let {
            soQD,
            ngayQD,
            hinhthuckhenthuong,
            noidungkhenthuong,
            capkhenthuong
        } = req.body
        let doi = await Doi.findById(id1);
        let khenthuongItem = doi.khenthuong.find(i => i._id == id2)
        khenthuongItem.soQD = soQD;
        khenthuongItem.ngayQD = ngayQD;
        khenthuongItem.hinhthuckhenthuong = hinhthuckhenthuong;
        khenthuongItem.capkhenthuong = capkhenthuong;
        khenthuongItem.noidungkhenthuong = noidungkhenthuong;
        doi.save();
        res.send('Update thành công...')
    },
    addCanbo: async(req, res) => {
        let newCanbo = new Person(req.body);
        if (req.file !== undefined) {
            let filename = req.file.path.slice(16)
            await sharp('./public/anhCanbo/' + filename).resize(250, 250, {
                fit: 'fill'
            }).toFile("./public/anhCanbo/thumnail/" + req.body.hoten + '-' + filename); // đường dẫn tính từ tệp app.js
            newCanbo.img = '/anhCanbo/thumnail/' + req.body.hoten + '-' + filename;
        } else {
            newCanbo.img = "/anhcanbo/anhDefault.jpg"
        }
        await newCanbo.save();
        res.send('Thêm cán bộ thành công...')
    },
    tableQuantriCanbo: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let personList = await Person.find({ room: id })
            .sort({ donvicongtac: 1 })
            .sort({ hoten: -1 })
            .populate('donvicongtac');
        res.send(personList)
    },
    editCanbo: async(req, res) => {
        let id1 = mongoose.Types.ObjectId(req.params.id1);
        let canbo = await Person.findById(id1);
        canbo.hoten = req.body.hoten;
        canbo.ngaysinh = req.body.ngaysinh;
        canbo.sohieuCAND = req.body.sohieuCAND;
        canbo.capbac = req.body.capbac;
        canbo.dangvien = req.body.dangvien;
        canbo.chucvu = req.body.chucvu;
        canbo.donvicongtac = req.body.donvicongtac;
        canbo.room = req.body.room;
        if (req.file !== undefined) {
            let indexSlice = canbo.img.lastIndexOf('-'); //tìm vị trí gạch - để slice String
            let imgCurrentOfCanbo = canbo.img.slice(indexSlice + 1);
            let imgCurrentOfThumnail = canbo.img.slice(19);
            let filename = req.file.path.slice(16);
            fs.readdirSync('./public/anhCanbo/', 'utf-8').forEach(file => {
                if (file === imgCurrentOfCanbo) {
                    fs.unlinkSync('./public/anhCanbo/' + imgCurrentOfCanbo);
                }
            });
            fs.readdirSync('./public/anhCanbo/thumnail', 'utf-8').forEach(file => {
                if (file === imgCurrentOfThumnail) {
                    fs.unlinkSync('./public/anhCanbo/thumnail/' + imgCurrentOfThumnail);
                }
            });
            await sharp('./public/anhCanbo/' + filename).resize(250, 250, {
                fit: 'fill'
            }).toFile("./public/anhCanbo/thumnail/" + req.body.hoten + '-' + filename); // đường dẫn tính từ tệp app.js
            canbo.img = '/anhCanbo/thumnail/' + req.body.hoten + '-' + filename;
        };
        await canbo.save()
        res.send('Update cán bộ thành công...')
    },
    moveCanbo: async(req, res) => {
        let roomTo = mongoose.Types.ObjectId(req.params.id2);
        let donvicongtacTo = mongoose.Types.ObjectId(req.params.id3);
        let id1 = mongoose.Types.ObjectId(req.params.id1);
        let canbo = await Person.findById(id1);
        canbo.donvicongtac = donvicongtacTo;
        canbo.room = roomTo;
        await canbo.save();
        res.send('Move cán bộ thành công...')
    },
    deleteCanbo: async(req, res) => {
        let id1 = mongoose.Types.ObjectId(req.params.id1);
        let canbo = await Person.findById(id1);
        let indexSlice = canbo.img.lastIndexOf('-'); //tìm vị trí gạch - để slice String
        let imgCurrentOfCanbo = canbo.img.slice(indexSlice + 1);
        let imgCurrentOfThumnail = canbo.img.slice(19);
        fs.readdirSync('./public/anhCanbo/', 'utf-8').forEach(file => {
            if (file === imgCurrentOfCanbo) {
                fs.unlinkSync('./public/anhCanbo/' + imgCurrentOfCanbo);
            }
        });
        fs.readdirSync('./public/anhCanbo/thumnail', 'utf-8').forEach(file => {
            if (file === imgCurrentOfThumnail) {
                fs.unlinkSync('./public/anhCanbo/thumnail/' + imgCurrentOfThumnail);
            }
        });

        let vannghes = await Vannghe.find();
        for (item of vannghes) {
            let hotList = item.hotList;
            for (element of hotList) {
                element.persons = element.persons.filter(i => i.toString() != id1.toString())
            }
            await item.save()
        };

        let thethaos = await Thethao.find();
        for (item of thethaos) {
            let hotList = item.hotList;
            for (element of hotList) {
                element.persons = element.persons.filter(i => i.toString() != id1.toString())
            }
            await item.save()
        };

        let dieulenhList = await badList.find();
        for (item of dieulenhList) {
            let hotList = item.hotList;
            for (element of hotList) {
                console.log(element.persons)
                element.persons = element.persons.filter(i => i.toString() != id1.toString())
            }
            await item.save()
        };
        await canbo.remove()
        res.send('Xóa thành công')
    },
    tableQuantriThiduathang: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let personList = await Person.find({ room: id })
            .sort({ hoten: -1 })
            .populate('donvicongtac');
        let nam = parseInt(req.params.year);
        let month = req.params.month;
        for (person of personList) {
            let checkedNam = person.thiduathang.find(i => i.nam == nam); //check xem năm đó có trong db chưa;
            if (checkedNam === undefined) { //nếu thi đua tháng năm đó chưa có thì push thêm năm đó vào
                person.thiduathang = [{
                    [month]: {
                        flag: "",
                        ghichu: ""
                    }
                }];
            } else {
                // đã có năm ý rồi thì lấy ra giá trị flag cờ và ghi chú tháng
                //  do person.thiduathang[month] có thể trả về {} nên phải check điều kiện key bên trong undefined hay k
                person.thiduathang = [{
                    [month]: {
                        flag: checkedNam[month].flag !== undefined ? checkedNam[month].flag : '',
                        ghichu: checkedNam[month].ghichu !== undefined ? checkedNam[month].ghichu : ''
                    }
                }];
            }
        }
        res.send(personList)
    },
    editGhichu: async(req, res) => {
        let id1 = mongoose.Types.ObjectId(req.params.id1)
        let { ghichu } = req.body;
        let month = req.params.month;
        let year = parseInt(req.params.year)
        let canbo = await Person.findById(id1);
        let thiduathangList = canbo.thiduathang;
        let checkedThiduathang = thiduathangList.find(item => item.nam === year); //checked xem đã có năm ý chưa
        if (checkedThiduathang === undefined) { //chưa có thì push năm ý vào
            thiduathangList.push({
                nam: year,
                [month]: {
                    ghichu: ghichu
                }
            });
        } else {
            //check xem có tồn tại tháng ý trong CSDL hay chưa
            if (checkedThiduathang[month].flag === undefined && checkedThiduathang[month].ghichu === undefined) {
                checkedThiduathang[month] = { ghichu } //chưa có tháng ý thì thêm mới month và ghi chú trong CSDL
            } else { //đã có  month trong CSDL rồi thì cập nhật lại thôi
                checkedThiduathang[month].ghichu = ghichu
            }
        }
        await canbo.save()
        res.send('Cập nhật ghi chú thành công...')
    },
    updateThiduathang: async(req, res) => {
        let parseData = JSON.parse(req.body.data);
        let month = req.params.month;
        let year = parseInt(req.params.year)
        for (item of parseData) {
            let { idCanbo, flag } = item;
            let canbo = await Person.findById(idCanbo);
            let thiduathangList = canbo.thiduathang;
            let checkedThiduathang = thiduathangList.find(item => item.nam === year); //checked xem đã có năm ý chưa
            if (checkedThiduathang === undefined) { //chưa có thì push năm ý vào
                thiduathangList.push({
                    nam: year,
                    [month]: {
                        flag
                    }
                });
            } else {
                //check xem có tồn tại tháng ý trong CSDL hay chưa
                if (checkedThiduathang[month].flag === undefined && checkedThiduathang[month].ghichu === undefined) {
                    checkedThiduathang[month] = { flag } //chưa có tháng ý thì thêm mới month và flag trong CSDL
                } else { //đã có  month trong CSDL rồi thì cập nhật lại thôi
                    checkedThiduathang[month].flag = flag
                }
            }
            await canbo.save()
        }
        res.send('update thi đua tháng thành công')
    },
    tableQuantriThiduanam: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let personList = await Person.find({ room: id })
            .sort({ donvicongtac: 1 })
            .sort({ hoten: -1 })
            .populate('donvicongtac');
        let nam = parseInt(req.params.year);
        for (person of personList) {
            let checkedNam = person.thiduanam.find(i => i.nam == nam); //check xem năm đó có trong db chưa;
            if (checkedNam === undefined) { //nếu thi đua  năm đó chưa có thì push thêm năm đó vào
                person.thiduanam = [{
                    xeploai: "",
                    ghichu: "",
                    dangkithidua: ""
                }];
            } else {
                // đã có năm ý rồi
                //  do person.thiduanam.[thuộc tính] có thể undèined nên phải check điều kiện key bên trong undefined hay k
                person.thiduanam = [{
                    xeploai: checkedNam.xeploai !== undefined ? checkedNam.xeploai : '',
                    dangkithidua: checkedNam.dangkithidua !== undefined ? checkedNam.dangkithidua : '',
                    ghichu: checkedNam.ghichu !== undefined ? checkedNam.ghichu : ''
                }];
            }
        }
        res.send(personList)
    },
    editGhichunam: async(req, res) => {
        let id1 = mongoose.Types.ObjectId(req.params.id1)
        let { ghichu } = req.body;
        let year = parseInt(req.params.year)
        let canbo = await Person.findById(id1);
        let thiduanamList = canbo.thiduanam;
        let checkedThiduanam = thiduanamList.find(item => item.nam === year); //checked xem đã có năm ý chưa
        if (checkedThiduanam === undefined) { //chưa có thì push năm ý vào
            thiduanamList.push({
                nam: year,
                ghichu
            });
        } else {
            checkedThiduanam.ghichu = ghichu
        }
        await canbo.save()
        res.send('Cập nhật ghi chú thành công...')
    },
    updateThiduanam: async(req, res) => {
        let parseData = JSON.parse(req.body.data);
        let year = parseInt(req.params.year)
        for (item of parseData) {
            let { idCanbo, dangkithidua, xeploai } = item;
            let canbo = await Person.findById(idCanbo);
            let thiduanamList = canbo.thiduanam;
            let checkedThiduanam = thiduanamList.find(item => item.nam === year); //checked xem đã có năm ý chưa
            if (checkedThiduanam === undefined) { //chưa có thì push năm ý vào
                thiduanamList.push({
                    nam: year,
                    dangkithidua,
                    xeploai
                });
            } else {
                checkedThiduanam.dangkithidua = dangkithidua;
                checkedThiduanam.xeploai = xeploai;
            }
            await canbo.save()
        }
        res.send('update thi đua năm thành công')
    },
    tableQuantriDangvien: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let dangvienList = await Person.find({ room: id, dangvien: "true" })
            .sort({ donvicongtac: 1 })
            .sort({ hoten: -1 })
            .populate('donvicongtac');
        let nam = parseInt(req.params.year);
        for (dangvien of dangvienList) {
            let checkedNam = dangvien.thiduanam.find(i => i.nam == nam); //check xem năm đó có trong db chưa;
            if (checkedNam === undefined) { //nếu thi đua  năm đó chưa có thì push thêm năm đó vào
                dangvien.thiduanam = [{
                    dangkixeploaidangvien: "",
                    xeploaidangvien: ""
                }];
            } else {
                // đã có năm ý rồi
                //  do dangvien.thiduanam.[thuộc tính] có thể undèined nên phải check điều kiện key bên trong undefined hay k
                dangvien.thiduanam = [{
                    dangkixeploaidangvien: checkedNam.dangkixeploaidangvien !== undefined ? checkedNam.dangkixeploaidangvien : '',
                    xeploaidangvien: checkedNam.xeploaidangvien !== undefined ? checkedNam.xeploaidangvien : ''
                }];
            }
        }
        res.send(dangvienList)
    },
    updateXeploaiDangvien: async(req, res) => {
        let parseData = JSON.parse(req.body.data);
        let year = parseInt(req.params.year)
        for (item of parseData) {
            let { idCanbo, dangkixeploaidangvien, xeploaidangvien } = item;
            let canbo = await Person.findById(idCanbo);
            let thiduanamList = canbo.thiduanam;
            let checkedThiduanam = thiduanamList.find(item => item.nam === year); //checked xem đã có năm ý chưa
            if (checkedThiduanam === undefined) { //chưa có thì push năm ý vào
                thiduanamList.push({
                    nam: year,
                    dangkixeploaidangvien,
                    xeploaidangvien
                });
            } else {
                checkedThiduanam.dangkixeploaidangvien = dangkixeploaidangvien;
                checkedThiduanam.xeploaidangvien = xeploaidangvien;
            }
            await canbo.save()
        }
        res.send('update xếp loại đảng viên thành công')
    },
    getCanboList: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let canboList = await Person.find({ room: id })
            .sort({ donvicongtac: 1 })
            .sort({ hoten: -1 })
            .populate('donvicongtac');
        res.send(canboList)
    },
    tableKhenthuongCanhan: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let canbo = await Person.findById(id);
        let khenthuongList = canbo.khenthuongcanhan.sort(function(a, b) {
            var aa = a.ngayQD.split('-').join(),
                bb = b.ngayQD.split('-').join();
            return bb < aa ? -1 : (aa > bb ? 1 : 0);
        });
        res.send(khenthuongList)
    },
    addKhenthuongCanhan: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let canbo = await Person.findById(id);
        canbo.khenthuongcanhan.push(req.body)
        await canbo.save()
        res.send('Thêm thành công...')
    },
    editKhenthuongCanhan: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let id1 = req.params.id1;
        let canbo = await Person.findById(id);
        let { soQD, ngayQD, hinhthuckhenthuong, capkhenthuong, noidungkhenthuong } = req.body;
        let itemEdit = canbo.khenthuongcanhan.find(i => {
            return i._id == id1
        });
        itemEdit.soQD = soQD;
        itemEdit.ngayQD = ngayQD;
        itemEdit.hinhthuckhenthuong = hinhthuckhenthuong;
        itemEdit.capkhenthuong = capkhenthuong;
        itemEdit.noidungkhenthuong = noidungkhenthuong;
        canbo.save()
        res.send('Update thành công')
    },
    deleteKhenthuongCanhan: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let id1 = req.params.id1;
        let canbo = await Person.findById(id);
        let itemDelete = canbo.khenthuongcanhan.find(i => i._id == id1);
        itemDelete.remove();
        canbo.save();
        res.send('Xóa khen thưởng cá nhân thành công')
    },
    tableKiluatCanhan: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let canbo = await Person.findById(id);
        let kiluatList = canbo.kiluatcanhan.sort(function(a, b) {
            var aa = a.ngayQD.split('-').join(),
                bb = b.ngayQD.split('-').join();
            return bb < aa ? -1 : (aa > bb ? 1 : 0);
        });
        res.send(kiluatList)
    },
    addKiluatCanhan: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let canbo = await Person.findById(id);
        canbo.kiluatcanhan.push(req.body)
        await canbo.save()
        res.send('Thêm thành công...')
    },
    editKiluatCanhan: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let id1 = req.params.id1;
        let canbo = await Person.findById(id);
        let { soQD, ngayQD, hinhthuckiluat, noidungkiluat } = req.body;
        let itemEdit = canbo.kiluatcanhan.find(i => {
            return i._id == id1
        });
        itemEdit.soQD = soQD;
        itemEdit.ngayQD = ngayQD;
        itemEdit.hinhthuckiluat = hinhthuckiluat;
        itemEdit.noidungkiluat = noidungkiluat;
        canbo.save()
        res.send('Update thành công')
    },
    deleteKiluatCanhan: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let id1 = req.params.id1;
        let canbo = await Person.findById(id);
        let itemDelete = canbo.kiluatcanhan.find(i => i._id == id1);
        itemDelete.remove();
        canbo.save();
        res.send('Xóa khen thưởng cá nhân thành công')
    },
}