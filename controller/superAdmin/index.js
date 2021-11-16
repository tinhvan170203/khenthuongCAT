let Phong = require('../../models/capphong');
let Doi = require('../../models/capdoi');
let Person = require('../../models/person');
let Nhomquyen = require('../../models/quantrihethong/nhomquyen');
let User = require('../../models/quantrihethong/user');
let jwt = require('jsonwebtoken');

let mongoose = require('mongoose')
module.exports = {
    nhomquyenPage: async(req, res) => {
        let allRole = req.allRole;
        let user = req.user;
        let list = await Phong.find().sort({ kyhieu: 1 })
        res.render('./superAdmin/nhomquyen', { allRole, user, list })
    },
    tableQuantriNhomquyen: async(req, res) => {
        let nhomquyenList = await Nhomquyen.find().sort({ tennhomquyen: 1 });
        res.send(nhomquyenList)
    },
    addNhomquyen: async(req, res) => {
        let { tennhomquyen, mota } = req.body;
        let quyenList = JSON.parse(req.body.quyenList)
        let newItem = new Nhomquyen({ tennhomquyen, mota, quyenList });
        await newItem.save()
        res.send('Thêm thành công')
    },
    getEditNhomquyen: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let item = await Nhomquyen.findById(id);
        res.send(item)
    },
    editNhomquyen: async(req, res) => {
        let id = mongoose.Types.ObjectId(req.params.id);
        let quyenList = JSON.parse(req.body.quyenList);
        let { tennhomquyen, mota } = req.body;
        await Nhomquyen.findByIdAndUpdate(id, { tennhomquyen, mota, quyenList });
        res.send('Cập nhật nhóm quyền thành công...')
    },
    deleteNhomquyen: async(req, res) => {
        let id = req.params.id;
        await Nhomquyen.findByIdAndDelete(id);
        res.send('Xóm nhóm quyền thành công...')
    },
    quantriTaikhoanpage: async(req, res) => {
        let allRole = req.allRole;
        let user = req.user;
        let list = await Phong.find().sort({ kyhieu: 1 })
            // let quyenList = await Nhomquyen.aggregate([{ $project: { _id: 1, tennhomquyen: 1 } }]);
        let quyenList = await Nhomquyen.find().sort({ tennhomquyen: 1 })
        res.render('./superAdmin/quantritaikhoan', {
            quyenList,
            allRole,
            user,
            list
        })
    },
    addTaikhoan: async(req, res) => {
        let { tentaikhoan, matkhau } = req.body;
        let trangthai = req.body.trangthai === "true" ? true : false;
        //check tên tài khoản xem có trùng hay k
        let checkTaikhoan = await User.findOne({ tentaikhoan: tentaikhoan });
        if (checkTaikhoan !== null) {
            return res.send('Tên tài khoản đã tồn tại')
        } else {
            let roles = JSON.parse(req.body.roles);
            let chucnangrieng = JSON.parse(req.body.chucnangrieng);
            let newItem = new User({ tentaikhoan, matkhau, roles, trangthai, chucnangrieng });
            await newItem.save();
            res.send('')
        }
    },
    tableTaikhoan: async(req, res) => {
        let data = await User.find().sort({ tentaikhoan: 1 }).populate('roles');
        res.send(data)
    },
    getDataRoles: async(req, res) => {
        let id = req.params.id;
        let item = await User.findById(id).populate('roles');
        res.send({ roles: item.roles, chucnangrieng: item.chucnangrieng, trangthai: item.trangthai })
    },
    editTaikhoan: async(req, res) => {
        let id = req.params.id;
        let item = await User.findById(id);
        let trangthai = req.body.trangthai === "true" ? true : false;
        let roles = JSON.parse(req.body.roles);
        let chucnangrieng = JSON.parse(req.body.chucnangrieng);
        item.trangthai = trangthai;
        item.roles = roles;
        item.chucnangrieng = chucnangrieng;
        await item.save();
        res.send('ok')
    },
    deleteTaikhoan: async(req, res) => {
        let id = req.params.id;
        await User.findByIdAndDelete(id);
        res.send('Delete thành công...')
    },

    //Login phần mềm
    loginPage: async(req, res) => {
        let tentaikhoan = '';
        res.render('./superAdmin/login', { message: req.flash('mess'), tentaikhoan })
    },
    postLogin: async(req, res) => {
        let allRole = [];
        let { tentaikhoan, matkhau } = req.body;
        let item = await User.findOne({ tentaikhoan }).populate('roles');
        if (item === null) {
            req.flash('mess', 'Tên tài khoản không tồn tại. Vui lòng đăng nhập lại')
            res.render('./superAdmin/login', { message: req.flash('mess'), tentaikhoan })
        } else {
            if (item.matkhau !== matkhau) {
                req.flash('mess', 'Mật khẩu không đúng. Vui lòng đăng nhập lại')
                res.render('./superAdmin/login', { message: req.flash('mess'), tentaikhoan })
            } else {
                let token = jwt.sign({ user: item.tentaikhoan, pass: item.matkhau }, 'vuvantinh');
                res.cookie('token', token, { expires: new Date(Date.now() + 900000000000) });
                res.redirect('/quantrihethong/login/loginSuccess')
            }
        }
    },
    changePassPage: async(req, res) => {
        let tentaikhoan = '';
        res.render('./superAdmin/editLogin', { message: req.flash('mess'), tentaikhoan })
    },
    postChangePass: async(req, res) => {
        let { tentaikhoan, matkhau, matkhaumoi } = req.body;
        let item = await User.findOne({ tentaikhoan });
        if (item === null) {
            req.flash('mess', 'Tên tài khoản không tồn tại. Vui lòng kiểm tra lại')
            res.render('./superAdmin/editLogin', { message: req.flash('mess'), tentaikhoan })
        } else {
            if (item.matkhau !== matkhau) {
                req.flash('mess', 'Mật khẩu cũ không đúng. Vui lòng đăng nhập lại')
                res.render('./superAdmin/editLogin', { message: req.flash('mess'), tentaikhoan })
            } else {
                item.matkhau = matkhaumoi;
                await item.save()
                req.flash('mess', 'Đổi mật khẩu thành công. Vui lòng đăng nhập lại')
                res.redirect('/quantrihethong/login')
            }
        }
    },
    errorRole: async(req, res) => {
        let tentaikhoan = '';
        let text = req.params.text;
        req.flash('mess', `${text}`)
        res.render('./superAdmin/login', { message: req.flash('mess'), tentaikhoan })
    },
    loginSuccess: async(req, res) => {
        let tentaikhoan = req.token.user;
        let allRole = [];
        let item = await User.findOne({ tentaikhoan }).populate('roles');
        if (item === null) {
            req.flash('mess', 'Tài khoản đã thay đổi bởi Admin. Vui lòng đăng nhập lại')
            res.render('./superAdmin/login', { message: req.flash('mess'), tentaikhoan })
        } else {
            item.roles.forEach(i => {
                allRole = allRole.concat(i.quyenList)
            });
            allRole = allRole.concat(item.chucnangrieng)
            let user = item.tentaikhoan
            let list = await Phong.aggregate([{ $project: { _id: 1, kyhieu: 1 } }]);
            res.render('./superAdmin/loginSuccess', { allRole, user, list })
        }
    },
    logout: async(req, res) => {
        res.cookie('token', '', { maxAge: 1 });
        res.send('ok')
    }
}