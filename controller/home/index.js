const Phong = require('../../models/capphong');
const Doi = require('../../models/capdoi');
const DieulenhCAT = require('../../models/congtacdieulenh/kiemtradieulenh');
const Tinhhuong = require('../../models/congtacdieulenh/tinhhuong');
const KiemtraTinhhuong = require('../../models/congtacdieulenh/kiemtratinhhuong');
const Theluc = require('../../models/congtacdieulenh/kiemtratheluc');
const Bansung = require('../../models/congtacdieulenh/kiemtrabansung');
const Quansu = require('../../models/congtacdieulenh/kiemtraquansu');
const badList = require('../../models/congtacdieulenh/khongdatList');
const _ = require('lodash');
const Loaivanban = require('../../models/loaivanban');
const Coquanbanhanh = require('../../models/coquanbanhanhVB');
const Vanban = require('../../models/vanban');
const MohinhVNTT = require('../../models/vannghethethao/mohinhVNTT');
const GiaiThethao = require('../../models/vannghethethao/giaithethao');
const GiaiVannghe = require('../../models/vannghethethao/giaivannghe');
const Thethao = require('../../models/vannghethethao/thethao');
const Vannghe = require('../../models/vannghethethao/vannghe');
const HoatdongTieubieu = require('../../models/vannghethethao/hoatdongtieubieu');
const Person = require('../../models/person');
const Chuyenmuc = require('../../models/Congtactuyentruyen/chuyenmuc_tinbai');
const Cuocthi = require('../../models/Congtactuyentruyen/thituyentruyen');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs')
let mongoose = require('mongoose')

const filter3Years = (arr, value, soluong) => {
    let result = [];
    for (person of arr) {
        person.thiduanam.sort((a, b) => { // sắp xếp thi đua năm theo thứ tự năm  giảm dần
            return b.nam - a.nam
        });
        for (let y = 0; y < _.size(person.thiduanam) - 1; y++) {
            let checked = [];
            let arrSlice = _.slice(person.thiduanam, y, y + soluong); //cắt mảng ban đầu thành các mảng con
            if (arrSlice.length === soluong) { // mảng con cắt ra phải có số phần tử bằng số năm liên tiếp đưa vào (TH đang xét = 3)
                checked = arrSlice.filter(item => { //lọc ra mảng chứa xep loại === value
                    return item.xeploai === value;
                });
                if (checked.length === soluong) { //nếu checked có số ptu = số lượng năm liên tiếp
                    let maxDate = arrSlice[0].nam; //giá trị năm lớn nhất thuộc phần tử đầu tiên do đã sắp giá trị
                    let sum = true;
                    for (let i = 1; i < arrSlice.length; i++) {
                        sum += _.inRange(arrSlice[i].nam, maxDate, maxDate - soluong + 1) // 3 năm đó có liên tiếp nhau hay không
                    }
                    if (sum === arrSlice.length) { //nếu 3 năm đó liên tiếp thì push person vào result
                        result.push({
                            _id: person._id,
                            hoten: person.hoten,
                            capbac: person.capbac,
                            chucvu: person.chucvu,
                            room: person.room.kyhieu,
                            donvicongtac: person.donvicongtac.ten,
                            nam: arrSlice.map(i => {
                                return i.nam
                            }).toString()
                        });
                    };
                }
            };
            let isPush = result.find(item => item._id === person._id); //kiểm tra hết vòng cắt slice 
            // mảng ban đầu xem đã thỏa mãn có 3 năm liên tiếp kia chưa, nếu có thoát vòng lặp, tiết kiệm được slice mảng sau
            if (isPush !== undefined) { //case đã có person trong đó thì thoát vòng lặp 
                break; // thoát lặp
            };
        }
    };
    return result;
}
const filter3YearsDangvien = (arr, value, soluong) => {
    let result = [];
    for (person of arr) {
        person.thiduanam.sort((a, b) => { // sắp xếp thi đua năm theo thứ tự năm  giảm dần
            return b.nam - a.nam
        });
        for (let y = 0; y < _.size(person.thiduanam) - 1; y++) {
            let checked = [];
            let arrSlice = _.slice(person.thiduanam, y, y + soluong); //cắt mảng ban đầu thành các mảng con
            if (arrSlice.length === soluong) { // mảng con cắt ra phải có số phần tử bằng số năm liên tiếp đưa vào (TH đang xét = 3)
                checked = arrSlice.filter(item => { //lọc ra mảng chứa xep loại === value
                    return item.xeploaidangvien === value;
                });
                if (checked.length === soluong) { //nếu checked có số ptu = số lượng năm liên tiếp
                    let maxDate = arrSlice[0].nam; //giá trị năm lớn nhất thuộc phần tử đầu tiên do đã sắp giá trị
                    let sum = true;
                    for (let i = 1; i < arrSlice.length; i++) {
                        sum += _.inRange(arrSlice[i].nam, maxDate, maxDate - soluong + 1) // 3 năm đó có liên tiếp nhau hay không
                    }
                    if (sum === arrSlice.length) { //nếu 3 năm đó liên tiếp thì push person vào result
                        result.push({
                            _id: person._id,
                            hoten: person.hoten,
                            capbac: person.capbac,
                            chucvu: person.chucvu,
                            room: person.room.kyhieu,
                            donvicongtac: person.donvicongtac.ten,
                            nam: arrSlice.map(i => {
                                return i.nam
                            }).toString()
                        });
                    };
                }
            };
            let isPush = result.find(item => item._id === person._id); //kiểm tra hết vòng cắt slice 
            // mảng ban đầu xem đã thỏa mãn có 3 năm liên tiếp kia chưa, nếu có thoát vòng lặp, tiết kiệm được slice mảng sau
            if (isPush !== undefined) { //case đã có person trong đó thì thoát vòng lặp 
                break; // thoát lặp
            };
        }
    };
    return result;
}

