var express = require('express');
var router = express.Router();
const home = require('../controller/home/index');

router.get('/tracuu/canbo', home.searchCanbo)
router.get('/thiduathang', home.thiduathangHomePage);
router.get('/thiduanam', home.thiduanamHomePage);
router.get('/xeploaidangvien', home.dangvienHomePage);
router.get('/anninhtoquoc', home.ANTQPage);
router.get('/theodoikhenthuong', home.khenthuongHomePage);
router.get('/filterKhenthuong', home.filterKhenthuongHome);
router.get('/theodoikiluat', home.kiluatHomePage);
router.get('/filterKiluat', home.filterKiluatHome);
router.get('/thuvienanh', home.thuvienanhPage);
router.get('/hethongvanban', home.vanbanPage);
router.get('/filterVanban', home.filterVanban);


router.get('/phong/:id/thiduathang', home.trangphongPage);
router.get('/phong/:id/thiduanam', home.thiduanamPhongPage);
router.get('/phong/:id/xeploaidangvien', home.xeploaidangvienPhongPage);
router.get('/phong/:id/theodoikhenthuong', home.khenthuongPhongPage);
router.get('/phong/:id/filterKhenthuongPhong', home.filterKhenthuongPhong);
router.get('/phong/:id/theodoikiluat', home.kiluatPhongPage);
router.get('/phong/:id/filterKiluatPhong', home.filterKiluatPhong);

router.get('/phong/:id/danhsachdoi', home.danhsachDoiPage)
router.get('/phong/:id/danhsachcanbo', home.danhsachCBCSPage)
router.get('/phong/:id/danhsachcanbo/getData/:page', home.getDanhsachCBCS)

router.get('/phong/:id/capdoi/:id1/theodoikhenthuong', home.khenthuongDoiPage)
router.get('/doi/:id/filterKhenthuongDoi', home.filterKhenthuongDoi)
router.get('/phong/:id/capdoi/:id1/theodoikiluat', home.kiluatDoiPage)
router.get('/doi/:id/filterKiluatDoi', home.filterKiluatDoi)
router.get('/phong/:id/capdoi/:id1/thiduathang', home.thiduathangDoiPage)
router.get('/doi/:id/filterThiduathangDoi/:nam', home.filterThiduathangDoi)
router.get('/phong/:id/capdoi/:id1/thiduanam', home.thiduanamDoiPage)
router.get('/doi/:id/filterThiduanamDoi/:nam', home.filterThiduanamDoi)
router.get('/phong/:id/capdoi/:id1/xeploaidangvien', home.xeploaidangvienDoiPage)
router.get('/doi/:id/filterDangvienDoi/:nam', home.filterDangvienDoi)

router.get('/trangcanhan/:id', home.trangcanhan)
router.get('/congtactuyentruyen/cuocthi', home.cuocthituyentruyenPage)
router.get('/filterCuocthituyentruyen', home.filterCuocthituyentruyen)
router.get('/congtactuyentruyen/tinbaiphongsu', home.tinbaiPage)
router.get('/filterTinbaiChung', home.filterTinbaiChung)
router.get('/filterTinbaiNangcao', home.filterTinbaiNangcao)

router.get('/vannghe/cuocthi', home.cuocthiVannghePage)
router.get('/filterCuocthiVannghe', home.filterCuocthiVannghe)
router.get('/thethao/cuocthi', home.cuocthiThethaoPage)
router.get('/filterCuocthiThethao', home.filterCuocthiThethao)
router.get('/vannghe/danhsachdienhinh', home.canhanVannghePage)
router.get('/filterVanngheList', home.filterCanhanVannghe)
router.get('/thethao/danhsachdienhinh', home.canhanThethaoPage)
router.get('/filterThethaoList', home.filterCanhanThethao)

router.get('/hoatdongnoibat', home.hoatdongnoibatPage)
router.get('/filterHoatdong', home.filterHoatdong)

router.get('/congtacdieulenh/doidieulenhcatinh', home.dieulenhpx03Page)
router.get('/filterKiemtraPx03', home.filterKiemtraPx03)
router.get('/congtacdieulenh/kiemtratinhhuong', home.kiemtratinhhuongPage)
router.get('/filterKiemtraTinhhuong', home.filterKiemtratinhhuong)
router.get('/congtacdieulenh/kiemtratheluc', home.kiemtrathelucPage)
router.get('/filterKiemtratheluc', home.filterKiemtratheluc)
router.get('/congtacdieulenh/kiemtrabansung', home.kiemtrabansungPage)
router.get('/filterKiemtrabansung', home.filterKiemtrabansung)
router.get('/congtacdieulenh/kiemtradieulenh-quansu', home.kiemtraquansuPage)
router.get('/filterKiemtradieulenhquansu', home.filterKiemtradieulenhquansu)
router.get('/filterKiemtratheluc/:noidungkhongdat/khongdat/:nam', home.filterDanhsachKhongdat)
module.exports = router;