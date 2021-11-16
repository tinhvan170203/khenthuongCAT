$(document).ready(function() {
    var allRole = JSON.parse($('#variableJSON').text());
    $('#variableJSON').remove();
    // Click tab kết quả giải thể thao  
    $("#ketquaGiai").click(function(e) {
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
        <div class="quantri-tab-select">
                <select name="nam" id="nam">
                    <option value="" hidden selected disabled>-- Chọn năm --</option>
                 </select>
        </div>
                `);
        if (allRole.indexOf('them-kiem-tra-ban-sung') !== -1) {
            $('#quantri-detail').append(`
        <button id="addCanhan" data-bs-toggle="modal" data-bs-target="#modalAddCuocthi" data-bs-backdrop='static' class="btn btn-success" disabled id="addCanhan" style="margin-left: 5px"><i class="far fa-share-square"></i> Thêm mới</button>
    `)
        };
        $('#quantri-detail').append(`
          <h4 class="quantri-detail-head">Báo cáo kết quả kiểm tra bắn đạn thật của các đơn vị <span id="namCurrent"></span>
           <table id="tableGiaithethao" style="width:100%" class="table table-bordered table-striped">
           <thead>
                <tr>
                     <th style="text-align: center;">STT</th>
                     <th style="text-align: center;">Đơn vị</th>
                     <th style="text-align: center;">Trích yếu kết quả kiểm tra</th>
                     <th style="text-align: center;">Báo cáo kết quả</th>
                     <th style="text-align: center;"></th>
                     <th style="text-align: center;"></th>
                </tr>
           </thead>
           <tbody></tbody>
           </table>
          `);
        while (2016 <= year) {
            $('#nam').append(`
                 <option value="${year}">Năm ${year}</option>
                 ${year -=1}
             `)
        };
        $('#nam').change(function() {
            $('#addCanhan').removeAttr('disabled');
            $('#namCurrent').text($('#nam option:selected').text())
            tableTheluc();
        });
    });
    //add giải thể thao
    $('#cuocthiForm').on('submit', function(e) {
        let nam = $('#nam').val();
        e.preventDefault();
        let fd = new FormData(e.target); // submit sẽ lấy tất cả giá trị qua thuộc tính name của thẻ
        $.ajax({
            url: '/congtacdieulenh/quantri/kiemtra/bansung/add/' + nam,
            method: 'POST',
            contentType: false,
            processData: false,
            data: fd,
            error: function() {
                alert('có lỗi xảy ra trong quá trình thêm mới...')
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
    const tableTheluc = () => {
        let nam = $('#nam').val();
        table = $('#tableGiaithethao').DataTable({
            ajax: {
                url: '/congtacdieulenh/quantri/kiemtra/bansung/tableBansung/' + nam,
                dataSrc: ''
            },
            "lengthMenu": [15],
            select: true,
            "bSort": false,
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                "sInfoFiltered": "",
                "sInfo": "Tổng cộng  _TOTAL_kết quả",
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
                        return `<p style="text-align:center" class="donviduockiemtra" id="${data._id}">${data.donviduockiemtra.kyhieu}</p>`
                    },
                    "width": "25%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p id="${data.donviduockiemtra._id}" class="ghichu">${data.ghichu}</p>`
                    },
                    "width": "58%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<p  style="text-align:center"><a class="download"  href="/congtacdieulenh/quantri/kiemtra/bansung/download/${data.tep}"><i style="font-size:20px" class="fas fa-file-word"></i></a></p>`
                    },
                    "width": "15%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('sua-kiem-tra-ban-sung') !== -1) {
                            dataRender += `<i class="fas fa-edit editCuocthi" data-bs-toggle="modal" data-bs-target="#modalEditCuocthi" data-bs-backdrop='static' title="Sửa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "1%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('xoa-kiem-tra-ban-sung') !== -1) {
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

    $('#nam').change(function() {
        $('#addCanhan').removeAttr('disabled');
        $('#namCurrent').text($('#nam option:selected').text())
        tableTheluc();
    });

    //     Download file 
    $(document).on('click', '.download', function(e) {
        e.preventDefault();
        let url = $(this).attr('href'); //lấy ra link download
        window.location.href = url //tiến hành download
    });


    let idCuocthiEdit;
    $(document).on('click', '.editCuocthi', function() {
        let row = $(this).closest('tr');
        idCuocthiEdit = row.find('.donviduockiemtra').attr('id');
        $('#donviduockiemtra_Edit').val(row.find('.ghichu').attr('id'));
        $('#ghichu_Edit').val(row.find('.ghichu').text().trim());
        let tep_path = `${row.find('.download').attr('href')}`;
        $('#tep_old').text(tep_path);
        $('#tep_old').attr('href', tep_path)
    });
    $('#EditCuocthiForm').on('submit', function(e) {
        e.preventDefault();
        let fd = new FormData(e.target); // submit sẽ lấy tất cả giá trị qua thuộc tính name của thẻ
        $.ajax({
            url: '/congtacdieulenh/quantri/kiemtra/bansung/edit/' + idCuocthiEdit,
            method: 'POST',
            contentType: false,
            processData: false,
            data: fd,
            error: function() {
                alert('có lỗi xảy ra...')
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
                table.ajax.reload(null, false)
                let toast = $('#edit-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: true
                })
                bsToast.show(); //show toast
            }
        })
    });
    let idCuocthiDelete;
    $(document).on('click', '.deleteCuocthi', function() {
        let row = $(this).closest('tr');
        idCuocthiDelete = row.find('.donviduockiemtra').attr('id');
        let isDelete = confirm('Bạn có đồng ý xóa?')
        if (isDelete) {
            $.ajax({
                url: '/congtacdieulenh/quantri/kiemtra/bansung/delete/' + idCuocthiDelete,
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


    // Danh sách không đạt kiểm tra bắn đạn thật
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
                          <h4 class="quantri-detail-head">Danh sách cá nhân kiểm tra bắn đạn thật xếp loại không đạt <span id="sportRender"></span><span id="nampage"></span></h4>
                          <div class="quantri-tab-select">
                          <label for="nam">Năm</label>
                          <select name="nam" id="nam">
                          </select>
                          <span class="clickDoi">Vui lòng chọn mục này</span>
                          <button class="btn btn-primary" id="thongke"><i class="fas fa-chart-line"></i> Thống kê</button>
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
        $('#thongke').click(function() {
            if (allRole.indexOf('them-danh-sach-khong-dat') !== -1) {
                $('#addCanhan').removeAttr('disabled');
            }
            $('.clickDoi').fadeOut(0)
            $('#sportRender').text('Năm ')
            $('#nampage').text($('#nam option:selected').text())
            tableTieubieu();
        });
    });

    const tableTieubieu = () => {
        let nam = $('#nam').val();
        tableInitTieubieu = $('#tableCanhanTieubieu').DataTable({
            ajax: {
                url: `/congtacdieulenh/quantri/kiemtra/bansung/khongdat/${nam}`,
                dataSrc: ''
            },
            "lengthMenu": [10],
            select: true,
            "bSort": false,
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
                    if (allRole.indexOf('xoa-danh-sach-khong-dat') !== -1) {
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

    //chọn đơn vị thêm cán bộ k đạt bắn đạn thật
    var table2 = $('#tableTieubieu').DataTable({
        ajax: {
            url: `/congtacdieulenh/quantri/allCanbo`,
            dataSrc: ''
        },
        rowId: '_id', //set id cho row,
        "lengthMenu": [50],
        "language": {
            "sInfoEmpty": "",
            "sEmptyTable": "Không có dữ liệu trong mục này",
            "sInfoFiltered": "",
            "sInfo": "Tổng cộng  _TOTAL_ cán bộ, chiến sĩ",
            "sLengthMenu": "",

        },
        "bSort": false,
        select: true,
        "bAutoWidth": false,
        "destroy": true, // cho phép hủy bỏ table tạo table mới với cùng id table
        "aoColumns": [{
            "mData": function(data, type, dataToSet) {
                return `${data._id}` // rowId nên k có thẻ nào bọc nó lại được
            },
            "width": "2%"
        }, {
            "mData": function(data, type, dataToSet) {
                return `<span>${data.hoten}</span>`
            },
            "width": "20%"
        }, {
            "mData": function(data, type, dataToSet) {
                return `<p style="text-align:center"">${data.capbac}</p>`
            },
            "width": "10%"
        }, {
            "mData": function(data, type, dataToSet) {
                return `<p style="text-align:center"">${data.chucvu}</p>`
            },
            "width": "25%"
        }, {
            "mData": function(data, type, dataToSet) {
                return `<p style="text-align:center"">${data.donvicongtac.ten}</p>`
            },
            "width": "25%"
        }],
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
    })

    $('#tieubieuForm').on('submit', function(e) {
        e.preventDefault();
        let nam = $('#nampage').text();
        var rows_selected = table2.column(0).checkboxes.selected(); // lấy ra những hàng checked

        let idList = [];
        $.each(rows_selected, function(index, rowId) { //rowId là giá trị của cột đầu tiên ở đây là id cán bộ
            idList.push(rowId);
        });
        $.ajax({
            url: `/congtacdieulenh/quantri/kiemtra/bansung/khongdat/${nam}/updateList`,
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
        let nam = $('#nampage').text();
        let idDelete = row.find('.hoten').attr('id');
        let i = row.find('.hoten').text();
        let isDelete = confirm(`Bạn có muốn xóa ${i} khỏi danh sách  năm ${nam}`);
        if (isDelete) {
            $.ajax({
                url: `/congtacdieulenh/quantri/kiemtra/bansung/khongdat/${nam}/delete/${idDelete}`,
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