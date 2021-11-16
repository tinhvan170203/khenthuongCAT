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
    trangchuPage: async(req, res) => {
        let date = new Date()
        let nam = new Date().getFullYear();
        let minInit = `${nam}-01-01`;
        let maxInit = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
        let namthiduanam = new Date().getFullYear();
        let canboTotal = await Person.find();
        let mohinhList = await MohinhVNTT.find({ trangthai: true }).sort({ index: 1 })
        let totalDangvien = await Person.find({ dangvien: 'true' });
        let phongList = await Phong.find().sort({ kyhieu: 1 });
        let Bangiamdoc = await Phong.findOne({ kyhieu: 'LĐCAT' });
        let persons = await Person.find({ room: Bangiamdoc._id }).sort({
            ngaysinh: 1
        });
        let lanhdao = persons.map(person => {
            return {
                _id: person._id,
                hoten: person.hoten,
                capbac: person.capbac,
                ngaysinh: person.ngaysinh,
                chucvu: person.chucvu,
                img: person.img
            }
        })
        lanhdao = lanhdao.sort((a, b) => {
            return a.chucvu - b.chucvu
        })
        res.render('./client/trangchu', {
            totalCanbo: canboTotal.length,
            lanhdao,
            mohinhList,
            nam,
            namthiduanam,
            nam1: nam - 1,
            nam2: nam - 1,
            nam3: nam - 1,
            nam4: nam - 1,
            namdangvien: nam,
            totalDangvien: totalDangvien.length,
            maxInit,
            minInit,
            phongList
        })
    },
    filterVianninh: async(req, res) => {
        let nam = req.params.nam;
        let phongList = await Phong.find({}, { ten: 1, thiduanam: 1 }).sort({ kyhieu: 1 });
        let result = [];
        phongList.forEach(i => {
            let thiduanam = i.thiduanam.find(el => {
                return el.nam === parseInt(nam)
            });
            if (thiduanam === undefined) {
                thiduanam = { xeploai: '', ghichu: '' }
            }
            result.push({
                donvi: i.ten,
                thiduanam: thiduanam
            })
        });
        res.send(result)
    },
    thongkeThiduathang: async(req, res) => {
        let nam = req.params.nam;
        var allPerson = [];
        if (req.query.id === undefined) {
            allPerson = await Person.find().populate('donvicongtac', { ten: 1 }).populate('room', { ten: 1, kyhieu: 1 }).sort({ hoten: 1 });
        } else {
            let id = mongoose.Types.ObjectId(req.query.id);
            allPerson = await Person.find({ room: id }).populate('room', { ten: 1, kyhieu: 1 }).sort({ donvicongtac: 1 }).populate('donvicongtac', { ten: 1 })
        };
        let soluong = [];
        let list = [];
        for (let i = 1; i <= 12; i++) {
            let red = 0;
            let blue = 0;
            let yellow = 0;
            let thang = "thang" + i; // tạo thang1, thang2, thang3.. qua các vòng lặp
            list.push({
                [thang]: []
            });

            for (person of allPerson) {
                let x = person.thiduathang.find(function(e) {
                    return e.nam == parseInt(nam)
                });
                if (x === undefined) {
                    x = {
                        nam: nam,
                        [thang]: ''
                    }
                };
                let thangValue = x[`thang${i}`]; //lấy giá trị tháng tương ứng
                if (thangValue.flag === "đỏ") {
                    red += 1
                };
                if (thangValue.flag === "xanh") {
                    blue += 1;
                    list[i - 1][`thang${i}`].push(person);
                };
                if (thangValue.flag === "vàng") {
                    yellow += 1;
                    list[i - 1][`thang${i}`].push(person);
                };
            }
            soluong.push({
                [thang]: { red: red, blue: blue, yellow: yellow }
            })
        } //[thang] đặt key là tháng tăng dần
        res.send({ soluong, list })
    },
    filterThiduathang: async(req, res) => {
        let query = req.params.query;
        let index = query.indexOf('-');
        let start = query.slice(0, index);
        let end = query.slice(index + 1);
        let nam = req.params.nam;
        var allPerson = [];
        if (req.query.id === undefined) {
            allPerson = await Person.find().populate('donvicongtac', { ten: 1 }).populate('room', { ten: 1, kyhieu: 1 }).sort({ hoten: 1 });
        } else {
            let id = mongoose.Types.ObjectId(req.query.id);
            allPerson = await Person.find({ room: id }).populate('room', { ten: 1, kyhieu: 1 }).sort({ donvicongtac: 1 }).populate('donvicongtac', { ten: 1 })
        };
        let list = {
            blue: [],
            yellow: []
        };
        let listGopBlue = []; //danh sách cán bộ cờ xanh
        let listGopYellow = []; //danh sách cán bộ cờ vàng
        for (let i = start; i <= end; i++) {
            let thang = "thang" + i; // tạo thang1, thang2, thang3.. qua các vòng lặp
            for (person of allPerson) {
                let x = person.thiduathang.find(function(e) {
                    return e.nam == parseInt(nam)
                });
                if (x === undefined) {
                    x = {
                        nam: nam,
                        [thang]: ''
                    }
                };
                let thangValue = x[`thang${i}`]; //lấy giá trị tháng tương ứng
                if (thangValue.flag === "xanh") {
                    list.blue.push({ _id: person._id, hoten: person.hoten, capbac: person.capbac, chucvu: person.chucvu, room: person.room.kyhieu, donvicongtac: person.donvicongtac.ten });
                };
                if (thangValue.flag === "vàng") {
                    list.yellow.push({ _id: person._id, hoten: person.hoten, capbac: person.capbac, chucvu: person.chucvu, room: person.room.kyhieu, donvicongtac: person.donvicongtac.ten });
                };
            }
        }; //[thang] đặt key là tháng tăng dần

        let xeploaikemList = list.blue.concat(list.yellow);
        // cán bộ có ít nhất 2 lần k đạt xếp loại cờ đỏ 
        let two_noneRedList = [];
        for (let a of xeploaikemList) {
            let el = xeploaikemList.filter((i) => {
                return i._id === a._id;
            });
            if (el.length > 1) {
                two_noneRedList.push(a);
                xeploaikemList = xeploaikemList.filter((x) => {
                    return x._id !== el[0]._id;
                });
            };
        }

        listGopBlue = _.uniqWith(list.blue, _.isEqual); // rút gọn lại , loại bỏ những phần tử giống nhau trong mảng
        listGopYellow = _.uniqWith(list.yellow, _.isEqual);
        let soluong = {
            coxanh: list.blue.length,
            covang: list.yellow.length
        }
        list = {
            blue: listGopBlue,
            yellow: listGopYellow
        };
        let listRate = listGopBlue.concat(listGopYellow); // cán bộ, chiến sĩ bịcả vàng hoặc xanh để đưa vào biểu đồ tỉ lệ thi đua tháng
        listRate = _.uniqWith(listRate, _.isEqual);
        res.send({ list, total: allPerson.length, soluong, two_noneRedList, listRate })
    },

    thongkeThiduanam: async(req, res) => {
        let nam = req.params.nam;
        let allPerson = [];
        if (req.query.id === undefined) {
            allPerson = await Person.find().populate('donvicongtac', { ten: 1 }).populate('room', { ten: 1, kyhieu: 1 }).sort({ hoten: 1 });
        } else {
            let id = mongoose.Types.ObjectId(req.query.id);
            allPerson = await Person.find({ room: id }).populate('room', { ten: 1, kyhieu: 1 }).populate('donvicongtac', { ten: 1 }).sort({ donvicongtac: 1 }).populate('donvicongtac', { ten: 1 })
        };

        let dangki_chiensitientienList = [];
        let dangki_chiensithiduaList = [];
        let dangki_hoanthanhnhiemvuList = [];
        let dangki_khonghoanthanhnhiemvuList = [];
        let dangki_chuacodulieuList = [];
        let xeploai_chuacodulieuList = [];
        let xeploai_chiensithiduaList = [];
        let xeploai_chiensitientienList = [];
        let xeploai_hoanthanhnhiemvuList = [];
        let xeploai_khonghoanthanhnhiemvuList = [];

        for (person of allPerson) {
            let x = person.thiduanam.find(function(e) {
                return e.nam == parseInt(nam)
            });
            if (x === undefined) {
                x = {
                    nam: nam,
                    dangkithidua: '',
                    xeploai: ''
                }
            };
            if (x.dangkithidua === "Chiến sĩ tiên tiến") {
                dangki_chiensitientienList.push({
                    _id: person._id,
                    hoten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    room: person.room.kyhieu,
                    donvicongtac: person.donvicongtac.ten
                })
            } else if (x.dangkithidua === "Chiến sĩ thi đua") {
                dangki_chiensithiduaList.push({
                    _id: person._id,
                    hoten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    room: person.room.kyhieu,
                    donvicongtac: person.donvicongtac.ten
                })
            } else if (x.dangkithidua === "Hoàn thành nhiệm vụ") {
                dangki_hoanthanhnhiemvuList.push({
                    _id: person._id,
                    hoten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    room: person.room.kyhieu,
                    donvicongtac: person.donvicongtac.ten
                })
            } else if (x.dangkithidua === "Không hoàn thành nhiệm vụ") {
                dangki_khonghoanthanhnhiemvuList.push({
                    _id: person._id,
                    hoten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    room: person.room.kyhieu,
                    donvicongtac: person.donvicongtac.ten
                })
            } else {
                dangki_chuacodulieuList.push({
                    _id: person._id,
                    hoten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    room: person.room.kyhieu,
                    donvicongtac: person.donvicongtac.ten
                })
            };


            if (x.xeploai === "Chiến sĩ tiên tiến") {
                xeploai_chiensitientienList.push({
                    _id: person._id,
                    hoten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    room: person.room.kyhieu,
                    donvicongtac: person.donvicongtac.ten
                })
            } else if (x.xeploai === "Chiến sĩ thi đua") {
                xeploai_chiensithiduaList.push({
                    _id: person._id,
                    hoten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    room: person.room.kyhieu,
                    donvicongtac: person.donvicongtac.ten
                })
            } else if (x.xeploai === "Hoàn thành nhiệm vụ") {
                xeploai_hoanthanhnhiemvuList.push({
                    _id: person._id,
                    hoten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    room: person.room.kyhieu,
                    donvicongtac: person.donvicongtac.ten
                })
            } else if (x.xeploai === "Không hoàn thành nhiệm vụ") {
                xeploai_khonghoanthanhnhiemvuList.push({
                    _id: person._id,
                    hoten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    room: person.room.kyhieu,
                    donvicongtac: person.donvicongtac.ten
                })
            } else {
                xeploai_chuacodulieuList.push({
                    _id: person._id,
                    hoten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    room: person.room.kyhieu,
                    donvicongtac: person.donvicongtac.ten
                })
            }
        }
        res.send({
            xeploai_chuacodulieuList: xeploai_chuacodulieuList.length,
            xeploai_chiensitientienList: xeploai_chiensitientienList.length,
            xeploai_chiensithiduaList: xeploai_chiensithiduaList.length,
            xeploai_khonghoanthanhnhiemvuList: xeploai_khonghoanthanhnhiemvuList.length,
            xeploai_hoanthanhnhiemvuList: xeploai_hoanthanhnhiemvuList.length,
            dangki_chiensitientienList: dangki_chiensitientienList.length,
            dangki_chiensithiduaList: dangki_chiensithiduaList.length,
            dangki_chuacodulieuList: dangki_chuacodulieuList.length,
            dangki_hoanthanhnhiemvuList: dangki_hoanthanhnhiemvuList.length,
            dangki_khonghoanthanhnhiemvuList: dangki_khonghoanthanhnhiemvuList.length,
        })
    },
    filterThiduanamCaseOne: async(req, res) => {
        let nam = req.params.nam;
        let fieldFilter = req.query.fieldFilter;
        let allPerson = [];
        let result = [];
        if (req.query.id === undefined) {
            allPerson = await Person.find().populate('donvicongtac', { ten: 1 }).populate('room', { ten: 1, kyhieu: 1 }).sort({ hoten: 1 });
        } else {
            let id = mongoose.Types.ObjectId(req.query.id);
            allPerson = await Person.find({ room: id }).populate('room', { ten: 1, kyhieu: 1 }).sort({ donvicongtac: 1 }).populate('donvicongtac', { ten: 1 })
        };

        for (person of allPerson) {
            let x = person.thiduanam.find(function(e) {
                return e.nam == parseInt(nam)
            });
            if (x === undefined) {
                x = {
                    nam: nam,
                    dangkithidua: '',
                    xeploai: ''
                }
            };
            if (x.xeploai === fieldFilter) {
                result.push({
                    _id: person._id,
                    hoten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    room: person.room.kyhieu,
                    donvicongtac: person.donvicongtac.ten
                })
            };
        };
        res.send(result)
    },
    filterThiduanamCaseTwo: async(req, res) => {
        let fieldFilter = req.query.fieldFilter;
        let index = fieldFilter.indexOf('-');
        let value = fieldFilter.slice(0, index);
        let soluong = parseInt(fieldFilter.slice(index + 1));
        let allPerson = [];
        let result = [];
        if (req.query.id === undefined) {
            allPerson = await Person.find().populate('donvicongtac', { ten: 1 }).populate('room', { ten: 1, kyhieu: 1 }).sort({ hoten: 1 });
        } else {
            let id = mongoose.Types.ObjectId(req.query.id);
            allPerson = await Person.find({ room: id }).populate('room', { ten: 1, kyhieu: 1 }).sort({ donvicongtac: 1 }).populate('donvicongtac', { ten: 1 })
        };
        result = filter3Years(allPerson, value, soluong)
        res.send(result)
    },
    thongkeDangvien: async(req, res) => {
        let nam = req.params.nam;
        let allPerson = [];
        if (req.query.id === undefined) {
            allPerson = await Person.find().populate('donvicongtac', { ten: 1 }).populate('room', { ten: 1, kyhieu: 1 }).sort({ hoten: 1 });
        } else {
            let id = mongoose.Types.ObjectId(req.query.id);
            allPerson = await Person.find({ room: id }).populate('room', { ten: 1, kyhieu: 1 }).sort({ donvicongtac: 1 }).populate('donvicongtac', { ten: 1 })
        };

        let dangki_hoanthanhxuatsacList = [];
        let dangki_hoanthanhtotList = [];
        let dangki_hoanthanhnhiemvuList = [];
        let dangki_khonghoanthanhnhiemvuList = [];
        let dangki_chuacodulieuList = [];
        let xeploai_chuacodulieuList = [];
        let xeploai_hoanthanhtotList = [];
        let xeploai_hoanthanhxuatsacList = [];
        let xeploai_hoanthanhnhiemvuList = [];
        let xeploai_khonghoanthanhnhiemvuList = [];

        for (person of allPerson) {
            let x = person.thiduanam.find(function(e) {
                return e.nam == parseInt(nam)
            });
            if (x === undefined) {
                x = {
                    nam: nam,
                    dangkixeploaidangvien: '',
                    xeploaidangvien: ''
                }
            };
            if (x.dangkixeploaidangvien === "Hoàn thành xuất sắc nhiệm vụ") {
                dangki_hoanthanhxuatsacList.push({
                    _id: person._id,
                    hoten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    room: person.room.kyhieu,
                    donvicongtac: person.donvicongtac.ten
                })
            } else if (x.dangkixeploaidangvien === "Hoàn thành tốt nhiệm vụ") {
                dangki_hoanthanhtotList.push({
                    _id: person._id,
                    hoten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    room: person.room.kyhieu,
                    donvicongtac: person.donvicongtac.ten
                })
            } else if (x.dangkixeploaidangvien === "Hoàn thành nhiệm vụ") {
                dangki_hoanthanhnhiemvuList.push({
                    _id: person._id,
                    hoten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    room: person.room.kyhieu,
                    donvicongtac: person.donvicongtac.ten
                })
            } else if (x.dangkixeploaidangvien === "Không hoàn thành nhiệm vụ") {
                dangki_khonghoanthanhnhiemvuList.push({
                    _id: person._id,
                    hoten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    room: person.room.kyhieu,
                    donvicongtac: person.donvicongtac.ten
                })
            } else {
                dangki_chuacodulieuList.push({
                    _id: person._id,
                    hoten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    room: person.room.kyhieu,
                    donvicongtac: person.donvicongtac.ten
                })
            };


            if (x.xeploaidangvien === "Hoàn thành xuất sắc nhiệm vụ") {
                xeploai_hoanthanhxuatsacList.push({
                    _id: person._id,
                    hoten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    room: person.room.kyhieu,
                    donvicongtac: person.donvicongtac.ten
                })
            } else if (x.xeploaidangvien === "Hoàn thành tốt nhiệm vụ") {
                xeploai_hoanthanhtotList.push({
                    _id: person._id,
                    hoten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    room: person.room.kyhieu,
                    donvicongtac: person.donvicongtac.ten
                })
            } else if (x.xeploaidangvien === "Hoàn thành nhiệm vụ") {
                xeploai_hoanthanhnhiemvuList.push({
                    _id: person._id,
                    hoten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    room: person.room.kyhieu,
                    donvicongtac: person.donvicongtac.ten
                })
            } else if (x.xeploaidangvien === "Không hoàn thành nhiệm vụ") {
                xeploai_khonghoanthanhnhiemvuList.push({
                    _id: person._id,
                    hoten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    room: person.room.kyhieu,
                    donvicongtac: person.donvicongtac.ten
                })
            } else {
                xeploai_chuacodulieuList.push({
                    _id: person._id,
                    hoten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    room: person.room.kyhieu,
                    donvicongtac: person.donvicongtac.ten
                })
            }
        }
        res.send({
            xeploai_chuacodulieuList: xeploai_chuacodulieuList.length,
            xeploai_hoanthanhxuatsacList: xeploai_hoanthanhxuatsacList.length,
            xeploai_hoanthanhtotList: xeploai_hoanthanhtotList.length,
            xeploai_khonghoanthanhnhiemvuList: xeploai_khonghoanthanhnhiemvuList.length,
            xeploai_hoanthanhnhiemvuList: xeploai_hoanthanhnhiemvuList.length,
            dangki_hoanthanhxuatsacList: dangki_hoanthanhxuatsacList.length,
            dangki_hoanthanhtotList: dangki_hoanthanhtotList.length,
            dangki_chuacodulieuList: dangki_chuacodulieuList.length,
            dangki_hoanthanhnhiemvuList: dangki_hoanthanhnhiemvuList.length,
            dangki_khonghoanthanhnhiemvuList: dangki_khonghoanthanhnhiemvuList.length,
        })
    },
    filterDangvienCaseOne: async(req, res) => {
        let nam = req.params.nam;
        let fieldFilter = req.query.fieldFilter;
        let allPerson = [];
        let result = [];
        if (req.query.id === undefined) {
            allPerson = await Person.find().populate('donvicongtac', { ten: 1 }).populate('room', { ten: 1, kyhieu: 1 }).sort({ hoten: 1 });
        } else {
            let id = mongoose.Types.ObjectId(req.query.id);
            allPerson = await Person.find({ room: id }).populate('room', { ten: 1, kyhieu: 1 }).sort({ donvicongtac: 1 }).populate('donvicongtac', { ten: 1 })
        };

        for (person of allPerson) {
            let x = person.thiduanam.find(function(e) {
                return e.nam == parseInt(nam)
            });
            if (x === undefined) {
                x = {
                    nam: nam,
                    dangkixeploaidangvien: '',
                    xeploaidangvien: ''
                }
            };
            if (x.xeploaidangvien === fieldFilter) {
                result.push({
                    _id: person._id,
                    hoten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    room: person.room.kyhieu,
                    donvicongtac: person.donvicongtac.ten
                })
            };
        };
        res.send(result)
    },
    filterDangvienCaseTwo: async(req, res) => {
        let fieldFilter = req.query.fieldFilter;
        let index = fieldFilter.indexOf('-');
        let value = fieldFilter.slice(0, index);
        let soluong = parseInt(fieldFilter.slice(index + 1));
        let allPerson = [];
        let result = [];
        if (req.query.id === undefined) {
            allPerson = await Person.find().populate('donvicongtac', { ten: 1 }).populate('room', { ten: 1, kyhieu: 1 }).sort({ hoten: 1 });
        } else {
            let id = mongoose.Types.ObjectId(req.query.id);
            allPerson = await Person.find({ room: id }).populate('room', { ten: 1, kyhieu: 1 }).sort({ donvicongtac: 1 }).populate('donvicongtac', { ten: 1 })
        };
        result = filter3YearsDangvien(allPerson, value, soluong)
        res.send(result)
    },
    filterKhenthuongHome: async(req, res) => {
        let { min, max } = req.query // khoảng thời gian thống kê
        let phongList = await Phong.find();
        let doiList = await Doi.find().populate('donvicaptren', { kyhieu: 1 })
        let minDay = parseInt(min.split('-').join('')); // biến đổi thành số dạng 20210101 để so sánh khi tìm khen thuong
        let maxDay = parseInt(max.split('-').join(''));
        let khenthuongphong = []; //danh sách các lần khen thưởng cấp phòng
        let tapthephongchitiet = []; //danh sách tên phòng được khen thưởng
        let tapthedoichitiet = []; //danh sách tên đội được khen thưởng
        let khenthuongdoi = []; //danh sách các lần khen thưởng cấp đội
        for (phong of phongList) {
            let itemList = phong.khenthuong.filter(item => {
                let ngayQD = parseInt(item.ngayQD.split('-').join(''))
                return ngayQD >= minDay && ngayQD <= maxDay;
            });
            if (itemList.length > 0) {
                tapthephongchitiet.push({ kyhieu: phong.kyhieu })
            }
            khenthuongphong = khenthuongphong.concat(itemList)
        };
        for (doi of doiList) {
            let itemList = doi.khenthuong.filter(item => {
                let ngayQD = parseInt(item.ngayQD.split('-').join(''))
                return ngayQD >= minDay && ngayQD <= maxDay;
            });
            if (itemList.length > 0) {
                tapthedoichitiet.push({ ten: doi.ten, donvi: doi.donvicaptren.kyhieu })
            }
            khenthuongdoi = khenthuongdoi.concat(itemList)
        };
        let khenthuongtapthe = khenthuongdoi.length + khenthuongphong.length;
        let personList = await Person.find().populate('room', { kyhieu: 1 }).populate('donvicongtac', { ten: 1 });
        let khenthuongperson = [];
        let tapthecanbochitiet = [];
        for (person of personList) {
            let itemList = person.khenthuongcanhan.filter(item => {
                let ngayQD = parseInt(item.ngayQD.split('-').join(''))
                return ngayQD >= minDay && ngayQD <= maxDay;
            });
            if (itemList.length > 0) {
                tapthecanbochitiet.push({
                    _id: person._id,
                    ten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    donvicongtac: person.room.kyhieu,
                    doicongtac: person.donvicongtac.ten
                })
            }
            khenthuongperson = khenthuongperson.concat(itemList)
        };
        let TotalKhenthuong = khenthuongtapthe + khenthuongperson.length; // Tổng cộng tất cả các lần khen thưởng
        res.send({
            tongcongluotkhenthuong: TotalKhenthuong,
            soluotkhenthuongtapthe: khenthuongtapthe,
            soluotkhenthuongcapphong: khenthuongphong.length,
            soluotkhenthuongcapdoi: khenthuongdoi.length,
            soluotkhenthuongcanhan: khenthuongperson.length,
            tongsophongduockhenthuong: tapthephongchitiet,
            tongsodoiduockhenthuong: tapthedoichitiet,
            tongsocanhanduockhenthuong: tapthecanbochitiet
        })
    },
    filterKiluatHome: async(req, res) => {
        let { min, max } = req.query // khoảng thời gian thống kê
        let minDay = parseInt(min.split('-').join('')); // biến đổi thành số dạng 20210101 để so sánh khi tìm khen thuong
        let maxDay = parseInt(max.split('-').join(''));
        let personList = await Person.find().populate('room', { kyhieu: 1 }).populate('donvicongtac', { ten: 1 });;
        let tongsokiluat = [];
        let tongsokiluatkhientrach = 0;
        let tongsokiluatcanhcao = 0;
        let tongsokiluatcachchuc = 0;
        let tongcongcanbobikiluat = [];
        for (person of personList) {
            let itemList = person.kiluatcanhan.filter(item => {
                let ngayQD = parseInt(item.ngayQD.split('-').join(''))
                return ngayQD >= minDay && ngayQD <= maxDay;
            });
            if (itemList.length > 0) {
                itemList.forEach(el => {
                    if (el.hinhthuckiluat === "Khiển trách") {
                        tongsokiluatkhientrach += 1;
                    } else if (el.hinhthuckiluat === "Cảnh cáo") {
                        tongsokiluatcanhcao += 1;
                    } else {
                        tongsokiluatcachchuc += 1;
                    }
                });
                tongcongcanbobikiluat.push({
                    _id: person._id,
                    ten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    donvicongtac: person.room.kyhieu,
                    doicongtac: person.donvicongtac.ten
                })
            }
            tongsokiluat = tongsokiluat.concat(itemList)
        };
        res.send({
            soluotkiluat: tongsokiluat.length,
            tongsokiluatkhientrach,
            tongsokiluatcanhcao,
            tongsokiluatcachchuc,
            tongcongcanbobikiluat
        })
    },
    filterKhenthuongPhong: async(req, res) => {
        let { min, max } = req.query // khoảng thời gian thống kê
        let id = req.params.id;
        let phong = await Phong.findById(id);
        let doiList = await Doi.find().populate('donvicaptren', { kyhieu: 1 })
        let minDay = parseInt(min.split('-').join('')); // biến đổi thành số dạng 20210101 để so sánh khi tìm khen thuong
        let maxDay = parseInt(max.split('-').join(''));
        let khenthuongphong = []; //danh sách các lần khen thưởng cấp phòng
        let tapthedoichitiet = []; //danh sách tên đội được khen thưởng
        let khenthuongdoi = []; //danh sách các lần khen thưởng cấp đội

        khenthuongphong = phong.khenthuong.filter(item => {
            let ngayQD = parseInt(item.ngayQD.split('-').join(''))
            return ngayQD >= minDay && ngayQD <= maxDay;
        });
        for (doi of doiList) {
            let itemList = doi.khenthuong.filter(item => {
                let ngayQD = parseInt(item.ngayQD.split('-').join(''))
                return ngayQD >= minDay && ngayQD <= maxDay;
            });
            if (itemList.length > 0) {
                tapthedoichitiet.push({ ten: doi.ten })
            }
            khenthuongdoi = khenthuongdoi.concat(itemList)
        };
        let khenthuongtapthe = khenthuongdoi.length + khenthuongphong.length;
        let personList = await Person.find({ room: id }).populate('donvicongtac', { ten: 1 });
        let khenthuongperson = [];
        let tapthecanbochitiet = [];
        for (person of personList) {
            let itemList = person.khenthuongcanhan.filter(item => {
                let ngayQD = parseInt(item.ngayQD.split('-').join(''))
                return ngayQD >= minDay && ngayQD <= maxDay;
            });
            if (itemList.length > 0) {
                tapthecanbochitiet.push({
                    _id: person._id,
                    ten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    donvicongtac: person.donvicongtac.ten
                })
            }
            khenthuongperson = khenthuongperson.concat(itemList)
        };
        let TotalKhenthuong = khenthuongtapthe + khenthuongperson.length; // Tổng cộng tất cả các lần khen thưởng
        res.send({
            tongcongluotkhenthuong: TotalKhenthuong,
            soluotkhenthuongtapthe: khenthuongtapthe,
            soluotkhenthuongcapphong: khenthuongphong.length,
            soluotkhenthuongcapdoi: khenthuongdoi.length,
            soluotkhenthuongcanhan: khenthuongperson.length,
            tongsodoiduockhenthuong: tapthedoichitiet,
            tongsocanhanduockhenthuong: tapthecanbochitiet
        })
    },
    filterKiluatPhong: async(req, res) => {
        let { min, max } = req.query // khoảng thời gian thống kê
        let minDay = parseInt(min.split('-').join('')); // biến đổi thành số dạng 20210101 để so sánh khi tìm khen thuong
        let maxDay = parseInt(max.split('-').join(''));
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
                return ngayQD >= minDay && ngayQD <= maxDay;
            });
            if (itemList.length > 0) {
                itemList.forEach(el => {
                    if (el.hinhthuckiluat === "Khiển trách") {
                        tongsokiluatkhientrach += 1;
                    } else if (el.hinhthuckiluat === "Cảnh cáo") {
                        tongsokiluatcanhcao += 1;
                    } else {
                        tongsokiluatcachchuc += 1;
                    }
                });
                tongcongcanbobikiluat.push({
                    _id: person._id,
                    ten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    donvicongtac: person.donvicongtac.ten
                })
            }
            tongsokiluat = tongsokiluat.concat(itemList)
        };
        res.send({
            soluotkiluat: tongsokiluat.length,
            tongsokiluatkhientrach,
            tongsokiluatcanhcao,
            tongsokiluatcachchuc,
            tongcongcanbobikiluat
        })
    },
    searchCanbo: async(req, res) => {
        console.log('111')
        let { hoten, capbac, donvi } = req.params;
        console.log(req.params)
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

    //văn bản , qui định, hướng dẫn
    vanbanPage: async(req, res) => {
        let phongList = await Phong.find().sort({ kyhieu: 1 });
        res.render('./client/vanban', { phongList })
    },
    tinbaiPage: async(req, res) => {
        let phongList = await Phong.find().sort({ kyhieu: 1 });
        let date = new Date()
        let nam = new Date().getFullYear();
        let minInit = `${nam}-01-01`;
        let maxInit = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
        res.render('./client/tinbai', { phongList, minInit, maxInit })
    },
    filterTinbai: async(req, res) => {
        let { min, max } = req.query // khoảng thời gian thống kê
        let minDay = parseInt(min.split('-').join('')); // biến đổi thành số dạng 20210101 để so sánh khi tìm khen thuong
        let maxDay = parseInt(max.split('-').join(''));
        let result = [];
        let allTinbai = [];
        let phoihopbaocuatinh = 0;
        let phoihopdoanthanhnien = 0;
        let phoihophoiphunu = 0;
        let phoihopcahuyen = 0;
        let phoihopvoibo = 0;
        let phoihopnganhngoai = 0;
        let khongphoihop = 0;

        let chuyenmucList = await Chuyenmuc.find().sort({ tenchuyenmuc: 1 });
        chuyenmucList.forEach(chuyenmuc => {
            chuyenmuc.muctinList.forEach(muctin => {
                muctin.tinbai.sort(function(a, b) {
                    var aa = a.ngaydang.split('-').join(''),
                        bb = b.ngaydang.split('-').join('');
                    return bb < aa ? -1 : (aa > bb ? 1 : 0);
                });
                let checkedTinbai = muctin.tinbai.filter(tinbai => { // trả về các tin bài được đăng trong năm year
                    return tinbai.ngaydang.split('-').join('') >= minDay && tinbai.ngaydang.split('-').join('') <= maxDay
                });
                result.push({ muctin: muctin.muctin, sotinbai: checkedTinbai.length })
                allTinbai = allTinbai.concat(checkedTinbai)
            });
        });
        allTinbai.forEach(i => {
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
        let total = phoihopnganhngoai + phoihopbaocuatinh + phoihopdoanthanhnien + phoihophoiphunu + phoihopvoibo + khongphoihop + phoihopcahuyen;
        res.send({
            result,
            allTinbai,
            phoihopbaocuatinh,
            phoihopdoanthanhnien,
            phoihophoiphunu,
            phoihopcahuyen,
            phoihopvoibo,
            phoihopnganhngoai,
            khongphoihop,
            total
        })
    },
    cuocthituyentruyenPage: async(req, res) => {
        let nam = new Date().getFullYear();
        let phongList = await Phong.find().sort({ kyhieu: 1 });
        res.render('./client/cuocthituyentruyen', { phongList, nam })
    },
    mohinhTieubieuPage: async(req, res) => {
        let nam = new Date().getFullYear();
        let phongList = await Phong.find().sort({ kyhieu: 1 });
        res.render('./client/mohinhtieubieu', { phongList, nam })
    },
    vanhoavannghePage: async(req, res) => {
        let nam = new Date().getFullYear();
        let date = new Date();
        let minInit = `${nam}-01-01`;
        let maxInit = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
        let phongList = await Phong.find().sort({ kyhieu: 1 });
        let loaihinhList = await Vannghe.find().sort({ monthethao: 1 })
        res.render('./client/vannghe', { phongList, nam, minInit, maxInit, loaihinhList, nam1: nam })
    },
    giaivannghe: async(req, res) => {
        let { min, max } = req.query // khoảng thời gian thống kê
        let cuocthiList = await GiaiVannghe.find({ ngaytochuc: { $gte: min, $lte: max } }).sort({ ngaytochuc: -1 })
        res.send(cuocthiList)
    },
    filterCanhanVannghe: async(req, res) => {
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
    thethaoPage: async(req, res) => {
        let nam = new Date().getFullYear();
        let date = new Date();
        let minInit = `${nam}-01-01`;
        let maxInit = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
        let phongList = await Phong.find().sort({ kyhieu: 1 });
        let loaihinhList = await Thethao.find().sort({ monthethao: 1 })
        res.render('./client/thethao', { phongList, nam, minInit, maxInit, loaihinhList })
    },
    giaithethao: async(req, res) => {
        let { min, max } = req.query // khoảng thời gian thống kê
        let cuocthiList = await GiaiThethao.find({ ngaytochuc: { $gte: min, $lte: max } }).sort({ ngaytochuc: -1 })
        res.send(cuocthiList)
    },
    filterCanhanThethao: async(req, res) => {
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
    dieulenhCat: async(req, res) => {
        let nam = new Date().getFullYear();
        let date = new Date();
        let minInit = `${nam}-01-01`;
        let phongList = await Phong.find().sort({ kyhieu: 1 });
        let maxInit = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
        res.render('./client/kiemtradieulenh', { phongList, minInit, maxInit })
    },
    filterKiemtradieulenh: async(req, res) => {
        let { min, max } = req.query // khoảng thời gian thống kê
        min += 'T00:00'; //ngày tính từ lúc 0h
        max += 'T23:59' //kết thúc ngày là 23h59
        let ketquaList = await DieulenhCAT.find({ thoigian: { $gte: min, $lte: max } }).sort({ thoigian: -1 })
        res.send(ketquaList)
    },
    filterKiemtratinhhuong: async(req, res) => {
        let { min, max } = req.query // khoảng thời gian thống kê
        min += 'T00:00'; //ngày tính từ lúc 0h
        max += 'T23:59' //kết thúc ngày là 23h59
        let ketquaList = await KiemtraTinhhuong.find({ thoigian: { $gte: min, $lte: max } }).sort({ thoigian: -1 }).populate('donviduockiemtra', { kyhieu: 1 })
            .populate({
                path: 'donviduockiemtra',
                populate: { path: 'donvicaptren' }
            })
            .populate('tinhhuong'); // tìm kiếm thoigian chứa năm
        res.send(ketquaList)
    },
    kiemtraquansuPage: async(req, res) => {
        let nam = new Date().getFullYear();
        let phongList = await Phong.find().sort({ kyhieu: 1 });
        res.render('./client/kiemtraquansuvothuat', { phongList, nam, nam1: nam })
    },
    filterKiemtraquansu: async(req, res) => {
        let nam = req.params.nam;
        let result = await Quansu.find({ nam: nam }).populate('donviduockiemtra', { kyhieu: 1 });
        res.send(result)
    },
    kiemtrabansungPage: async(req, res) => {
        let nam = new Date().getFullYear();
        let phongList = await Phong.find().sort({ kyhieu: 1 });
        res.render('./client/kiemtrabansung', { phongList, nam, nam1: nam })
    },
    filterBansung: async(req, res) => {
        let nam = req.params.nam;
        let result = await Bansung.find({ nam: nam }).populate('donviduockiemtra', { kyhieu: 1 });
        res.send(result)
    },
    kiemtrathelucPage: async(req, res) => {
        let nam = new Date().getFullYear();
        let phongList = await Phong.find().sort({ kyhieu: 1 });
        res.render('./client/kiemtratheluc', { phongList, nam, nam1: nam })
    },
    filterTheluc: async(req, res) => {
        let nam = req.params.nam;
        let result = await Theluc.find({ nam: nam }).populate('donviduockiemtra', { kyhieu: 1 });
        res.send(result)
    },
    filterCanhanBad: async(req, res) => {
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
    //Trang phòng
    trangphongPage: async(req, res) => {
        let id = req.params.id;
        let phong = await Phong.findById(id);
        let doiList = await Doi.find({ donvicaptren: id }, { ten: 1 }).sort({ ten: 1 });
        let danhsachdoi = [];
        for (item of doiList) {
            let id1 = item._id;
            let bienche_doi = await Person.find({ donvicongtac: id1 });
            danhsachdoi.push({ ten: item.ten, bienche: bienche_doi.length, _id: item._id });
        }
        let khenthuongList = phong.khenthuong.sort(function(a, b) {
            var aa = a.ngayQD.split('-').join(),
                bb = b.ngayQD.split('-').join();
            return bb < aa ? -1 : (aa > bb ? 1 : 0);
        })
        let thiduanamList = phong.thiduanam.sort((a, b) => { return b.nam - a.nam })
        let date = new Date()
        let nam = new Date().getFullYear();
        let minInit = `${nam}-01-01`;
        let maxInit = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
        let namthiduanam = new Date().getFullYear();
        let canboTotal = await Person.find({ room: id }, { hoten: 1, capbac: 1, chucvu: 1 });
        let totalDangvien = await Person.find({ room: id, dangvien: 'true' }, { hoten: 1, capbac: 1, chucvu: 1 });
        let phongList = await Phong.find({}, { ten: 1, kyhieu: 1 }).sort({ kyhieu: 1 });
        res.render('./client/trangphong', {
            totalCanbo: canboTotal.length,
            phong,
            nam,
            namthiduanam,
            nam1: nam - 1,
            nam2: nam - 1,
            nam3: nam - 1,
            namdangvien: nam,
            totalDangvien: totalDangvien.length,
            maxInit,
            minInit,
            phongList,
            khenthuongList,
            thiduanamList,
            danhsachdoi
        })
    },

    trangdoiPage: async(req, res) => {
        let id = req.params.id;
        let id1 = req.params.id1;
        let phong = await Phong.findById(id);
        let doi = await Doi.findById(id1);
        let doiList = await Doi.find({ donvicaptren: id }, { ten: 1 }).sort({ ten: 1 });
        let khenthuongList = phong.khenthuong.sort(function(a, b) {
            var aa = a.ngayQD.split('-').join(),
                bb = b.ngayQD.split('-').join();
            return bb < aa ? -1 : (aa > bb ? 1 : 0);
        });
        let date = new Date()
        let nam = new Date().getFullYear();
        let minInit = `${nam}-01-01`;
        let maxInit = date.toISOString().slice(0, 10) // lấy ra ngày tháng hiện tại yyyy-mm-dd
        let namthiduanam = new Date().getFullYear();
        let danhsachcanbo = await Person.find({ donvicongtac: id1 }, { hoten: 1, capbac: 1, chucvu: 1, img: 1, sohieuCAND: 1 });
        let totalDangvien = await Person.find({ donvicongtac: id1, dangvien: 'true' }, { hoten: 1, capbac: 1, chucvu: 1, img: 1, sohieuCAND: 1 });
        let phongList = await Phong.find({}, { ten: 1, kyhieu: 1 }).sort({ kyhieu: 1 });
        res.render('./client/trangdoi', {
            danhsachcanbo,
            phong,
            nam,
            namthiduanam,
            namdangvien: nam,
            totalDangvien: totalDangvien.length,
            phongList,
            khenthuongList,
            doiList,
            doi,
            maxInit,
            minInit
        })
    },
    filterThiduathangDoi: async(req, res) => {
        let nam = req.params.nam;
        let id = req.params.id;
        let personList = await Person.find({ donvicongtac: id }, { hoten: 1, capbac: 1, chucvu: 1, sohieuCAND: 1, img: 1, thiduathang: 1 });
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
    },
    filterThiduanamDoi: async(req, res) => {
        let nam = req.params.nam;
        let id = req.params.id;
        let personList = await Person.find({ donvicongtac: id }, { hoten: 1, capbac: 1, chucvu: 1, sohieuCAND: 1, img: 1, thiduanam: 1 });
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
    filterDangvienDoi: async(req, res) => {
        let nam = req.params.nam;
        let id = req.params.id;
        let personList = await Person.find({ donvicongtac: id }, { hoten: 1, capbac: 1, chucvu: 1, sohieuCAND: 1, img: 1, thiduanam: 1 });
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
    filterKhenthuongDoi: async(req, res) => {
        let { min, max } = req.query // khoảng thời gian thống kê
        let id = req.params.id;
        let doi = await Doi.findById(id);
        let minDay = parseInt(min.split('-').join('')); // biến đổi thành số dạng 20210101 để so sánh khi tìm khen thuong
        let maxDay = parseInt(max.split('-').join(''));
        let khenthuongdoi = []; //danh sách các lần khen thưởng cấp đội
        khenthuongdoi = doi.khenthuong.filter(item => {
            let ngayQD = parseInt(item.ngayQD.split('-').join(''))
            return ngayQD >= minDay && ngayQD <= maxDay;
        });
        let personList = await Person.find({ donvicongtac: id }, { hoten: 1, capbac: 1, chucvu: 1, img: 1, khenthuongcanhan: 1 })
        let khenthuongperson = [];
        let tapthecanbochitiet = [];
        for (person of personList) {
            let itemList = person.khenthuongcanhan.filter(item => {
                let ngayQD = parseInt(item.ngayQD.split('-').join(''))
                return ngayQD >= minDay && ngayQD <= maxDay;
            });
            if (itemList.length > 0) {
                tapthecanbochitiet.push({
                    _id: person._id,
                    ten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    img: person.img,
                    soluotduockhenthuong: itemList.length
                })
            }
            khenthuongperson = khenthuongperson.concat(itemList)
        };
        let TotalKhenthuong = khenthuongdoi.length + khenthuongperson.length; // Tổng cộng tất cả các lần khen thưởng
        res.send({
            tongcongluotkhenthuong: TotalKhenthuong,
            soluotkhenthuongcapdoi: khenthuongdoi.length,
            soluotkhenthuongcanhan: khenthuongperson.length,
            tongsocanhanduockhenthuong: tapthecanbochitiet
        })
    },
    filterKiluatDoi: async(req, res) => {
        let { min, max } = req.query // khoảng thời gian thống kê
        let id = req.params.id;
        let minDay = parseInt(min.split('-').join('')); // biến đổi thành số dạng 20210101 để so sánh khi tìm khen thuong
        let maxDay = parseInt(max.split('-').join(''));
        let personList = await Person.find({ donvicongtac: id }, { hoten: 1, capbac: 1, chucvu: 1, img: 1, kiluatcanhan: 1 })
        let kiluatperson = [];
        let tapthecanbochitiet = [];
        for (person of personList) {
            let itemList = person.kiluatcanhan.filter(item => {
                let ngayQD = parseInt(item.ngayQD.split('-').join(''))
                return ngayQD >= minDay && ngayQD <= maxDay;
            });
            if (itemList.length > 0) {
                tapthecanbochitiet.push({
                    _id: person._id,
                    ten: person.hoten,
                    capbac: person.capbac,
                    chucvu: person.chucvu,
                    img: person.img,
                    soluotbikiluat: itemList.length
                })
            }
            kiluatperson = kiluatperson.concat(itemList)
        };

        res.send({
            tongcongluotkiluat: kiluatperson.length,
            tongsocanhanbikiluat: tapthecanbochitiet
        })
    },
    trangCanhanPage: async(req, res) => {
        let id = req.params.id;
        let phongList = await Phong.find({}, { ten: 1, kyhieu: 1 }).sort({ kyhieu: 1 });
        let canhan = await Person.findById(id).populate('room', { ten: 1 }).populate('donvicongtac', { ten: 1 });
        canhan.khenthuongcanhan.sort(function(a, b) {
            var aa = a.ngayQD.split('-').join(),
                bb = b.ngayQD.split('-').join();
            return bb < aa ? -1 : (aa > bb ? 1 : 0);
        });
        canhan.kiluatcanhan.sort(function(a, b) {
            var aa = a.ngayQD.split('-').join(),
                bb = b.ngayQD.split('-').join();
            return bb < aa ? -1 : (aa > bb ? 1 : 0);
        });
        canhan.thiduanam.sort((a, b) => b.nam - a.nam);
        canhan.thiduathang.sort((a, b) => b.nam - a.nam)
        res.render('./client/trangcanhan', {
            canhan,
            phongList
        })
    }
}