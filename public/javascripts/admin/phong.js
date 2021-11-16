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
        // thêm mới phòng, huyện, thị, thành phố
    $('#phongForm').on('submit', function(e) {
        e.preventDefault();
        let ten = $('#ten').val().trim();
        let kyhieu = $('#kyhieu').val().trim();
        let khoi = $('#khoi').val().trim();
        $.ajax({
            url: '/admin/quantriphong/add',
            method: 'POST',
            data: { ten, kyhieu, khoi },
            error: function() {
                alert('Có lỗi xảy ra khi thêm mới...')
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
                $('#phongForm')[0].reset()
                table.ajax.reload(null, false)
                let toast = $('#add-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: true
                })
                bsToast.show(); //show toast
            }
        })
    });
    // Lấy dữ liệu tất cả các phòng, huyện..
    const getPhong = () => {
        table = $('#table').DataTable({
            ajax: {
                url: '/admin/quantriphong/getPhong',
                dataSrc: ''
            },
            "bSort": false,
            "lengthMenu": [10],
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                "sInfoFiltered": "",
                "sInfo": "Tổng cộng  _TOTAL_ phòng và tương đương cấp phòng trở lên",
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
                        return `<span class="kyhieu" id=${data._id}>${data.kyhieu}</span>`
                    },
                    "width": "20%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="ten">${data.ten}</span>`
                    },
                    "width": "60%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="khoi">${data.khoi}</span>`
                    },
                    "width": "20%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('sua-phong') !== -1) {
                            dataRender += `<i class="fas fa-pen editPhong" data-bs-toggle="modal" data-bs-target="#modalEditPhong" data-bs-backdrop='static' title="Sửa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "5%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('xoa-phong') !== -1) {
                            dataRender += `<i class="fas fa-trash deletePhong"  title="Xóa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "5%"
                }
            ]
        });
    };
    getPhong();
    table.on('order.dt search.dt', function() {
        table.column(0).nodes().each(function(cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();

    //edit tên phòng, huyện
    let idPhongEdit;
    $(document).on('click', '.editPhong', function() {
        let row = $(this).closest('tr');
        idPhongEdit = row.find('.kyhieu').attr('id');
        let ten = row.find('.ten').text();
        let kyhieu = row.find('.kyhieu').text();
        let khoi = row.find('.khoi').text();
        $('#tenEdit').val(ten);
        $('#kyhieuEdit').val(kyhieu);
        $('#khoiEdit').val(khoi);
    });

    $('#EditPhongForm').on('submit', function(e) {
        e.preventDefault();
        let ten = $('#tenEdit').val().trim();
        let kyhieu = $('#kyhieuEdit').val().trim();
        let khoi = $('#khoiEdit').val().trim();
        $.ajax({
            url: '/admin/quantriphong/edit/' + idPhongEdit,
            method: 'POST',
            data: { khoi, ten, kyhieu },
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
                $('#EditPhongForm')[0].reset()
                table.ajax.reload(null, false)
                let toast = $('#edit-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: true
                })
                bsToast.show(); //show toast
            }
        })
    })

    //delete phong
    let idPhongDelete;
    $(document).on('click', '.deletePhong', function() {
        idPhongDelete = $(this).closest('tr').find('.kyhieu').attr('id');
        let isDelete = confirm('Bạn có muốn xóa mục này?')
        if (isDelete) {
            $.ajax({
                url: '/admin/quantriphong/delete/' + idPhongDelete,
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
                    table.ajax.reload(null, false)
                    let toast = $('#delete-toast');
                    let bsToast = new bootstrap.Toast(toast, {
                        delay: 3000,
                        animation: true
                    })
                    bsToast.show(); //show toast
                }
            })
        }
    })
})