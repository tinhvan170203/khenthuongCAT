var express = require('express');
var router = express.Router();
let checkToken = require('../middlewares/checkToken');
let checkRole_chuyentrang = require('../middlewares/checkRole');
let checkRole_Ajax = require('../middlewares/checkAjaxRole');
const multer = require('multer');
// var upload = multer({ dest: 'uploads/' });
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/Congtacdieulenh/kiemtradieulenh')
    },
    filename: function(req, file, cb) {
        cb(null, +new Date() + '_' + file.originalname)
    }
})
var storage1 = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/Congtacdieulenh/kiemtratinhhuong')
    },
    filename: function(req, file, cb) {
        cb(null, +new Date() + '_' + file.originalname)
    }
})
var storage2 = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/Congtacdieulenh/kiemtratheluc')
    },
    filename: function(req, file, cb) {
        cb(null, +new Date() + '_' + file.originalname)
    }
})
var storage3 = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/Congtacdieulenh/kiemtrabansung')
    },
    filename: function(req, file, cb) {
        cb(null, +new Date() + '_' + file.originalname)
    }
})
var storage4 = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/Congtacdieulenh/kiemtraquansu')
    },
    filename: function(req, file, cb) {
        cb(null, +new Date() + '_' + file.originalname)
    }
})
var upload = multer({
    storage: storage,
});
var upload1 = multer({
    storage: storage1,
})
var upload2 = multer({
    storage: storage2,
})
var upload3 = multer({
    storage: storage3,
})
var upload4 = multer({
    storage: storage4,
})

const dieulenh = require('../controller/congtacdieulenh/index');

router.get('/quantri', checkToken, checkRole_chuyentrang('xem-ket-qua-kiem-tra-px03'), dieulenh.getDieulenhPage);
router.get('/quantri/kiemtra/dieulenhpx03/:nam', dieulenh.tableKetquaKTDieulenh);
router.get('/kiemtra/download/:file', dieulenh.downloadKTDieulenh);
router.post('/quantri/kiemtra/dieulenhpx03/add', checkToken, checkRole_Ajax('them-ket-qua-kiem-tra-px03'), upload.single('tep'), dieulenh.addKetquaKTDieuLenh);
router.post('/quantri/kiemtra/dieulenhpx03/edit/:id', checkToken, checkRole_Ajax('sua-ket-qua-kiem-tra-px03'), upload.single('tep_Edit'), dieulenh.editKetquaKTDieulenh);
router.get('/quantri/kiemtra/dieulenhpx03/delete/:id', checkToken, checkRole_Ajax('xoa-ket-qua-kiem-tra-px03'), dieulenh.deleteKetquaKTDieulenh);

// Tình huống giả định 
router.get('/quantri/tinhhuong', checkToken, checkRole_chuyentrang('xem-tinh-huong-gia-dinh'), dieulenh.getQuantriTinhhuongPage);
router.get('/quantri/tinhhuong/list', dieulenh.tableTinhhuong);
router.post('/quantri/tinhhuong/add', checkToken, checkRole_Ajax('them-tinh-huong-gia-dinh'), dieulenh.addTinhhuong);
router.post('/quantri/tinhhuong/edit/:id', checkToken, checkRole_Ajax('sua-tinh-huong-gia-dinh'), dieulenh.editTinhhuong);
router.get('/quantri/tinhhuong/delete/:id', checkToken, checkRole_Ajax('xoa-tinh-huong-gia-dinh'), dieulenh.deleteTinhhuong);


// Kiểm tra tình huống giả định 
router.get('/quantri/kiemtra/tinhhuong', checkToken, checkRole_chuyentrang('xem-kiem-tra-tinh-huong-gia-dinh'), dieulenh.getKiemtraTinhhuongPage);
router.get('/quantri/kiemtra/tinhhuong/:nam', dieulenh.tableKiemtraTinhhuong);
router.get('/kiemtra/tinhhuong/download/:file', dieulenh.downloadKTTinhhuong);
router.post('/quantri/kiemtra/tinhhuong/add', checkToken, checkRole_Ajax('them-kiem-tra-tinh-huong-gia-dinh'), upload1.single('tep'), dieulenh.addKetquaKTTinhhuong);
router.post('/quantri/kiemtra/tinhhuong/edit/:id', checkToken, checkRole_Ajax('sua-kiem-tra-tinh-huong-gia-dinh'), upload1.single('tep_Edit'), dieulenh.editKetquaKTTinhhuong);
router.get('/quantri/kiemtra/tinhhuong/delete/:id', checkToken, checkRole_Ajax('xoa-kiem-tra-tinh-huong-gia-dinh'), dieulenh.deleteKetquaKTTinhhuong);

