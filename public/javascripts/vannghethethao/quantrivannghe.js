$(document).ready(function() {
    var allRole = JSON.parse($('#variableJSON').text());
    $('#variableJSON').remove();
    // Click tab kết quả cuộc thi
    $("#ketquaGiai").click(function(e) {
        e.preventDefault();
        let parentNode = $(this).closest("li");
        if (parentNode.attr("class") == "quantri-item active-tab") { //kiểm tra xem có đang active hay k
            return false;
        }
        $('.active-tab').removeClass('active-tab');
        parentNode.addClass('active-tab');
        $('#quantri-detail').html('');
        if (allRole.indexOf('them-ket-qua-van-nghe') !== -1) {
            $('#quantri-detail').append(`
            <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalAddCuocthi" data-bs-backdrop='static'><i class="fas fa-trophy" style="margin-right: 5px"></i>Thêm mới</button>
            `)
        };
        $('#quantri-detail').append(`  
             <h4 class="quantri-detail-head">Kết quả tham gia các hội thi, hội diễn văn hóa văn nghệ</span>
             </h4>
             <table id="tableGiaithethao" style="width:100%" class="table table-bordered table-striped">
                 <thead>
                     <tr>
                         <th style="text-align: center;">STT</th>
                         <th style="text-align: center;">Tên hội thi, hội diễn</th>
                         <th style="text-align: center;">Ngày tổ chức</th>
                         <th style="text-align: center;">Địa điểm tổ chức</th>
                         <th style="text-align: center;">Đơn vị tổ chức</th>
                         <th style="text-align: center;">Kết quả đạt được</th>
                         <th style="text-align: center;"></th>
                         <th style="text-align: center;"></th>
                     </tr>
                 </thead>
                 <tbody></tbody>
             </table>
         `);
        tableGiaiVannghe()
    });
    //add giải thể thao
    $('#cuocthiForm').on('submit', function(e) {
        e.preventDefault();
        let tengiai = $('#tengiai').val().trim();
        let donvitochuc = $('#donvitochuc').val().trim();
        let ngaytochuc = $('#ngaytochuc').val().trim();
        let ketqua = $('#ketqua').val().trim();
        let diadiemtochuc = $('#diadiemtochuc').val().trim();
        $.ajax({
            url: '/vannghethethao/quantri/vannghe/ketqua/giaivannghe/add',
            method: 'POST',
            data: { tengiai, donvitochuc, ngaytochuc, ketqua, diadiemtochuc },
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
                $('#cuocthiForm')[0].reset();
                $('.btn-close').click();
                table.ajax.reload(null, false)
                let toast = $('#add-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: true
                })
                bsToast.show(); //show toast
            }
        })
    })
    const tableGiaiVannghe = () => {
        table = $('#tableGiaithethao').DataTable({
            ajax: {
                url: '/vannghethethao/quantri/vannghe/ketqua/giaivannghe',
                dataSrc: ''
            },
            "lengthMenu": [15],
            select: true,
            "bSort": false,
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                "sInfoFiltered": "",
                "sInfo": "Tổng cộng  _TOTAL_ cuộc thi",
                "sLengthMenu": "",

            },
            "destroy": true, // cho phép hủy bỏ table tạo table mới với cùng id table
            "aoColumns": [{
                    "mData": function(data, type, dataToSet) {
                        return `<td></td>`
                    },
                    "width": "1%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="tengiai" id=${data._id}>${data.tengiai}</span>`
                    },
                    "width": "15%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center" class="ngaytochuc">${data.ngaytochuc}</p>`
                    },
                    "width": "8%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center" class="diadiemtochuc">${data.diadiemtochuc}</p>`
                    },
                    "width": "12%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center" class="donvitochuc">${data.donvitochuc}</p>`
                    },
                    "width": "10%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="ketqua">${data.ketqua}</span>`
                    },
                    "width": "15%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('sua-ket-qua-van-nghe') !== -1) {
                            dataRender += `<i class="fas fa-edit editCuocthi" data-bs-toggle="modal" data-bs-target="#modalEditCuocthi" data-bs-backdrop='static' title="Sửa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "1%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('xoa-ket-qua-van-nghe') !== -1) {
                            dataRender += `<i class="fas fa-trash deleteCuocthi"  title="Xóa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "1%"
                }
            ]
        })
        table.on('order.dt search.dt', function() {
            table.column(0).nodes().each(function(cell, i) {
                cell.innerHTML = `<p style="text-align:center">${i+1}</p>`
            });
        }).draw();
    };

    let idCuocthiEdit;
    $(document).on('click', '.editCuocthi', function() {
        let row = $(this).closest('tr');
        idCuocthiEdit = row.find('.tengiai').attr('id');
        $('#tengiai_Edit').val(row.find('.tengiai').text().trim());
        $('#donvitochuc_Edit').val(row.find('.donvitochuc').text().trim());
        $('#ngaytochuc_Edit').val(row.find('.ngaytochuc').text().trim());
        $('#diadiemtochuc_Edit').val(row.find('.diadiemtochuc').text().trim());
        $('#ketqua_Edit').val(row.find('.ketqua').text().trim());
    });
    $('#EditCuocthiForm').on('submit', function(e) {
        e.preventDefault();
        let tengiai = $('#tengiai_Edit').val().trim();
        let donvitochuc = $('#donvitochuc_Edit').val().trim();
        let ngaytochuc = $('#ngaytochuc_Edit').val().trim();
        let ketqua = $('#ketqua_Edit').val().trim();
        let diadiemtochuc = $('#diadiemtochuc_Edit').val().trim();
        $.ajax({
            url: '/vannghethethao/quantri/vannghe/ketqua/giaivannghe/edit/' + idCuocthiEdit,
            method: 'POST',
            data: { tengiai, donvitochuc, ngaytochuc, ketqua, diadiemtochuc },
            error: function() {
                alert('Bạn không có quyền chỉnh sửa kết quả giải thể thao...')
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
                table.ajax.reload(null, false);
                let toast = $('#edit-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: true
                })
                bsToast.show()
            }
        })
    });
    let idCuocthiDelete;
    $(document).on('click', '.deleteCuocthi', function() {
        let row = $(this).closest('tr');
        idCuocthiDelete = row.find('.tengiai').attr('id');
        let isDelete = confirm('Bạn có đồng ý xóa?')
        if (isDelete) {
            $.ajax({
                url: '/vannghethethao/quantri/vannghe/ketqua/giaivannghe/delete/' + idCuocthiDelete,
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
                    table.ajax.reload(null, false);
                    let toast = $('#delete-toast');
                    let bsToast = new bootstrap.Toast(toast, {
                        delay: 3000,
                        animation: true
                    })
                    bsToast.show()
                }
            })
        }
    });

    //Quản trị tên loại hình văn hóa văn nghệ
    $("#thethaoList").click(function(e) {
        e.preventDefault();
        let parentNode = $(this).closest("li");
        if (parentNode.attr("class") == "quantri-item active-tab") { //kiểm tra xem có đang active hay k
            return false;
        }
        $('.active-tab').removeClass('active-tab');
        parentNode.addClass('active-tab');
        $('#quantri-detail').html('');
        if (allRole.indexOf('them-the-loai-van-nghe') !== -1) {
            $('#quantri-detail').append(`
            <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalAddMonTheThao" data-bs-backdrop='static'><i class="fas fa-trophy" style="margin-right: 5px"></i>Thêm mới</button>
            `)
        }
        $('#quantri-detail').append(`
             <h4 class="quantri-detail-head">Quản trị loại hình Văn hóa - Văn nghệ</span>
             </h4>
             <table id="tableThethaoList" style="width:100%" class="table table-bordered table-striped">
                 <thead>
                     <tr>
                         <th style="text-align: center;">STT</th>
                         <th style="text-align: center;">Tên loại hình</th>
                         <th style="text-align: center;"></th>
                         <th style="text-align: center;"></th>
                     </tr>
                 </thead>
                 <tbody></tbody>
             </table>
         `);
        tableVanngheList()
    });

    const tableVanngheList = () => {
        tableInitThethaoList = $('#tableThethaoList').DataTable({
            ajax: {
                url: '/vannghethethao/quantri/vannghe/vanngheList',
                dataSrc: ''
            },
            "lengthMenu": [6],
            select: true,
            "bSort": false,
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                "sInfoFiltered": "",
                "sInfo": "Tổng cộng  _TOTAL_ môn thể thao",
                "sLengthMenu": "",

            },
            "destroy": true, // cho phép hủy bỏ table tạo table mới với cùng id table
            "aoColumns": [{
                    "mData": function(data, type, dataToSet) {
                        return `<td></td>`
                    },
                    "width": "16%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="monthethao" id=${data.id}>${data.monthethao}</span>`
                    },
                    "width": "80%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('sua-the-loai-van-nghe') !== -1) {
                            dataRender += `<i class="fas fa-edit editMonThethao" data-bs-toggle="modal" data-bs-target="#modalEditMonThethao" data-bs-backdrop='static' title="Sửa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "2%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('xoa-the-loai-van-nghe') !== -1) {
                            dataRender += `<i class="fas fa-trash deleteMonThethao"  title="Xóa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "2%"
                }
            ]
        });
        tableInitThethaoList.on('order.dt search.dt', function() {
            tableInitThethaoList.column(0).nodes().each(function(cell, i) {
                cell.innerHTML = `<p style="text-align:center">${i+1}</p>`
            });
        }).draw();
    };

    //Add tên môn thể thao
    $('#sportForm').on('submit', function(e) {
        e.preventDefault();
        let monthethao = $('#monthethao').val().trim();
        $.ajax({
            url: `/vannghethethao/quantri/vannghe/loaihinh/add`,
            method: 'POST',
            data: { monthethao },
            error: function() {
                alert('Có lỗi hệ thống xảy ra')
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
                $('#sportForm')[0].reset();
                tableInitThethaoList.ajax.reload(null, false)
                let toast = $('#add-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: false
                })
                bsToast.show(); //show toast
            }
        })
    });

    let idMonThethao;
    $(document).on('click', '.editMonThethao', function() {
        let row = $(this).closest('tr');
        idMonThethao = row.find('.monthethao').attr('id');
        $('#monthethao_Edit').val(row.find('.monthethao').text())
    });
    $('#sportFormEdit').on('submit', function(e) {
        e.preventDefault();
        let monthethao = $('#monthethao_Edit').val().trim();
        $.ajax({
            url: `/vannghethethao/quantri/vannghe/loaihinh/edit/${idMonThethao}`,
            method: 'POST',
            data: { monthethao },
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
                $('.btn-close').click();
                tableInitThethaoList.ajax.reload(null, false)
                let toast = $('#edit-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: false
                })
                bsToast.show(); //show toast
            }
        })
    });

    let idDeleteSport;
    $(document).on('click', '.deleteMonThethao', function() {
        let row = $(this).closest('tr');
        idDeleteSport = row.find('.monthethao').attr('id');
        let isDelete = confirm('Bạn có muốn xóa?')
        if (isDelete) {
            $.ajax({
                url: `/vannghethethao/quantri/vannghe/loaihinh/delete/${idDeleteSport}`,
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
                    tableInitThethaoList.ajax.reload(null, false)
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

    // Nhân tố điển hình  
    $("#starCanhan").click(function(e) {
        e.preventDefault();
        let year = new Date().getFullYear();
        let parentNode = $(this).closest("li");
        if (parentNode.attr("class") == "quantri-item active-tab") { //kiểm tra xem có đang active hay k
            return false;
        }
        $('.active-tab').removeClass('active-tab');
        parentNode.addClass('active-tab');
        $('#quantri-detail').html('');
        $('#quantri-detail').append(`
                     <h4 class="quantri-detail-head">Các cá nhân, tập thể tiêu biểu trong loại hình <span id="sportRender"></span><span id="nampage"></span></h4>
                     <div class="quantri-tab-select">
                     <label for="nam">Năm</label>
                     <select name="nam" id="nam">
                     </select>
                     <label for="sport">Nội dung:</label>
                     <select name="sport" id="sport">
                     </select>
                     <span class="clickDoi">Vui lòng chọn mục này</span>
                     <button class="btn btn-primary" disabled id="thongke"><i class="fas fa-chart-line"></i> Thống kê</button>
                     <button data-bs-toggle="modal" data-bs-target="#modalAddCanbo" data-bs-backdrop='static' class="btn btn-success" disabled id="addCanhan" style="margin-left: 5px"><i class="far fa-share-square"></i> Thêm cá nhân</button>
                     </div>
                     <table id="tableCanhanTieubieu" style="width:100%" class="table table-bordered table-striped">
                         <thead>
                             <tr>
                                 <th style="text-align: center;">STT</th>
                                 <th style="text-align: center;">Họ và tên</th>
                                 <th style="text-align: center;">Cấp bậc</th>
                                 <th style="text-align: center;">Chức vụ</th>
                                 <th style="text-align: center;">Đơn vị công tác</th>
                                 <th style="text-align: center;"></th>
                             </tr>
                         </thead>
                         <tbody></tbody>
                     </table>    
                 `);
        while (2016 <= year) {
            $('#nam').append(`
                 <option value="${year}">${year}</option>
                 ${year -=1}
             `)
        };
        $.ajax({
            url: `/vannghethethao/quantri/vannghe/vanngheList`,
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
                data.forEach(i => {
                    $('#sport').append(`
                  <option value="${i.id}">${i.monthethao}</option>
                         `)
                });
                $('#thongke').removeAttr('disabled');
            }
        });
        $('#thongke').click(function() {
            if (allRole.indexOf('them-ca-nhan-van-nghe-dien-hinh') !== -1) {
                $('#addCanhan').removeAttr('disabled');
            };
            $('.clickDoi').fadeOut(0)
            $('#sportRender').text($('#sport option:selected').text() + ' - Năm ')
            $('#nampage').text($('#nam option:selected').text())
            tableTieubieu();
        })
    });

    const tableTieubieu = () => {
        let noidung = $('#sport').val();
        let nam = $('#nam').val();
        tableInitTieubieu = $('#tableCanhanTieubieu').DataTable({
            ajax: {
                url: `/vannghethethao/quantri/vannghe/canhantieubieu/loaihinh/${noidung}/${nam}`,
                dataSrc: ''
            },
            "lengthMenu": [50],
            select: true,
            "bSort": false,
            "bAutoWidth": false,
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                // "sInfoFiltered": "",
                "sInfo": "Tổng cộng  _TOTAL_ cá nhân tiêu biểu",
                "sLengthMenu": "",

            },
            "destroy": true, // cho phép hủy bỏ table tạo table mới với cùng id table
            "aoColumns": [{
                "mData": function(data, type, dataToSet) {
                    return `<td></td>`
                },
                "width": "2%"
            }, {
                "mData": function(data, type, dataToSet) {
                    return `<span class="hoten" id=${data._id}>${data.hoten}</span>`
                },
                "width": "20%"
            }, {
                "mData": function(data, type, dataToSet) {
                    return `<p style="text-align:center"class="capbac">${data.capbac}</p>`
                },
                "width": "8%"
            }, {
                "mData": function(data, type, dataToSet) {
                    return `<p style="text-align:center" class="chucvu">${data.chucvu}</p>`
                },
                "width": "24%"
            }, {
                "mData": function(data, type, dataToSet) {
                    return `<span class="donvicongtac">${data.room.kyhieu} - ${data.donvicongtac.ten}</span>`
                },
                "width": "30%"
            }, {
                "mData": function(data, type, dataToSet) {
                    let dataRender = '';
                    if (allRole.indexOf('xoa-ca-nhan-van-nghe-dien-hinh') !== -1) {
                        dataRender += `<i class="fas fa-trash deleteCanhantieubieu"  title="Xóa"> </i>`
                    };
                    return dataRender
                },
                "width": "2%"
            }]
        });
        tableInitTieubieu.on('order.dt search.dt', function() {
            tableInitTieubieu.column(0).nodes().each(function(cell, i) {
                cell.innerHTML = `<p style="text-align:center">${i+1}</p>`
            });
        }).draw();
    };
    var table2 = $('#tableTieubieu').DataTable({
        ajax: {
            url: `/vannghethethao/quantri/allCanbo`,
            dataSrc: ''
        },
        rowId: '_id', //set id cho row
        "lengthMenu": [50],
        "language": {
            "sInfoEmpty": "",
            "sEmptyTable": "Không có dữ liệu trong mục này",
            "sInfoFiltered": "",
            "sInfo": "Tổng cộng  _TOTAL_ cán bộ, chiến sĩ",
            "sLengthMenu": "",

        },
        "bSort": false,
        "bAutoWidth": false,
        select: true,
        "aoColumns": [{
            "mData": function(data, type, dataToSet) {
                return `${data._id}` // rowId nên k có thẻ nào bọc nó lại được
            },
            "width": "2%"
        }, {
            "mData": function(data, type, dataToSet) {
                return `<span>${data.hoten}</span>`
            },
            "width": "30%"
        }, {
            "mData": function(data, type, dataToSet) {
                return `<p style="text-align:center"">${data.capbac}</p>`
            },
            "width": "18%"
        }, {
            "mData": function(data, type, dataToSet) {
                return `<p style="text-align:center"">${data.chucvu}</p>`
            },
            "width": "35%"
        }, {
            "mData": function(data, type, dataToSet) {
                return `<p style="text-align:center"">${data.room}</p>`
            },
            "width": "15%"
        }],
        "destroy": true, // cho phép hủy bỏ table tạo table mới với cùng id table
        'columnDefs': [{
            'targets': 0,
            'checkboxes': {
                'selectRow': true
            }
        }],
        'select': {
            'style': 'multi'
        },
        'order': [
            [1, 'asc']
        ]
    });
    $('#tieubieuForm').on('submit', function(e) {
        e.preventDefault();
        let noidung = $('#sport').val();
        let nam = $('#nampage').text();
        var rows_selected = table2.column(0).checkboxes.selected(); // lấy ra những hàng checked

        let idList = [];
        $.each(rows_selected, function(index, rowId) { //rowId là giá trị của cột đầu tiên ở đây là id cán bộ
            idList.push(rowId);
        });
        $.ajax({
            url: `/vannghethethao/quantri/vannghe/canhantieubieu/${noidung}/${nam}/updateList`,
            method: 'POST',
            error: function() {
                alert('có lỗi')
            },
            data: { arr: JSON.stringify(idList) },
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
                table2.columns().checkboxes.deselect(true); // hủy hết checkboxes về mặc định(tìm mãi mới ra :))
                tableInitTieubieu.ajax.reload(null, false);
                let toast = $('#edit-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: false
                })
                bsToast.show(); //show toast
            }
        })
    });
    $(document).on('click', '.deleteCanhantieubieu', function() {
        let row = $(this).closest('tr');
        let noidung = $('#sport').val();
        let nam = $('#nampage').text();
        let idDelete = row.find('.hoten').attr('id');
        let i = row.find('.hoten').text();
        let isDelete = confirm(`Bạn có muốn xóa ${i} khỏi danh sách cá nhân tiêu biểu năm ${nam}`);
        if (isDelete) {
            $.ajax({
                url: `/vannghethethao/quantri/vannghe/canhantieubieu/${noidung}/${nam}/delete/${idDelete}`,
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
                    tableInitTieubieu.ajax.reload(null, false);
                    let toast = $('#delete-toast');
                    let bsToast = new bootstrap.Toast(toast, {
                        delay: 3000,
                        animation: false
                    })
                    bsToast.show(); //show toast
                }
            })
        }
    })
      $('#donvi').change(function() {
                $('#redirect').removeAttr('disabled');
            });
            $('#redirect').click(function(e) {
                e.preventDefault();
                let id = $('#donvi').val();
                window.location.href = '/admin/quantriphong/chitiet/' + id
            })
})