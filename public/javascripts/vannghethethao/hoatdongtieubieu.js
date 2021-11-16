$(document).ready(function() {

    var allRole = JSON.parse($('#variableJSON').text());
    $('#variableJSON').remove();
    //add hoạt động nổi bật trong năm
    $('#cuocthiForm').on('submit', function(e) {
        e.preventDefault();
        let ten = $('#tengiai').val().trim();
        let trichyeu = $('#donvitochuc').val().trim();
        let nam = $('#nam').val()
        $.ajax({
            url: `/vannghethethao/quantri/hoatdongtieubieu/${nam}/add`,
            method: 'POST',
            data: { ten, trichyeu },
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
    const tableHoatdongTieubieu = () => {
        let nam = $('#nam').val();
        table = $('#tableGiaithethao').DataTable({
            ajax: {
                url: `/vannghethethao/quantri/hoatdongtieubieu/${nam}`,
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
                        return ``
                    },
                    "width": "2%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="tengiai" id=${data._id}>${data.ten}</span>`
                    },
                    "width": "50%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p  class="donvitochuc">${data.trichyeu}</p>`
                    },
                    "width": "44%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('sua-hoat-dong-tieu-bieu') !== -1) {
                            dataRender += `<i class="fas fa-edit editCuocthi" data-bs-toggle="modal" data-bs-target="#modalEditCuocthi" data-bs-backdrop='static' title="Sửa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "2%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('xoa-hoat-dong-tieu-bieu') !== -1) {
                            dataRender += `<i class="fas fa-trash deleteCuocthi"  title="Xóa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "2%"
                }
            ]
        })
        table.on('order.dt search.dt', function() {
            table.column(0).nodes().each(function(cell, i) {
                cell.innerHTML = `<p style="text-align:center">${i+1}</p>`
            });
        }).draw();
    };
    tableHoatdongTieubieu();
    $('#nam').change(function() {
        let nam = $(this).val()
        table.ajax.url(`/vannghethethao/quantri/hoatdongtieubieu/${nam}`).load();
    })

    let idCuocthiEdit;
    $(document).on('click', '.editCuocthi', function() {
        let row = $(this).closest('tr');
        idCuocthiEdit = row.find('.tengiai').attr('id');
        $('#tengiai_Edit').val(row.find('.tengiai').text().trim());
        $('#donvitochuc_Edit').val(row.find('.donvitochuc').text().trim());
    });
    $('#EditCuocthiForm').on('submit', function(e) {
        e.preventDefault();
        let nam = $('#nam').val()
        let ten = $('#tengiai_Edit').val().trim();
        let trichyeu = $('#donvitochuc_Edit').val().trim();
        $.ajax({
            url: `/vannghethethao/quantri/hoatdongtieubieu/${nam}/edit/${idCuocthiEdit}`,
            method: 'POST',
            data: { ten, trichyeu },
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
        let nam = $('#nam').val()
        idCuocthiDelete = row.find('.tengiai').attr('id');
        let isDelete = confirm('Bạn có đồng ý xóa?')
        if (isDelete) {
            $.ajax({
                url: `/vannghethethao/quantri/hoatdongtieubieu/${nam}/delete/${idCuocthiDelete}`,
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
})