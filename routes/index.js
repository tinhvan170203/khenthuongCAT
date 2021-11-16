var express = require('express');
var router = express.Router();
const multer = require('multer');
let checkToken = require('../middlewares/checkToken');
let checkRole_chuyentrang = require('../middlewares/checkRole');
let checkRole_Ajax = require('../middlewares/checkAjaxRole');
// var upload = multer({ dest: 'uploads/' });
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

const vanban = require('../controller/vanbanquydinh/index');

/* GET home page. */
router.get('/quantrivanban', checkToken, checkRole_chuyentrang('xem-danh-sach-van-ban'), vanban.getIndex);
router.get('/getVB', vanban.getVB);
router.post('/addVB', checkToken, checkRole_Ajax('them-van-ban'), upload.single('file'), vanban.addVB);
router.post('/editVB/:id', checkToken, checkRole_Ajax('sua-van-ban'), upload.single('file'), vanban.editVB);
router.get('/deleteVB/:id', checkToken, checkRole_Ajax('xoa-van-ban'), vanban.deleteVB);


router.get('/loaivanban', checkToken, checkRole_chuyentrang('xem-danh-sach-van-ban'), vanban.loaiVbPage);
router.post('/loaivanban/add', checkToken, checkRole_Ajax('them-van-ban'), vanban.addLoaiVB);
router.post('/loaivanban/edit/:id', checkToken, checkRole_Ajax('sua-van-ban'), vanban.editLoaiVB);
router.get('/loaivanban/delete/:id', checkToken, checkRole_Ajax('xoa-van-ban'), vanban.deleteLoaiVB);
router.get('/loaivanban/getData', vanban.getLoaiVB);

router.get('/coquanbanhanh', checkToken, checkRole_chuyentrang('xem-danh-sach-van-ban'), vanban.CQBHPage);
router.post('/coquanbanhanh/add', checkToken, checkRole_Ajax('them-van-ban'), vanban.addCQBH);
router.post('/coquanbanhanh/edit/:id', checkToken, checkRole_Ajax('sua-van-ban'), vanban.editCQBH);
router.get('/coquanbanhanh/delete/:id', checkToken, checkRole_Ajax('xoa-van-ban'), vanban.deleteCQBH);
router.get('/coquanbanhanh/getData', vanban.getCQBH);

module.exports = router;