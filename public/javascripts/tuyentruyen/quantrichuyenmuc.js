$(document).ready(function() {
    var allRole = JSON.parse($('#variableJSON').text());
    $('#variableJSON').remove();
    //thêm chuyên mục
    $('#cuocthiForm').on('submit', function(e) {
        e.preventDefault();
        let tenchuyenmuc = $('#ten').val().trim();
        $.ajax({
            url: '/tuyentruyen/quantri/chuyenmuc/addChuyenmuc',
            method: 'POST',
            data: { tenchuyenmuc },
            error: function() {
                alert('Có lỗi xảy ra trong quá trình thêm mới kết quả thi...')
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
                table.ajax.reload(null, false);
                let toast = $('#add-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 1000,
                    animation: true
                })
                bsToast.show(); //show toast
            }
        })
    })
    const getCuocthiList = (year) => {
        table = $('#ketquaTable').DataTable({
            ajax: {
                url: '/tuyentruyen/quantri/chuyenmuc/list',
                dataSrc: ''
            },
            select: true,
            "bSort": false,
            "lengthMenu": [10],
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                "sInfoFiltered": "",
                "sInfo": "Tổng cộng  _TOTAL_ chuyên mục",
                "sLengthMenu": "",

            },
            "destroy": true, // cho phép hủy bỏ table tạo table mới với cùng id table
            "aoColumns": [{
                    "mData": function(data, type, dataToSet) {
                        return `<td></td>`
                    },
                    "width": "5%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="ten" id=${data._id}>${data.tenchuyenmuc}</span>`
                    },
                    "width": "93%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('sua-chuyen-muc') !== -1) {
                            dataRender += `<i class="fas fa-edit editCuocthi" data-bs-toggle="modal" data-bs-target="#modalEditCuocthi" data-bs-backdrop='static' title="Sửa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "1%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('xoa-chuyen-muc') !== -1) {
                            dataRender += `<i class="fas fa-trash deleteCuocthi"  title="Xóa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "1%"
                }
            ]
        })
    };
    getCuocthiList();
    table.on('order.dt search.dt', function() {
        table.column(0).nodes().each(function(cell, i) {
            cell.innerHTML = `<p style="text-align:center">${i+1}</p>`
        });
    }).draw();
    let idCuocthiEdit;
    $(document).on('click', '.editCuocthi', function() {
        let row = $(this).closest('tr');
        idCuocthiEdit = row.find('.ten').attr('id');
        $('#tenEdit').val(row.find('.ten').text());
    });
    $('#EditCuocthiForm').on('submit', function(e) {
        e.preventDefault();
        let tenchuyenmuc = $('#tenEdit').val().trim();
        $.ajax({
            url: '/tuyentruyen/quantri/chuyenmuc/editChuyenmuc/' + idCuocthiEdit,
            method: 'POST',
            data: { tenchuyenmuc },
            error: function() {
                alert('Có lỗi xảy ra khi cập nhật chuyên mục...')
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
                    delay: 1000,
                    animation: true
                })
                bsToast.show()
            }
        })
    });
    let idCuocthiDelete;
    $(document).on('click', '.deleteCuocthi', function() {
        let row = $(this).closest('tr');
        idCuocthiDelete = row.find('.ten').attr('id');
        let isDelete = confirm('Bạn có đồng ý xóa chuyên mục này?')
        if (isDelete) {
            $.ajax({
                url: '/tuyentruyen/quantri/chuyenmuc/deleteChuyenmuc/' + idCuocthiDelete,
                method: 'GET',
                error: function() {
                    alert('Có lỗi xảy ra khi xóa chuyên mục này?...')
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
                        delay: 1000,
                        animation: true
                    })
                    bsToast.show()
                }
            })
        }
    });
    $('#donvi').change(function() {
        $('#redirect').removeAttr('disabled');
    });
    $('#redirect').click(function(e) {
        e.preventDefault();
        let id = $('#donvi').val();
        window.location.href = '/admin/quantriphong/chitiet/' + id
    })
})