var express = require('express');
var router = express.Router();
let checkToken = require('../middlewares/checkToken');
let checkRole_chuyentrang = require('../middlewares/checkRole');
let checkRole_Ajax = require('../middlewares/checkAjaxRole');

let tuyentruyen = require('../controller/tuyentruyen/index')
router.get('/quantri/chuyenmuc', checkToken, checkRole_chuyentrang('xem-chuyen-muc'), tuyentruyen.getChuyenmucPage);
router.get('/quantri/chuyenmuc/list', tuyentruyen.tableChuyenmucList);
router.post('/quantri/chuyenmuc/addChuyenmuc', checkToken, checkRole_Ajax('them-chuyen-muc'), tuyentruyen.addChuyenmuc);
router.post('/quantri/chuyenmuc/editChuyenmuc/:id', checkToken, checkRole_Ajax('sua-chuyen-muc'), tuyentruyen.editChuyenmuc);
router.get('/quantri/chuyenmuc/deleteChuyenmuc/:id', checkToken, checkRole_Ajax('xoa-chuyen-muc'), tuyentruyen.deleteChuyenmuc)

router.get('/quantri/muctin', checkToken, checkRole_chuyentrang('xem-muc-tin'), tuyentruyen.getMuctinPage)
router.get('/:id/muctin', tuyentruyen.getMuctin);
router.post('/:id/addMuctin', checkToken, checkRole_Ajax('them-muc-tin'), tuyentruyen.addMuctin);
router.post('/:id/editMuctin/muctin/:id1', checkToken, checkRole_Ajax('sua-muc-tin'), tuyentruyen.editMuctin)
router.get('/:id/deleteMuctin/muctin/:id1', checkToken, checkRole_Ajax('xoa-muc-tin'), tuyentruyen.deleteMuctin)


router.get('/quantri/tinbai', checkToken, checkRole_chuyentrang('xem-tin-bai'), tuyentruyen.getAdminTinbai)
router.get('/:id/fetchMuctinList', tuyentruyen.fetchMuctinList)
router.get('/quantri/tinbai/:year', tuyentruyen.getTinbaiTable)
router.post('/quantri/:id1/:id2/addTinbai', checkToken, checkRole_Ajax('them-tin-bai'), tuyentruyen.addTinbai)
router.post('/quantri/:id1/:id2/editTinbai/:id3', checkToken, checkRole_Ajax('sua-tin-bai'), tuyentruyen.editTinbai)
router.get('/quantri/:id1/:id2/deleteTinbai/:id3', checkToken, checkRole_Ajax('xoa-tin-bai'), tuyentruyen.deleteTinbai)

//quản trị kết quả thi tuyên truyền
router.get('/quantri/ketquathi', checkToken, checkRole_chuyentrang('xem-cuoc-thi-tuyen-truyen'), tuyentruyen.getCuocthiPage);
router.get('/quantri/ketquathi/getCuocthiList/:year', tuyentruyen.getCuocthiList)
router.post('/quantri/ketquathi/add', checkToken, checkRole_Ajax('them-cuoc-thi-tuyen-truyen'), tuyentruyen.addCuocthi)
router.post('/quantri/ketquathi/edit/:id', checkToken, checkRole_Ajax('xoa-cuoc-thi-tuyen-truyen'), tuyentruyen.editCuocthi)
router.get('/quantri/ketquathi/delete/:id', checkToken, checkRole_Ajax('xoa-cuoc-thi-tuyen-truyen'), tuyentruyen.deleteCuocthi)
module.exports = router;