//Chiến sĩ khỏe
router.get('/quantri/kiemtra/theluc', checkToken, checkRole_chuyentrang(''), dieulenh.getChiensikhoePage);
router.get('/quantri/kiemtra/theluc/tableTheluc/:nam', dieulenh.tableTheluc);
router.post('/quantri/kiemtra/theluc/add/:nam', checkToken, checkRole_Ajax('them-kiem-tra-the-luc'), upload2.single('tep'), dieulenh.addKTTheluc)
router.get('/quantri/kiemtra/theluc/download/:file', dieulenh.downloadKTTheluc);
router.post('/quantri/kiemtra/theluc/edit/:id', checkToken, checkRole_Ajax('sua-kiem-tra-the-luc'), upload2.single('tep_Edit'), dieulenh.editKetquaKTTheluc);
router.get('/quantri/kiemtra/theluc/delete/:id', checkToken, checkRole_Ajax('xoa-kiem-tra-the-luc'), dieulenh.deleteKetquaKTTheluc);
//kiểm tra bắn đạn thật
router.get('/quantri/kiemtra/bansung', checkToken, checkRole_chuyentrang(''), dieulenh.getBansungPage);
router.get('/quantri/kiemtra/bansung/tableBansung/:nam', dieulenh.tableBansung);
router.post('/quantri/kiemtra/bansung/add/:nam', checkToken, checkRole_Ajax('them-kiem-tra-ban-sung'), upload3.single('tep'), dieulenh.addKTBansung)
router.get('/quantri/kiemtra/bansung/download/:file', dieulenh.downloadKTBansung);
router.post('/quantri/kiemtra/bansung/edit/:id', checkToken, checkRole_Ajax('sua-kiem-tra-ban-sung'), upload3.single('tep_Edit'), dieulenh.editKetquaKTBansung);
router.get('/quantri/kiemtra/bansung/delete/:id', checkToken, checkRole_Ajax('xoa-kiem-tra-ban-sung'), dieulenh.deleteKetquaKTBansung);
//kiểm tra tập huấn điều lệnh, quân sự, võ thuật
router.get('/quantri/kiemtra/dieulenhquansu', checkToken, checkRole_chuyentrang(''), dieulenh.getQuansuPage);
router.get('/quantri/kiemtra/dieulenhquansu/tableQuansu/:nam', dieulenh.tableQuansu);
router.post('/quantri/kiemtra/dieulenhquansu/add/:nam', checkToken, checkRole_Ajax('them-kiem-tra-quan-su-vo-thuat'), upload4.single('tep'), dieulenh.addKTQuansu)
router.get('/quantri/kiemtra/dieulenhquansu/download/:file', dieulenh.downloadKTQuansu);
router.post('/quantri/kiemtra/dieulenhquansu/edit/:id', checkToken, checkRole_Ajax('sua-kiem-tra-quan-su-vo-thuat'), upload4.single('tep_Edit'), dieulenh.editKetquaKTQuansu);
router.get('/quantri/kiemtra/dieulenhquansu/delete/:id', checkToken, checkRole_Ajax('xoa-kiem-tra-quan-su-vo-thuat'), dieulenh.deleteKetquaKTQuansu);

// update chung danh sách k đạt 
//Danh sách Cá nhân k đạt thể lực , bắn súng,  võ thuật
router.get('/quantri/kiemtra/:noidungkhongdat/khongdat/:nam', dieulenh.tableThelucKhongdat);
router.get('/quantri/allCanbo', dieulenh.tableCanboOfDonvi)
router.post('/quantri/kiemtra/:noidungkhongdat/khongdat/:nam/updateList', checkToken, checkRole_Ajax('them-danh-sach-khong-dat'), dieulenh.updateKhongdatList)
router.get('/quantri/kiemtra/:noidungkhongdat/khongdat/:nam/delete/:id1', checkToken, checkRole_Ajax('xoa-danh-sach-khong-dat'), dieulenh.deleteKhongdatList)
module.exports = router;