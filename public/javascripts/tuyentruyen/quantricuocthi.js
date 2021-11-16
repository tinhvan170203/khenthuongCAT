$(document).ready(function() {

    var allRole = JSON.parse($('#variableJSON').text());
    $('#variableJSON').remove();
    //Sự kiện khi thay đổi năm quản trị để lấy tin bài năm khác
    $('#yearCurrent').change(function() {
        year = parseInt(($("#yearCurrent").val()));
        getCuocthiList(year)
    });

    //add cuộc thi
    $('#cuocthiForm').on('submit', function(e) {
        e.preventDefault();
        let ten = $('#ten').val().trim();
        let captochuc = $('#captochuc').val().trim();
        let ngaytochuc = $('#ngaytochuc').val().trim();
        let ketqua = $('#ketqua').val().trim();
        let trichyeu = $('#trichyeu').val().trim();
        let diadiemtochuc = $('#diadiemtochuc').val().trim();
        $.ajax({
            url: '/tuyentruyen/quantri/ketquathi/add',
            method: 'POST',
            data: { ten, captochuc, ngaytochuc, ketqua, trichyeu, diadiemtochuc },
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
                if (ngaytochuc.slice(0, 4) === $('#yearCurrent').val()) {
                    table.ajax.reload(null, false)
                };
                let toast = $('#add-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: true
                })
                bsToast.show(); //show toast
            }
        })
    })
    const getCuocthiList = (year) => {
        table = $('#ketquaTable').DataTable({
            ajax: {
                url: '/tuyentruyen/quantri/ketquathi/getCuocthiList/' + year,
                dataSrc: ''
            },
            select: true,
            "bSort": false,
            "lengthMenu": [10],
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
                        return `<span class="ten" id=${data._id}>${data.ten}</span>`
                    },
                    // "width": "2%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center" class="diadiemtochuc">${data.diadiemtochuc}</p>`
                    },
                    "width": "12%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center" class="captochuc">${data.captochuc}</p>`
                    },
                    "width": "10%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center" class="ngaytochuc">${data.ngaytochuc}</p>`
                    },
                    "width": "10%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="ketqua">${data.ketqua}</span>`
                    },
                    "width": "20%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="trichyeu">${data.trichyeu}</span>`
                    },
                    "width": "20%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('sua-cuoc-thi-tuyen-truyen') !== -1) {
                            dataRender += `<i class="fas fa-edit editCuocthi" data-bs-toggle="modal" data-bs-target="#modalEditCuocthi" data-bs-backdrop='static' title="Sửa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "1%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('xoa-cuoc-thi-tuyen-truyen') !== -1) {
                            dataRender += `<i class="fas fa-trash deleteCuocthi"  title="Xóa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "1%"
                }
            ]
        })
    };
    getCuocthiList(2021);
    table.on('order.dt search.dt', function() {
        table.column(0).nodes().each(function(cell, i) {
            cell.innerHTML = `<p style="text-align:center">${i+1}</p>`
        });
    }).draw();
    let idCuocthiEdit;
    $(document).on('click', '.editCuocthi', function() {
        let row = $(this).closest('tr');
        idCuocthiEdit = row.find('.ten').attr('id');
        $('#tenEdit').val(row.find('.ten').text().trim());
        $('#captochucEdit').val(row.find('.captochuc').text().trim());
        $('#ngaytochucEdit').val(row.find('.ngaytochuc').text().trim());
        $('#diadiemtochucEdit').val(row.find('.diadiemtochuc').text().trim());
        $('#trichyeuEdit').val(row.find('.trichyeu').text().trim());
        $('#ketquaEdit').val(row.find('.ketqua').text().trim());
    });
    $('#EditCuocthiForm').on('submit', function(e) {
        e.preventDefault();
        let ten = $('#tenEdit').val().trim();
        let captochuc = $('#captochucEdit').val().trim();
        let ngaytochuc = $('#ngaytochucEdit').val().trim();
        let ketqua = $('#ketquaEdit').val().trim();
        let trichyeu = $('#trichyeuEdit').val().trim();
        let diadiemtochuc = $('#diadiemtochucEdit').val().trim();
        $.ajax({
            url: '/tuyentruyen/quantri/ketquathi/edit/' + idCuocthiEdit,
            method: 'POST',
            data: { ten, captochuc, ngaytochuc, ketqua, trichyeu, diadiemtochuc },
            error: function() {
                alert('Có lỗi xảy ra khi cập nhật kết quả cuộc thi...')
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
        let isDelete = confirm('Bạn có đồng ý xóa kết quả cuộc thi này?')
        if (isDelete) {
            $.ajax({
                url: '/tuyentruyen/quantri/ketquathi/delete/' + idCuocthiDelete,
                method: 'GET',
                error: function() {
                    alert('Có lỗi xảy ra khi xóa kết quả cuộc thi...')
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