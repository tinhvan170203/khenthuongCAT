var express = require('express');
var router = express.Router();
const multer = require('multer');
let checkToken = require('../middlewares/checkToken');
let checkRole_chuyentrang = require('../middlewares/checkRole');
let checkRole_Ajax = require('../middlewares/checkAjaxRole');
const vannghethethao = require('../controller/vannghethethao');
// var upload = multer({ dest: 'uploads/' });
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/VanngheThethao')
    },
    filename: function(req, file, cb) {
        cb(null, +new Date() + "_" + file.originalname)
    }
})
var upload = multer({
    storage: storage,
});

router.get('/quantri/mohinhtieubieu', checkToken, checkRole_chuyentrang('xem-mo-hinh'), vannghethethao.getMohinhPage);
router.post('/quantri/mohinhtieubieu/add', checkToken, checkRole_Ajax('them-mo-hinh'), upload.single('file'), vannghethethao.addMohinh);
router.get('/quantri/mohinhtieubieu/getImg', checkToken, checkRole_Ajax('xem-mo-hinh'), vannghethethao.getImg)
router.get('/quantri/mohinhtieubieu/changeTrangthai/:id', checkToken, checkRole_Ajax('sua-mo-hinh'), vannghethethao.changeTrangthai)
router.post('/quantri/mohinhtieubieu/edit/:id', checkToken, checkRole_Ajax('sua-mo-hinh'), upload.single('file'), vannghethethao.editMohinh)
router.get('/quantri/mohinhtieubieu/delete/:id', checkToken, checkRole_Ajax('xoa-mo-hinh'), vannghethethao.deleteMohinh);
router.post('/quantri/mohinhtieubieu/sortTT', checkToken, checkRole_Ajax('sua-mo-hinh'), vannghethethao.sortTT)

//Trang quản trị thể thao
router.get('/quantri/thethao', checkToken, checkRole_chuyentrang(''), vannghethethao.thethaoPage)
router.get('/quantri/thethao/ketqua/giaithethao', checkToken, checkRole_Ajax('xem-ket-qua-the-thao'), vannghethethao.tableGiaithethao)
router.post('/quantri/thethao/ketqua/giaithethao/add', checkToken, checkRole_Ajax('them-ket-qua-the-thao'), vannghethethao.addGiaiThethao)
router.post('/quantri/thethao/ketqua/giaithethao/edit/:id', checkToken, checkRole_Ajax('sua-ket-qua-the-thao'), vannghethethao.editGiaiThethao)
router.get('/quantri/thethao/ketqua/giaithethao/delete/:id', checkToken, checkRole_Ajax('xoa-ket-qua-the-thao'), vannghethethao.deleteGiaiThethao)

router.get('/quantri/thethao/thethaoList', checkToken, checkRole_Ajax('xem-mon-the-thao'), vannghethethao.tableThethaoList)
router.post('/quantri/thethao/monthethao/add', checkToken, checkRole_Ajax('them-mon-the-thao'), vannghethethao.addMonThethao)
router.post('/quantri/thethao/monthethao/edit/:id', checkToken, checkRole_Ajax('them-mon-the-thao'), vannghethethao.editMonThethao)
router.get('/quantri/thethao/monthethao/delete/:id', checkToken, checkRole_Ajax('them-mon-the-thao'), vannghethethao.deleteMonThethao)

//Update danh sách cá nhân tiêu biểu thể thao theo năm
router.get('/quantri/allCanbo', vannghethethao.getAllCanbo)
router.get('/quantri/thethao/canhantieubieu/:id/:nam', checkToken, checkRole_Ajax('xem-ca-nhan-the-thao-dien-hinh'), vannghethethao.tableTieubieu)
router.post('/quantri/thethao/canhantieubieu/:id/:nam/updateList', checkToken, checkRole_Ajax('them-ca-nhan-the-thao-dien-hinh'), vannghethethao.updateTieubieuList)
router.get('/quantri/thethao/canhantieubieu/:id/:nam/delete/:id1', checkToken, checkRole_Ajax('xoa-ca-nhan-the-thao-dien-hinh'), vannghethethao.deleteCanhanTieubieu)

