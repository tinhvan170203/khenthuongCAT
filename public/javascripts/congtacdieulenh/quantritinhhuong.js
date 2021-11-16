$(document).ready(function() {
    var allRole = JSON.parse($('#variableJSON').text());
    $('#variableJSON').remove();

    $('#cuocthiForm').on('submit', function(e) {
        e.preventDefault();
        let ten = $('#ten').val().trim(); // submit sẽ lấy tất cả giá trị qua thuộc tính name của thẻ
        $.ajax({
            url: '/congtacdieulenh/quantri/tinhhuong/add',
            method: 'POST',
            data: { ten },
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
    const tableTinhhuong = () => {
        table = $('#tableGiaithethao').DataTable({
            ajax: {
                url: '/congtacdieulenh/quantri/tinhhuong/list',
                dataSrc: ''
            },
            "lengthMenu": [15],
            select: true,
            "bSort": false,
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                "sInfoFiltered": "",
                "sInfo": "Tổng cộng  _TOTAL_ tình huống",
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
                        return `<p  class="ten" id=${data._id}>${data.ten}</p>`
                    },
                    "width": "93%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('sua-tinh-huong-gia-dinh') !== -1) {
                            dataRender += `<i class="fas fa-edit editCuocthi" data-bs-toggle="modal" data-bs-target="#modalEditCuocthi" data-bs-backdrop='static' title="Sửa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "1%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('xoa-tinh-huong-gia-dinh') !== -1) {
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
    tableTinhhuong();


    let idCuocthiEdit;
    $(document).on('click', '.editCuocthi', function() {
        let row = $(this).closest('tr');
        idCuocthiEdit = row.find('.ten').attr('id');
        $('#ten_Edit').val(row.find('.ten').text());
    });

    $('#EditCuocthiForm').on('submit', function(e) {
        e.preventDefault();
        let ten = $('#ten_Edit').val().trim();
        $.ajax({
            url: '/congtacdieulenh/quantri/tinhhuong/edit/' + idCuocthiEdit,
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
        idCuocthiDelete = row.find('.ten').attr('id');
        let isDelete = confirm('Bạn có đồng ý xóa?')
        if (isDelete) {
            $.ajax({
                url: '/congtacdieulenh/quantri/tinhhuong/delete/' + idCuocthiDelete,
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
      $('#donvi').change(function() {
                $('#redirect').removeAttr('disabled');
            });
            $('#redirect').click(function(e) {
                e.preventDefault();
                let id = $('#donvi').val();
                window.location.href = '/admin/quantriphong/chitiet/' + id
            })
})