module.exports = {
    thiduathangHomePage: async(req, res) => {
        try {
            let allCB = await Person.find();
            allCB = allCB.length;
            let nam = new Date().getFullYear();
            let nam1 = new Date().getFullYear();
            let phongList = await Phong.find().sort({ kyhieu: 1 });
            res.render('./user/thiduathangHome', { phongList, allCB, nam, nam1 })
        } catch (error) {
            console.log(error)
        }
    },
    thiduanamHomePage: async(req, res) => {
        try {
            let allCB = await Person.find();
            allCB = allCB.length;
            let nam = new Date().getFullYear();
            let nam1 = new Date().getFullYear();
            let phongList = await Phong.find().sort({ kyhieu: 1 });
            res.render('./user/thiduanamHome', { phongList, allCB, nam, nam1 })
        } catch (error) {
            console.log(error)
        }
    },
    dangvienHomePage: async(req, res) => {
        try {
            let allCB = await Person.find();
            allCB = allCB.length;
            let dangvienList = await Person.find({ dangvien: 'true' });
            let totalDangvien = dangvienList.length;
            let nam = new Date().getFullYear();
            let nam1 = new Date().getFullYear();
            let phongList = await Phong.find().sort({ kyhieu: 1 });
            res.render('./user/xeploaidangvienHome', { phongList, allCB, nam, nam1, totalDangvien })
        } catch (error) {
            console.log(error)
        }
    },
    ANTQPage: async(req, res) => {
        try {
            let allCB = await Person.find();
            allCB = allCB.length;
            let nam = new Date().getFullYear() - 1;
            let phongList = await Phong.find().sort({ kyhieu: 1 });
            res.render('./user/vianninh', { phongList, allCB, nam })
        } catch (error) {
            console.log(error)
        }
    },
    khenthuongHomePage: async(req, res) => {
        try {
            let allCB = await Person.find();
            allCB = allCB.length;
            let nam = new Date().getFullYear() - 1;
            let date = new Date();
            let minInit = `${nam}-01-01`;
            let maxInit = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
            let phongList = await Phong.find().sort({ kyhieu: 1 });
            res.render('./user/theodoikhenthuongHome', { phongList, allCB, nam, minInit, maxInit })
        } catch (error) {
            console.log(error)
        }
    },
    filterKhenthuongHome: async(req, res) => {
        let {
            noidungkhenthuong,
            capkhenthuong,
            hinhthuckhenthuong,
            ngay_start,
            ngay_end
        } = req.query;
        let date = new Date();
        if (ngay_start === '') {
            ngay_start = '2010-01-01';
        }
        if (ngay_end === '') {
            ngay_end = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
        }
        let phongList = await Phong.find();
        let doiList = await Doi.find().populate('donvicaptren', { kyhieu: 1 })
        let minDay = parseInt(ngay_start.split('-').join('')); // biến đổi thành số dạng 20210101 để so sánh khi tìm khen thuong
        let maxDay = parseInt(ngay_end.split('-').join(''));
        let khenthuongphong = []; //danh sách các lần khen thưởng cấp phòng
        let tapthephongchitiet = []; //danh sách tên phòng được khen thưởng
        let tapthedoichitiet = []; //danh sách tên đội được khen thưởng
        let khenthuongdoi = []; //danh sách các lần khen thưởng cấp đội
        for (phong of phongList) {
            let itemList = phong.khenthuong.filter(item => {
                let ngayQD = parseInt(item.ngayQD.split('-').join(''))
                return ngayQD >= minDay && ngayQD <= maxDay &&
                    item.noidungkhenthuong.toLowerCase().indexOf(noidungkhenthuong.toLowerCase()) !== -1 &&
                    item.capkhenthuong.toLowerCase().indexOf(capkhenthuong.toLowerCase()) !== -1 &&
                    item.hinhthuckhenthuong.toLowerCase().indexOf(hinhthuckhenthuong.toLowerCase()) !== -1;
            });
            if (itemList.length > 0) {
                itemList = itemList.map(item => {
                    return {
                        _id: item._id,
                        soQD: item.soQD,
                        ngayQD: item.ngayQD.split('-').reverse().join('/'),
                        noidungkhenthuong: item.noidungkhenthuong,
                        hinhthuckhenthuong: item.hinhthuckhenthuong,
                        capkhenthuong: item.capkhenthuong,
                        loaikhenthuong: item.loaikhenthuong,
                        target: phong.kyhieu
                    }
                })
                tapthephongchitiet.push({ kyhieu: phong.kyhieu, soluot: itemList.length })
            }
            khenthuongphong = khenthuongphong.concat(itemList)
        };

        for (doi of doiList) {
            let itemList = doi.khenthuong.filter(item => {
                let ngayQD = parseInt(item.ngayQD.split('-').join(''))
                return ngayQD >= minDay && ngayQD <= maxDay &&
                    item.noidungkhenthuong.toLowerCase().indexOf(noidungkhenthuong.toLowerCase()) !== -1 &&
                    item.capkhenthuong.toLowerCase().indexOf(capkhenthuong.toLowerCase()) !== -1 &&
                    item.hinhthuckhenthuong.toLowerCase().indexOf(hinhthuckhenthuong.toLowerCase()) !== -1;
            });
            if (itemList.length > 0) {
                itemList = itemList.map(item => {
                    return {
                        _id: item._id,
                        soQD: item.soQD,
                        ngayQD: item.ngayQD.split('-').reverse().join('/'),
                        noidungkhenthuong: item.noidungkhenthuong,
                        hinhthuckhenthuong: item.hinhthuckhenthuong,
                        capkhenthuong: item.capkhenthuong,
                        loaikhenthuong: 'Tập thể',
                        target: doi.ten + ' - ' + doi.donvicaptren.kyhieu
                    }
                })
                tapthedoichitiet.push({ ten: doi.ten, donvi: doi.donvicaptren.kyhieu, soluot: itemList.length })
            }
            khenthuongdoi = khenthuongdoi.concat(itemList)
        };

        let personList = await Person.find().populate('room', { kyhieu: 1 }).populate('donvicongtac', { ten: 1 });
        let khenthuongperson = [];
        let tapthecanbochitiet = [];
        for (person of personList) {
            let itemList = person.khenthuongcanhan.filter(item => {
                let ngayQD = parseInt(item.ngayQD.split('-').join(''))
                return ngayQD >= minDay && ngayQD <= maxDay &&
                    item.noidungkhenthuong.toLowerCase().indexOf(noidungkhenthuong.toLowerCase()) !== -1 &&
                    item.capkhenthuong.toLowerCase().indexOf(capkhenthuong.toLowerCase()) !== -1 &&
                    item.hinhthuckhenthuong.toLowerCase().indexOf(hinhthuckhenthuong.toLowerCase()) !== -1;
            });
            if (itemList.length > 0) {
                itemList = itemList.map(item => {
                    return {
                        _id: item._id,
                        soQD: item.soQD,
                        ngayQD: item.ngayQD.split('-').reverse().join('/'),
                        noidungkhenthuong: item.noidungkhenthuong,
                        capkhenthuong: item.capkhenthuong,
                        hinhthuckhenthuong: item.hinhthuckhenthuong,
                        loaikhenthuong: 'Cá nhân',
                        target: person.hoten
                    }
                });
                tapthecanbochitiet.push({
                    _id: person._id,
                    ten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    donvicongtac: person.room.kyhieu,
                    doicongtac: person.donvicongtac.ten,
                    soluot: itemList.length
                })
            }
            khenthuongperson = khenthuongperson.concat(itemList)
        };
        let totalKhenthuongList = khenthuongperson.concat(khenthuongphong).concat(khenthuongdoi);

        res.send({
            totalKhenthuongList: totalKhenthuongList,
            tongcongluotkhenthuong: totalKhenthuongList.length,
            soluotkhenthuongtapthe: khenthuongphong.length + khenthuongdoi.length,
            soluotkhenthuongcapphong: khenthuongphong.length,
            soluotkhenthuongcapdoi: khenthuongdoi.length,
            soluotkhenthuongcanhan: khenthuongperson.length,
            tongsophongduockhenthuong: tapthephongchitiet,
            tongsodoiduockhenthuong: tapthedoichitiet,
            tongsocanhanduockhenthuong: tapthecanbochitiet
        })
    },
    kiluatHomePage: async(req, res) => {
        try {
            let allCB = await Person.find();
            allCB = allCB.length;
            let nam = new Date().getFullYear() - 1;
            let date = new Date();
            let minInit = `${nam}-01-01`;
            let maxInit = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
            let phongList = await Phong.find().sort({ kyhieu: 1 });
            res.render('./user/theodoikiluatHome', { phongList, allCB, nam, minInit, maxInit })
        } catch (error) {
            console.log(error)
        }
    },
    filterKiluatHome: async(req, res) => {
        let {
            noidungkiluat,
            hinhthuckiluat,
            ngay_start,
            ngay_end
        } = req.query;
        let date = new Date();
        if (ngay_start === '') {
            ngay_start = '2010-01-01';
        }
        if (ngay_end === '') {
            ngay_end = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
        }
        let minDay = parseInt(ngay_start.split('-').join('')); // biến đổi thành số dạng 20210101 để so sánh khi tìm khen thuong
        let maxDay = parseInt(ngay_end.split('-').join(''));
        let personList = await Person.find().populate('room', { kyhieu: 1 }).populate('donvicongtac', { ten: 1 });;
        let tongsokiluat = [];
        let tongsokiluatkhientrach = 0;
        let tongsokiluatcanhcao = 0;
        let tongsokiluatcachchuc = 0;
        let tongcongcanbobikiluat = [];

        for (person of personList) {
            let itemList = person.kiluatcanhan.filter(item => {
                let ngayQD = parseInt(item.ngayQD.split('-').join(''))
                return ngayQD >= minDay && ngayQD <= maxDay &&
                    item.noidungkiluat.toLowerCase().indexOf(noidungkiluat.toLowerCase()) !== -1 &&
                    item.hinhthuckiluat.toLowerCase().indexOf(hinhthuckiluat.toLowerCase()) !== -1;
            });
            if (itemList.length > 0) {
                itemList = itemList.map(item => {
                    if (item.hinhthuckiluat === "Khiển trách") {
                        tongsokiluatkhientrach += 1;
                    } else if (item.hinhthuckiluat === "Cảnh cáo") {
                        tongsokiluatcanhcao += 1;
                    } else {
                        tongsokiluatcachchuc += 1;
                    };
                    return {
                        _id: item._id,
                        soQD: item.soQD,
                        ngayQD: item.ngayQD.split('-').reverse().join('/'),
                        noidungkiluat: item.noidungkiluat,
                        hinhthuckiluat: item.hinhthuckiluat,
                        target: person.hoten
                    }
                });

                tongcongcanbobikiluat.push({
                    _id: person._id,
                    ten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    donvicongtac: person.room.kyhieu,
                    doicongtac: person.donvicongtac.ten,
                    soluot: itemList.length
                })
            }
            tongsokiluat = tongsokiluat.concat(itemList)
        };
        res.send({
            tongsokiluat,
            soluotkiluat: tongsokiluat.length,
            tongsokiluatkhientrach,
            tongsokiluatcanhcao,
            tongsokiluatcachchuc,
            tongcongcanbobikiluat
        })
    },
    thuvienanhPage: async(req, res) => {
        try {
            let allCB = await Person.find();
            allCB = allCB.length;
            let mohinhList = await MohinhVNTT.find({ trangthai: true }).sort({ index: 1 })
            let phongList = await Phong.find().sort({ kyhieu: 1 });
            res.render('./user/thuvienanh', { phongList, allCB, mohinhList })
        } catch (error) {
            console.log(error)
        }
    },
    vanbanPage: async(req, res) => {
        let phongList = await Phong.find().sort({ kyhieu: 1 });
        let loaiVB = await Loaivanban.find();
        let coquanbanhanh = await Coquanbanhanh.find()
        res.render('./user/hethongvanban', { phongList, loaiVB, coquanbanhanh })
    },
    filterVanban: async(req, res) => {
        let { soVB, tenVB, coquanbanhanh, loaiVB, trichyeu, ngay_start, ngay_end } = req.query;
        let date = new Date();
        if (ngay_start === '') {
            ngay_start = '2010-01-01';
        }
        if (ngay_end === '') {
            ngay_end = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
        }
        let minDay = parseInt(ngay_start.split('-').join('')); // biến đổi thành số dạng 20210101 để so sánh khi tìm khen thuong
        let maxDay = parseInt(ngay_end.split('-').join(''));
        let list = await Vanban.find().populate('loaiVB').populate('coquanbanhanh').sort({ ngaybanhanh: -1 });

        let data = list.filter(item => {
            let ngaybanhanh = parseInt(item.ngaybanhanh.split('-').reverse().join(''))
            return ngaybanhanh >= minDay && ngaybanhanh <= maxDay &&
                item.soVB.toLowerCase().indexOf(soVB.toLowerCase()) !== -1 &&
                item.tenVB.toLowerCase().indexOf(tenVB.toLowerCase()) !== -1 &&
                item.coquanbanhanh.coquanbanhanh.toLowerCase().indexOf(coquanbanhanh.toLowerCase()) !== -1 &&
                item.loaiVB.loaiVB.toLowerCase().indexOf(loaiVB.toLowerCase()) !== -1 &&
                item.trichyeu.toLowerCase().indexOf(trichyeu.toLowerCase()) !== -1
        });
        res.send(data)
    },

    trangphongPage: async(req, res) => {
        try {
            let id = req.params.id;
            let phong = await Phong.findById(id);
            let totalCB = await Person.find({ room: id }, { hoten: 1, capbac: 1, chucvu: 1 });
            let allCB = totalCB.length;
            let nam = new Date().getFullYear();
            let nam1 = new Date().getFullYear();
            let phongList = await Phong.find().sort({ kyhieu: 1 });
            res.render('./user/thiduathangPhong', { phongList, allCB, nam, nam1, phong })
        } catch (error) {
            console.log(error)
        }
    },
    thiduanamPhongPage: async(req, res) => {
        try {
            let id = req.params.id;
            let phong = await Phong.findById(id);
            let totalCB = await Person.find({ room: id }, { hoten: 1, capbac: 1, chucvu: 1 });
            let allCB = totalCB.length;
            let nam = new Date().getFullYear();
            let nam1 = new Date().getFullYear();
            let phongList = await Phong.find().sort({ kyhieu: 1 });
            res.render('./user/thiduanamPhong', { phongList, allCB, nam, nam1, phong })
        } catch (error) {
            console.log(error)
        }
    },
    xeploaidangvienPhongPage: async(req, res) => {
        try {
            let id = req.params.id;
            let phong = await Phong.findById(id);
            let totalCB = await Person.find({ room: id }, { hoten: 1, capbac: 1, chucvu: 1, dangvien: 1 });
            let dangvienList = totalCB.filter(item => {
                return item.dangvien == "true"
            });
            let totalDangvien = dangvienList.length;
            let allCB = totalCB.length;
            let nam = new Date().getFullYear();
            let nam1 = new Date().getFullYear();
            let phongList = await Phong.find().sort({ kyhieu: 1 });
            res.render('./user/xeploaidangvienPhong', { phongList, allCB, nam, nam1, phong, totalDangvien })
        } catch (error) {
            console.log(error)
        }
    },
    khenthuongPhongPage: async(req, res) => {
        try {
            let id = req.params.id;
            let phong = await Phong.findById(id);
            let totalCB = await Person.find({ room: id }, { hoten: 1, capbac: 1, chucvu: 1 });
            let allCB = totalCB.length;
            let nam = new Date().getFullYear();
            let nam1 = new Date().getFullYear();
            let date = new Date();
            let minInit = `${nam}-01-01`;
            let maxInit = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
            let phongList = await Phong.find().sort({ kyhieu: 1 });
            res.render('./user/theodoikhenthuongPhong', { phongList, allCB, nam, nam1, phong, minInit, maxInit })
        } catch (error) {
            console.log(error)
        }
    },
    filterKhenthuongPhong: async(req, res) => {
        let {
            noidungkhenthuong,
            capkhenthuong,
            hinhthuckhenthuong,
            ngay_start,
            ngay_end
        } = req.query;
        let date = new Date();
        if (ngay_start === '') {
            ngay_start = '2010-01-01';
        }
        if (ngay_end === '') {
            ngay_end = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
        }
        let id = req.params.id;
        let phong = await Phong.findById(id);
        let doiList = await Doi.find({ donvicaptren: id }).populate('donvicaptren', { kyhieu: 1 })
        let minDay = parseInt(ngay_start.split('-').join('')); // biến đổi thành số dạng 20210101 để so sánh khi tìm khen thuong
        let maxDay = parseInt(ngay_end.split('-').join(''));
        let khenthuongphong = []; //danh sách các lần khen thưởng cấp phòng
        let tapthedoichitiet = []; //danh sách tên đội được khen thưởng
        let khenthuongdoi = []; //danh sách các lần khen thưởng cấp đội

        khenthuongphong = phong.khenthuong.filter(item => {
            let ngayQD = parseInt(item.ngayQD.split('-').join(''))
            return ngayQD >= minDay && ngayQD <= maxDay &&
                item.noidungkhenthuong.toLowerCase().indexOf(noidungkhenthuong.toLowerCase()) !== -1 &&
                item.capkhenthuong.toLowerCase().indexOf(capkhenthuong.toLowerCase()) !== -1 &&
                item.hinhthuckhenthuong.toLowerCase().indexOf(hinhthuckhenthuong.toLowerCase()) !== -1;
        });
        khenthuongphong = khenthuongphong.map(item => {
            return {
                _id: item._id,
                soQD: item.soQD,
                ngayQD: item.ngayQD.split('-').reverse().join('/'),
                noidungkhenthuong: item.noidungkhenthuong,
                hinhthuckhenthuong: item.hinhthuckhenthuong,
                capkhenthuong: item.capkhenthuong,
                loaikhenthuong: 'Tập thể',
                target: phong.kyhieu
            }
        })

        for (doi of doiList) {
            let itemList = doi.khenthuong.filter(item => {
                let ngayQD = parseInt(item.ngayQD.split('-').join(''))
                return ngayQD >= minDay && ngayQD <= maxDay &&
                    item.noidungkhenthuong.toLowerCase().indexOf(noidungkhenthuong.toLowerCase()) !== -1 &&
                    item.capkhenthuong.toLowerCase().indexOf(capkhenthuong.toLowerCase()) !== -1 &&
                    item.hinhthuckhenthuong.toLowerCase().indexOf(hinhthuckhenthuong.toLowerCase()) !== -1;
            });
            if (itemList.length > 0) {
                itemList = itemList.map(item => {
                    return {
                        _id: item._id,
                        soQD: item.soQD,
                        ngayQD: item.ngayQD.split('-').reverse().join('/'),
                        noidungkhenthuong: item.noidungkhenthuong,
                        hinhthuckhenthuong: item.hinhthuckhenthuong,
                        capkhenthuong: item.capkhenthuong,
                        loaikhenthuong: 'Tập thể',
                        target: doi.ten
                    }
                })
                tapthedoichitiet.push({ ten: doi.ten, soluot: itemList.length })
            }
            khenthuongdoi = khenthuongdoi.concat(itemList)
        };

        let personList = await Person.find({ room: id }).populate('donvicongtac', { ten: 1 });
        let khenthuongperson = [];
        let tapthecanbochitiet = [];
        for (person of personList) {
            let itemList = person.khenthuongcanhan.filter(item => {
                let ngayQD = parseInt(item.ngayQD.split('-').join(''))
                return ngayQD >= minDay && ngayQD <= maxDay &&
                    item.noidungkhenthuong.toLowerCase().indexOf(noidungkhenthuong.toLowerCase()) !== -1 &&
                    item.capkhenthuong.toLowerCase().indexOf(capkhenthuong.toLowerCase()) !== -1 &&
                    item.hinhthuckhenthuong.toLowerCase().indexOf(hinhthuckhenthuong.toLowerCase()) !== -1;
            });
            if (itemList.length > 0) {
                itemList = itemList.map(item => {
                    return {
                        _id: item._id,
                        soQD: item.soQD,
                        ngayQD: item.ngayQD.split('-').reverse().join('/'),
                        noidungkhenthuong: item.noidungkhenthuong,
                        capkhenthuong: item.capkhenthuong,
                        hinhthuckhenthuong: item.hinhthuckhenthuong,
                        loaikhenthuong: 'Cá nhân',
                        target: person.hoten
                    }
                });
                tapthecanbochitiet.push({
                    _id: person._id,
                    ten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    donvicongtac: person.donvicongtac.ten,
                    soluot: itemList.length
                })
            }
            khenthuongperson = khenthuongperson.concat(itemList)
        };
        let totalKhenthuongList = khenthuongperson.concat(khenthuongphong).concat(khenthuongdoi);
        res.send({
            totalKhenthuongList: totalKhenthuongList,
            tongcongluotkhenthuong: totalKhenthuongList.length,
            soluotkhenthuongtapthe: khenthuongphong.length + khenthuongdoi.length,
            soluotkhenthuongcapphong: khenthuongphong.length,
            soluotkhenthuongcapdoi: khenthuongdoi.length,
            soluotkhenthuongcanhan: khenthuongperson.length,
            tongsodoiduockhenthuong: tapthedoichitiet,
            tongsocanhanduockhenthuong: tapthecanbochitiet
        })
    },
    kiluatPhongPage: async(req, res) => {
        try {
            let id = req.params.id;
            let phong = await Phong.findById(id);
            let totalCB = await Person.find({ room: id }, { hoten: 1, capbac: 1, chucvu: 1 });
            let allCB = totalCB.length;
            let nam = new Date().getFullYear();
            let nam1 = new Date().getFullYear();
            let date = new Date();
            let minInit = `${nam}-01-01`;
            let maxInit = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
            let phongList = await Phong.find().sort({ kyhieu: 1 });
            res.render('./user/theodoikiluatPhong', { phongList, allCB, nam, nam1, phong, minInit, maxInit })
        } catch (error) {
            console.log(error)
        }
    },
    filterKiluatPhong: async(req, res) => {
        let {
            noidungkiluat,
            hinhthuckiluat,
            ngay_start,
            ngay_end
        } = req.query;
        let date = new Date();
        if (ngay_start === '') {
            ngay_start = '2010-01-01';
        }
        if (ngay_end === '') {
            ngay_end = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
        }
        let minDay = parseInt(ngay_start.split('-').join('')); // biến đổi thành số dạng 20210101 để so sánh khi tìm khen thuong
        let maxDay = parseInt(ngay_end.split('-').join(''));
        let id = req.params.id;
        let personList = await Person.find({ room: id }).populate('donvicongtac', { ten: 1 });
        let tongsokiluat = [];
        let tongsokiluatkhientrach = 0;
        let tongsokiluatcanhcao = 0;
        let tongsokiluatcachchuc = 0;
        let tongcongcanbobikiluat = [];
        for (person of personList) {
            let itemList = person.kiluatcanhan.filter(item => {
                let ngayQD = parseInt(item.ngayQD.split('-').join(''))
                return ngayQD >= minDay && ngayQD <= maxDay &&
                    item.noidungkiluat.toLowerCase().indexOf(noidungkiluat.toLowerCase()) !== -1 &&
                    item.hinhthuckiluat.toLowerCase().indexOf(hinhthuckiluat.toLowerCase()) !== -1;
            });
            if (itemList.length > 0) {
                itemList = itemList.map(item => {
                    if (item.hinhthuckiluat === "Khiển trách") {
                        tongsokiluatkhientrach += 1;
                    } else if (item.hinhthuckiluat === "Cảnh cáo") {
                        tongsokiluatcanhcao += 1;
                    } else {
                        tongsokiluatcachchuc += 1;
                    };
                    return {
                        _id: item._id,
                        soQD: item.soQD,
                        ngayQD: item.ngayQD.split('-').reverse().join('/'),
                        noidungkiluat: item.noidungkiluat,
                        hinhthuckiluat: item.hinhthuckiluat,
                        target: person.hoten
                    }
                });

                tongcongcanbobikiluat.push({
                    _id: person._id,
                    ten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    img: person.img,
                    donvicongtac: person.donvicongtac.ten,
                    soluot: itemList.length
                })
            }
            tongsokiluat = tongsokiluat.concat(itemList)
        };
        res.send({
            tongsokiluat,
            soluotkiluat: tongsokiluat.length,
            tongsokiluatkhientrach,
            tongsokiluatcanhcao,
            tongsokiluatcachchuc,
            tongcongcanbobikiluat
        })
    },


    danhsachDoiPage: async(req, res) => {
        try {
            let id = req.params.id;
            let phong = await Phong.findById(id);
            let doiList = await Doi.find({ donvicaptren: id }).populate('donvicaptren', { kyhieu: 1 });
            let danhsachdoi = []
            for (item of doiList) {
                let id1 = item._id;
                let bienche_doi = await Person.find({ donvicongtac: id1 });
                danhsachdoi.push({ ten: item.ten, bienche: bienche_doi.length, _id: item._id });
            }
            let totalCB = await Person.find({ room: id }, { hoten: 1, capbac: 1, chucvu: 1 });
            let allCB = totalCB.length;
            let nam = new Date().getFullYear();
            let nam1 = new Date().getFullYear();
            let phongList = await Phong.find().sort({ kyhieu: 1 });
            res.render('./user/danhsachdoi', { phongList, allCB, nam, nam1, phong, danhsachdoi })
        } catch (error) {
            console.log(error)
        }
    },
    danhsachCBCSPage: async(req, res) => {
        try {
            let id = req.params.id;
            let phong = await Phong.findById(id);
            let totalCB = await Person.find({ room: id }, { hoten: 1, capbac: 1, chucvu: 1 });
            let allCB = totalCB.length;
            let nam = new Date().getFullYear();
            let nam1 = new Date().getFullYear();
            let phongList = await Phong.find().sort({ kyhieu: 1 });
            res.render('./user/danhsachcanbo', { phongList, allCB, nam, nam1, phong })
        } catch (error) {
            console.log(error)
        }
    },
    getDanhsachCBCS: async(req, res) => {
        try {
            let { id, page } = req.params;
            let totalCB = await Person.find({ room: id })
            page = parseInt(page) || 1;
            let perPage = 25;
            let totalPage = Math.ceil(totalCB.length / perPage)
            let canboList = await Person.find({ room: id }, { hoten: 1, capbac: 1, chucvu: 1, ngaysinh: 1, dangvien: 1, sohieuCAND: 1 }).populate('donvicongtac', { ten: 1 }).sort({ donvicongtac: 1 }).skip((perPage * page) - perPage).limit(perPage);;
            res.send({
                canboList,
                page,
                totalPage,
                perPage
            })
        } catch (error) {
            console.log(error.message)
        }
    },

    khenthuongDoiPage: async(req, res) => {
        try {
            let { id, id1 } = req.params;
            let phong = await Phong.findById(id);
            let doi = await Doi.findById(id1);
            let totalCB = await Person.find({ donvicongtac: id1 });
            let allCB = totalCB.length;
            let nam = new Date().getFullYear();
            let nam1 = new Date().getFullYear();
            let date = new Date();
            let minInit = `${nam}-01-01`;
            let maxInit = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
            let phongList = await Phong.find().sort({ kyhieu: 1 });
            res.render('./user/theodoikhenthuongDoi', { phongList, allCB, nam, nam1, phong, doi, minInit, maxInit })
        } catch (error) {
            console.log(error)
        }
    },
    filterKhenthuongDoi: async(req, res) => {
        let {
            noidungkhenthuong,
            capkhenthuong,
            hinhthuckhenthuong,
            ngay_start,
            ngay_end
        } = req.query;
        let date = new Date();
        if (ngay_start === '') {
            ngay_start = '2010-01-01';
        }
        if (ngay_end === '') {
            ngay_end = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
        }
        let id = req.params.id;
        let doi = await Doi.findById(id).populate('donvicaptren')
        let minDay = parseInt(ngay_start.split('-').join('')); // biến đổi thành số dạng 20210101 để so sánh khi tìm khen thuong
        let maxDay = parseInt(ngay_end.split('-').join(''));
        let khenthuongdoi = []; //danh sách các lần khen thưởng cấp đội
        let tapthecanbochitiet = [];

        khenthuongdoi = doi.khenthuong.filter(item => {
            let ngayQD = parseInt(item.ngayQD.split('-').join(''))
            return ngayQD >= minDay && ngayQD <= maxDay &&
                item.noidungkhenthuong.toLowerCase().indexOf(noidungkhenthuong.toLowerCase()) !== -1 &&
                item.capkhenthuong.toLowerCase().indexOf(capkhenthuong.toLowerCase()) !== -1 &&
                item.hinhthuckhenthuong.toLowerCase().indexOf(hinhthuckhenthuong.toLowerCase()) !== -1;
        });
        if (khenthuongdoi.length > 0) {
            khenthuongdoi = khenthuongdoi.map(item => {
                return {
                    _id: item._id,
                    soQD: item.soQD,
                    ngayQD: item.ngayQD.split('-').reverse().join('/'),
                    noidungkhenthuong: item.noidungkhenthuong,
                    hinhthuckhenthuong: item.hinhthuckhenthuong,
                    capkhenthuong: item.capkhenthuong,
                    loaikhenthuong: 'Tập thể',
                    target: 'Tập thể đội'
                };
            })
        }


        let personList = await Person.find({ donvicongtac: id });
        let khenthuongperson = [];
        for (person of personList) {
            let itemList = person.khenthuongcanhan.filter(item => {
                let ngayQD = parseInt(item.ngayQD.split('-').join(''))
                return ngayQD >= minDay && ngayQD <= maxDay &&
                    item.noidungkhenthuong.toLowerCase().indexOf(noidungkhenthuong.toLowerCase()) !== -1 &&
                    item.capkhenthuong.toLowerCase().indexOf(capkhenthuong.toLowerCase()) !== -1 &&
                    item.hinhthuckhenthuong.toLowerCase().indexOf(hinhthuckhenthuong.toLowerCase()) !== -1;
            });
            if (itemList.length > 0) {
                itemList = itemList.map(item => {
                    return {
                        _id: item._id,
                        soQD: item.soQD,
                        ngayQD: item.ngayQD.split('-').reverse().join('/'),
                        noidungkhenthuong: item.noidungkhenthuong,
                        capkhenthuong: item.capkhenthuong,
                        hinhthuckhenthuong: item.hinhthuckhenthuong,
                        loaikhenthuong: 'Cá nhân',
                        target: person.hoten
                    }
                });

                tapthecanbochitiet.push({
                    _id: person._id,
                    ten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    img: person.img,
                    donvicongtac: person.donvicongtac.ten,
                    soluot: itemList.length
                })
            }
            khenthuongperson = khenthuongperson.concat(itemList)
        };
        let totalKhenthuongList = khenthuongperson.concat(khenthuongdoi);
        res.send({
            totalKhenthuongList: totalKhenthuongList,
            tongcongluotkhenthuong: totalKhenthuongList.length,
            soluotkhenthuongcapdoi: khenthuongdoi.length,
            soluotkhenthuongcanhan: khenthuongperson.length,
            tongsocanhanduockhenthuong: tapthecanbochitiet
        })
    },

    kiluatDoiPage: async(req, res) => {
        try {
            let { id, id1 } = req.params;
            let phong = await Phong.findById(id);
            let doi = await Doi.findById(id1);
            let totalCB = await Person.find({ donvicongtac: id1 });
            let allCB = totalCB.length;
            let nam = new Date().getFullYear();
            let nam1 = new Date().getFullYear();
            let date = new Date();
            let minInit = `${nam}-01-01`;
            let maxInit = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
            let phongList = await Phong.find().sort({ kyhieu: 1 });
            res.render('./user/theodoikiluatDoi', { phongList, allCB, nam, nam1, phong, doi, minInit, maxInit })
        } catch (error) {
            console.log(error)
        }
    },
    filterKiluatDoi: async(req, res) => {
        try {
            let {
                noidungkiluat,
                hinhthuckiluat,
                ngay_start,
                ngay_end
            } = req.query;
            let date = new Date();
            if (ngay_start === '') {
                ngay_start = '2010-01-01';
            }
            if (ngay_end === '') {
                ngay_end = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
            }
            let id = req.params.id;
            let minDay = parseInt(ngay_start.split('-').join('')); // biến đổi thành số dạng 20210101 để so sánh khi tìm khen thuong
            let maxDay = parseInt(ngay_end.split('-').join(''));
            let personList = await Person.find({ donvicongtac: id }, { hoten: 1, capbac: 1, chucvu: 1, img: 1, kiluatcanhan: 1, donvicongtac: 1 }).populate('donvicongtac', { ten: 1 })
            let tongsokiluat = [];
            let tongsokiluatkhientrach = 0;
            let tongsokiluatcanhcao = 0;
            let tongsokiluatcachchuc = 0;
            let tongcongcanbobikiluat = [];
            for (person of personList) {
                let itemList = person.kiluatcanhan.filter(item => {
                    let ngayQD = parseInt(item.ngayQD.split('-').join(''))
                    return ngayQD >= minDay && ngayQD <= maxDay &&
                        item.noidungkiluat.toLowerCase().indexOf(noidungkiluat.toLowerCase()) !== -1 &&
                        item.hinhthuckiluat.toLowerCase().indexOf(hinhthuckiluat.toLowerCase()) !== -1;
                });

                if (itemList.length > 0) {
                    itemList = itemList.map(item => {
                        if (item.hinhthuckiluat === "Khiển trách") {
                            tongsokiluatkhientrach += 1;
                        } else if (item.hinhthuckiluat === "Cảnh cáo") {
                            tongsokiluatcanhcao += 1;
                        } else {
                            tongsokiluatcachchuc += 1;
                        };
                        return {
                            _id: item._id,
                            soQD: item.soQD,
                            ngayQD: item.ngayQD.split('-').reverse().join('/'),
                            noidungkiluat: item.noidungkiluat,
                            hinhthuckiluat: item.hinhthuckiluat,
                            target: person.hoten
                        }
                    });

                    tongcongcanbobikiluat.push({
                        _id: person._id,
                        hoten: person.hoten,
                        capbac: person.capbac,
                        chucvu: person.chucvu,
                        img: person.img,
                        donvicongtac: person.donvicongtac.ten,
                        soluot: itemList.length
                    })
                }
                tongsokiluat = tongsokiluat.concat(itemList)
            };

            res.send({
                tongsokiluat,
                soluotkiluat: tongsokiluat.length,
                tongsokiluatkhientrach,
                tongsokiluatcanhcao,
                tongsokiluatcachchuc,
                tongcongcanbobikiluat
            })
        } catch (error) {
            console.log(error.message)
        }
    },

    thiduathangDoiPage: async(req, res) => {
        try {
            let { id, id1 } = req.params;
            let phong = await Phong.findById(id);
            let doi = await Doi.findById(id1);
            let totalCB = await Person.find({ donvicongtac: id1 });
            let allCB = totalCB.length;
            let nam = new Date().getFullYear();
            let nam1 = new Date().getFullYear();
            let phongList = await Phong.find().sort({ kyhieu: 1 });
            res.render('./user/thiduathangDoi', { phongList, allCB, nam, nam1, phong, doi })
        } catch (error) {
            console.log(error)
        }
    },

    filterThiduathangDoi: async(req, res) => {
        try {
            let nam = req.params.nam;
            let id = req.params.id;
            let personList = await Person.find({ donvicongtac: id }, { hoten: 1, chucvu: 1, thiduathang: 1 });
            for (person of personList) {
                let checkedNam = person.thiduathang.filter(i => i.nam === parseInt(nam));
                if (checkedNam.length === 0) { //Trường hợp năm ý chưa có thi đua tháng nào trong db
                    person.thiduathang = [{
                        nam: nam,
                        thang1: { flag: '' },
                        thang2: { flag: '' },
                        thang3: { flag: '' },
                        thang4: { flag: '' },
                        thang5: { flag: '' },
                        thang6: { flag: '' },
                        thang7: { flag: '' },
                        thang8: { flag: '' },
                        thang9: { flag: '' },
                        thang10: { flag: '' },
                        thang11: { flag: '' },
                        thang12: { flag: '' }
                    }]
                } else {
                    let check1 = checkedNam.map(i => i);
                    for (let i = 1; i <= 12; i++) {
                        if (check1[0][`thang${i}`].flag === undefined && check1[0][`thang${i}`].ghichu === undefined) { // k được dùng toán tử spread ... cho các object collection mongoose
                            check1[0][`thang${i}`] = { flag: '' }
                        } else if (check1[0][`thang${i}`].flag === undefined && check1[0][`thang${i}`].ghichu !== undefined) {
                            check1[0][`thang${i}`] = { flag: '', ghichu: check1[0][`thang${i}`].ghichu }
                        }
                    };
                    person.thiduathang = check1;
                }
            };
            res.send(personList)
        } catch (error) {
            console.log(error.message)
        }
    },

    thiduanamDoiPage: async(req, res) => {
        try {
            let { id, id1 } = req.params;
            let phong = await Phong.findById(id);
            let doi = await Doi.findById(id1);
            let totalCB = await Person.find({ donvicongtac: id1 });
            let allCB = totalCB.length;
            let nam = new Date().getFullYear();
            let nam1 = new Date().getFullYear();
            let phongList = await Phong.find().sort({ kyhieu: 1 });
            res.render('./user/thiduanamDoi', { phongList, allCB, nam, nam1, phong, doi })
        } catch (error) {
            console.log(error)
        }
    },

    filterThiduanamDoi: async(req, res) => {
        let nam = req.params.nam;
        let id = req.params.id;
        let personList = await Person.find({ donvicongtac: id }, { hoten: 1, chucvu: 1, thiduanam: 1 });
        for (person of personList) {
            let checkedNam = person.thiduanam.filter(i => i.nam === parseInt(nam));
            if (checkedNam.length === 0) { //Trường hợp năm ý chưa có thi đua tháng nào trong db
                person.thiduanam = [{
                    nam: nam,
                    dangkithidua: '',
                    xeploai: '',
                    ghichu: ''
                }]
            } else {
                person.thiduanam = checkedNam;
            }
        };
        res.send(personList)
    },
    xeploaidangvienDoiPage: async(req, res) => {
        try {
            let { id, id1 } = req.params;
            let phong = await Phong.findById(id);
            let doi = await Doi.findById(id1);
            let totalCB = await Person.find({ donvicongtac: id1 });
            let allCB = totalCB.length;
            let nam = new Date().getFullYear();
            let nam1 = new Date().getFullYear();
            let phongList = await Phong.find().sort({ kyhieu: 1 });
            res.render('./user/xeploaidangvienDoi', { phongList, allCB, nam, nam1, phong, doi })
        } catch (error) {
            console.log(error)
        }
    },


    filterDangvienDoi: async(req, res) => {
        let nam = req.params.nam;
        let id = req.params.id;
        let personList = await Person.find({ donvicongtac: id }, { hoten: 1, chucvu: 1, thiduanam: 1 });
        for (person of personList) {
            let checkedNam = person.thiduanam.filter(i => i.nam === parseInt(nam));
            if (checkedNam.length === 0) { //Trường hợp năm ý chưa có thi đua tháng nào trong db
                person.thiduanam = [{
                    nam: nam,
                    dangkixeploaidangvien: '',
                    xeploaidangvien: '',
                }]
            } else {
                person.thiduanam = checkedNam;
            }
        };
        res.send(personList)
    },

    trangcanhan: async(req, res) => {
        try {
            let id = req.params.id;
            let canbo = await Person.findById(id).populate('room', { ten: 1, _id: 1 }).populate('donvicongtac', { ten: 1, _id: 1 });
            let phongList = await Phong.find()
            let phong = canbo.room;
            let doi = canbo.donvicongtac;
            canbo.khenthuongcanhan.sort(function(a, b) {
                var aa = a.ngayQD.split('-').join(),
                    bb = b.ngayQD.split('-').join();
                return bb < aa ? -1 : (aa > bb ? 1 : 0);
            });
            canbo.kiluatcanhan.sort(function(a, b) {
                var aa = a.ngayQD.split('-').join(),
                    bb = b.ngayQD.split('-').join();
                return bb < aa ? -1 : (aa > bb ? 1 : 0);
            });
            canbo.thiduanam.sort((a, b) => b.nam - a.nam);
            canbo.thiduathang.sort((a, b) => b.nam - a.nam)
            res.render('./user/trangcanhan', { phong, doi, canbo, phongList })
        } catch (error) {
            console.log(error.message)
        }
    },


    // Công tác tuyen truyền
    cuocthituyentruyenPage: async(req, res) => {
        let phongList = await Phong.find().sort({ kyhieu: 1 });
        let date = new Date();
        let nam = new Date().getFullYear();
        let max = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
        let min = `${nam}-01-01`;
        res.render('./user/cuocthituyentruyen', { phongList, min, max })
    },
    filterCuocthituyentruyen: async(req, res) => {
        let { ten, diadiemtochuc, captochuc, ketqua, trichyeu, ngay_start, ngay_end } = req.query;
        let date = new Date();
        if (ngay_start === '') {
            ngay_start = '2010-01-01';
        }
        if (ngay_end === '') {
            ngay_end = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
        }
        let minDay = parseInt(ngay_start.split('-').join('')); // biến đổi thành số dạng 20210101 để so sánh khi tìm khen thuong
        let maxDay = parseInt(ngay_end.split('-').join(''));
        let list = await Cuocthi.find().sort({ ngaytochuc: -1 });
        let data = list.filter(item => {
            let ngaytochuc = parseInt(item.ngaytochuc.split('-').join(''))
            return ngaytochuc >= minDay && ngaytochuc <= maxDay &&
                item.ten.toLowerCase().indexOf(ten.toLowerCase()) !== -1 &&
                item.diadiemtochuc.toLowerCase().indexOf(diadiemtochuc.toLowerCase()) !== -1 &&
                item.captochuc.toLowerCase().indexOf(captochuc.toLowerCase()) !== -1 &&
                item.ketqua.toLowerCase().indexOf(ketqua.toLowerCase()) !== -1 &&
                item.trichyeu.toLowerCase().indexOf(trichyeu.toLowerCase()) !== -1
        });
        res.send(data)
    },

    tinbaiPage: async(req, res) => {
        let phongList = await Phong.find().sort({ kyhieu: 1 });
        let date = new Date();
        let nam = new Date().getFullYear();
        let max = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
        let min = `${nam}-01-01`;
        let chuyenmucList = await Chuyenmuc.find();
        let muctinList = [];
        for (let item of chuyenmucList) {
            item.muctinList.forEach(i => {
                muctinList.push({ _id: i._id, muctin: i.muctin, chuyenmuc: item._id })
            })
        };
        res.render('./user/tinbaiphongsu', { phongList, min, max, chuyenmucList, muctinList })
    },

    filterTinbaiChung: async(req, res) => {
        try {
            let { min, max } = req.query;
            let minDay = parseInt(min.split('-').join('')); // biến đổi thành số dạng 20210101 để so sánh khi tìm khen thuong
            let maxDay = parseInt(max.split('-').join(''));


            let result = [];
            let chuyenmucData = [];
            let tinbaiList = [];
            let phoihopbaocuatinh = 0;
            let phoihopdoanthanhnien = 0;
            let phoihophoiphunu = 0;
            let phoihopcahuyen = 0;
            let phoihopvoibo = 0;
            let phoihopnganhngoai = 0;
            let khongphoihop = 0;

            let chuyenmucList = await Chuyenmuc.find().sort({ tenchuyenmuc: 1 });
            chuyenmucList.forEach(chuyenmuc => {
                let total = 0;
                chuyenmuc.muctinList.forEach(muctin => {
                    let checkedTinbai = muctin.tinbai.filter(tinbai => { // trả về các tin bài được đăng trong năm year
                        return tinbai.ngaydang.split('-').join('') >= minDay && tinbai.ngaydang.split('-').join('') <= maxDay
                    });
                    result.push({ muctin: muctin.muctin, sotinbai: checkedTinbai.length })
                    tinbaiList = tinbaiList.concat(checkedTinbai)
                    total += checkedTinbai.length;
                });
                chuyenmucData.push({
                    tenchuyenmuc: chuyenmuc.tenchuyenmuc,
                    sotinbai: total
                })
            });
            tinbaiList.forEach(i => {
                if (i.donviphoihop === 'Báo đài của tỉnh Hưng Yên') {
                    phoihopbaocuatinh += 1;
                } else if (i.donviphoihop === 'Đoàn thanh niên Công an tỉnh') {
                    phoihopdoanthanhnien += 1;
                } else if (i.donviphoihop === 'Hội phụ nữ Công an tỉnh') {
                    phoihophoiphunu += 1;
                } else if (i.donviphoihop === 'Công an các huyện, thị xã, thành phố') {
                    phoihopcahuyen += 1;
                } else if (i.donviphoihop === 'Bộ Công an, các đơn vị trực thuộc Bộ') {
                    phoihopvoibo += 1;
                } else if (i.donviphoihop === 'Truyền thông các Bộ, ngành, địa phương ngoài ngành Công an') {
                    phoihopnganhngoai += 1;
                } else {
                    khongphoihop += 1;
                }
            });
            let total = tinbaiList.length;
            tinbaiList = tinbaiList.sort(function(a, b) {
                var aa = a.ngaydang.split('-').join(''),
                    bb = b.ngaydang.split('-').join('');
                return bb < aa ? -1 : (aa > bb ? 1 : 0);
            });
            res.send({
                result,
                tinbaiList,
                phoihopbaocuatinh,
                phoihopdoanthanhnien,
                phoihophoiphunu,
                phoihopcahuyen,
                phoihopvoibo,
                phoihopnganhngoai,
                khongphoihop,
                total,
                chuyenmucData
            })

        } catch (error) {
            console.log(error.message)
        }
    },
    filterTinbaiNangcao: async(req, res) => {
        try {
            let result = [];
            let { chuyenmuc, tieude, trichyeunoidung, tacgia, donviphoihop, muctin, ngay_start, ngay_end } = req.query;

            let date = new Date();
            if (ngay_start === '') {
                ngay_start = '2010-01-01';
            }
            if (ngay_end === '') {
                ngay_end = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
            }
            let minDay = parseInt(ngay_start.split('-').join('')); // biến đổi thành số dạng 20210101 để so sánh khi tìm khen thuong
            let maxDay = parseInt(ngay_end.split('-').join(''));
            let chuyenmucList = await Chuyenmuc.find();
            let checkedChuyenmuc = chuyenmucList.filter(item => item._id.toString().indexOf(chuyenmuc) !== -1);

            if (checkedChuyenmuc.length > 0) {
                for (let chuyenmuc of checkedChuyenmuc) {
                    let checkedMuctin = chuyenmuc.muctinList.filter(i => {
                        return i._id.toString().indexOf(muctin) !== -1
                    });
                    if (checkedMuctin.length > 0) {
                        for (let i of checkedMuctin) {
                            let checkedTinbai = i.tinbai.filter(e => {
                                let ngaydang = parseInt(e.ngaydang.split('-').join(''))
                                return ngaydang >= minDay && ngaydang <= maxDay &&
                                    e.tieude.toLowerCase().indexOf(tieude.toLowerCase()) !== -1 &&
                                    e.trichyeunoidung.toLowerCase().indexOf(trichyeunoidung.toLowerCase()) !== -1 &&
                                    e.tacgia.toLowerCase().indexOf(tacgia.toLowerCase()) !== -1 &&
                                    e.donviphoihop.toLowerCase().indexOf(donviphoihop.toLowerCase()) !== -1
                            });
                            if (checkedTinbai.length > 0) {
                                result = result.concat(checkedTinbai);
                                result = result.sort(function(a, b) {
                                    var aa = a.ngaydang.split('-').join(''),
                                        bb = b.ngaydang.split('-').join('');
                                    return bb < aa ? -1 : (aa > bb ? 1 : 0);
                                });
                            }
                        }
                    }
                };
                res.send(result)
            } else {
                res.send(result)
            }
        } catch (error) {
            console.log(error.message)
        }
    },

    //Văn hóa văn nghệ
    cuocthiVannghePage: async(req, res) => {
        let phongList = await Phong.find().sort({ kyhieu: 1 });
        let date = new Date();
        let nam = new Date().getFullYear();
        let max = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
        let min = `${nam}-01-01`;
        res.render('./user/cuocthivannghe', { phongList, min, max })
    },
    filterCuocthiVannghe: async(req, res) => {
        let { ten, diadiemtochuc, captochuc, ketqua, ngay_start, ngay_end } = req.query;
        let date = new Date();
        if (ngay_start === '') {
            ngay_start = '2010-01-01';
        }
        if (ngay_end === '') {
            ngay_end = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
        }
        let minDay = parseInt(ngay_start.split('-').join('')); // biến đổi thành số dạng 20210101 để so sánh khi tìm khen thuong
        let maxDay = parseInt(ngay_end.split('-').join(''));
        let list = await GiaiVannghe.find().sort({ ngaytochuc: -1 });
        let data = [];
        data = list.filter(item => {
            let ngaytochuc = parseInt(item.ngaytochuc.split('-').join(''))
            return ngaytochuc >= minDay && ngaytochuc <= maxDay &&
                item.tengiai.toLowerCase().indexOf(ten.toLowerCase()) !== -1 &&
                item.diadiemtochuc.toLowerCase().indexOf(diadiemtochuc.toLowerCase()) !== -1 &&
                item.donvitochuc.toLowerCase().indexOf(captochuc.toLowerCase()) !== -1 &&
                item.ketqua.toLowerCase().indexOf(ketqua.toLowerCase()) !== -1
        });

        res.send(data)
    },
    //Văn hóa văn nghệ
    cuocthiThethaoPage: async(req, res) => {
        let phongList = await Phong.find().sort({ kyhieu: 1 });
        let date = new Date();
        let nam = new Date().getFullYear();
        let max = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
        let min = `${nam}-01-01`;
        res.render('./user/cuocthithethao', { phongList, min, max })
    },
    filterCuocthiThethao: async(req, res) => {
        let { ten, diadiemtochuc, captochuc, ketqua, ngay_start, ngay_end } = req.query;
        let date = new Date();
        if (ngay_start === '') {
            ngay_start = '2010-01-01';
        }
        if (ngay_end === '') {
            ngay_end = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
        }
        let minDay = parseInt(ngay_start.split('-').join('')); // biến đổi thành số dạng 20210101 để so sánh khi tìm khen thuong
        let maxDay = parseInt(ngay_end.split('-').join(''));
        let list = await GiaiThethao.find().sort({ ngaytochuc: -1 });
        let data = [];
        data = list.filter(item => {
            let ngaytochuc = parseInt(item.ngaytochuc.split('-').join(''))
            return ngaytochuc >= minDay && ngaytochuc <= maxDay &&
                item.tengiai.toLowerCase().indexOf(ten.toLowerCase()) !== -1 &&
                item.diadiemtochuc.toLowerCase().indexOf(diadiemtochuc.toLowerCase()) !== -1 &&
                item.donvitochuc.toLowerCase().indexOf(captochuc.toLowerCase()) !== -1 &&
                item.ketqua.toLowerCase().indexOf(ketqua.toLowerCase()) !== -1
        });

        res.send(data)
    },

    canhanVannghePage: async(req, res) => {
        try {
            let nam = new Date().getFullYear();
            let phongList = await Phong.find().sort({ kyhieu: 1 });
            let loaihinhList = await Vannghe.find().sort({ monthethao: 1 })
            res.render('./user/danhsachcanhanvannghe', { phongList, nam, loaihinhList })
        } catch (error) {
            console.log(error)
        }
    },

    filterCanhanVannghe: async(req, res) => {
        let { loaihinh, nam } = req.query;
        let list = [];
        let monthethao = await Vannghe.findById(loaihinh);
        let checkedNam = monthethao.hotList.find(i => i.nam == nam);
        if (checkedNam === undefined) {
            return res.send([])
        } else {
            if (checkedNam.persons.length > 0) {
                for (i of checkedNam.persons) {
                    let canbo = await Person.findById(i)
                        .populate('donvicongtac', { ten: 1 })
                        .populate('room', { ten: 1 });
                    list.push(canbo)
                }
            }
        }
        res.send(list)
    },
    canhanThethaoPage: async(req, res) => {
        try {
            let nam = new Date().getFullYear();
            let phongList = await Phong.find().sort({ kyhieu: 1 });
            let loaihinhList = await Thethao.find().sort({ monthethao: 1 })
            res.render('./user/danhsachcanhanthethao', { phongList, nam, loaihinhList })
        } catch (error) {
            console.log(error)
        }
    },

    filterCanhanThethao: async(req, res) => {
        let { loaihinh, nam } = req.query;
        let list = [];
        let monthethao = await Thethao.findById(loaihinh);
        let checkedNam = monthethao.hotList.find(i => i.nam == nam);
        if (checkedNam === undefined) {
            return res.send([])
        } else {
            if (checkedNam.persons.length > 0) {
                for (i of checkedNam.persons) {
                    let canbo = await Person.findById(i)
                        .populate('donvicongtac', { ten: 1 })
                        .populate('room', { ten: 1 });
                    list.push(canbo)
                }
            }
        }
        res.send(list)
    },

    hoatdongnoibatPage: async(req, res) => {
        try {
            let nam = new Date().getFullYear();
            let phongList = await Phong.find().sort({ kyhieu: 1 });
            res.render('./user/hoatdongnoibat', { phongList, nam })
        } catch (error) {
            console.log(error)
        }
    },

    filterHoatdong: async(req, res) => {
        let nam = parseInt(req.query.nam);
        let checkNam = await HoatdongTieubieu.findOne({ nam: nam });
        if (checkNam === null) {
            return res.send([])
        } else {
            let data = checkNam.list;
            res.send(data)
        }
    },

    dieulenhpx03Page: async(req, res) => {
        try {
            let nam = new Date().getFullYear();
            let date = new Date();
            let minInit = `${nam}-01-01`;
            let maxInit = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
            let phongList = await Phong.find().sort({ kyhieu: 1 });
            res.render('./user/kiemtradieulenhPx03', { phongList, nam, minInit, maxInit })
        } catch (error) {
            console.log(error)
        }
    },
    filterKiemtraPx03: async(req, res) => {
        try {
            let { ngay_start, ngay_end, donviduockiemtra, ketqua, xuli } = req.query // khoảng thời gian thống kê
            let date = new Date();
            if (ngay_start === '') {
                ngay_start = '2010-01-01';
            }
            if (ngay_end === '') {
                ngay_end = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
            }
            ngay_start += 'T00:00'; //ngày tính từ lúc 0h
            ngay_end += 'T23:59' //kết thúc ngày là 23h59
            let ketquaList = await DieulenhCAT.find({ thoigian: { $gte: ngay_start, $lte: ngay_end } }).sort({ thoigian: -1 })
            let result = [];
            result = ketquaList.filter(item => {
                return item.donviduockiemtra.toLowerCase().indexOf(donviduockiemtra.toLowerCase()) !== -1 &&
                    item.ketqua.toLowerCase().indexOf(ketqua.toLowerCase()) !== -1 &&
                    item.xuli.toLowerCase().indexOf(xuli.toLowerCase()) !== -1
            });
            res.send(result)
        } catch (error) {
            console.lod(error.message)
        }
    },
    kiemtratinhhuongPage: async(req, res) => {
        try {
            let nam = new Date().getFullYear();
            let date = new Date();
            let minInit = `${nam}-01-01`;
            let tinhhuongList = await Tinhhuong.find()
            let maxInit = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
            let phongList = await Phong.find().sort({ kyhieu: 1 });
            res.render('./user/kiemtratinhhuong', { phongList, nam, minInit, maxInit, tinhhuongList })
        } catch (error) {
            console.log(error)
        }
    },
    filterKiemtratinhhuong: async(req, res) => {
        try {
            let { ngay_start, ngay_end, donviduockiemtra, ketqua, xuli, tinhhuong } = req.query // khoảng thời gian thống kê
            let date = new Date();
            if (ngay_start === '') {
                ngay_start = '2010-01-01';
            }
            if (ngay_end === '') {
                ngay_end = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
            }
            ngay_start += 'T00:00'; //ngày tính từ lúc 0h
            ngay_end += 'T23:59' //kết thúc ngày là 23h59
            let ketquaList = await KiemtraTinhhuong.find({ thoigian: { $gte: ngay_start, $lte: ngay_end } }).sort({ thoigian: -1 }).populate('tinhhuong', { ten: 1, _id: 1 }).populate('donviduockiemtra', { ten: 1, donvicaptren: 1 })
            let result = [];
            result = ketquaList.filter(item => {
                return item.donviduockiemtra.ten.toLowerCase().indexOf(donviduockiemtra.toLowerCase()) !== -1 &&
                    item.ketqua.toLowerCase().indexOf(ketqua.toLowerCase()) !== -1 &&
                    item.tinhhuong._id.toString().toLowerCase().indexOf(tinhhuong.toLowerCase()) !== -1 &&
                    item.xuli.toLowerCase().indexOf(xuli.toLowerCase()) !== -1
            });
            res.send(result)
        } catch (error) {
            console.log(error.message)
        }
    },

    kiemtrathelucPage: async(req, res) => {
        try {
            let nam = new Date().getFullYear();
            let phongList = await Phong.find().sort({ kyhieu: 1 });
            res.render('./user/kiemtratheluc', { phongList, nam })
        } catch (error) {
            console.log(error)
        }
    },
    filterKiemtratheluc: async(req, res) => {
        let nam = req.query.nam;
        let result = await Theluc.find({ nam: nam }).populate('donviduockiemtra', { kyhieu: 1 });
        res.send(result)
    },
    kiemtrabansungPage: async(req, res) => {
        try {
            let nam = new Date().getFullYear();
            let phongList = await Phong.find().sort({ kyhieu: 1 });
            res.render('./user/kiemtrabansung', { phongList, nam })
        } catch (error) {
            console.log(error)
        }
    },
    filterKiemtrabansung: async(req, res) => {
        let nam = req.query.nam;
        let result = await Bansung.find({ nam: nam }).populate('donviduockiemtra', { kyhieu: 1 });
        res.send(result)
    },
    kiemtraquansuPage: async(req, res) => {
        try {
            let nam = new Date().getFullYear();
            let phongList = await Phong.find().sort({ kyhieu: 1 });
            res.render('./user/kiemtraquansu', { phongList, nam })
        } catch (error) {
            console.log(error)
        }
    },
    filterKiemtradieulenhquansu: async(req, res) => {
        let nam = req.query.nam;
        let result = await Quansu.find({ nam: nam }).populate('donviduockiemtra', { kyhieu: 1 });
        res.send(result)
    },
    // danh sách k đạt chung
    filterDanhsachKhongdat: async(req, res) => {
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
    searchCanbo: async(req, res) => {

        let { hoten, capbac, donvi } = req.query;
        let result = [];
        let allPersons = await Person.find().populate('room', { _id: 1, kyhieu: 1 }).sort({ hoten: -1 });
        if (capbac !== "all" && donvi === "all") {
            result = allPersons.filter(function(person) {
                return person.hoten.toLowerCase().indexOf(hoten.toLowerCase()) !== -1 && person.capbac === capbac;
            });
            res.send(result)
            return;
        };
        if (capbac === "all" && donvi !== "all") {
            result = allPersons.filter(function(person) {
                return person.hoten.toLowerCase().indexOf(hoten.toLowerCase()) !== -1 && person.room._id == donvi;
            });
            res.send(result);
            return;
        };
        if (capbac !== "all" && donvi !== "all") {
            result = allPersons.filter(function(person) {
                return person.hoten.toLowerCase().indexOf(hoten.toLowerCase()) !== -1 && person.capbac === capbac && person.room._id == donvi;
            });
            res.send(result)
            return;
        };
        if (capbac === "all" && donvi === "all") {
            result = allPersons.filter(function(person) {
                return person.hoten.toLowerCase().indexOf(hoten.toLowerCase()) !== -1;
            });
            res.send(result)
            return;
        };
    },
}