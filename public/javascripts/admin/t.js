$(document).ready(function() {
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
            scrollY: 500,
            "lengthMenu": [50],
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
                        return `<svg class="editKhenthuongPhong" xmlns="http://www.w3.org/2000/svg" data-bs-toggle="modal" data-bs-target="#modalEditKhenthuongPhong" data-bs-backdrop='static' title="Sửa" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                         <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                         <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                     </svg>`
                    },
                    "width": "2%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<i class="fas fa-trash deleteKhenthuongPhong"  title="Xóa"> </i>`
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
    tableKhenthuongPhong()

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
            success: function() {
                $('#khenthuongForm')[0].reset()
                let checkClass = $('#khenthuongPhong').closest("li").attr('class');
                if (checkClass == "quantri-item") {
                    let toast = $('#add-toast');
                    let bsToast = new bootstrap.Toast(toast, {
                        delay: 3000,
                        animation: false
                    })
                    bsToast.show(); //show toast
                } else {
                    tableInitKhenthuongPhong.ajax.reload(null, false)
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
                success: function() {
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
            success: function() {
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
        $('#quantri-detail').append(`
             <h4 class="quantri-detail-head">Bảng khen thưởng tập thể <span id="phongName">${namePhong}</span></h4>
             <table id="tableKhenthuongPhong" class="table table-bordered table-striped">
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
            scrollY: 500,
            select: true,
            "lengthMenu": [50],
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
                        return `<span class="nam" id="${data._id}">${data.nam}</span>`
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
                        return `<i class="fas fa-pen editThiduaPhong" data-bs-toggle="modal" data-bs-target="#modalEditThiduaPhong" data-bs-backdrop='static' title="Sửa"> </i>`
                    },
                    "width": "2%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<i class="fas fa-trash deleteThiduaPhong"  title="Xóa"> </i>`
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
                success: function() {
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
        $('#quantri-detail').append(`
             <h4 class="quantri-detail-head">Bảng kết quả phong trào "Vì an ninh Tổ quốc" <span id="phongName">${namePhong}</span></h4>
             <table id="tableVianninh" class="table table-bordered table-striped">
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
                success: function() {
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
            success: function() {
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
        $('#quantri-detail').append(`
             <h4 class="quantri-detail-head">Quản trị các đội nghiệp vụ, công an xã và tương đương <span id="phongName">${namePhong}</span></h4>
             <table id="tableQuantriDoi" class="table table-bordered table-striped">
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
            success: function() {
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
            scrollY: 500,
            select: true,
            "lengthMenu": [50],
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
                        return `<i class="fas fa-pen editDoi" data-bs-toggle="modal" data-bs-target="#modalEditDoi" data-bs-backdrop='static' title="Sửa"> </i>`
                    },
                    "width": "2%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<i class="fas fa-trash deleteDoi"  title="Xóa"> </i>`
                    },
                    "width": "2%"
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
            success: function() {
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
                    success: function() {
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
        $('#quantri-detail').append(`
             <h4 class="quantri-detail-head">Danh sách khen thưởng tập thể cấp đội, công an xã và tương đương <span id="phongName">${namePhong}</span></h4>
             <table id="tableKhenthuongDoi" class="table table-bordered table-striped">
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
            scrollY: 500,
            select: true,
            "lengthMenu": [50],
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
                        return `<i class="fas fa-pen editKhenthuongDoi" data-bs-toggle="modal" data-bs-target="#modalEditKhenthuongDoi" data-bs-backdrop='static' title="Sửa"> </i>`
                    },
                    "width": "2%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<i class="fas fa-trash deleteKhenthuongDoi"  title="Xóa"> </i>`
                    },
                    "width": "2%"
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
    $('#addKtDoi').on('click', function() {
        $('#doi').html('');
        let id = $('#chuyentrang').val();
        $.ajax({
            url: `/admin/quantriphong/chitiet/${id}/danhsachdoi`,
            success: function(data) {
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
            success: function() {
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
                success: function() {
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
            success: function() {
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
    $('#btn-themCB').on('click', function() {
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
        let capbac = $('#capbac').val();
        let chucvu = $('#chucvu').val();
        let donvicongtac = $('#donvicongtac').val();
        let fd = new FormData();
        fd.append('hoten', hoten);
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
            success: function() {
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
            scrollY: 500,
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
                        return `<span class="hoten" id="${data._id}">${data.hoten}</span>`
                    },
                    "width": "10%"
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
                        return `<p style="text-align: center" class="capbac">${data.capbac}</p>`
                    },
                    "width": "10%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align: center" class="chucvu">${data.chucvu}</p>`
                    },
                    "width": "18%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p class="donvicongtac" id="${data.donvicongtac._id}">${data.donvicongtac.ten}</p>`
                    },
                    "width": "20%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<i class="far fa-edit editCanbo" data-bs-toggle="modal" data-bs-target="#modalEditCanbo" data-bs-backdrop='static' title="Sửa"> </i>`
                    },
                    "width": "2%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<i class="fas fa-plane-departure moveCanbo" data-bs-toggle="modal" data-bs-target="#modalMoveCanbo" data-bs-backdrop='static' title="Chuyển công tác"> </i>`
                    },
                    "width": "2%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<i class="fas fa-trash deleteCanbo"  title="Xóa"> </i>`
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
    tableQuantriCanbo();

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
        let chucvu = $('#chucvu_Edit').val();
        let donvicongtac = $('#donvicongtac_Edit').val();
        let fd = new FormData();
        fd.append('hoten', hoten);
        fd.append('ngaysinh', ngaysinh);
        fd.append('sohieuCAND', sohieuCAND);
        fd.append('capbac', capbac);
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
            success: function() {
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
            success: function() {
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
                success: function() {
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
        $('#quantri-detail-canhan').append(`
         <button id="btn-themCB" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalAddCanbo" data-bs-backdrop='static'><i class="fas fa-user-plus" style="margin-right: 5px;"></i>Thêm mới</button>
         <h4 class="quantri-detail-head">Danh sách cán bộ, chiến sĩ</h4>
         <table id="tableQuantriCanbo" class="table table-bordered table-striped">
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
    //Quản trị  thi đua tháng cán bộ
    // Chuyển tab quản trị thi đua tháng
    $("#quantriThiduathang").click(function(e) {
        e.preventDefault();
        let year = new Date().getFullYear();
        let parentNode = $(this).closest("li");
        if (parentNode.attr("class") == "quantri-item active1") { //kiểm tra xem có đang active hay k
            return false;
        }
        let id_phong = $('#chuyentrang').val();
        $('.active1').removeClass('active1');
        parentNode.addClass('active1');
        $('#quantri-detail-canhan').html('');
        $('#quantri-detail-canhan').append(`
         <h4 class="quantri-detail-head">Quản trị kết quả thi đua tháng tháng <span id="thangCurrent">1</span> năm <span id="namCurrent">${year}</span></h4>
         <div class="quantri-tab-select">
             <select name="thiduathangdoi" id="thiduathangdoi">
                  <option value="" disable selected hidden>-- Chọn đội công tác ---</option>
             </select>
             <span class="clickDoi">Vui lòng chọn đội muốn thay đổi thi đua tháng</span>
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
             <select name="thiduathangOfNam" id="thiduathangOfNam"></select>
             <button class="btn btn-primary" id="changeTbThiduathang" disabled><i class="fas fa-chart-line"></i> Lấy dữ liệu</button>
             <button class="btn btn-success" id="saveTbThiduathang" disabled style="margin-left: 5px"><i class="far fa-share-square"></i> Lưu kết quả</button>
         </div>
 
         <table id="tableQuantriThiduathang" class=" table table-bordered table-striped">
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
        };

        $('#thiduathangdoi').change(function() {
            $('.clickDoi').css('display', 'none');
            $('#changeTbThiduathang').removeAttr("disabled")
        })

        $.ajax({
            url: `/admin/quantriphong/chitiet/${id_phong}/danhsachdoi`,
            success: function(data) {
                data.forEach(i => {
                    $('#thiduathangdoi').append(`
                         <option value="${i._id}">${i.ten}</opion>
                     `)
                })
            }
        })
        $('#thang').change(function() {
            month = $(this).val();
        })
        $('#thiduathangOfNam').change(function() {
                nam = $(this).val()
            })
            // tableThiduathang();
    });


    const tableThiduathang = (id, id1, month, nam) => {
        tableInitThiduathang = $('#tableQuantriThiduathang').DataTable({
            ajax: {
                url: `/admin/quantriphong/chitiet/${id}/${id1}/quantricanbo/thiduathang/${month}/${nam}`,
                dataSrc: ''
            },
            scrollY: 500,
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
                    return `<p style="text-align: left" class="hoten" id="${data._id}">${data.hoten}</p>`
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
                    return `<i class="fas fa-edit editGhichu" data-bs-toggle="modal" data-bs-target="#modalGhichu" data-bs-backdrop='static' title="ghi chú"></i>`
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
        let idDoi1 = $('#thiduathangdoi').val()
        $('#saveTbThiduathang').removeAttr("disabled")
        let nam = $('#thiduathangOfNam').val();
        $('#thangCurrent').html(month.slice(5))
        $('#namCurrent').html(nam)
        tableThiduathang(id_phong, idDoi1, month, nam)
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
            success: function() {
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
            success: function() {
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


$(document).ready(function() {
    var checkboxAll = $('input[name="checkTotal"]');
    var checkboxFullItem = $('.phanquyen-action-item>input[name="checkFullItem"]')
        //     var checkboxFullItem = $('.phanquyen-action-item>input[name="checkFullItem"][disabled="true"]')
    var checkboxItemRole = $('.item-role');

    checkboxAll.change(function() { //chọn tất cả quyền thì checkFullItem và checkboxRolr sẽ check theo giá trị này
        let isCheckboxAll = $(this).prop('checked');
        checkboxItemRole.prop('checked', isCheckboxAll);
        $(`input[disabled="disabled"]`).prop("checked", true);
        checkboxFullItem.prop('checked', isCheckboxAll);
    });

    //nguyên tắc là khi chọn nhóm quyền thì các quyền sẽ luôn luôn check k thể uncheck
    checkboxFullItem.change(function() { //checkFullItem thay đổi 
        let isCheckAll = checkboxFullItem.length === $('.phanquyen-action-item>input[name="checkFullItem"]:checked').length;
        checkboxAll.prop('checked', isCheckAll); // kiểm tra checTotal
        //các checkbox con bên trong nó từng item-role bên trong checkFullItem
        let isCheckItem = $(this).prop('checked');
        let checkboxItem = $(this).closest('li').find('.item-role');
        checkboxItem.prop('checked', isCheckItem);
        $(`input[disabled="disabled"]`).prop("checked", true);
    });

    checkboxItemRole.change(function() { //thay đổi check của item-role 
        $(this).addClass('1') // quyền riêng chọn trước khi chọn nhóm quyền
        let ulNode = $(this).closest('ul');
        let isCheckItemAll = ulNode.find('.item-role').length === ulNode.find('.item-role:checked').length
        let checkFullItem = ulNode.closest('li').find('input[name="checkFullItem"]');
        checkFullItem.prop('checked', isCheckItemAll) //thay đổi checkbox của checkFullItem
        let isCheckAll = checkboxFullItem.length === $('.phanquyen-action-item>input[name="checkFullItem"]:checked').length;
        checkboxAll.prop('checked', isCheckAll); //thay đổi checkTotal
        $(`input[disabled="disable"]`).prop("checked", true);
    });


    $('input[name="check-role-item"]').change(function(e) {
        let actionList = $(this).attr('class').split(','); //array danh sách các quyền trong nhóm quyền
        let isChecked = e.target.checked;
        if (isChecked === true) {
            actionList.forEach(i => {
                let checkedItem = $(`input[name="${i}"].1`).prop('checked'); //check xem đây là quyền riêng đã chọn trước đó hay không
                let isDisabled = $(`input[name="${i}"][disabled="disabled"]`).prop('checked'); // checkbox đã trùng với 1 nhóm quyền khác
                if (checkedItem) {
                    // $(`input[name="${i}"]`).addClass('same')
                    $(`input[name="${i}"]`).attr('disabled', true);
                    let ulNode = $(`input[name="${i}"]`).closest('ul');
                    let isCheckItemAll = ulNode.find('.item-role').length === ulNode.find('.item-role:checked').length
                    let checkFullItem = ulNode.closest('li').find('input[name="checkFullItem"]');
                    checkFullItem.prop('checked', isCheckItemAll) //thay đổi checkbox của checkFullItem
                } else {
                    $(`input[name="${i}"]`).prop("checked", true);
                    $(`input[name="${i}"]`).attr('disabled', true);
                    let ulNode = $(`input[name="${i}"]`).closest('ul');
                    let isCheckItemAll = ulNode.find('.item-role').length === ulNode.find('.item-role:checked').length
                    let checkFullItem = ulNode.closest('li').find('input[name="checkFullItem"]');
                    checkFullItem.prop('checked', isCheckItemAll) //thay đổi checkbox của checkFullItem
                    if (isCheckItemAll) {
                        checkFullItem.attr('disabled', true);
                    }
                }
            })
        } else {
            // actionList.forEach(i => {
            //     let checkedItem = $(`input[name="${i}"]`).attr('class') === `item-role same`;
            //     if (checkedItem) {
            //         $(`input[name="${i}"]`).removeClass('same')
            //             // $(`input[name="${i}"]`).attr('disabled', false);
            //         let ulNode = $(`input[name="${i}"]`).closest('ul');
            //         let isCheckItemAll = ulNode.find('.item-role').length === ulNode.find('.item-role:checked').length
            //         let checkFullItem = ulNode.closest('li').find('input[name="checkFullItem"]');
            //         checkFullItem.prop('checked', isCheckItemAll) //thay đổi checkbox của checkFullItem
            //     } else {
            //         $(`input[name="${i}"]`).prop("checked", false);
            //         $(`input[name="${i}"]`).attr('disabled', false);
            //         let ulNode = $(`input[name="${i}"]`).closest('ul');
            //         let isCheckItemAll = ulNode.find('.item-role').length === ulNode.find('.item-role:checked').length
            //         let checkFullItem = ulNode.closest('li').find('input[name="checkFullItem"]');
            //         checkFullItem.prop('checked', isCheckItemAll) //thay đổi checkbox của checkFullItem
            //         if (isCheckItemAll) {
            //             checkFullItem.attr('disabled', true);
            //         }
            //     }
            // })
        }
    })
})

$(document).ready(function() {
    var checkboxAll = $('input[name="checkTotal"]');
    var checkboxFullItem = $('.phanquyen-action-item>input[name="checkFullItem"]')
        //     var checkboxFullItem = $('.phanquyen-action-item>input[name="checkFullItem"][disabled="true"]')
    var checkboxItemRole = $('.item-role');

    checkboxAll.change(function() { //chọn tất cả quyền thì checkFullItem và checkboxRolr sẽ check theo giá trị này
        let isCheckboxAll = $(this).prop('checked');
        checkboxItemRole.prop('checked', isCheckboxAll);
        $(`input[disabled="disabled"]`).prop("checked", true);
        checkboxFullItem.prop('checked', isCheckboxAll);
    });

    //nguyên tắc là khi chọn nhóm quyền thì các quyền sẽ luôn luôn check k thể uncheck
    checkboxFullItem.change(function() { //checkFullItem thay đổi 
        let isCheckAll = checkboxFullItem.length === $('.phanquyen-action-item>input[name="checkFullItem"]:checked').length;
        checkboxAll.prop('checked', isCheckAll); // kiểm tra checTotal
        //các checkbox con bên trong nó từng item-role bên trong checkFullItem
        let isCheckItem = $(this).prop('checked');
        let checkboxItem = $(this).closest('li').find('.item-role');
        checkboxItem.prop('checked', isCheckItem);
        $(`input[disabled="disabled"]`).prop("checked", true);
    });

    checkboxItemRole.change(function() { //thay đổi check của item-role 
        $(this).addClass('1') // quyền riêng chọn trước khi chọn nhóm quyền
        let ulNode = $(this).closest('ul');
        let isCheckItemAll = ulNode.find('.item-role').length === ulNode.find('.item-role:checked').length
        let checkFullItem = ulNode.closest('li').find('input[name="checkFullItem"]');
        checkFullItem.prop('checked', isCheckItemAll) //thay đổi checkbox của checkFullItem
        let isCheckAll = checkboxFullItem.length === $('.phanquyen-action-item>input[name="checkFullItem"]:checked').length;
        checkboxAll.prop('checked', isCheckAll); //thay đổi checkTotal
        $(`input[disabled="disable"]`).prop("checked", true);
    });


    $('input[name="check-role-item"]').change(function(e) {
        let actionList = $(this).attr('class').split(','); //array danh sách các quyền trong nhóm quyền
        let isChecked = e.target.checked;
        if (isChecked === true) {
            actionList.forEach(i => {
                let checkedItem = $(`input[name="${i}"].1`).prop('checked'); //check xem đây là quyền riêng đã chọn trước đó hay không
                let isDisabled = $(`input[name="${i}"][disabled="disabled"]`).prop('checked'); // checkbox đã trùng với 1 nhóm quyền khác
                if (checkedItem) {
                    $(`input[name="${i}"]`).attr('disabled', true);
                    let ulNode = $(`input[name="${i}"]`).closest('ul');
                    let isCheckItemAll = ulNode.find('.item-role').length === ulNode.find('.item-role:checked').length
                    let checkFullItem = ulNode.closest('li').find('input[name="checkFullItem"]');
                    checkFullItem.prop('checked', isCheckItemAll) //thay đổi checkbox của checkFullItem
                    if (isCheckItemAll) {
                        checkFullItem.attr('disabled', true);
                    }
                } else if (isDisabled) { // trường hợp quyền trùng với 1 nhóm quyền nào đó đã được chọn
                    $(`input[name="${i}"]`).addClass('same')
                    let ulNode = $(`input[name="${i}"]`).closest('ul');
                    let isCheckItemAll = ulNode.find('.item-role').length === ulNode.find('.item-role:checked').length
                    let checkFullItem = ulNode.closest('li').find('input[name="checkFullItem"]');
                    checkFullItem.prop('checked', isCheckItemAll) //thay đổi checkbox của checkFullItem
                    if (isCheckItemAll) {
                        checkFullItem.attr('disabled', true);
                    }
                } else {
                    $(`input[name="${i}"]`).prop("checked", true);
                    $(`input[name="${i}"]`).attr('disabled', true);
                    let ulNode = $(`input[name="${i}"]`).closest('ul');
                    let isCheckItemAll = ulNode.find('.item-role').length === ulNode.find('.item-role:checked').length
                    let checkFullItem = ulNode.closest('li').find('input[name="checkFullItem"]');
                    checkFullItem.prop('checked', isCheckItemAll) //thay đổi checkbox của checkFullItem
                    if (isCheckItemAll) {
                        checkFullItem.attr('disabled', true);
                    }
                }
            })
        } else {
            actionList.forEach(i => {
                    let uncheckItem1 = $(`input[name="${i}"]`).attr('class') === `item-role 1`;
                    let checkedItem = $(`input[name="${i}"].1`).prop('checked'); //check xem đây là quyền riêng đã chọn trước đó hay không
                    let isDisabled = $(`input[name="${i}"][disabled="disabled"]`).prop('checked'); // checkbox đã trùng với 1 nhóm quyền khác
                    if (uncheckItem1) { // trường hợp quyền đó đã chọn riêng trước khi chọn nhóm quyền
                        $(`input[name="${i}"]`).removeAttr('disabled');
                        $(`input[name="${i}"].1`).prop('checked', true);
                        // $(`input[name="${i}"]`).removeClass('1')
                        let ulNode = $(`input[name="${i}"]`).closest('ul');
                        let isCheckItemAll = ulNode.find('.item-role').length === ulNode.find('.item-role:checked').length
                        let checkFullItem = ulNode.closest('li').find('input[name="checkFullItem"]');
                        checkFullItem.prop('checked', isCheckItemAll) //thay đổi checkbox của checkFullItem
                    } else {

                    }
                })
                // actionList.forEach(i => {
                //     let checkedItem = $(`input[name="${i}"]`).attr('class') === `item-role same`;
                //     if (checkedItem) {
                //         $(`input[name="${i}"]`).removeClass('same')
                //             // $(`input[name="${i}"]`).attr('disabled', false);
                //         let ulNode = $(`input[name="${i}"]`).closest('ul');
                //         let isCheckItemAll = ulNode.find('.item-role').length === ulNode.find('.item-role:checked').length
                //         let checkFullItem = ulNode.closest('li').find('input[name="checkFullItem"]');
                //         checkFullItem.prop('checked', isCheckItemAll) //thay đổi checkbox của checkFullItem
                //     } else {
                //         $(`input[name="${i}"]`).prop("checked", false);
                //         $(`input[name="${i}"]`).attr('disabled', false);
                //         let ulNode = $(`input[name="${i}"]`).closest('ul');
                //         let isCheckItemAll = ulNode.find('.item-role').length === ulNode.find('.item-role:checked').length
                //         let checkFullItem = ulNode.closest('li').find('input[name="checkFullItem"]');
                //         checkFullItem.prop('checked', isCheckItemAll) //thay đổi checkbox của checkFullItem
                //         if (isCheckItemAll) {
                //             checkFullItem.attr('disabled', true);
                //         }
                //     }
                // })
        }
    })
})