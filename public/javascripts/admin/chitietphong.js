$(document).ready(function() {
    var allRole = JSON.parse($('#variableJSON').text());
    $('#variableJSON').remove();

    $('#donvi').change(function() {
        $('#redirect').removeAttr('disabled');
    });
    $('#redirect').click(function(e) {
        e.preventDefault();
        let id = $('#donvi').val();
        window.location.href = '/admin/quantriphong/chitiet/' + id
    })
    $('#chuyentrang').change(function() {
        let id_phong = $('#chuyentrang').val();
        window.location = "/admin/quantriphong/chitiet/" + id_phong
    });

    //Bảng khen thưởng cấp phòng
    const tableKhenthuongPhong = () => {
        let id_phong = $('#chuyentrang').val();
        tableInitKhenthuongPhong = $('#tableKhenthuongPhong').DataTable({
            ajax: {
                url: `/admin/quantriphong/chitiet/${id_phong}/khenthuongphong`,
                dataSrc: ''
            },
            "lengthMenu": [15],
            "bSort": false,
            select: true,
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                "sInfoFiltered": "",
                "sInfo": "Tổng cộng  _TOTAL_ kết quả",
                "sLengthMenu": "",
            },
            "destroy": true, // cho phép hủy bỏ table tạo table mới với cùng id table
            "aoColumns": [{
                    "mData": function(data, type, dataToSet) {
                        return `<td></td>`
                    },
                    "width": "1%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="soQD" id="${data._id}">${data.soQD}</span>`
                    },
                    "width": "15%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="ngayQD">${data.ngayQD}</span>`
                    },
                    "width": "10%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="noidungkhenthuong">${data.noidungkhenthuong}</span>`
                    },
                    "width": "40%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align: center" class="hinhthuckhenthuong">${data.hinhthuckhenthuong}</p>`
                    },
                    "width": "15%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align: center" class="capkhenthuong">${data.capkhenthuong}</p>`
                    },
                    "width": "15%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('sua-khen-thuong-phong') !== -1) {
                            dataRender += `<i class="fas fa-edit editKhenthuongPhong" data-bs-toggle="modal" data-bs-target="#modalEditCuocthi" data-bs-backdrop='static' title="Sửa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "2%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('xoa-khen-thuong-phong') !== -1) {
                            dataRender += `<i class="fas fa-trash deleteKhenthuongPhong"  title="Xóa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "2%"
                }
            ]
        });
        tableInitKhenthuongPhong.on('order.dt search.dt', function() {
            tableInitKhenthuongPhong.column(0).nodes().each(function(cell, i) {
                cell.innerHTML = `<p style="text-align: center">${i+1}<p>`
            });
        }).draw();
    };

    // Thêm khen thưởng cấp phòng 
    $('#khenthuongForm').on('submit', function(e) {
        let id_phong = $('#chuyentrang').val();
        e.preventDefault();
        let soQD = $('#soQD').val().trim();
        let ngayQD = $('#ngayQD').val().trim();
        let hinhthuckhenthuong = $('#hinhthuckhenthuong').val();
        let capkhenthuong = $('#capkhenthuong').val();
        let noidungkhenthuong = $('#noidungkhenthuong').val().trim();
        $.ajax({
            url: `/admin/quantriphong/chitiet/${id_phong}/khenthuongphong/add`,
            method: 'POST',
            data: { soQD, ngayQD, hinhthuckhenthuong, capkhenthuong, noidungkhenthuong },
            error: function() {
                alert('Có lỗi xảy ra khi thêm mới khen thưởng phòng')
            },
            success: function(data) {
                if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                $('#khenthuongForm')[0].reset()
                tableInitKhenthuongPhong.ajax.reload(null, false)
                let toast = $('#add-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: false
                })
                bsToast.show(); //show toast
            }
        })
    })

    // Xóa khen thưởng phòng
    $(document).on('click', '.deleteKhenthuongPhong', function() {
        let row = $(this).closest("tr");
        let id = $('#chuyentrang').val();
        let id1 = row.find('.soQD').attr('id');
        let isDelete = confirm('Bạn có đồng ý xóa khen thưởng này?')
        if (isDelete) {
            $.ajax({
                url: `/admin/quantriphong/chitiet/${id}/khenthuongphong/delete/${id1}`,
                method: 'GET',
                error: function() {
                    alert('Có lỗi xảy ra...')
                },
                success: function(data) {
                    if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                        window.location.href = `/quantrihethong/checkRole/error/${data}`
                    };
                    if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                        window.location.href = `/quantrihethong/checkRole/error/${data}`
                    };
                    if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                        window.location.href = `/quantrihethong/checkRole/error/${data}`
                    };
                    tableInitKhenthuongPhong.ajax.reload(null, false)
                    let toast = $('#delete-toast');
                    let bsToast = new bootstrap.Toast(toast, {
                        delay: 3000,
                        animation: true
                    })
                    bsToast.show(); //show toast
                }
            })
        }
    });
    // Chỉnh sửa khen thưởng phòng 
    let idKhenthuongphong;
    $(document).on('click', '.editKhenthuongPhong', function() {
        let row = $(this).closest('tr');
        idKhenthuongphong = row.find('.soQD').attr('id');
        $('#soQD_Edit').val(row.find('.soQD').text());
        $('#ngayQD_Edit').val(row.find('.ngayQD').text());
        $('#noidungkhenthuong_Edit').val(row.find('.noidungkhenthuong').text());
        $('#capkhenthuong_Edit').val(row.find('.capkhenthuong').text());
        $('#hinhthuckhenthuong_Edit').val(row.find('.hinhthuckhenthuong').text());
    });
    $('#EditKhenthuongPhongForm').on('submit', function(e) {
        e.preventDefault();
        let id = $('#chuyentrang').val();
        let soQD = $('#soQD_Edit').val().trim();
        let ngayQD = $('#ngayQD_Edit').val().trim();
        let hinhthuckhenthuong = $('#hinhthuckhenthuong_Edit').val();
        let capkhenthuong = $('#capkhenthuong_Edit').val();
        let noidungkhenthuong = $('#noidungkhenthuong_Edit').val().trim();
        $.ajax({
            url: `/admin/quantriphong/chitiet/${id}/khenthuongphong/edit/${idKhenthuongphong}`,
            method: 'POST',
            data: { soQD, ngayQD, hinhthuckhenthuong, capkhenthuong, noidungkhenthuong },
            error: function() {
                alert('Có lỗi xảy ra...')
            },
            success: function(data) {
                if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                $('.btn-close').click();
                $('#EditKhenthuongPhongForm')[0].reset();
                tableInitKhenthuongPhong.ajax.reload(null, false)
                let toast = $('#edit-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: false
                })
                bsToast.show(); //show toast
            }
        })
    })

    //Tab khen thưởng phòng click
    $("#khenthuongPhong").click(function(e) {
        e.preventDefault();
        let parentNode = $(this).closest("li");
        if (parentNode.attr("class") == "quantri-item active") { //kiểm tra xem có đang active hay k
            return false;
        }
        $('.active').removeClass('active');
        parentNode.addClass('active');
        let namePhong = $('#phongName').text();
        $('#quantri-detail').html('');
        if (allRole.indexOf('them-khen-thuong-phong') !== -1) {
            $('#quantri-detail').append(`
            <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalAddKhenthuong" data-bs-backdrop='static'><i class="fas fa-user-plus" style="margin-right: 5px;"></i>Thêm mới</button>
            `)
        };
        $('#quantri-detail').append(`
            <h4 class="quantri-detail-head">Bảng khen thưởng tập thể <span id="phongName">${namePhong}</span></h4>
            <table id="tableKhenthuongPhong" style="width:100%" class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th style="text-align: center;">STT</th>
                        <th style="text-align: center;">Số Quyết định</th>
                        <th style="text-align: center;">Ngày</th>
                        <th style="text-align: center;">Nội dung khen thưởng</th>
                        <th style="text-align: center;">Hình thức KT</th>
                        <th style="text-align: center;">Cấp khen</th>
                        <th style="text-align: center;"></th>
                        <th style="text-align: center;"></th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `);
        tableKhenthuongPhong()
    });
    // End khen thưởng phòng 

    // Thi đua Vì an ninh tổ quốc 
    const tableThiduaPhong = () => {
        let id_phong = $('#chuyentrang').val();
        tableInitThiduaPhong = $('#tableVianninh').DataTable({
            ajax: {
                url: `/admin/quantriphong/chitiet/${id_phong}/thiduaphong`,
                dataSrc: ''
            },
            "bSort": false,
            select: true,
            "lengthMenu": [15],
            // "order": false,
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                "sInfoFiltered": "",
                "sInfo": "Tổng cộng  _TOTAL_ kết quả",
                "sLengthMenu": "",
            },
            "destroy": true, // cho phép hủy bỏ table tạo table mới 
            "aoColumns": [{
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align: center"class="nam" id="${data._id}">${data.nam}</p>`
                    },
                    "width": "15%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="xeploai">${data.xeploai}</span>`
                    },
                    "width": "50%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="ghichu">${data.ghichu}</span>`
                    },
                    "width": "30%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('sua-thi-dua-phong') !== -1) {
                            dataRender += `<i class="fas fa-pen editThiduaPhong" data-bs-toggle="modal" data-bs-target="#modalEditThiduaPhong" data-bs-backdrop='static' title="Sửa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "2%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('xoa-thi-dua-phong') !== -1) {
                            dataRender += `<i class="fas fa-trash deleteThiduaPhong"  title="Xóa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "2%"
                }
            ]
        });
    };

    // Thêm thi đua năm, vì an ninh 
    $('#thiduaForm').on('submit', function(e) {
            e.preventDefault();
            let id = $('#chuyentrang').val();
            let nam = $('#nam').val().trim();
            let xeploai = $('#xeploai').val().trim();
            let ghichu = $('#ghichu').val().trim();
            $.ajax({
                url: `/admin/quantriphong/chitiet/${id}/thiduaphong/add`,
                method: 'POST',
                data: { nam, xeploai, ghichu },
                error: function() {
                    alert('Có lỗi xảy ra...')
                },
                success: function(data) {
                    if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                        window.location.href = `/quantrihethong/checkRole/error/${data}`
                    };
                    if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                        window.location.href = `/quantrihethong/checkRole/error/${data}`
                    };
                    if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                        window.location.href = `/quantrihethong/checkRole/error/${data}`
                    };
                    $('#thiduaForm')[0].reset();
                    let checkClass = $('#thiduaPhong').closest("li").attr('class');
                    if (checkClass == "quantri-item") {
                        let toast = $('#add-toast');
                        let bsToast = new bootstrap.Toast(toast, {
                            delay: 3000,
                            animation: false
                        })
                        bsToast.show(); //show toast
                    } else {
                        tableInitThiduaPhong.ajax.reload(null, false)
                        let toast = $('#add-toast');
                        let bsToast = new bootstrap.Toast(toast, {
                            delay: 3000,
                            animation: false
                        })
                        bsToast.show(); //show toast
                    }
                }
            })
        })
        //Chuyển sang tab thi đua vì an ninh 
    $("#thiduaPhong").click(function(e) {
        e.preventDefault();
        let parentNode = $(this).closest("li");
        if (parentNode.attr("class") == "quantri-item active") { //kiểm tra xem có đang active hay k
            return false;
        }
        $('.active').removeClass('active');
        parentNode.addClass('active');
        let namePhong = $('#phongName').text();
        $('#quantri-detail').html('');
        if (allRole.indexOf('them-thi-dua-phong') !== -1) {
            $('#quantri-detail').append(`
            <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalAddThidua" data-bs-backdrop='static'><i class="fas fa-user-plus" style="margin-right: 5px;"></i>Thêm mới</button>
            `)
        };
        $('#quantri-detail').append(`
            <h4 class="quantri-detail-head">Bảng kết quả phong trào "Vì an ninh Tổ quốc" <span id="phongName">${namePhong}</span></h4>
            <table id="tableVianninh"  style="width:100%" class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th style="text-align: center;">Năm</th>
                        <th style="text-align: center;">Xếp loại</th>
                        <th style="text-align: center;">Ghi chú</th>
                        <th style="text-align: center;"></th>
                        <th style="text-align: center;"></th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table> 
        `);
        tableThiduaPhong()
    });

    //Xóa thi đua phòng 
    $(document).on('click', '.deleteThiduaPhong', function() {
        let row = $(this).closest("tr");
        let id = $('#chuyentrang').val();
        let id1 = row.find('.nam').attr('id');
        let isDelete = confirm('Bạn có muốn xóa mục này?')
        if (isDelete) {
            $.ajax({
                url: `/admin/quantriphong/chitiet/${id}/thiduaphong/delete/${id1}`,
                method: 'GET',
                error: function() {
                    alert('Có lỗi xảy ra...')
                },
                success: function(data) {
                    if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                        window.location.href = `/quantrihethong/checkRole/error/${data}`
                    };
                    if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                        window.location.href = `/quantrihethong/checkRole/error/${data}`
                    };
                    if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                        window.location.href = `/quantrihethong/checkRole/error/${data}`
                    };
                    tableInitThiduaPhong.ajax.reload(null, false)
                    let toast = $('#delete-toast');
                    let bsToast = new bootstrap.Toast(toast, {
                        delay: 3000,
                        animation: false
                    })
                    bsToast.show(); //show toast
                }
            })
        }
    });
    let idThiduaPhong;
    $(document).on('click', '.editThiduaPhong', function() {
        let row = $(this).closest("tr");
        idThiduaPhong = row.find('.nam').attr('id');
        $('#nam_Edit').val(row.find('.nam').text());
        $('#xeploai_Edit').val(row.find('.xeploai').text());
        $('#ghichu_Edit').val(row.find('.ghichu').text());
    })
    $('#editThiduaForm').on('submit', function(e) {
        e.preventDefault();
        let id = $('#chuyentrang').val();
        let nam = $('#nam_Edit').val();
        let xeploai = $('#xeploai_Edit').val();
        let ghichu = $('#ghichu_Edit').val();
        $.ajax({
            url: `/admin/quantriphong/chitiet/${id}/thiduaphong/edit/${idThiduaPhong}`,
            method: 'POST',
            data: { nam, xeploai, ghichu },
            error: function() {
                alert('Có lỗi xảy ra...')
            },
            success: function(data) {
                if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                $('.btn-close').click();
                tableInitThiduaPhong.ajax.reload(null, false)
                let toast = $('#edit-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: false
                })
                bsToast.show(); //show toast
            }
        })
    });
    // End Thi đua vì an ninh tổ quốc 

    // quản trị tên đội, ca xã
    $("#quantriDoi").click(function(e) {
        e.preventDefault();
        let parentNode = $(this).closest("li");
        if (parentNode.attr("class") == "quantri-item active") { //kiểm tra xem có đang active hay k
            return false;
        }
        $('.active').removeClass('active');
        parentNode.addClass('active');
        let namePhong = $('#phongName').text();
        $('#quantri-detail').html('');
        if (allRole.indexOf('them-doi') !== -1) {
            $('#quantri-detail').append(`
            <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalAddDoi" data-bs-backdrop='static'><i class="fas fa-user-plus" style="margin-right: 5px;"></i>Thêm mới</button>
            `)
        };
        $('#quantri-detail').append(`
            <h4 class="quantri-detail-head">Quản trị các đội nghiệp vụ, công an xã và tương đương <span id="phongName">${namePhong}</span></h4>
            <table id="tableQuantriDoi" style="width:100%" class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th style="text-align: center;">STT</th>
                        <th style="text-align: center;">Tên đội nghiệp vụ, công an xã và tương đương</th>
                        <th style="text-align: center;">Biên chế (đ/c)</th>
                        <th style="text-align: center;"></th>
                        <th style="text-align: center;"></th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table> 
        `);
        tableQuantriDoi()
    });


    $('#addDoiForm').on('submit', function(e) {
        e.preventDefault();
        let id = $('#chuyentrang').val();
        let ten = $('#ten').val();
        $.ajax({
            url: `/admin/quantriphong/chitiet/${id}/quantridoi/add`,
            method: 'POST',
            data: { ten },
            error: function() {
                alert('Có lỗi xảy ra')
            },
            success: function(data) {
                if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                $('#addDoiForm')[0].reset();
                let checkClass = $('#quantriDoi').closest("li").attr('class');
                if (checkClass == "quantri-item") {
                    let toast = $('#add-toast');
                    let bsToast = new bootstrap.Toast(toast, {
                        delay: 3000,
                        animation: false
                    })
                    bsToast.show(); //show toast
                } else {
                    tableInitQuantriDoi.ajax.reload(null, false)
                    let toast = $('#add-toast');
                    let bsToast = new bootstrap.Toast(toast, {
                        delay: 3000,
                        animation: false
                    })
                    bsToast.show(); //show toast
                }
            }
        })
    });


    const tableQuantriDoi = () => {
        let id_phong = $('#chuyentrang').val();
        tableInitQuantriDoi = $('#tableQuantriDoi').DataTable({
            ajax: {
                url: `/admin/quantriphong/chitiet/${id_phong}/quantridoi`,
                dataSrc: ''
            },
            "bSort": false,

            select: true,
            "lengthMenu": [15],
            // "order": false,
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                "sInfoFiltered": "",
                "sInfo": "Tổng cộng  _TOTAL_ kết quả",
                "sLengthMenu": "",
            },
            "destroy": true, // cho phép hủy bỏ table tạo table mới 
            "aoColumns": [{
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align: center"></p>`
                    },
                    "width": "5%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="ten" id="${data.doi._id}">${data.doi.ten}</span>`
                    },
                    "width": "75%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p class="total" style="text-align: center">${data.total}</p>`
                    },
                    "width": "16%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('sua-doi') !== -1) {
                            dataRender += `<i class="fas fa-pen editDoi" data-bs-toggle="modal" data-bs-target="#modalEditDoi" data-bs-backdrop='static' title="Sửa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "1%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('xoa-doi') !== -1) {
                            dataRender += `<i class="fas fa-trash deleteDoi"  title="Xóa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "1%"
                }
            ]
        });
        tableInitQuantriDoi.on('order.dt search.dt', function() {
            tableInitQuantriDoi.column(0).nodes().each(function(cell, i) {
                cell.innerHTML = `<p style="text-align: center">${i+1}<p>`;
            });
        }).draw();
    };

    // Sửa tên đội
    let idDoi;
    $(document).on('click', '.editDoi', function() {
        let row = $(this).closest('tr');
        idDoi = row.find('.ten').attr('id');
        $('#ten_Edit').val(row.find('.ten').text())
    });
    $('#editDoiForm').on('submit', function(e) {
        e.preventDefault();
        let id = $('#chuyentrang').val();
        let ten = $('#ten_Edit').val().trim();
        $.ajax({
            url: `/admin/quantriphong/chitiet/${id}/quantridoi/edit/${idDoi}`,
            method: 'POST',
            data: { ten },
            error: function() {
                alert('Có lỗi xảy ra...')
            },
            success: function(data) {
                if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                $('.btn-close').click();
                tableInitQuantriDoi.ajax.reload(null, false)
                let toast = $('#edit-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: false
                })
                bsToast.show(); //show toast
            }
        })
    })

    //Xóa đội
    $(document).on('click', '.deleteDoi', function() {
        let row = $(this).closest('tr');
        let idDoi = row.find('.ten').attr('id');
        let id = $('#chuyentrang').val();
        let members = parseInt(row.find('.total').text());
        if (members !== 0) {
            alert('Thao tác xóa chỉ được thực hiện khi biên chế đội bằng 0')
        } else {
            let isDelete = confirm('Đồng ý xóa?');
            if (isDelete) {
                $.ajax({
                    url: `/admin/quantriphong/chitiet/${id}/quantridoi/delete/${idDoi}`,
                    method: 'GET',
                    error: function() {
                        alert('Có lỗi xảy ra...')
                    },
                    success: function(data) {
                        if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                            window.location.href = `/quantrihethong/checkRole/error/${data}`
                        };
                        if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                            window.location.href = `/quantrihethong/checkRole/error/${data}`
                        };
                        if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                            window.location.href = `/quantrihethong/checkRole/error/${data}`
                        };
                        tableInitQuantriDoi.ajax.reload(null, false)
                        let toast = $('#edit-toast');
                        let bsToast = new bootstrap.Toast(toast, {
                            delay: 3000,
                            animation: false
                        })
                        bsToast.show(); //show toast
                    }
                })
            }
        }
    });

    // Khen thưởng đội, công an xã 
    $("#khenthuongDoi").click(function(e) {
        e.preventDefault();
        let parentNode = $(this).closest("li");
        if (parentNode.attr("class") == "quantri-item active") { //kiểm tra xem có đang active hay k
            return false;
        }
        $('.active').removeClass('active');
        parentNode.addClass('active');
        let namePhong = $('#phongName').text();
        $('#quantri-detail').html('');
        if (allRole.indexOf('them-khen-thuong-doi') !== -1) {
            $('#quantri-detail').append(`
            <button id="addKtDoi" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalAddKhenthuongDoi" data-bs-backdrop='static'><i class="fas fa-user-plus" style="margin-right: 5px;"></i>Thêm mới</button>
            `)
        };
        $('#quantri-detail').append(`
            <h4 class="quantri-detail-head">Danh sách khen thưởng tập thể cấp đội, công an xã và tương đương <span id="phongName">${namePhong}</span></h4>
            <table id="tableKhenthuongDoi" style="width:100%" class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th style="text-align: center;">STT</th>
                        <th style="text-align: center;">Số Quyết định</th>
                        <th style="text-align: center;">Ngày</th>
                        <th style="text-align: center;">Nội dung khen thưởng</th>
                        <th style="text-align: center;">Hình thức KT</th>
                        <th style="text-align: center;">Cấp khen</th>
                        <th style="text-align: center;">Tên</th>
                        <th style="text-align: center;"></th>
                        <th style="text-align: center;"></th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `);
        tableKhenthuongDoi()
    });

    const tableKhenthuongDoi = () => {
        let id_phong = $('#chuyentrang').val();
        tableInitKhenthuongDoi = $('#tableKhenthuongDoi').DataTable({
            ajax: {
                url: `/admin/quantriphong/chitiet/${id_phong}/khenthuongdoi`,
                dataSrc: ''
            },
            select: true,
            "lengthMenu": [15],
            "bSort": false,
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                "sInfoFiltered": "",
                "sInfo": "Tổng cộng  _TOTAL_ kết quả",
                "sLengthMenu": "",
            },
            "destroy": true, // cho phép hủy bỏ table tạo table mới với cùng id table
            "aoColumns": [{
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center"></p>`
                    },
                    "width": "1%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="soQD" id="${data.id_doi}">${data.khenthuong.soQD}</span>`
                    },
                    "width": "15%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="ngayQD" id="${data.khenthuong._id}">${data.khenthuong.ngayQD}</span>`
                    },
                    "width": "10%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="noidungkhenthuong">${data.khenthuong.noidungkhenthuong}</span>`
                    },
                    "width": "40%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align: center" class="hinhthuckhenthuong">${data.khenthuong.hinhthuckhenthuong}</p>`
                    },
                    "width": "15%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align: center" class="capkhenthuong">${data.khenthuong.capkhenthuong}</p>`
                    },
                    "width": "15%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p class="doi">${data.ten}</p>`
                    },
                    "width": "10%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('sua-khen-thuong-doi') !== -1) {
                            dataRender += `<i class="fas fa-pen editKhenthuongDoi" data-bs-toggle="modal" data-bs-target="#modalEditKhenthuongDoi" data-bs-backdrop='static' title="Sửa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "1%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('xoa-khen-thuong-doi') !== -1) {
                            dataRender += `<i class="fas fa-trash deleteKhenthuongDoi"  title="Xóa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "1%"
                }
            ],
            order: [
                [6, 'asc']
            ],
            rowGroup: {
                dataSrc: "ten"
            },
            columnDefs: [{ //targer cột  và ẩn đi
                targets: [6],
                visible: false
            }],
        });
        tableInitKhenthuongDoi.on('order.dt search.dt', function() {
            tableInitKhenthuongDoi.column(0).nodes().each(function(cell, i) {
                cell.innerHTML = `<p style="text-align: center">${i+1}<p>`
            });
        }).draw();
    };

    // Thêm khen thưởng đội
    $(document).on('click', '#addKtDoi', function() {
        $('#doi').html('');
        let id = $('#chuyentrang').val();
        $.ajax({
            url: `/admin/quantriphong/chitiet/${id}/danhsachdoi`,
            success: function(data) {
                console.log(data)
                $('#doi').append(`
                <option selected disabled hidden value="">--- Chọn đội được khen thưởng ---</option>
                `)
                data.forEach(doi => {
                    $('#doi').append(`
                        <option value=${doi._id}>${doi.ten}</option>
                    `)
                })
            }
        })
    });

    //add khen thưởng đội
    $('#khenthuongDoiForm').on('submit', function(e) {
        e.preventDefault();
        let id = $('#chuyentrang').val();
        let id1 = $('#doi').val();
        let soQD = $('#soQD_Doi').val().trim();
        let ngayQD = $('#ngayQD_Doi').val().trim();
        let hinhthuckhenthuong = $('#hinhthuckhenthuong_Doi').val();
        let capkhenthuong = $('#capkhenthuong_Doi').val();
        let noidungkhenthuong = $('#noidungkhenthuong_Doi').val().trim();
        $.ajax({
            url: `/admin/quantriphong/chitiet/${id}/khenthuongdoi/${id1}/add`,
            method: 'POST',
            data: { soQD, ngayQD, hinhthuckhenthuong, capkhenthuong, noidungkhenthuong },
            error: function() {
                alert('Có lỗi xảy ra...')
            },
            success: function(data) {
                if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                let checkClass = $('#khenthuongDoi').closest("li").attr('class');
                if (checkClass == "quantri-item") {
                    let toast = $('#add-toast');
                    $('#khenthuongDoiForm')[0].reset();
                    let bsToast = new bootstrap.Toast(toast, {
                        delay: 3000,
                        animation: false
                    })
                    bsToast.show(); //show toast
                } else {
                    $('#khenthuongDoiForm')[0].reset();
                    tableInitKhenthuongDoi.ajax.reload(null, false)
                    let toast = $('#add-toast');
                    let bsToast = new bootstrap.Toast(toast, {
                        delay: 3000,
                        animation: false
                    })
                    bsToast.show(); //show toast
                }
            }
        })
    });
    //delete khen thưởng đội
    $(document).on('click', '.deleteKhenthuongDoi', function() {
        let row = $(this).closest('tr');
        let id = $('#chuyentrang').val();
        let id1 = row.find('.soQD').attr('id');
        let id2 = row.find('.ngayQD').attr('id');
        let isDelete = confirm('Bạn có muốn xóa khen thưởng này không?');
        if (isDelete) {
            $.ajax({
                url: `/admin/quantriphong/chitiet/${id}/khenthuongdoi/${id1}/delete/${id2}`,
                error: function() {
                    alert('Có lỗi xảy ra...')
                },
                success: function(data) {
                    if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                        window.location.href = `/quantrihethong/checkRole/error/${data}`
                    };
                    if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                        window.location.href = `/quantrihethong/checkRole/error/${data}`
                    };
                    if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                        window.location.href = `/quantrihethong/checkRole/error/${data}`
                    };
                    tableInitKhenthuongDoi.ajax.reload(null, false)
                    let toast = $('#delete-toast');
                    let bsToast = new bootstrap.Toast(toast, {
                        delay: 3000,
                        animation: false
                    })
                    bsToast.show(); //show toast
                }
            })
        }
    });

    //edit khen thưởng đội
    let id1;
    let id2;
    $(document).on('click', '.editKhenthuongDoi', function() {
        let row = $(this).closest('tr');
        id1 = row.find('.soQD').attr('id');
        id2 = row.find('.ngayQD').attr('id');
        $('#soQD_DoiEdit').val(row.find('.soQD').text());
        $('#ngayQD_DoiEdit').val(row.find('.ngayQD').text());
        $('#hinhthuckhenthuong_DoiEdit').val(row.find('.hinhthuckhenthuong').text());
        $('#capkhenthuong_DoiEdit').val(row.find('.capkhenthuong').text());
        $('#noidungkhenthuong_DoiEdit').val(row.find('.noidungkhenthuong').text());
    });
    $('#EditKhenthuongDoiForm').on('submit', function(e) {
        e.preventDefault()
        let id = $('#chuyentrang').val();
        let soQD = $('#soQD_DoiEdit').val().trim();
        let ngayQD = $('#ngayQD_DoiEdit').val().trim();
        let hinhthuckhenthuong = $('#hinhthuckhenthuong_DoiEdit').val();
        let capkhenthuong = $('#capkhenthuong_DoiEdit').val();
        let noidungkhenthuong = $('#noidungkhenthuong_DoiEdit').val().trim();
        $.ajax({
            url: `/admin/quantriphong/chitiet/${id}/khenthuongdoi/${id1}/edit/${id2}`,
            method: 'POST',
            data: { soQD, ngayQD, hinhthuckhenthuong, capkhenthuong, noidungkhenthuong },
            error: function() {
                alert('Có lỗi xảy ra...')
            },
            success: function(data) {
                if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                $('#EditKhenthuongDoiForm')[0].reset();
                $('.btn-close').click()
                tableInitKhenthuongDoi.ajax.reload(null, false)
                let toast = $('#edit-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: false
                })
                bsToast.show(); //show toast
            }
        })
    });

    //Thêm mới cán bộ, chiến sĩ
    // Chuyển tab quản trị cán bộ 
    $("#quantriCanbo").click(function(e) {
        e.preventDefault();
        let parentNode = $(this).closest("li");
        if (parentNode.attr("class") == "quantri-item active1") { //kiểm tra xem có đang active hay k
            return false;
        }
        $('.active1').removeClass('active1');
        parentNode.addClass('active1');
        $('#quantri-detail-canhan').html('');
        if (allRole.indexOf('them-can-bo') !== -1) {
            $('#quantri-detail-canhan').append(`
            <button id="btn-themCB" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalAddCanbo" data-bs-backdrop='static'><i class="fas fa-user-plus" style="margin-right: 5px;"></i>Thêm mới</button>
            `)
        };
        $('#quantri-detail-canhan').append(`
        <h4 class="quantri-detail-head">Danh sách cán bộ, chiến sĩ</h4>
        <table id="tableQuantriCanbo" style="width:100%" class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th style="text-align: center;">STT</th>
                    <th style="text-align: center;">Họ và tên</th>
                    <th style="text-align: center;">Ngày sinh</th>
                    <th style="text-align: center;">Số hiệu</th>
                    <th style="text-align: center;">Cấp bậc</th>
                    <th style="text-align: center;">Chức vụ</th>
                    <th style="text-align: center;">Đơn vị công tác</th>
                    <th style="text-align: center;"></th>
                    <th style="text-align: center;"></th>
                    <th style="text-align: center;"></th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
        `);
        tableQuantriCanbo()
    });

    $(document).on('click', '#btn-themCB', function() {
        $('#donvicongtac').html('');
        let id = $('#chuyentrang').val();
        $.ajax({
            url: `/admin/quantriphong/chitiet/${id}/danhsachdoi`,
            success: function(data) {
                $('#donvicongtac').append(`
                <option selected disabled hidden value="">--- Chọn đội công tác ---</option>
                `)
                data.forEach(donvicongtac => {
                    $('#donvicongtac').append(`
                        <option value=${donvicongtac._id}>${donvicongtac.ten}</option>
                    `)
                })
            }
        })
    });
    $('#canboForm').on('submit', function(e) {
        e.preventDefault();
        let id = $('#chuyentrang').val();
        let hoten = $('#hoten').val().trim();
        let ngaysinh = $('#ngaysinh').val().trim();
        let sohieuCAND = $('#sohieuCAND').val().trim();
        let dangvien = $('input[name="dangvien"]:checked').val();
        let capbac = $('#capbac').val();
        let chucvu = $('#chucvu').val();
        let donvicongtac = $('#donvicongtac').val();
        let fd = new FormData();
        fd.append('hoten', hoten);
        fd.append('dangvien', dangvien);
        fd.append('ngaysinh', ngaysinh);
        fd.append('sohieuCAND', sohieuCAND);
        fd.append('capbac', capbac);
        fd.append('chucvu', chucvu);
        fd.append('donvicongtac', donvicongtac);
        fd.append('room', id);
        fd.append('img', $('#img')[0].files[0]);
        $.ajax({
            url: `/admin/quantriphong/chitiet/${id}/quantricanbo/addCanbo`,
            method: 'POST',
            processData: false,
            contentType: false,
            data: fd,
            error: function() {
                alert('Có lỗi xảy ra...')
            },
            success: function(data) {
                if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                $('#canboForm')[0].reset();
                let checkClass = $('#quantriCanbo').closest("li").attr('class');
                if (checkClass == "quantri-item") {
                    $('#imgPreview').attr('src', '/anhCanbo/anhDefault.jpg')
                    let toast = $('#add-toast');
                    let bsToast = new bootstrap.Toast(toast, {
                        delay: 3000,
                        animation: false
                    })
                    bsToast.show(); //show toast
                } else {
                    tableInitQuantriCanbo.ajax.reload(null, false)
                    $('#imgPreview').attr('src', '/anhCanbo/anhDefault.jpg')
                    let toast = $('#add-toast');
                    let bsToast = new bootstrap.Toast(toast, {
                        delay: 3000,
                        animation: false
                    })
                    bsToast.show(); //show toast
                }
            }
        })
    });

    const tableQuantriCanbo = () => {
        let id_phong = $('#chuyentrang').val();
        tableInitQuantriCanbo = $('#tableQuantriCanbo').DataTable({
            ajax: {
                url: `/admin/quantriphong/chitiet/${id_phong}/quantricanbo`,
                dataSrc: ''
            },
            "lengthMenu": [50],
            select: true,
            "bSort": false,
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                "sInfoFiltered": "",
                "sInfo": "Tổng cộng  _TOTAL_ kết quả",
                "sLengthMenu": "",
            },
            "destroy": true, // cho phép hủy bỏ table tạo table mới với cùng id table
            "aoColumns": [{
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center"></p>`
                    },
                    "width": "1%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align: left"class="hoten" id="${data._id}">${data.hoten}</p>`
                    },
                    "width": "15%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align: center" class="ngaysinh" id="${data.img}">${data.ngaysinh}</p>`
                    },
                    "width": "10%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align: center" class="sohieuCAND">${data.sohieuCAND}</p>`
                    },
                    "width": "8%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align: center" id="${data.dangvien}" class="capbac">${data.capbac}</p>`
                    },
                    "width": "10%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align: center" class="chucvu">${data.chucvu}</p>`
                    },
                    "width": "16%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align: left" class="donvicongtac" id="${data.donvicongtac._id}">${data.donvicongtac.ten}</p>`
                    },
                    "width": "18%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('sua-can-bo') !== -1) {
                            dataRender += `<i class="far fa-edit editCanbo" data-bs-toggle="modal" data-bs-target="#modalEditCanbo" data-bs-backdrop='static' title="Sửa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "2%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('luan-chuyen-can-bo') !== -1) {
                            dataRender += `<i class="fas fa-plane-departure moveCanbo" data-bs-toggle="modal" data-bs-target="#modalMoveCanbo" data-bs-backdrop='static' title="Chuyển công tác"> </i>`
                        };
                        return dataRender
                    },
                    "width": "2%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('xoa-can-bo') !== -1) {
                            dataRender += `<i class="fas fa-trash deleteCanbo"  title="Xóa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "2%"
                }
            ]
        });
        tableInitQuantriCanbo.on('order.dt search.dt', function() {
            tableInitQuantriCanbo.column(0).nodes().each(function(cell, i) {
                cell.innerHTML = `<p style="text-align: center">${i+1}<p>`
            });
        }).draw();
    };

    // Chỉnh sửa Cán bộ 
    let idCanbo;
    $(document).on('click', '.editCanbo', function() {
        let row = $(this).closest('tr');
        let id = $('#chuyentrang').val();
        idCanbo = row.find('.hoten').attr('id');
        $('#hoten_Edit').val(row.find('.hoten').text());
        $('#ngaysinh_Edit').val(row.find('.ngaysinh').text());
        $('#sohieuCAND_Edit').val(row.find('.sohieuCAND').text());
        $('#capbac_Edit').val(row.find('.capbac').text());
        $(`input[name="dangvien_Edit"][value="${row.find('.capbac').attr('id')}"]`).prop('checked', true);
        $('#chucvu_Edit').val(row.find('.chucvu').text());
        $('#donvicongtac_Edit').html('');
        let idDonvicongtac = row.find('.donvicongtac').attr('id');
        let imgSrc = row.find('.ngaysinh').attr('id');
        $('#imgPreviewEdit').attr('src', imgSrc)
        $.ajax({
            url: `/admin/quantriphong/chitiet/${id}/danhsachdoi`,
            success: function(data) {
                data.forEach(donvicongtac => {
                    if (donvicongtac._id == idDonvicongtac) {
                        $('#donvicongtac_Edit').append(`
                                <option selected value=${donvicongtac._id}>${donvicongtac.ten}</option>
                            `)
                    } else {
                        $('#donvicongtac_Edit').append(`
                                <option  value=${donvicongtac._id}>${donvicongtac.ten}</option>
                            `)
                    }
                })
            }
        })
    });

    $('#canboEditForm').on('submit', function(e) {
        e.preventDefault();
        let id = $('#chuyentrang').val();
        let hoten = $('#hoten_Edit').val().trim();
        let ngaysinh = $('#ngaysinh_Edit').val().trim();
        let sohieuCAND = $('#sohieuCAND_Edit').val().trim();
        let capbac = $('#capbac_Edit').val();
        let dangvien = $('input[name="dangvien_Edit"]:checked').val();
        let chucvu = $('#chucvu_Edit').val();
        let donvicongtac = $('#donvicongtac_Edit').val();
        let fd = new FormData();
        fd.append('hoten', hoten);
        fd.append('ngaysinh', ngaysinh);
        fd.append('sohieuCAND', sohieuCAND);
        fd.append('capbac', capbac);
        fd.append('dangvien', dangvien);
        fd.append('chucvu', chucvu);
        fd.append('donvicongtac', donvicongtac);
        fd.append('room', id);
        fd.append('img', $('#img_Edit')[0].files[0]);
        $.ajax({
            url: `/admin/quantriphong/chitiet/${id}/quantricanbo/editCanbo/${idCanbo}`,
            method: 'POST',
            processData: false,
            contentType: false,
            data: fd,
            error: function() {
                alert('Có lỗi xảy ra...')
            },
            success: function(data) {
                if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                $('.btn-close').click();
                $('#canboEditForm')[0].reset();
                tableInitQuantriCanbo.ajax.reload(null, false)
                let toast = $('#edit-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: false
                })
                bsToast.show(); //show toast  
            }
        })
    });

    let idCanboMove;
    $(document).on('click', '.moveCanbo', function() {
        let row = $(this).closest('tr');
        idCanboMove = row.find('.hoten').attr('id');
    });

    $('#donvichuyenden').on('change', function() {
        let id2 = $(this).val();
        $('#doichuyenden').html('');
        $.ajax({
            url: `/admin/quantriphong/chitiet/${id2}/danhsachdoi`,
            success: function(data) {
                $('#doichuyenden').append(`
                <option selected disabled hidden value="">--- Chọn đội công tác mới ---</option>
                `)
                data.forEach(doi => {
                    $('#doichuyenden').append(`
                        <option value=${doi._id}>${doi.ten}</option>
                    `)
                })
            }
        })
    });

    //moveCanbo submit
    $('#moveCanboForm').on('submit', function(e) {
        e.preventDefault();
        let id2 = $('#donvichuyenden').val();
        let id3 = $('#doichuyenden').val();
        $.ajax({
            url: `/admin/quantriphong/chitiet/quantricanbo/${idCanboMove}/moveCanbo/${id2}/${id3}`,
            method: 'POST',
            error: function() {
                alert('Có lỗi xảy ra...')
            },
            success: function(data) {
                if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                $('.btn-close').click();
                $('#moveCanboForm')[0].reset();
                tableInitQuantriCanbo.ajax.reload(null, false)
                let toast = $('#move-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: false
                })
                bsToast.show(); //show toast  
            }
        })
    });

    // Delete canbo 
    $(document).on('click', '.deleteCanbo', function() {
        let row = $(this).closest('tr');
        idCanboDelete = row.find('.hoten').attr('id');
        let id = $('#chuyentrang').val();
        let isDelete = confirm('Xóa cán bộ chỉ được thực hiện khi chuyển công tác ra khỏi Công an tỉnh hoặc có quyết định Nghỉ hưu. Bạn có chắc chắn muốn xóa???')
        if (isDelete) {
            $.ajax({
                url: `/admin/quantriphong/chitiet/${id}/quantricanbo/deleteCanbo/${idCanboDelete}`,
                method: 'GET',
                error: function() {
                    alert('Có lỗi xảy ra...')
                },
                success: function(data) {
                    if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                        window.location.href = `/quantrihethong/checkRole/error/${data}`
                    };
                    if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                        window.location.href = `/quantrihethong/checkRole/error/${data}`
                    };
                    if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                        window.location.href = `/quantrihethong/checkRole/error/${data}`
                    };
                    tableInitQuantriCanbo.ajax.reload(null, false)
                    let toast = $('#delete-toast');
                    let bsToast = new bootstrap.Toast(toast, {
                        delay: 3000,
                        animation: false
                    })
                    bsToast.show(); //show toast  
                }
            })
        }
    });


    //Quản trị  thi đua tháng cán bộ
    // Chuyển tab quản trị thi đua tháng
    $("#quantriThiduathang").click(function(e) {
        e.preventDefault();
        let year = new Date().getFullYear();
        let parentNode = $(this).closest("li");
        if (parentNode.attr("class") == "quantri-item active1") { //kiểm tra xem có đang active hay k
            return false;
        }
        $('.active1').removeClass('active1');
        parentNode.addClass('active1');
        $('#quantri-detail-canhan').html('');
        $('#quantri-detail-canhan').append(`
        <div class=overlay>
        <img src="https://www.gifimage.net/wp-content/uploads/2018/04/loading-spinner-gif-1.gif" class="overlay-img">
            <h5 class="overlay-title">Đang tải dữ liệu....</h5>
        </div>
        <h4 class="quantri-detail-head">Quản trị kết quả thi đua tháng tháng <span id="thangCurrent">1</span> năm <span id="namCurrent">${year}</span></h4>
        <div class="quantri-tab-select">
            <select name="thiduathang" id="thang">
                <option value="thang1">Tháng 1</option>
                <option value="thang2">Tháng 2</option>
                <option value="thang3">Tháng 3</option>
                <option value="thang4">Tháng 4</option>
                <option value="thang5">Tháng 5</option>
                <option value="thang6">Tháng 6</option>
                <option value="thang7">Tháng 7</option>
                <option value="thang8">Tháng 8</option>
                <option value="thang9">Tháng 9</option>
                <option value="thang10">Tháng 10</option>
                <option value="thang11">Tháng 11</option>
                <option value="thang12">Tháng 12</option>
            </select>
            <label for="thiduathangOfNam">Năm</label>
            <select name="thiduathangOfNam" id="thiduathangOfNam">
             </select>
            <button class="btn btn-primary" id="changeTbThiduathang"><i class="fas fa-chart-line"></i> Lấy dữ liệu</button>
            <button disabled class="btn btn-success" id="saveTbThiduathang" style="margin-left: 5px"><i class="far fa-share-square"></i> Lưu kết quả</button>
        </div>

        <table id="tableQuantriThiduathang" style="width:100%" class=" table table-bordered table-striped">
            <thead>
                <tr>
                    <th style="text-align: center; ">STT</th>
                    <th style="text-align: center; ">Họ và tên</th>
                    <th style="text-align: center; ">Cấp bậc</th>
                    <th style="text-align: center; ">Chức vụ</th>
                    <th style="text-align: center; ">Đơn vị công tác</th>
                    <th style="text-align: center; ">Xếp loại</th>
                    <th>Ghi chú</th>
                    <th></th>
                </tr>
                    <tr style="background: #a3a3a3; color: black">
                    <th colspan="4"></th>
                    <th>Chọn tất cả</th>
                    <th> 
                        <select name="checkAllXeploaithang" id="xeploaithang">
                            <option value="" disable selected hidden>-----</option>
                            <option value=""></option>
                            <option value="đỏ">đỏ</option>
                            <option value="xanh">xanh</option>
                            <option value="vàng">vàng</option>
                         </select>
                    <th>
                    <th></th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
        `);
        while (2016 <= year) {
            $('#thiduathangOfNam').append(`
                <option value="${year}">${year}</option>
                ${year -=1}
            `)
        }
        if (allRole.indexOf('them-thi-dua-thang') !== -1) {
            $('#saveTbThiduathang').removeAttr('disabled')
        }
        tableThiduathang();
        setTimeout(function() {
            $('.overlay').remove()
        }, 2000)
        $('#thang').change(function() {
            month = $(this).val();
        })
        $('#thiduathangOfNam').change(function() {
            nam = $(this).val()
        })
    });

    let month;
    let nam;
    const tableThiduathang = () => {
        month = $('#thang').val();
        nam = $('#thiduathangOfNam').val();
        let id_phong = $('#chuyentrang').val();
        tableInitThiduathang = $('#tableQuantriThiduathang').DataTable({
            ajax: {
                url: `/admin/quantriphong/chitiet/${id_phong}/quantricanbo/thiduathang/${month}/${nam}`,
                dataSrc: ''
            },
            "lengthMenu": [500],
            select: true,
            "bSort": false,
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                "sInfoFiltered": "",
                "sInfo": "Tổng cộng  _TOTAL_ kết quả",
                "sLengthMenu": "",
            },
            "destroy": true, // cho phép hủy bỏ table tạo table mới với cùng id table
            "aoColumns": [{
                "mData": function(data, type, dataToSet) {
                    return `<p style="text-align:center"></p>`
                },
                "width": "1%"
            }, {
                "mData": function(data, type, dataToSet) {
                    return `<p style="text-align: left" class="hoten">${data.hoten}</p>`
                },
                "width": "15%"
            }, {
                "mData": function(data, type, dataToSet) {
                    return `<p style="text-align: center" class="capbac">${data.capbac}</p>`
                },
                "width": "8%"
            }, {
                "mData": function(data, type, dataToSet) {
                    return `<p style="text-align: center" class="chucvu">${data.chucvu}</p>`
                },
                "width": "15%"
            }, {
                "mData": function(data, type, dataToSet) {
                    return `<p  style="text-align: left" class="donvicongtac" id="${data.donvicongtac._id}">${data.donvicongtac.ten}</p>`
                },
                "width": "18%"
            }, {
                "mData": function(data, type, dataToSet) {
                    let dataRender;
                    if (data.thiduathang[0][month].flag == "đỏ") {
                        dataRender = `
                        <select style="text-align:center" class="xeploai"  id="${data._id}" name="xeploai">
                            <option value="đỏ" selected>đỏ</option>
                            <option value=""></option>
                            <option value="xanh">xanh</option>
                            <option value="vàng">vàng</option>
                        <select>`
                    };
                    if (data.thiduathang[0][month].flag == "xanh") {
                        dataRender = `
                        <select style="text-align:center" class="xeploai" id="${data._id}" name="xeploai">
                            <option value="xanh" selected>xanh</option>
                            <option value=""></option>
                            <option value="đỏ">đỏ</option>
                            <option value="vàng">vàng</option>
                        <select>`
                    };
                    if (data.thiduathang[0][`${month}`].flag == "vàng") {
                        dataRender = `
                        <select style="text-align:center" class="xeploai" id="${data._id}" name="xeploai">
                            <option value="vàng" selected>vàng</option>
                            <option value=""></option>
                            <option value="đỏ">đỏ</option>
                            <option value="xanh">xanh</option>
                        <select>`
                    };
                    if (data.thiduathang[0][month].flag === '') {
                        dataRender = `
                        <select style="text-align:center" class="xeploai" id="${data._id}" name="xeploai">
                            <option value=""  selected></option>
                            <option value="đỏ">đỏ</option>
                            <option value="xanh">xanh</option>
                            <option value="vàng">vàng</option>
                        <select>`
                    }
                    return dataRender
                },
                "width": "5%"
            }, {
                "mData": function(data, type, dataToSet) {
                    return `<p style="text-align: left" class="ghichuthiduathang">${data.thiduathang[0][month].ghichu}</p>`
                },
                "width": "18%"
            }, {
                "mData": function(data, type, dataToSet) {
                    let dataRender = '';
                    if (allRole.indexOf('sua-thi-dua-thang') !== -1) {
                        dataRender += `<i class="fas fa-edit editGhichu" data-bs-toggle="modal" data-bs-target="#modalGhichu" data-bs-backdrop='static' title="ghi chú"></i>`
                    };
                    return dataRender
                },
                "width": "2%"
            }, ]
        });
        tableInitThiduathang.on('order.dt search.dt', function() {
            tableInitThiduathang.column(0).nodes().each(function(cell, i) {
                cell.innerHTML = `<p style="text-align: center">${i+1}<p>`
            });
        }).draw();
    };


    // Khi thay đổi giá trị ô chọn tất cả
    $(document).on('change', '#xeploaithang', function() {
        let valAllXeploaithang = $(this).val();
        $('select[name="xeploai"]').val(valAllXeploaithang);
    });
    $(document).on('click', '#changeTbThiduathang', function() {
        let month = $('#thang').val();
        let id_phong = $('#chuyentrang').val();
        let nam = $('#thiduathangOfNam').val();
        $('#thangCurrent').html(month.slice(5))
        $('#namCurrent').html(nam)
        tableInitThiduathang.ajax.url(`/admin/quantriphong/chitiet/${id_phong}/quantricanbo/thiduathang/${month}/${nam}`).load()
    });

    //Lưu ghi chú tháng
    let idGhichu; //id cán bộ sửa ghi chú
    $(document).on('click', '.editGhichu', function() {
        let row = $(this).closest('tr');
        idGhichu = row.find('.xeploai').attr('id')
        let ghichuEdit = row.find('.ghichuthiduathang').text();
        $('#ghichuthang').val(ghichuEdit);
    })

    $('#ghichuForm').on('submit', function(e) {
        e.preventDefault();
        let numberMonth = $('#thangCurrent').text(); //lấy ra số tháng
        let namCurrent = $('#namCurrent').text(); // lấy ra năm hiện đang quản trị
        let ghichu = $('#ghichuthang').val().trim(); //
        $.ajax({
            url: `/admin/quantriphong/chitiet/quantricanbo/${idGhichu}/thiduathang/thang${numberMonth}/${namCurrent}`,
            method: 'POST',
            data: { ghichu },
            error: function() {
                alert('Bạn không có quyền chỉnh sửa hoặc có lỗi xảy ra...')
            },
            success: function(data) {
                if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                $('.btn-close').click()
                $(`#${idGhichu}`).closest('tr').find('.ghichuthiduathang').text(ghichu)
                let toast = $('#edit-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: false
                })
                bsToast.show(); //show toast  
            }
        })
    });

    // Lưu kết quả thi đua tháng 
    $(document).on('click', '#saveTbThiduathang', function() {
        let dataReq = [];
        $('.xeploai').each(function() {
            let idCanbo = $(this).attr('id');
            let flag = $(this).val()
            dataReq.push({ idCanbo, flag })
        });
        let data = JSON.stringify(dataReq);
        let numberMonth = $('#thangCurrent').text(); //lấy ra số tháng
        let namCurrent = $('#namCurrent').text(); // lấy ra năm hiện đang quản trị
        $.ajax({
            url: `/admin/quantriphong/chitiet/quantricanbo/update/xeploai/thiduathang/thang${numberMonth}/${namCurrent}`,
            method: 'POST',
            data: { data },
            error: function() {
                alert('Bạn không có quyền chỉnh sửa hoặc có lỗi xảy ra...')
            },
            success: function(data) {
                if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                $('#xeploaithang').html(`
                        <option value="" disable selected hidden>-----</option>
                        <option value=""></option>
                        <option value="đỏ">đỏ</option>
                        <option value="xanh">xanh</option>
                        <option value="vàng">vàng</option>
                `)
                let toast = $('#edit-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: false
                })
                bsToast.show(); //show toast  
            }
        })
    });

    // Quản trị thi đua năm 
    $("#quantriThiduanam").click(function(e) {
        e.preventDefault();
        let year = new Date().getFullYear();
        let parentNode = $(this).closest("li");
        if (parentNode.attr("class") == "quantri-item active1") { //kiểm tra xem có đang active hay k
            return false;
        }
        $('.active1').removeClass('active1');
        parentNode.addClass('active1');
        $('#quantri-detail-canhan').html('');
        $('#quantri-detail-canhan').append(`
        <div class=overlay>
        <img src="https://www.gifimage.net/wp-content/uploads/2018/04/loading-spinner-gif-1.gif" class="overlay-img">
            <h5 class="overlay-title">Đang tải dữ liệu....</h5>
        </div>
        <h4 class="quantri-detail-head">Quản trị kết quả thi đua  năm <span id="namCurrent1">${year}</span></h4>
        <div class="quantri-tab-select">
            <label for="thiduanamOfNam">Năm</label>
            <select name="thiduanamOfNam" id="thiduanamOfNam">
             </select>
            <button class="btn btn-primary" id="changeTbThiduanam"><i class="fas fa-chart-line"></i> Lấy dữ liệu</button>
            <button disabled class="btn btn-success" id="saveTbThiduanam" style="margin-left: 5px"><i class="far fa-share-square"></i> Lưu kết quả</button>
        </div>

        <table id="tableQuantriThiduanam" style="width:100%" class=" table table-bordered table-striped">
            <thead>
                <tr>
                    <th style="text-align: center; ">STT</th>
                    <th style="text-align: center; ">Họ và tên</th>
                    <th style="text-align: center; ">Đơn vị công tác</th>
                    <th style="text-align: center; ">Đăng kí thi đua</th>
                    <th style="text-align: center; ">Xếp loại cuối năm</th>
                    <th>Ghi chú</th>
                    <th></th>
                </tr>
                    <tr style="background: #a3a3a3; color: black">
                    <th></th>
                    <th></th>
                    <th>Chọn tất cả</th>
                    <th> 
                        <select name="checkAllDKTD" id="dangkithidua">
                            <option value="" disable selected hidden>-- Chưa chọn --</option>
                            <option value=""></option>
                            <option value="Không hoàn thành nhiệm vụ">Không hoàn thành nhiệm vụ</option>
                            <option value="Hoàn thành nhiệm vụ">Hoàn thành nhiệm vụ</option>
                            <option value="Chiến sĩ tiên tiến">Chiến sĩ tiên tiến</option>
                            <option value="Chiến sĩ thi đua">Chiến sĩ thi đua</option>
                         </select>
                    </th>
                    <th>
                        <select name="checkAllXeploainam" id="xeploainam">
                            <option value="" disable selected hidden>-- Chưa chọn --</option>
                            <option value=""></option>
                            <option value="Không hoàn thành nhiệm vụ">Không hoàn thành nhiệm vụ</option>
                            <option value="Hoàn thành nhiệm vụ">Hoàn thành nhiệm vụ</option>
                            <option value="Chiến sĩ tiên tiến">Chiến sĩ tiên tiến</option>
                            <option value="Chiến sĩ thi đua">Chiến sĩ thi đua</option>
                        </select>
                    </th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
        `);
        while (2016 <= year) {
            $('#thiduanamOfNam').append(`
                <option value="${year}">${year}</option>
                ${year -=1}
            `)
        };
        if (allRole.indexOf('them-thi-dua-nam') !== -1) {
            $('#saveTbThiduanam').removeAttr('disabled')
        }
        tableThiduanam();
        setTimeout(function() {
            $('.overlay').remove()
        }, 2000)
    });

    const tableThiduanam = () => {
        nam = $('#thiduanamOfNam').val();
        let id_phong = $('#chuyentrang').val();
        tableInitThiduanam = $('#tableQuantriThiduanam').DataTable({
            ajax: {
                url: `/admin/quantriphong/chitiet/${id_phong}/quantricanbo/thiduanam/${nam}`,
                dataSrc: ''
            },
            "lengthMenu": [500],
            select: true,
            "bSort": false,
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                "sInfoFiltered": "",
                "sInfo": "Tổng cộng  _TOTAL_ kết quả",
                "sLengthMenu": "",
            },
            "destroy": true, // cho phép hủy bỏ table tạo table mới với cùng id table
            "aoColumns": [{
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center"></p>`
                    },
                    "width": "1%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align: left" class="hoten" title= "Cấp bậc: ${data.capbac} Chức vụ: ${data.chucvu}">${data.hoten}</p>`
                    },
                    "width": "15%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p  style="text-align: left" class="donvicongtac" id="${data.donvicongtac._id}">${data.donvicongtac.ten}</p>`
                    },
                    "width": "20%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        let dataRender;
                        if (data.thiduanam[0].dangkithidua == "") {
                            dataRender = `
                        <select  class="dangkithiduanam"  id="${data._id}" name="dangkithiduanam">
                            <option value="" selected></option>
                            <option value="Không hoàn thành nhiệm vụ">Không hoàn thành nhiệm vụ</option>
                            <option value="Hoàn thành nhiệm vụ">Hoàn thành nhiệm vụ</option>
                            <option value="Chiến sĩ tiên tiến">Chiến sĩ tiên tiến</option>
                            <option value="Chiến sĩ thi đua">Chiến sĩ thi đua</option>
                        <select>`
                        };
                        if (data.thiduanam[0].dangkithidua == "Không hoàn thành nhiệm vụ") {
                            dataRender = `
                        <select class="dangkithiduanam" id="${data._id}" name="dangkithiduanam">
                            <option value=""></option>
                            <option value="Không hoàn thành nhiệm vụ" selected>Không hoàn thành nhiệm vụ</option>
                            <option value="Hoàn thành nhiệm vụ">Hoàn thành nhiệm vụ</option>
                            <option value="Chiến sĩ tiên tiến">Chiến sĩ tiên tiến</option>
                            <option value="Chiến sĩ thi đua">Chiến sĩ thi đua</option>
                        <select>`
                        };
                        if (data.thiduanam[0].dangkithidua == "Hoàn thành nhiệm vụ") {
                            dataRender = `
                            <select class="dangkithiduanam" id="${data._id}" name="dangkithiduanam">
                                <option value=""></option>
                                <option value="Không hoàn thành nhiệm vụ" >Không hoàn thành nhiệm vụ</option>
                                <option value="Hoàn thành nhiệm vụ" selected>Hoàn thành nhiệm vụ</option>
                                <option value="Chiến sĩ tiên tiến">Chiến sĩ tiên tiến</option>
                                <option value="Chiến sĩ thi đua">Chiến sĩ thi đua</option>
                            <select>`
                        };
                        if (data.thiduanam[0].dangkithidua == "Chiến sĩ tiên tiến") {
                            dataRender = `
                        <select  class="dangkithiduanam" id="${data._id}" name="dangkithiduanam">
                            <option value=""></option>
                            <option value="Không hoàn thành nhiệm vụ" >Không hoàn thành nhiệm vụ</option>
                            <option value="Hoàn thành nhiệm vụ">Hoàn thành nhiệm vụ</option>
                            <option value="Chiến sĩ tiên tiến"  selected>Chiến sĩ tiên tiến</option>
                            <option value="Chiến sĩ thi đua">Chiến sĩ thi đua</option>
                        <select>`
                        };
                        if (data.thiduanam[0].dangkithidua == "Chiến sĩ thi đua") {
                            dataRender = `
                        <select  class="dangkithiduanam" id="${data._id}" name="dangkithiduanam">
                            <option value=""></option>
                            <option value="Không hoàn thành nhiệm vụ" >Không hoàn thành nhiệm vụ</option>
                            <option value="Hoàn thành nhiệm vụ">Hoàn thành nhiệm vụ</option>
                            <option value="Chiến sĩ tiên tiến">Chiến sĩ tiên tiến</option>
                            <option value="Chiến sĩ thi đua"   selected>Chiến sĩ thi đua</option>
                        <select>`
                        }
                        return dataRender
                    },
                    "width": "5%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        let dataRender;
                        if (data.thiduanam[0].xeploai == "") {
                            dataRender = `
                        <select  class="xeploainam"   name="xeploainam">
                            <option value="" selected></option>
                            <option value="Không hoàn thành nhiệm vụ">Không hoàn thành nhiệm vụ</option>
                            <option value="Hoàn thành nhiệm vụ">Hoàn thành nhiệm vụ</option>
                            <option value="Chiến sĩ tiên tiến">Chiến sĩ tiên tiến</option>
                            <option value="Chiến sĩ thi đua">Chiến sĩ thi đua</option>
                        <select>`
                        };
                        if (data.thiduanam[0].xeploai == "Không hoàn thành nhiệm vụ") {
                            dataRender = `
                        <select  class="xeploainam"  name="xeploainam">
                            <option value=""></option>
                            <option value="Không hoàn thành nhiệm vụ" selected>Không hoàn thành nhiệm vụ</option>
                            <option value="Hoàn thành nhiệm vụ">Hoàn thành nhiệm vụ</option>
                            <option value="Chiến sĩ tiên tiến">Chiến sĩ tiên tiến</option>
                            <option value="Chiến sĩ thi đua">Chiến sĩ thi đua</option>
                        <select>`
                        };
                        if (data.thiduanam[0].xeploai == "Hoàn thành nhiệm vụ") {
                            dataRender = `
                            <select class="xeploainam"  name="xeploainam">
                                <option value=""></option>
                                <option value="Không hoàn thành nhiệm vụ" >Không hoàn thành nhiệm vụ</option>
                                <option value="Hoàn thành nhiệm vụ" selected>Hoàn thành nhiệm vụ</option>
                                <option value="Chiến sĩ tiên tiến">Chiến sĩ tiên tiến</option>
                                <option value="Chiến sĩ thi đua">Chiến sĩ thi đua</option>
                            <select>`
                        };
                        if (data.thiduanam[0].xeploai == "Chiến sĩ tiên tiến") {
                            dataRender = `
                        <select  class="xeploainam"  name="xeploainam">
                            <option value=""></option>
                            <option value="Không hoàn thành nhiệm vụ" >Không hoàn thành nhiệm vụ</option>
                            <option value="Hoàn thành nhiệm vụ">Hoàn thành nhiệm vụ</option>
                            <option value="Chiến sĩ tiên tiến"  selected>Chiến sĩ tiên tiến</option>
                            <option value="Chiến sĩ thi đua">Chiến sĩ thi đua</option>
                        <select>`
                        };
                        if (data.thiduanam[0].xeploai == "Chiến sĩ thi đua") {
                            dataRender = `
                        <select class="xeploainam"  name="xeploainam">
                            <option value=""></option>
                            <option value="Không hoàn thành nhiệm vụ" >Không hoàn thành nhiệm vụ</option>
                            <option value="Hoàn thành nhiệm vụ">Hoàn thành nhiệm vụ</option>
                            <option value="Chiến sĩ tiên tiến">Chiến sĩ tiên tiến</option>
                            <option value="Chiến sĩ thi đua"   selected>Chiến sĩ thi đua</option>
                        <select>`
                        }
                        return dataRender
                    },
                    "width": "5%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align: left" class="ghichuthiduanam">${data.thiduanam[0].ghichu}</p>`
                    },
                    "width": "20%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('sua-ghi-chu-thi-dua-nam') !== -1) {
                            dataRender += `<i class="fas fa-edit editGhichunam" data-bs-toggle="modal" data-bs-target="#modalGhichunam" data-bs-backdrop='static' title="ghi chú"></i>`
                        };
                        return dataRender
                    },
                    "width": "2%"
                },
            ]
        });
        tableInitThiduanam.on('order.dt search.dt', function() {
            tableInitThiduanam.column(0).nodes().each(function(cell, i) {
                cell.innerHTML = `<p style="text-align: center">${i+1}<p>`
            });
        }).draw();
    };

    // Khi thay đổi giá trị ô chọn tất cả thi đua năm
    $(document).on('change', '#dangkithidua', function() {
        let valAllDKTD = $(this).val();
        $('select[name="dangkithiduanam"]').val(valAllDKTD);
    });
    $(document).on('change', '#xeploainam', function() {
        let valAllxeploainam = $(this).val();
        $('select[name="xeploainam"]').val(valAllxeploainam);
    });
    $(document).on('click', '#changeTbThiduanam', function() {
        let id_phong = $('#chuyentrang').val();
        let nam = $('#thiduanamOfNam').val();
        $('#namCurrent1').html(nam)
        tableInitThiduanam.ajax.url(`/admin/quantriphong/chitiet/${id_phong}/quantricanbo/thiduanam/${nam}`).load()
    });

    // Lưu ghi chú năm 
    let idGhichunam; //id cán bộ sửa ghi chú
    $(document).on('click', '.editGhichunam', function() {
        let row = $(this).closest('tr');
        idGhichunam = row.find('.dangkithiduanam').attr('id')
        let ghichuEdit = row.find('.ghichuthiduanam').text();
        $('#ghichunam').val(ghichuEdit);
    })

    $('#ghichunamForm').on('submit', function(e) {
        e.preventDefault();
        let namCurrent = $('#namCurrent1').text(); // lấy ra năm hiện đang quản trị
        let ghichu = $('#ghichunam').val().trim(); //
        $.ajax({
            url: `/admin/quantriphong/chitiet/quantricanbo/${idGhichunam}/thiduanam/${namCurrent}`,
            method: 'POST',
            data: { ghichu },
            error: function() {
                alert('Bạn không có quyền chỉnh sửa hoặc có lỗi xảy ra...')
            },
            success: function(data) {
                if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                $('.btn-close').click()
                $(`#${idGhichunam}`).closest('tr').find('.ghichuthiduanam').text(ghichu)
                let toast = $('#edit-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: false
                })
                bsToast.show(); //show toast  
            }
        })
    });

    // Lưu kết quả thi đua năm
    $(document).on('click', '#saveTbThiduanam', function() {
        let dataReq = [];
        $('.dangkithiduanam').each(function() {
            let xeploai = $(this).closest('tr').find('.xeploainam').val()
            let idCanbo = $(this).attr('id');
            let dangkithidua = $(this).val()
            dataReq.push({ idCanbo, dangkithidua, xeploai })
        });
        let data = JSON.stringify(dataReq);
        let namCurrent = $('#namCurrent1').text(); // lấy ra năm hiện đang quản trị
        $.ajax({
            url: `/admin/quantriphong/chitiet/quantricanbo/update/xeploai/thiduanam/${namCurrent}`,
            method: 'POST',
            data: { data },
            error: function() {
                alert('Bạn không có quyền chỉnh sửa hoặc có lỗi xảy ra...')
            },
            success: function(data) {
                if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                $('#dangkithidua').html(`
                <option value="" disable selected hidden>-- Chưa chọn --</option>
                <option value=""></option>
                <option value="Không hoàn thành nhiệm vụ">Không hoàn thành nhiệm vụ</option>
                <option value="Hoàn thành nhiệm vụ">Hoàn thành nhiệm vụ</option>
                <option value="Chiến sĩ tiên tiến">Chiến sĩ tiên tiến</option>
                <option value="Chiến sĩ thi đua">Chiến sĩ thi đua</option>
                `)
                $('#xeploainam').html(`
                <option value="" disable selected hidden>-- Chưa chọn --</option>
                <option value=""></option>
                <option value="Không hoàn thành nhiệm vụ">Không hoàn thành nhiệm vụ</option>
                <option value="Hoàn thành nhiệm vụ">Hoàn thành nhiệm vụ</option>
                <option value="Chiến sĩ tiên tiến">Chiến sĩ tiên tiến</option>
                <option value="Chiến sĩ thi đua">Chiến sĩ thi đua</option>
                `)
                let toast = $('#edit-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: false
                })
                bsToast.show(); //show toast  
            }
        })
    });

    //Quản trị đảng viên 
    $("#quantriDangvien").click(function(e) {
        e.preventDefault();
        let year = new Date().getFullYear();
        let parentNode = $(this).closest("li");
        if (parentNode.attr("class") == "quantri-item active1") { //kiểm tra xem có đang active hay k
            return false;
        }
        $('.active1').removeClass('active1');
        parentNode.addClass('active1');
        $('#quantri-detail-canhan').html('');
        $('#quantri-detail-canhan').append(`
        <div class=overlay>
        <img src="https://www.gifimage.net/wp-content/uploads/2018/04/loading-spinner-gif-1.gif" class="overlay-img">
            <h5 class="overlay-title">Đang tải dữ liệu....</h5>
        </div>
        <h4 class="quantri-detail-head">Quản trị kết quả xếp loại đảng viên <span id="namCurrent1">${year}</span></h4>
        <div class="quantri-tab-select">
            <label for="xeploaidangvienOfNam">Năm</label>
            <select name="xeploaidangvienOfNam" id="xeploaidangvienOfNam">
             </select>
            <button class="btn btn-primary" id="changeTbXeploaidangvien"><i class="fas fa-chart-line"></i> Lấy dữ liệu</button>
            <button disabled class="btn btn-success" id="saveTbXeploaidangvien" style="margin-left: 5px"><i class="far fa-share-square"></i> Lưu kết quả</button>
        </div>

        <table id="tableQuantriDangvien" style="width:100%" class=" table table-bordered table-striped">
            <thead>
                <tr>
                    <th style="text-align: center; ">STT</th>
                    <th style="text-align: center; ">Họ và tên</th>
                    <th style="text-align: center; ">Đơn vị công tác</th>
                    <th style="text-align: center; ">Đăng kí thi đua</th>
                    <th style="text-align: center; ">Xếp loại cuối năm</th>
                </tr>
                    <tr style="background: #a3a3a3; color: black">
                    <th></th>
                    <th></th>
                    <th>Chọn tất cả</th>
                    <th> 
                        <select name="checkAllĐKĐV" id="dangkidangvien">
                        <option value="" disable selected hidden>-- Chưa chọn --</option>
                        <option value=""></option>
                        <option value="Không hoàn thành nhiệm vụ">Không hoàn thành nhiệm vụ</option>
                        <option value="Hoàn thành nhiệm vụ">Hoàn thành nhiệm vụ</option>
                        <option value="Hoàn thành tốt nhiệm vụ">Hoàn thành tốt nhiệm vụ</option>
                        <option value="Hoàn thành xuất sắc nhiệm vụ">Hoàn thành xuất sắc nhiệm vụ</option>
                         </select>
                    </th>
                    <th>
                        <select name="checkAllXeploaidangvien" id="xeploaidangvien">
                            <option value="" disable selected hidden>-- Chưa chọn --</option>
                            <option value=""></option>
                            <option value="Không hoàn thành nhiệm vụ">Không hoàn thành nhiệm vụ</option>
                            <option value="Hoàn thành nhiệm vụ">Hoàn thành nhiệm vụ</option>
                            <option value="Hoàn thành tốt nhiệm vụ">Hoàn thành tốt nhiệm vụ</option>
                            <option value="Hoàn thành xuất sắc nhiệm vụ">Hoàn thành xuất sắc nhiệm vụ</option>
                        </select>
                    </th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
        `);
        while (2016 <= year) {
            $('#xeploaidangvienOfNam').append(`
                <option value="${year}">${year}</option>
                ${year -=1}
            `)
        };
        if (allRole.indexOf('them-xep-loai-dang-vien') !== -1) {
            $('#saveTbXeploaidangvien').removeAttr('disabled')
        };
        tableDangvien();
        setTimeout(function() {
            $('.overlay').remove()
        }, 2000)
    });

    const tableDangvien = () => {
        nam = $('#xeploaidangvienOfNam').val();
        let id_phong = $('#chuyentrang').val();
        tableInitDangvien = $('#tableQuantriDangvien').DataTable({
            ajax: {
                url: `/admin/quantriphong/chitiet/${id_phong}/quantridangvien/${nam}`,
                dataSrc: ''
            },
            "lengthMenu": [500],
            select: true,
            "bSort": false,
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                "sInfoFiltered": "",
                "sInfo": "Tổng cộng  _TOTAL_ kết quả",
                "sLengthMenu": "",
            },
            "destroy": true, // cho phép hủy bỏ table tạo table mới với cùng id table
            "aoColumns": [{
                "mData": function(data, type, dataToSet) {
                    return `<p style="text-align:center"></p>`
                },
                "width": "1%"
            }, {
                "mData": function(data, type, dataToSet) {
                    return `<p style="text-align: left" class="hoten" title= "Cấp bậc: ${data.capbac} Chức vụ: ${data.chucvu}">${data.hoten}</p>`
                },
                "width": "15%"
            }, {
                "mData": function(data, type, dataToSet) {
                    return `<p  style="text-align: left" class="donvicongtac" id="${data.donvicongtac._id}">${data.donvicongtac.ten}</p>`
                },
                "width": "20%"
            }, {
                "mData": function(data, type, dataToSet) {
                    let dataRender;
                    if (data.thiduanam[0].dangkixeploaidangvien == "") {
                        dataRender = `
                        <select style="text-align:center" class="dangkixeploaidangvien"  id="${data._id}" name="dangkixeploaidangvien">
                            <option value="" selected></option>
                            <option value="Không hoàn thành nhiệm vụ">Không hoàn thành nhiệm vụ</option>
                            <option value="Hoàn thành nhiệm vụ">Hoàn thành nhiệm vụ</option>
                            <option value="Hoàn thành tốt nhiệm vụ">Hoàn thành tốt nhiệm vụ</option>
                            <option value="Hoàn thành xuất sắc nhiệm vụ">Hoàn thành xuất sắc nhiệm vụ</option>
                        <select>`
                    };
                    if (data.thiduanam[0].dangkixeploaidangvien == "Không hoàn thành nhiệm vụ") {
                        dataRender = `
                            <select style="text-align:center" class="dangkixeploaidangvien"  id="${data._id}" name="dangkixeploaidangvien">
                                <option value=""></option>
                                <option value="Không hoàn thành nhiệm vụ"  selected>Không hoàn thành nhiệm vụ</option>
                                <option value="Hoàn thành nhiệm vụ">Hoàn thành nhiệm vụ</option>
                                <option value="Hoàn thành tốt nhiệm vụ">Hoàn thành tốt nhiệm vụ</option>
                                <option value="Hoàn thành xuất sắc nhiệm vụ">Hoàn thành xuất sắc nhiệm vụ</option>
                            <select>`
                    };
                    if (data.thiduanam[0].dangkixeploaidangvien == "Hoàn thành nhiệm vụ") {
                        dataRender = `
                            <select style="text-align:center" class="dangkixeploaidangvien"  id="${data._id}" name="dangkixeploaidangvien">
                                <option value=""></option>
                                <option value="Không hoàn thành nhiệm vụ">Không hoàn thành nhiệm vụ</option>
                                <option value="Hoàn thành nhiệm vụ"  selected>Hoàn thành nhiệm vụ</option>
                                <option value="Hoàn thành tốt nhiệm vụ">Hoàn thành tốt nhiệm vụ</option>
                                <option value="Hoàn thành xuất sắc nhiệm vụ">Hoàn thành xuất sắc nhiệm vụ</option>
                            <select>`
                    };
                    if (data.thiduanam[0].dangkixeploaidangvien == "Hoàn thành tốt nhiệm vụ") {
                        dataRender = `
                            <select style="text-align:center" class="dangkixeploaidangvien"  id="${data._id}" name="dangkixeploaidangvien">
                                <option value=""></option>
                                <option value="Không hoàn thành nhiệm vụ">Không hoàn thành nhiệm vụ</option>
                                <option value="Hoàn thành nhiệm vụ">Hoàn thành nhiệm vụ</option>
                                <option value="Hoàn thành tốt nhiệm vụ"  selected>Hoàn thành tốt nhiệm vụ</option>
                                <option value="Hoàn thành xuất sắc nhiệm vụ">Hoàn thành xuất sắc nhiệm vụ</option>
                            <select>`
                    };
                    if (data.thiduanam[0].dangkixeploaidangvien == "Hoàn thành xuất sắc nhiệm vụ") {
                        dataRender = `
                            <select style="text-align:center" class="dangkixeploaidangvien"  id="${data._id}" name="dangkixeploaidangvien">
                                <option value=""></option>
                                <option value="Không hoàn thành nhiệm vụ">Không hoàn thành nhiệm vụ</option>
                                <option value="Hoàn thành nhiệm vụ">Hoàn thành nhiệm vụ</option>
                                <option value="Hoàn thành tốt nhiệm vụ">Hoàn thành tốt nhiệm vụ</option>
                                <option value="Hoàn thành xuất sắc nhiệm vụ" selected>Hoàn thành xuất sắc nhiệm vụ</option>
                            <select>`
                    };
                    return dataRender
                },
                "width": "15%"
            }, {
                "mData": function(data, type, dataToSet) {
                    let dataRender;
                    if (data.thiduanam[0].xeploaidangvien == "") {
                        dataRender = `
                        <select style="text-align:center" class="xeploaidangvien"  name="xeploaidangvien">
                            <option value="" selected></option>
                            <option value="Không hoàn thành nhiệm vụ">Không hoàn thành nhiệm vụ</option>
                            <option value="Hoàn thành nhiệm vụ">Hoàn thành nhiệm vụ</option>
                            <option value="Hoàn thành tốt nhiệm vụ">Hoàn thành tốt nhiệm vụ</option>
                            <option value="Hoàn thành xuất sắc nhiệm vụ">Hoàn thành xuất sắc nhiệm vụ</option>
                        <select>`
                    };
                    if (data.thiduanam[0].xeploaidangvien == "Không hoàn thành nhiệm vụ") {
                        dataRender = `
                            <select style="text-align:center" class="xeploaidangvien"  name="xeploaidangvien">
                                <option value=""></option>
                                <option value="Không hoàn thành nhiệm vụ"  selected>Không hoàn thành nhiệm vụ</option>
                                <option value="Hoàn thành nhiệm vụ">Hoàn thành nhiệm vụ</option>
                                <option value="Hoàn thành tốt nhiệm vụ">Hoàn thành tốt nhiệm vụ</option>
                                <option value="Hoàn thành xuất sắc nhiệm vụ">Hoàn thành xuất sắc nhiệm vụ</option>
                            <select>`
                    };
                    if (data.thiduanam[0].xeploaidangvien == "Hoàn thành nhiệm vụ") {
                        dataRender = `
                            <select style="text-align:center" class="xeploaidangvien"  name="xeploaidangvien">
                                <option value=""></option>
                                <option value="Không hoàn thành nhiệm vụ">Không hoàn thành nhiệm vụ</option>
                                <option value="Hoàn thành nhiệm vụ"  selected>Hoàn thành nhiệm vụ</option>
                                <option value="Hoàn thành tốt nhiệm vụ">Hoàn thành tốt nhiệm vụ</option>
                                <option value="Hoàn thành xuất sắc nhiệm vụ">Hoàn thành xuất sắc nhiệm vụ</option>
                            <select>`
                    };
                    if (data.thiduanam[0].xeploaidangvien == "Hoàn thành tốt nhiệm vụ") {
                        dataRender = `
                            <select style="text-align:center" class="xeploaidangvien"  name="xeploaidangvien">
                                <option value=""></option>
                                <option value="Không hoàn thành nhiệm vụ">Không hoàn thành nhiệm vụ</option>
                                <option value="Hoàn thành nhiệm vụ">Hoàn thành nhiệm vụ</option>
                                <option value="Hoàn thành tốt nhiệm vụ"  selected>Hoàn thành tốt nhiệm vụ</option>
                                <option value="Hoàn thành xuất sắc nhiệm vụ">Hoàn thành xuất sắc nhiệm vụ</option>
                            <select>`
                    };
                    if (data.thiduanam[0].xeploaidangvien == "Hoàn thành xuất sắc nhiệm vụ") {
                        dataRender = `
                            <select style="text-align:center" class="xeploaidangvien"  name="xeploaidangvien">
                                <option value=""></option>
                                <option value="Không hoàn thành nhiệm vụ">Không hoàn thành nhiệm vụ</option>
                                <option value="Hoàn thành nhiệm vụ">Hoàn thành nhiệm vụ</option>
                                <option value="Hoàn thành tốt nhiệm vụ">Hoàn thành tốt nhiệm vụ</option>
                                <option value="Hoàn thành xuất sắc nhiệm vụ" selected>Hoàn thành xuất sắc nhiệm vụ</option>
                            <select>`
                    };
                    return dataRender
                },
                "width": "15%"
            }]
        });
        tableInitDangvien.on('order.dt search.dt', function() {
            tableInitDangvien.column(0).nodes().each(function(cell, i) {
                cell.innerHTML = `<p style="text-align: center">${i+1}<p>`
            });
        }).draw();
    };

    // Khi thay đổi giá trị ô chọn tất cả thi đua năm
    $(document).on('change', '#xeploaidangvien', function() {
        let valAll = $(this).val();
        $('select[name="xeploaidangvien"]').val(valAll);
    });
    $(document).on('change', '#dangkidangvien', function() {
        let valAll = $(this).val();
        $('select[name="dangkixeploaidangvien"]').val(valAll);
    });
    $(document).on('click', '#changeTbXeploaidangvien', function() {
        let id_phong = $('#chuyentrang').val();
        let nam = $('#xeploaidangvienOfNam').val();
        $('#namCurrent1').html(nam)
        tableInitDangvien.ajax.url(`/admin/quantriphong/chitiet/${id_phong}/quantridangvien/${nam}`).load()
    });

    //Lưu xep loại đảng viên
    // Lưu kết quả thi đua năm
    $(document).on('click', '#saveTbXeploaidangvien', function() {
        let dataReq = [];
        $('.dangkixeploaidangvien').each(function() {
            let xeploaidangvien = $(this).closest('tr').find('.xeploaidangvien').val()
            let idCanbo = $(this).attr('id');
            let dangkixeploaidangvien = $(this).val()
            dataReq.push({ idCanbo, dangkixeploaidangvien, xeploaidangvien })
        });
        let data = JSON.stringify(dataReq);
        let namCurrent = $('#namCurrent1').text(); // lấy ra năm hiện đang quản trị
        $.ajax({
            url: `/admin/quantriphong/chitiet/quantridangvien/${namCurrent}/save`,
            method: 'POST',
            data: { data },
            error: function() {
                alert('Bạn không có quyền chỉnh sửa hoặc có lỗi xảy ra...')
            },
            success: function() {
                $('#dangkidangvien').html(`
                <option value="" disable selected hidden>-- Chưa chọn --</option>
                <option value=""></option>
                <option value="Không hoàn thành nhiệm vụ">Không hoàn thành nhiệm vụ</option>
                <option value="Hoàn thành nhiệm vụ">Hoàn thành nhiệm vụ</option>
                <option value="Hoàn thành tốt nhiệm vụ">Hoàn thành tốt nhiệm vụ</option>
                <option value="Hoàn thành xuất sắc nhiệm vụ">Hoàn thành xuất sắc nhiệm vụ</option>
                `)
                $('#xeploaidangvien').html(`
                <option value="" disable selected hidden>-- Chưa chọn --</option>
                <option value=""></option>
                <option value="Không hoàn thành nhiệm vụ">Không hoàn thành nhiệm vụ</option>
                <option value="Hoàn thành nhiệm vụ">Hoàn thành nhiệm vụ</option>
                <option value="Hoàn thành tốt nhiệm vụ">Hoàn thành tốt nhiệm vụ</option>
                <option value="Hoàn thành xuất sắc nhiệm vụ">Hoàn thành xuất sắc nhiệm vụ</option>
                `)
                let toast = $('#edit-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: false
                })
                bsToast.show(); //show toast  
            }
        })
    });

    //Khen thưởng cá nhân
    $("#quantriKhenthuongCanhan").click(function(e) {
        e.preventDefault();
        let parentNode = $(this).closest("li");
        if (parentNode.attr("class") == "quantri-item active1") { //kiểm tra xem có đang active hay k
            return false;
        }
        $('.active1').removeClass('active1');
        parentNode.addClass('active1');
        $('#quantri-detail-canhan').html('');
        $('#quantri-detail-canhan').append(`
        <h4 class="quantri-detail-head">Quản trị khen thưởng cá nhân</h4>
        <div class="quantri-tab-select">
            <select name="CanboList" id="CanboList">
                 <option value="" disable selected hidden>--- Chọn cán bộ, chiến sĩ ---</option>
            </select>
            <span class="clickDoi">Vui lòng chọn cán bộ, chiến sĩ</span>
            <button  data-bs-toggle="modal" data-bs-target="#modalAddKhenthuongCanhan" data-bs-backdrop='static' class="btn btn-success" disabled id="addKhenthuongCanhan" style="margin-left: 5px"><i class="fas fa-folder-open"></i> Thêm khen thưởng</button>
        </div>
        <div class="person-detail">
            <span class="person-profile">Click chọn cán bộ, chiến sĩ được khen thưởng</span>
        </div>
        <table id="tableKhenthuongCanhan" style="width: 100%" class="table table-bordered table-striped">
        <thead>
            <tr>
                <th style="text-align: center;">STT</th>
                <th style="text-align: center;">Số Quyết định</th>
                <th style="text-align: center;">Ngày</th>
                <th style="text-align: center;">Nội dung khen thưởng</th>
                <th style="text-align: center;">Hình thức KT</th>
                <th style="text-align: center;">Cấp khen</th>
                <th style="text-align: center;"></th>
                <th style="text-align: center;"></th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
        `);
        let id = $('#chuyentrang').val()
        $.ajax({
            url: `/admin/quantriphong/chitiet/${id}/danhsachCanbo`,
            success: function(data) {
                data.forEach(canbo => {
                    $('#CanboList').append(`
                        <option value="${canbo._id}" title="Họ và tên: ${canbo.hoten}; Cấp bậc: ${canbo.capbac}; Chức vụ: ${canbo.chucvu}; Đơn vị công tác: ${canbo.donvicongtac.ten}">${canbo.hoten}</option>
                    `)
                })
            }
        });
        $('#CanboList').change(function() {
            let profileCanbo = $("#CanboList option:selected").attr("title");
            if (allRole.indexOf('them-khen-thuong-ca-nhan') !== -1) {
                $('#addKhenthuongCanhan').removeAttr("disabled");
            }
            $('.person-profile').html(profileCanbo);
            $('.clickDoi').fadeOut(400)
            tableKhenthuongCanhan();
        });
    });

    //Bảng khen thưởng cấp phòng
    const tableKhenthuongCanhan = () => {
        let id = $('#CanboList').val();
        tableInitKhenthuongCanhan = $('#tableKhenthuongCanhan').DataTable({
            ajax: {
                url: `/admin/quantriphong/chitiet/khenthuongcanhan/${id}`,
                dataSrc: ''
            },
            "lengthMenu": [15],
            "bSort": false,
            select: true,
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                "sInfoFiltered": "",
                "sInfo": "Tổng cộng  _TOTAL_ kết quả",
                "sLengthMenu": "",
            },
            "destroy": true, // cho phép hủy bỏ table tạo table mới với cùng id table
            "aoColumns": [{
                    "mData": function(data, type, dataToSet) {
                        return `<td></td>`
                    },
                    "width": "1%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="soQD_Canhan" id="${data._id}">${data.soQD}</span>`
                    },
                    "width": "15%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="ngayQD_Canhan">${data.ngayQD}</span>`
                    },
                    "width": "10%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align: left" class="noidungkhenthuong_Canhan">${data.noidungkhenthuong}</p>`
                    },
                    "width": "40%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align: center" class="hinhthuckhenthuong_Canhan">${data.hinhthuckhenthuong}</p>`
                    },
                    "width": "15%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align: center" class="capkhenthuong_Canhan">${data.capkhenthuong}</p>`
                    },
                    "width": "15%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('sua-khen-thuong-ca-nhan') !== -1) {
                            dataRender += `<i class="fas fa-edit editKhenthuongCanhan" data-bs-toggle="modal" data-bs-target="#modalEditKhenthuongCanhan" data-bs-backdrop='static' title="Sửa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "2%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('xoa-khen-thuong-ca-nhan') !== -1) {
                            dataRender += `<i class="fas fa-trash deleteKhenthuongCanhan"  title="Xóa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "2%"
                }
            ]
        });
        tableInitKhenthuongCanhan.on('order.dt search.dt', function() {
            tableInitKhenthuongCanhan.column(0).nodes().each(function(cell, i) {
                cell.innerHTML = `<p style="text-align: center">${i+1}<p>`
            });
        }).draw();
    };

    $('#khenthuongCanhanForm').on('submit', function(e) {
        let id = $('#CanboList').val();
        e.preventDefault();
        let soQD = $('#soQD_Canhan').val().trim();
        let ngayQD = $('#ngayQD_Canhan').val().trim();
        let hinhthuckhenthuong = $('#hinhthuckhenthuong_Canhan').val();
        let capkhenthuong = $('#capkhenthuong_Canhan').val();
        let noidungkhenthuong = $('#noidungkhenthuong_Canhan').val().trim();
        $.ajax({
            url: `/admin/quantriphong/chitiet/khenthuongcanhan/${id}/add`,
            method: 'POST',
            data: { soQD, ngayQD, hinhthuckhenthuong, capkhenthuong, noidungkhenthuong },
            error: function() {
                alert('Có lỗi xảy ra khi thêm mới khen thưởng phòng')
            },
            success: function(data) {
                if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                $('#khenthuongCanhanForm')[0].reset()
                tableInitKhenthuongCanhan.ajax.reload(null, false)
                let toast = $('#add-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: false
                })
                bsToast.show(); //show toast   
            }
        })
    });

    // Xóa khen thưởng cá nhân 
    $(document).on('click', '.deleteKhenthuongCanhan', function() {
        let row = $(this).closest("tr");
        let id = $('#CanboList').val();
        let id1 = row.find('.soQD_Canhan').attr('id');
        let isDelete = confirm('Bạn có đồng ý xóa khen thưởng này?')
        if (isDelete) {
            $.ajax({
                url: `/admin/quantriphong/chitiet/khenthuongcanhan/${id}/delete/${id1}`,
                method: 'GET',
                error: function() {
                    alert('Có lỗi xảy ra...')
                },
                success: function(data) {
                    if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                        window.location.href = `/quantrihethong/checkRole/error/${data}`
                    };
                    if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                        window.location.href = `/quantrihethong/checkRole/error/${data}`
                    };
                    if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                        window.location.href = `/quantrihethong/checkRole/error/${data}`
                    };
                    tableInitKhenthuongCanhan.ajax.reload(null, false)
                    let toast = $('#delete-toast');
                    let bsToast = new bootstrap.Toast(toast, {
                        delay: 3000,
                        animation: true
                    })
                    bsToast.show(); //show toast
                }
            })
        }
    });
    let idKhenthuongCanhan;
    $(document).on('click', '.editKhenthuongCanhan', function() {
        let row = $(this).closest('tr');
        idKhenthuongCanhan = row.find('.soQD_Canhan').attr('id');
        $('#soQD_CanhanEdit').val(row.find('.soQD_Canhan').text());
        $('#ngayQD_CanhanEdit').val(row.find('.ngayQD_Canhan').text());
        $('#noidungkhenthuong_CanhanEdit').val(row.find('.noidungkhenthuong_Canhan').text());
        $('#capkhenthuong_CanhanEdit').val(row.find('.capkhenthuong_Canhan').text());
        $('#hinhthuckhenthuong_CanhanEdit').val(row.find('.hinhthuckhenthuong_Canhan').text());
    });
    $('#EditKhenthuongCanhanForm').on('submit', function(e) {
        e.preventDefault();
        let id = $('#CanboList').val();
        let soQD = $('#soQD_CanhanEdit').val().trim();
        let ngayQD = $('#ngayQD_CanhanEdit').val().trim();
        let hinhthuckhenthuong = $('#hinhthuckhenthuong_CanhanEdit').val();
        let capkhenthuong = $('#capkhenthuong_CanhanEdit').val();
        let noidungkhenthuong = $('#noidungkhenthuong_CanhanEdit').val().trim();
        $.ajax({
            url: `/admin/quantriphong/chitiet/khenthuongcanhan/${id}/edit/${idKhenthuongCanhan}`,
            method: 'POST',
            data: { soQD, ngayQD, hinhthuckhenthuong, capkhenthuong, noidungkhenthuong },
            error: function() {
                alert('Có lỗi xảy ra...')
            },
            success: function(data) {
                if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                $('.btn-close').click();
                tableInitKhenthuongCanhan.ajax.reload(null, false)
                let toast = $('#edit-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: false
                })
                bsToast.show(); //show toast
            }
        })
    });


    //Kỉ luật  cá nhân
    $("#quantriKiluatCanhan").click(function(e) {
        e.preventDefault();
        let parentNode = $(this).closest("li");
        if (parentNode.attr("class") == "quantri-item active1") { //kiểm tra xem có đang active hay k
            return false;
        }
        $('.active1').removeClass('active1');
        parentNode.addClass('active1');
        $('#quantri-detail-canhan').html('');
        $('#quantri-detail-canhan').append(`
        <h4 class="quantri-detail-head">Quản trị kỉ luật cá nhân</h4>
        <div class="quantri-tab-select">
            <select name="CanboList" id="CanboList">
                 <option value="" disable selected hidden>--- Chọn cán bộ, chiến sĩ ---</option>
            </select>
            <span class="clickDoi">Vui lòng chọn cán bộ, chiến sĩ</span>
            <button  data-bs-toggle="modal" data-bs-target="#modalAddKiluatCanhan" data-bs-backdrop='static' class="btn btn-success" disabled id="addKiluatCanhan" style="margin-left: 5px"><i class="fas fa-folder-open"></i> Thêm mới kỉ luật</button>
        </div>
        <div class="person-detail">
            <span class="person-profile">Click chọn cán bộ, chiến sĩ bị kỉ luật</span>
        </div>
        <table id="tableKiluatCanhan" style="width:100%" class="table table-bordered table-striped">
        <thead>
            <tr>
                <th style="text-align: center;">STT</th>
                <th style="text-align: center;">Số Quyết định</th>
                <th style="text-align: center;">Ngày kí quyết định</th>
                <th style="text-align: center;">Hình thức kỉ luật</th>
                <th style="text-align: center;">Nội dung kỉ luật</th>
                <th style="text-align: center;"></th>
                <th style="text-align: center;"></th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
        `);
        let id = $('#chuyentrang').val()
        $.ajax({
            url: `/admin/quantriphong/chitiet/${id}/danhsachCanbo`,
            success: function(data) {
                data.forEach(canbo => {
                    $('#CanboList').append(`
                        <option value="${canbo._id}" title="Họ và tên: ${canbo.hoten}; Cấp bậc: ${canbo.capbac}; Chức vụ: ${canbo.chucvu}; Đơn vị công tác: ${canbo.donvicongtac.ten}">${canbo.hoten}</option>
                    `)
                })
            }
        });
        $('#CanboList').change(function() {
            let profileCanbo = $("#CanboList option:selected").attr("title");
            if (allRole.indexOf('them-ki-luat-ca-nhan') !== -1) {
                $('#addKiluatCanhan').removeAttr("disabled");
            };
            $('.person-profile').html(profileCanbo);
            $('.clickDoi').fadeOut(400)
            tableKiluatCanhan();
        });
    });

    //Bảng kỉ luật cá nhân
    const tableKiluatCanhan = () => {
        let id = $('#CanboList').val();
        tableInitKiluatCanhan = $('#tableKiluatCanhan').DataTable({
            ajax: {
                url: `/admin/quantriphong/chitiet/kiluatcanhan/${id}`,
                dataSrc: ''
            },
            "lengthMenu": [15],
            "bSort": false,
            select: true,
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                "sInfoFiltered": "",
                "sInfo": "Tổng cộng  _TOTAL_ kết quả",
                "sLengthMenu": "",
            },
            "destroy": true, // cho phép hủy bỏ table tạo table mới với cùng id table
            "aoColumns": [{
                    "mData": function(data, type, dataToSet) {
                        return `<td></td>`
                    },
                    "width": "1%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="soQD_KiluatCanhan" id="${data._id}">${data.soQD}</span>`
                    },
                    "width": "15%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="ngayQD_KiluatCanhan">${data.ngayQD}</span>`
                    },
                    "width": "15%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align: center" class="hinhthuckiluat_KiluatCanhan">${data.hinhthuckiluat}</p>`
                    },
                    "width": "15%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align: left" class="noidungkiluat_KiluatCanhan">${data.noidungkiluat}</p>`
                    },
                    "width": "30%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('sua-ki-luat-ca-nhan') !== -1) {
                            dataRender += `<i class="fas fa-edit editKiluatCanhan" data-bs-toggle="modal" data-bs-target="#modalEditKiluatCanhan" data-bs-backdrop='static' title="Sửa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "2%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('xoa-ki-luat-ca-nhan') !== -1) {
                            dataRender += `<i class="fas fa-trash deleteKiluatCanhan"  title="Xóa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "2%"
                }
            ]
        });
        tableInitKiluatCanhan.on('order.dt search.dt', function() {
            tableInitKiluatCanhan.column(0).nodes().each(function(cell, i) {
                cell.innerHTML = `<p style="text-align: center">${i+1}<p>`
            });
        }).draw();
    };

    $('#kiluatCanhanForm').on('submit', function(e) {
        let id = $('#CanboList').val();
        e.preventDefault();
        let soQD = $('#soQD_KiluatCanhan').val().trim();
        let ngayQD = $('#ngayQD_KiluatCanhan').val().trim();
        let hinhthuckiluat = $('#hinhthuckiluat_KiluatCanhan').val();
        let noidungkiluat = $('#noidungkiluat_KiluatCanhan').val().trim();
        $.ajax({
            url: `/admin/quantriphong/chitiet/kiluatcanhan/${id}/add`,
            method: 'POST',
            data: { soQD, ngayQD, hinhthuckiluat, noidungkiluat },
            error: function() {
                alert('Có lỗi xảy ra khi thêm mới khen thưởng phòng')
            },
            success: function(data) {
                if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                $('#kiluatCanhanForm')[0].reset()
                tableInitKiluatCanhan.ajax.reload(null, false)
                let toast = $('#add-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: false
                })
                bsToast.show(); //show toast   
            }
        })
    });

    // Xóa khen thưởng cá nhân 
    $(document).on('click', '.deleteKiluatCanhan', function() {
        let row = $(this).closest("tr");
        let id = $('#CanboList').val();
        let id1 = row.find('.soQD_KiluatCanhan').attr('id');
        let isDelete = confirm('Bạn có đồng ý xóa kỉ luật này?')
        if (isDelete) {
            $.ajax({
                url: `/admin/quantriphong/chitiet/kiluatcanhan/${id}/delete/${id1}`,
                method: 'GET',
                error: function() {
                    alert('Có lỗi xảy ra...')
                },
                success: function(data) {
                    if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                        window.location.href = `/quantrihethong/checkRole/error/${data}`
                    };
                    if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                        window.location.href = `/quantrihethong/checkRole/error/${data}`
                    };
                    if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                        window.location.href = `/quantrihethong/checkRole/error/${data}`
                    };
                    tableInitKiluatCanhan.ajax.reload(null, false)
                    let toast = $('#delete-toast');
                    let bsToast = new bootstrap.Toast(toast, {
                        delay: 3000,
                        animation: true
                    })
                    bsToast.show(); //show toast
                }
            })
        }
    });
    // let idKiluatCanhan;
    $(document).on('click', '.editKiluatCanhan', function() {
        let row = $(this).closest('tr');
        idKiluatCanhan = row.find('.soQD_KiluatCanhan').attr('id');
        $('#soQD_KiluatCanhanEdit').val(row.find('.soQD_KiluatCanhan').text());
        $('#ngayQD_KiluatCanhanEdit').val(row.find('.ngayQD_KiluatCanhan').text());
        $('#noidungkiluat_KiluatCanhanEdit').val(row.find('.noidungkiluat_KiluatCanhan').text());
        $('#hinhthuckiluat_KiluatCanhanEdit').val(row.find('.hinhthuckiluat_KiluatCanhan').text());
    });
    $('#EditKiluatCanhanForm').on('submit', function(e) {
        e.preventDefault();
        let id = $('#CanboList').val();
        let soQD = $('#soQD_KiluatCanhanEdit').val().trim();
        let ngayQD = $('#ngayQD_KiluatCanhanEdit').val().trim();
        let hinhthuckiluat = $('#hinhthuckiluat_KiluatCanhanEdit').val();
        let noidungkiluat = $('#noidungkiluat_KiluatCanhanEdit').val().trim();
        $.ajax({
            url: `/admin/quantriphong/chitiet/kiluatcanhan/${id}/edit/${idKiluatCanhan}`,
            method: 'POST',
            data: { soQD, ngayQD, hinhthuckiluat, noidungkiluat },
            error: function() {
                alert('Có lỗi xảy ra...')
            },
            success: function(data) {
                if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                $('.btn-close').click();
                tableInitKiluatCanhan.ajax.reload(null, false)
                let toast = $('#edit-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: false
                })
                bsToast.show(); //show toast
            }
        })
    })
});


function anhPreview() {
    let fileSelected = document.getElementById('img').files;
    if (fileSelected.length > 0) {
        let fileToLoad = fileSelected[0];
        let fileReader = new FileReader();
        fileReader.onload = function(fileLoaderEvent) {
            let srcData = fileLoaderEvent.target.result;
            let newImage = document.getElementById('imgPreview')
            newImage.src = srcData;
        };
        fileReader.readAsDataURL(fileToLoad);
    }
};

function anhPreviewEdit() {
    let fileSelected = document.getElementById('img_Edit').files;
    if (fileSelected.length > 0) {
        let fileToLoad = fileSelected[0];
        let fileReader = new FileReader();
        fileReader.onload = function(fileLoaderEvent) {
            let srcData = fileLoaderEvent.target.result;
            let newImage = document.getElementById('imgPreviewEdit')
            newImage.src = srcData;
        };
        fileReader.readAsDataURL(fileToLoad);
    }
};