//Trang quản trị văn hóa văn nghệ
router.get('/quantri/vannghe', checkToken, checkRole_chuyentrang(''), vannghethethao.vannghePage)
router.get('/quantri/vannghe/ketqua/giaivannghe', checkToken, checkRole_Ajax('xem-ket-qua-van-nghe'), vannghethethao.tableGiaiVannghe)
router.post('/quantri/vannghe/ketqua/giaivannghe/add', checkToken, checkRole_Ajax('them-ket-qua-van-nghe'), vannghethethao.addGiaiVannghe)
router.post('/quantri/vannghe/ketqua/giaivannghe/edit/:id', checkToken, checkRole_Ajax('sua-ket-qua-van-nghe'), vannghethethao.editGiaiVannghe)
router.get('/quantri/vannghe/ketqua/giaivannghe/delete/:id', checkToken, checkRole_Ajax('xoa-ket-qua-van-nghe'), vannghethethao.deleteGiaiVannghe)

router.get('/quantri/vannghe/vanngheList', checkToken, checkRole_Ajax('xem-the-loai-van-nghe'), vannghethethao.tableVanngheList)
router.post('/quantri/vannghe/loaihinh/add', checkToken, checkRole_Ajax('them-the-loai-van-nghe'), vannghethethao.addLoaiVannghe)
router.post('/quantri/vannghe/loaihinh/edit/:id', checkToken, checkRole_Ajax('sua-the-loai-van-nghe'), vannghethethao.editLoaiVannghe)
router.get('/quantri/vannghe/loaihinh/delete/:id', checkToken, checkRole_Ajax('xoa-the-loai-van-nghe'), vannghethethao.deleteLoaiVannghe)

// router.get('/quantri/vannghe/canhantieubieu/:id/:nam', vannghethethao.tableTieubieu)
router.get('/quantri/vannghe/canhantieubieu/loaihinh/:id/:nam', checkToken, checkRole_Ajax('xem-ca-nhan-van-nghe-dien-hinh'), vannghethethao.tableVanngheTieubieu)
router.post('/quantri/vannghe/canhantieubieu/:id/:nam/updateList', checkToken, checkRole_Ajax('them-ca-nhan-van-nghe-dien-hinh'), vannghethethao.updateVanngheTieubieuList)
router.get('/quantri/vannghe/canhantieubieu/:id/:nam/delete/:id1', checkToken, checkRole_Ajax('xoa-ca-nhan-van-nghe-dien-hinh'), vannghethethao.deleteVanngheCanhanTieubieu)


// router.post('/quantri/vannghe/canhantieubieu/:id/:nam/updateList', vannghethethao.updateVanngheTieubieuList)
// router.get('/quantri/vannghe/canhantieubieu/:id/:nam/delete/:id1', vannghethethao.deleteVanngheCanhanTieubieu)

//Hoạt động VHVN- TDTT tiêu biểu của năm
router.get('/quantri/hoatdongtieubieu', checkToken, checkRole_chuyentrang('xem-hoat-dong-tieu-bieu'), vannghethethao.hoatdongTieubieuPage)
router.get('/quantri/hoatdongtieubieu/:nam', vannghethethao.tableHoatdongTieubieu)
router.post('/quantri/hoatdongtieubieu/:nam/add', checkToken, checkRole_Ajax('them-hoat-dong-tieu-bieu'), vannghethethao.addHoatdong)
router.post('/quantri/hoatdongtieubieu/:nam/edit/:id1', checkToken, checkRole_Ajax('sua-hoat-dong-tieu-bieu'), vannghethethao.editHoatdong)
router.get('/quantri/hoatdongtieubieu/:nam/delete/:id1', checkToken, checkRole_Ajax('xoa-hoat-dong-tieu-bieu'), vannghethethao.deleteHoatdong)

module.exports = router;