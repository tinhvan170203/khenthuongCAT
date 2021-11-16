var express = require('express');
var router = express.Router();
let checkToken = require('../middlewares/checkToken');
let checkRole_chuyentrang = require('../middlewares/checkRole');
let checkRole_Ajax = require('../middlewares/checkAjaxRole');
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/Hethongvanban')
    },
    filename: function(req, file, cb) {
        cb(null, +new Date() + '_' + file.originalname)
    }
})
var upload = multer({
    storage: storage,
});


const admin = require('../controller/superAdmin/index');

/* GET home page. */
router.get('/nhomquyen', checkToken, checkRole_chuyentrang('xem-danh-sach-phan-quyen'), admin.nhomquyenPage);
router.get('/nhomquyen/tableNhomquyen', checkToken, checkRole_chuyentrang('xem-danh-sach-phan-quyen'), admin.tableQuantriNhomquyen);
router.post('/nhomquyen/add', checkToken, checkRole_Ajax('them-phan-quyen'), admin.addNhomquyen)
router.get('/nhomquyen/edit/:id', checkToken, checkRole_Ajax('sua-phan-quyen'), admin.getEditNhomquyen)
router.post('/nhomquyen/edit/:id', checkToken, checkRole_Ajax('sua-phan-quyen'), admin.editNhomquyen)
router.get('/nhomquyen/delete/:id', checkToken, checkRole_Ajax('xoa-phan-quyen'), admin.deleteNhomquyen)

//quản trị tài khoản    
router.get('/quantritaikhoan', checkToken, checkRole_chuyentrang('xem-danh-sach-nguoi-dung'), admin.quantriTaikhoanpage);
router.get('/quantritaikhoan/taikhoan/tableTaikhoan', checkToken, checkRole_chuyentrang('xem-danh-sach-nguoi-dung'), admin.tableTaikhoan);
router.get('/quantritaikhoan/taikhoan/edit/getdata/:id', admin.getDataRoles);
router.post('/quantritaikhoan/taikhoan/add', checkToken, checkRole_Ajax('them-nguoi-dung'), admin.addTaikhoan)
router.post('/quantritaikhoan/taikhoan/edit/:id', checkToken, checkRole_Ajax('sua-nguoi-dung'), admin.editTaikhoan)
router.get('/quantritaikhoan/taikhoan/delete/:id', checkToken, checkRole_Ajax('xoa-nguoi-dung'), admin.deleteTaikhoan)

//Login phần mềm
router.get('/login', admin.loginPage)
router.post('/login/post', admin.postLogin)
router.get('/login/post', admin.loginPage);

router.get('/login/loginSuccess', checkToken, admin.loginSuccess)
    //các thao tác khi không có quyền sẽ bị chuyển qua trang này
router.get('/checkRole/error/:text', admin.errorRole)

router.get('/changePass', admin.changePassPage)
router.post('/doimatkhau/post', admin.postChangePass)
router.get('/doimatkhau/post', admin.changePassPage)

router.get('/logout', checkToken, admin.logout)
module.exports = router;