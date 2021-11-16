var express = require('express');
var router = express.Router();
const multer = require('multer');
let checkToken = require('../../middlewares/checkToken');
let checkRole_chuyentrang = require('../../middlewares/checkRole');
let checkRole_Ajax = require('../../middlewares/checkAjaxRole');
const phong = require('../../controller/admin/phongbase.js');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/anhCanbo')
    },
    filename: function(req, file, cb) {
        cb(null, +new Date() + '.jpg')
    }
})
var upload = multer({
    storage: storage,
});
router.get('/quantriphong', checkToken, checkRole_chuyentrang(''), phong.getPhongPage);
router.get('/quantriphong/getPhong', phong.getPhong)
router.post('/quantriphong/add', checkToken, checkRole_Ajax('them-phong'), phong.add);
router.post('/quantriphong/edit/:id', checkToken, checkRole_Ajax('sua-phong'), phong.edit)
router.get('/quantriphong/delete/:id', checkToken, checkRole_Ajax('xoa-phong'), phong.delete)

//chi tiết cấp phòng, huyện, thị
router.get('/quantriphong/chitiet/:id', checkToken, checkRole_chuyentrang(''), phong.getDetailPhongPage);
router.get('/quantriphong/chitiet/:id/khenthuongphong', phong.tableKhenthuongPhong)
router.post('/quantriphong/chitiet/:id/khenthuongphong/add', checkToken, checkRole_Ajax('them-khen-thuong-phong'), phong.addKhenthuongPhong)
router.get('/quantriphong/chitiet/:id/khenthuongphong/delete/:id1', checkToken, checkRole_Ajax('sua-khen-thuong-phong'), phong.deleteKhenthuongPhong)
router.post('/quantriphong/chitiet/:id/khenthuongphong/edit/:id1', checkToken, checkRole_Ajax('xoa-khen-thuong-phong'), phong.editKhenthuongPhong)

//Thi đua, vì an ninh tổ quốc
router.get('/quantriphong/chitiet/:id/thiduaphong', phong.tableThiduaPhong)
router.post('/quantriphong/chitiet/:id/thiduaphong/add', checkToken, checkRole_Ajax('them-thi-dua-phong'), phong.addThiduaPhong)
router.get('/quantriphong/chitiet/:id/thiduaphong/delete/:id1', checkToken, checkRole_Ajax('xoa-thi-dua-phong'), phong.deleteThiduaPhong)
router.post('/quantriphong/chitiet/:id/thiduaphong/edit/:id1', checkToken, checkRole_Ajax('sua-thi-dua-phong'), phong.editThiduaPhong)

// quản lí đội 
router.get('/quantriphong/chitiet/:id/quantridoi', phong.tableQuantriDoi)
router.post('/quantriphong/chitiet/:id/quantridoi/add', checkToken, checkRole_Ajax('them-doi'), phong.addDoi)
router.post('/quantriphong/chitiet/:id/quantridoi/edit/:id1', checkToken, checkRole_Ajax('sua-doi'), phong.editDoi)
router.get('/quantriphong/chitiet/:id/quantridoi/delete/:id1', checkToken, checkRole_Ajax('xoa-doi'), phong.deleteDoi)
router.get('/quantriphong/chitiet/:id/danhsachdoi', phong.getDoiList)
    //Khen thưởng đội
router.get('/quantriphong/chitiet/:id/khenthuongdoi', phong.tableKhenthuongDoi)
router.post('/quantriphong/chitiet/:id/khenthuongdoi/:id1/add', checkToken, checkRole_Ajax('them-khen-thuong-doi'), phong.addKhenthuongDoi)
router.get('/quantriphong/chitiet/:id/khenthuongdoi/:id1/delete/:id2', checkToken, checkRole_Ajax('sua-khen-thuong-doi'), phong.deleteKhenthuongDoi)
router.post('/quantriphong/chitiet/:id/khenthuongdoi/:id1/edit/:id2', checkToken, checkRole_Ajax('xoa-khen-thuong-doi'), phong.editKhenthuongDoi)

