var express = require('express');
var router = express.Router();
const client = require('../controller/client/index');


router.get('/trangchu', client.trangchuPage)
router.get('/vianninhtoquoc/:nam', client.filterVianninh)
router.get('/thongke/thiduathang/:nam', client.thongkeThiduathang)
router.get('/thongke/thiduathang/:nam/:query', client.filterThiduathang)

router.get('/thongke/thiduanam/:nam', client.thongkeThiduanam)
router.get('/thongke/thiduanam/:nam/filterOneCase', client.filterThiduanamCaseOne)
router.get('/thongke/thiduanam/:nam/filterTwoCase', client.filterThiduanamCaseTwo)


router.get('/thongke/dangvien/:nam', client.thongkeDangvien)
router.get('/thongke/dangvien/:nam/filterOneCase', client.filterDangvienCaseOne)
router.get('/thongke/dangvien/:nam/filterTwoCase', client.filterDangvienCaseTwo)

router.get('/thongke/khenthuong', client.filterKhenthuongHome)
router.get('/thongke/kiluat', client.filterKiluatHome)

router.get('/tracuu/canbo/:capbac/:donvi/:hoten', client.searchCanbo)

// văn bản qui định khen thưởng
router.get('/hethongvanban', client.vanbanPage)

router.get('/tuyentruyen/tinbai-phongsu', client.tinbaiPage)
router.get('/tinbai-phongsu/filterTinbai', client.filterTinbai)
router.get('/tuyentruyen/cuocthi', client.cuocthituyentruyenPage)

router.get('/vannghethethao/mohinhtieubieu', client.mohinhTieubieuPage)
router.get('/vannghethethao/vannghe', client.vanhoavannghePage)
router.get('/giaivannghe', client.giaivannghe)
router.get('/vannghethethao/thethao', client.thethaoPage)
router.get('/giaithethao', client.giaithethao)

router.get('/vannghe/canhantieubieu/loaihinh/:id/:nam', client.filterCanhanVannghe)
router.get('/thethao/canhantieubieu/loaihinh/:id/:nam', client.filterCanhanThethao)

router.get('/congtacdieulenh/kiemtradieulenh', client.dieulenhCat)
router.get('/congtacdieulenh/ketquakiemtradieulenh', client.filterKiemtradieulenh)
router.get('/congtacdieulenh/ketquakiemtratinhhuong', client.filterKiemtratinhhuong)


router.get('/congtacdieulenh/kiemtraquansu-vothuat', client.kiemtraquansuPage)
router.get('/congtacdieulenh/ketquakiemtraquansu/:nam', client.filterKiemtraquansu)
router.get('/congtacdieulenh/kiemtrabansung', client.kiemtrabansungPage)
router.get('/congtacdieulenh/ketquakiemtrabansung/:nam', client.filterBansung)

router.get('/congtacdieulenh/kiemtratheluc', client.kiemtrathelucPage)
router.get('/congtacdieulenh/ketquakiemtratheluc/:nam', client.filterTheluc)

//danh sách k đạt thể lực, quân sự, võ thuật, bắn súng dùng chung
router.get('/congtacdieulenh/:noidungkhongdat/khongdat/:nam', client.filterCanhanBad)

//trang phòng
router.get('/phong/:id', client.trangphongPage)

router.get('/thongke/khenthuong/:id', client.filterKhenthuongPhong)
router.get('/thongke/kiluat/:id', client.filterKiluatPhong)

router.get('/phong/:id/doi/:id1', client.trangdoiPage)
router.get('/trangdoi/:id/thiduathang/:nam', client.filterThiduathangDoi)
router.get('/trangdoi/:id/thiduanam/:nam', client.filterThiduanamDoi)
router.get('/trangdoi/:id/dangvien/:nam', client.filterDangvienDoi)
router.get('/trangdoi/:id/khenthuong', client.filterKhenthuongDoi)
router.get('/trangdoi/:id/kiluat', client.filterKiluatDoi)

router.get('/trangcanhan/:id', client.trangCanhanPage)
module.exports = router;