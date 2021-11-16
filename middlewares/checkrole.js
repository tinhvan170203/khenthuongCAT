let User = require('../models/quantrihethong/user');


let checkRole_chuyentrang = (role) => {
    return async(req, res, next) => {
        let allRole = [];
        let tentaikhoan = req.token.user;
        let matkhau = req.token.pass;
        let user = await User.findOne({ tentaikhoan }).populate('roles');
        if (user === null) {
            req.flash('mess', "Tài khoản đã bị xóa bởi Admin hệ thống.");
            res.redirect('/quantrihethong/login');
            return;
        } else {
            if (matkhau !== user.matkhau) {
                req.flash('mess', "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.");
                res.redirect('/quantrihethong/login');
                return;
            } else {
                user.roles.forEach(i => {
                    allRole = allRole.concat(i.quyenList)
                })
                allRole = allRole.concat(user.chucnangrieng)
                req.allRole = allRole;
                req.user = user.tentaikhoan
                let checkedRole = '';
                if (role !== '') {
                    checkedRole = allRole.indexOf(role);
                }
                if (user.trangthai === false) {
                    req.flash('mess', "Tài khoản đã bị khóa bởi Admin");
                    res.redirect('/quantrihethong/login');
                    return
                }
                if (checkedRole === -1) {
                    req.flash('mess', "Người dùng không có quyền xem trang. Vui lòng đăng nhập tài khoản có chức năng này.");
                    res.redirect('/quantrihethong/login');
                    return
                }
            }
        }
        next()
    }
}
module.exports = checkRole_chuyentrang;