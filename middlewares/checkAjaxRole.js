let User = require('../models/quantrihethong/user');


let checkRole_Ajax = (role) => {
    return async(req, res, next) => {
        let allRole = [];
        let tentaikhoan = req.token.user;
        let matkhau = req.token.pass;
        let user = await User.findOne({ tentaikhoan }).populate('roles');
        if (user === null) {
            res.send("Tài khoản đã bị xóa bởi Admin hệ thống.");
            return;
        } else {
            if (matkhau !== user.matkhau) {
                res.send("Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.")
                return;
            } else {
                user.roles.forEach(i => {
                    allRole = allRole.concat(i.quyenList)
                })
                allRole = allRole.concat(user.chucnangrieng)
                req.allRole = allRole;
                req.user = user.tentaikhoan;
                let checkedRole = '';
                if (role !== '') {
                    checkedRole = allRole.indexOf(role);
                }
                if (checkedRole === -1) {
                    res.send(`Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.`);
                    return
                };
            }
        }
        next()
    }
}
module.exports = checkRole_Ajax;