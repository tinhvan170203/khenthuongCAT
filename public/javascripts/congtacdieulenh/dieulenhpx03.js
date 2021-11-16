$(document).ready(function() {

    var allRole = JSON.parse($('#variableJSON').text());
    $('#variableJSON').remove();

    $('#cuocthiForm').on('submit', function(e) {
        e.preventDefault();
        let fd = new FormData(e.target); // submit sẽ lấy tất cả giá trị qua thuộc tính name của thẻ
        $.ajax({
            url: '/congtacdieulenh/quantri/kiemtra/dieulenhpx03/add',
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
    const tableKetquaKTDieulenh = () => {
        let nam = $('#nam').val()
        table = $('#tableGiaithethao').DataTable({
            ajax: {
                url: '/congtacdieulenh/quantri/kiemtra/dieulenhpx03/' + nam,
                dataSrc: ''
            },
            "lengthMenu": [15],
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
                        return `<td></td>`
                    },
                    "width": "1%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center"  class="thoigian" id=${data._id}>${data.thoigian}</p>`
                    },
                    "width": "10%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center" class="donviduockiemtra">${data.donviduockiemtra}</p>`
                    },
                    "width": "10%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<p  class="ketqua">${data.ketqua}</p>`
                    },
                    "width": "15%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="xuli">${data.xuli}</span>`
                    },
                    "width": "15%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<p class="xuli" style="text-align:center"><a class="download"  href="/congtacdieulenh/kiemtra/download/${data.tep}"><i style="font-size:20px" class="fas fa-file-word"></i></a></p>`
                    },
                    "width": "0.5%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('sua-ket-qua-kiem-tra-px03') !== -1) {
                            dataRender += `<i class="fas fa-edit editCuocthi" data-bs-toggle="modal" data-bs-target="#modalEditCuocthi" data-bs-backdrop='static' title="Sửa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "1%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('xoa-ket-qua-kiem-tra-px03') !== -1) {
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
    tableKetquaKTDieulenh();

    //Download file
    $(document).on('click', '.download', function(e) {
        e.preventDefault();
        let url = $(this).attr('href'); //lấy ra link download
        window.location.href = url //tiến hành download
    });

    $('#nam').change(function() {
        let nam = $(this).val();
        table.ajax.url(`/congtacdieulenh/quantri/kiemtra/dieulenhpx03/${nam}`).load()
    });


    let idCuocthiEdit;
    $(document).on('click', '.editCuocthi', function() {
        let row = $(this).closest('tr');
        idCuocthiEdit = row.find('.thoigian').attr('id');
        $('#thoigian_Edit').val(row.find('.thoigian').text());
        $('#ketqua_Edit').val(row.find('.ketqua').text());
        $('#xuli_Edit').val(row.find('.xuli').text());
        $('#thanhphan_Edit').val(row.find('.thanhphan').text());
        $('#ketqua_Edit').val(row.find('.ketqua').text());
        let tep_path = `${row.find('.download').attr('href')}`;
        $('#tep_old').text(tep_path);
        $('#tep_old').attr('href', tep_path)
        $('#donviduockiemtra_Edit').val(row.find('.donviduockiemtra').text());
    });

    $('#EditCuocthiForm').on('submit', function(e) {
        e.preventDefault();
        let fd = new FormData(e.target);
        $.ajax({
            url: '/congtacdieulenh/quantri/kiemtra/dieulenhpx03/edit/' + idCuocthiEdit,
            method: 'POST',
            contentType: false,
            processData: false,
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
                $('#EditCuocthiForm')[0].reset()
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
        idCuocthiDelete = row.find('.thoigian').attr('id');
        let isDelete = confirm('Bạn có đồng ý xóa?')
        if (isDelete) {
            $.ajax({
                url: '/congtacdieulenh/quantri/kiemtra/dieulenhpx03/delete/' + idCuocthiDelete,
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