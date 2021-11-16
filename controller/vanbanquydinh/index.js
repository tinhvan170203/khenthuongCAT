const _ = require('lodash');
const Vanban = require('../../models/vanban');
const Loaivanban = require('../../models/loaivanban');
const Coquanbanhanh = require('../../models/coquanbanhanhVB');
const Phong = require('../../models/capphong');
const path = require('path');
const fs = require('fs');
module.exports = {
    getIndex: async(req, res) => {
        let allRole = req.allRole;
        let user = req.user;
        let loaiVB = await Loaivanban.find();
        let coquanbanhanh = await Coquanbanhanh.find();
        let list = await Phong.find().sort({ kyhieu: 1 })
        res.render('./vanbanquydinh/vanban', { allRole, list, user, loaiVB, coquanbanhanh })
    },
    getVB: async(req, res) => {
        let Vanbans = await Vanban.find().populate('loaiVB').populate('coquanbanhanh')
        Vanbans = Vanbans.sort(function(a, b) {
            var aa = a.ngaybanhanh.split('-').join(''),
                bb = b.ngaybanhanh.split('-').join('');
            return bb < aa ? -1 : (aa > bb ? 1 : 0);
        });
        res.send(Vanbans)
    },
    addVB: async(req, res) => {
        let newVB = new Vanban({
            soVB: req.body.soVB.trim(),
            tenVB: req.body.tenVB.trim(),
            loaiVB: req.body.loaiVB.trim(),
            kyhieuVB: req.body.kyhieuVB.trim(),
            trichyeu: req.body.trichyeu.trim(),
            nguoiky: req.body.nguoiky.trim(),
            ngaybanhanh: req.body.ngaybanhanh.split('-').reverse().join("-"),
            coquanbanhanh: req.body.coquanbanhanh.trim(),
            tep: req.file.path.slice(7)
        });
        await newVB.save();
        res.send('Thêm mới VB thành công.')
    },
    editVB: async(req, res) => {
        let id_VB = req.params.id;
        let EditVB = await Vanban.findById(id_VB);
        let link_tep_cu = EditVB.tep;
        EditVB.soVB = req.body.Edit_soVB;
        EditVB.tenVB = req.body.Edit_tenVB;
        EditVB.loaiVB = req.body.Edit_loaiVB;
        EditVB.kyhieuVB = req.body.Edit_kyhieuVB;
        EditVB.trichyeu = req.body.Edit_trichyeu;
        EditVB.nguoiky = req.body.Edit_nguoiky;
        EditVB.coquanbanhanh = req.body.Edit_coquanbanhanh;
        EditVB.ngaybanhanh = req.body.Edit_ngaybanhanh.split('-').reverse().join("-");
        if (req.file !== undefined) {
            fs.readdirSync(path.join(__dirname, '../../public/Hethongvanban'), 'utf-8').forEach(file => {
                if (file === link_tep_cu.slice(14)) {
                    fs.unlinkSync(path.join(__dirname, '../../public/' + link_tep_cu));
                }
            });
            EditVB.tep = req.file.path.slice(7);
        }
        await EditVB.save();
        res.send('Updte thành công.')
    },
    deleteVB: async(req, res) => {
        let id_VB = req.params.id;
        let deleteVB = await Vanban.findById(id_VB);
        let link_tep_cu = deleteVB.tep;
        fs.readdirSync(path.join(__dirname, '../../public/Hethongvanban'), 'utf-8').forEach(file => {
            if (file === link_tep_cu.slice(14)) {
                fs.unlinkSync(path.join(__dirname, '../../public/' + link_tep_cu));
            }
        });
        await deleteVB.remove();
        res.send('Xóa văn bản thành công.')
    },
    loaiVbPage: async(req, res) => {
        let allRole = req.allRole;
        let user = req.user;
        let list = await Phong.find().sort({ kyhieu: 1 })
        res.render('./vanbanquydinh/loaivanban', { allRole, list, user })
    },
    addLoaiVB: async(req, res) => {
        let newItem = new Loaivanban(req.body);
        await newItem.save();
        res.send('ok')
    },
    editLoaiVB: async(req, res) => {
        let id = req.params.id;
        console.log(req.body);
        await Loaivanban.findByIdAndUpdate(id, req.body);
        res.send('Sửa thành công')
    },
    deleteLoaiVB: async(req, res) => {
        let id = req.params.id;
        await Loaivanban.findByIdAndDelete(id);
        res.send('xóa thành công')
    },
    getLoaiVB: async(req, res) => {
        let list = await Loaivanban.find();
        res.send(list)
    },
    CQBHPage: async(req, res) => {
        let allRole = req.allRole;
        let user = req.user;
        let list = await Phong.find().sort({ kyhieu: 1 })
        res.render('./vanbanquydinh/coquanbanhanh', { allRole, list, user })
    },
    addCQBH: async(req, res) => {
        let newItem = new Coquanbanhanh(req.body);
        await newItem.save();
        res.send('ok')
    },
    editCQBH: async(req, res) => {
        let id = req.params.id;
        await Coquanbanhanh.findByIdAndUpdate(id, req.body);
        res.send('Sửa thành công')
    },
    deleteCQBH: async(req, res) => {
        let id = req.params.id;
        await Coquanbanhanh.findByIdAndDelete(id);
        res.send('xóa thành công')
    },
    getCQBH: async(req, res) => {
        let list = await Coquanbanhanh.find();
        res.send(list)
    },
}