//Thêm cán bộ, chiến sĩ
router.post('/quantriphong/chitiet/:id/quantricanbo/addCanbo', checkToken, checkRole_Ajax('them-can-bo'), upload.single('img'), phong.addCanbo);
router.post('/quantriphong/chitiet/:id/quantricanbo/editCanbo/:id1', checkToken, checkRole_Ajax('sua-can-bo'), upload.single('img'), phong.editCanbo);
router.get('/quantriphong/chitiet/:id/quantricanbo/deleteCanbo/:id1', checkToken, checkRole_Ajax('xoa-can-bo'), phong.deleteCanbo);
router.post('/quantriphong/chitiet/quantricanbo/:id1/moveCanbo/:id2/:id3', checkToken, checkRole_Ajax('luan-chuyen-can-bo'), phong.moveCanbo);
router.get('/quantriphong/chitiet/:id/quantricanbo', phong.tableQuantriCanbo);

//Thi đua tháng
router.get('/quantriphong/chitiet/:id/quantricanbo/thiduathang/:month/:year', phong.tableQuantriThiduathang);
router.post('/quantriphong/chitiet/quantricanbo/:id1/thiduathang/:month/:year', checkToken, checkRole_Ajax('them-thi-dua-thang'), phong.editGhichu);
router.post('/quantriphong/chitiet/quantricanbo/update/xeploai/thiduathang/:month/:year', checkToken, checkRole_Ajax('sua-thi-dua-thang'), phong.updateThiduathang);

//Thi đua năm
router.get('/quantriphong/chitiet/:id/quantricanbo/thiduanam/:year', phong.tableQuantriThiduanam);
router.post('/quantriphong/chitiet/quantricanbo/:id1/thiduanam/:year', checkToken, checkRole_Ajax('sua-ghi-chu-thi-dua-nam'), phong.editGhichunam);
router.post('/quantriphong/chitiet/quantricanbo/update/xeploai/thiduanam/:year', checkToken, checkRole_Ajax('them-thi-dua-nam'), phong.updateThiduanam);

//Xếp loại đảng viên
router.get('/quantriphong/chitiet/:id/quantridangvien/:year', phong.tableQuantriDangvien);
router.post('/quantriphong/chitiet/quantridangvien/:year/save', checkToken, checkRole_Ajax('them-xep-loai-dang-vien'), phong.updateXeploaiDangvien);

// Khen thưởng cá nhân 
router.get('/quantriphong/chitiet/:id/danhsachCanbo', phong.getCanboList);
router.get('/quantriphong/chitiet/khenthuongcanhan/:id', phong.tableKhenthuongCanhan)
router.post('/quantriphong/chitiet/khenthuongcanhan/:id/add', checkToken, checkRole_Ajax('them-khen-thuong-ca-nhan'), phong.addKhenthuongCanhan)
router.get('/quantriphong/chitiet/khenthuongcanhan/:id/delete/:id1', checkToken, checkRole_Ajax('xoa-khen-thuong-ca-nhan'), phong.deleteKhenthuongCanhan)
router.post('/quantriphong/chitiet/khenthuongcanhan/:id/edit/:id1', checkToken, checkRole_Ajax('sua-khen-thuong-ca-nhan'), phong.editKhenthuongCanhan)

// Kỉ luật cá nhân 
router.get('/quantriphong/chitiet/kiluatcanhan/:id', phong.tableKiluatCanhan)
router.post('/quantriphong/chitiet/kiluatcanhan/:id/add', checkToken, checkRole_Ajax('them-ki-luat-ca-nhan'), phong.addKiluatCanhan)
router.get('/quantriphong/chitiet/kiluatcanhan/:id/delete/:id1', checkToken, checkRole_Ajax('xoa-ki-luat-ca-nhan'), phong.deleteKiluatCanhan)
router.post('/quantriphong/chitiet/kiluatcanhan/:id/edit/:id1', checkToken, checkRole_Ajax('sua-ki-luat-ca-nhan'), phong.editKiluatCanhan)
module.exports = router;