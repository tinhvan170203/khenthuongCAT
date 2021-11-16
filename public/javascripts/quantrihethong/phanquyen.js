$(document).ready(function() {
    var allRole = JSON.parse($('#variableJSON').text());
    $('#variableJSON').remove();

    var checkboxAll = $('input[name="checkTotal"]');
    var checkboxFullItem = $('.phanquyen-action-item>input[name="checkFullItem"]')
    var checkboxItemRole = $('.item-role');

    checkboxAll.change(function() { //chọn tất cả quyền thì checkFullItem và checkboxRolr sẽ check theo giá trị này
        let isCheckboxAll = $(this).prop('checked');
        checkboxFullItem.prop('checked', isCheckboxAll);
        checkboxItemRole.prop('checked', isCheckboxAll);
    });


    checkboxFullItem.change(function() { //checkFullItem thay đổi 
        let isCheckAll = checkboxFullItem.length === $('.phanquyen-action-item>input[name="checkFullItem"]:checked').length;
        checkboxAll.prop('checked', isCheckAll); // kiểm tra checTotal

        //các checkbox con bên trong nó từng item-role bên trong checkFullItem
        let isCheckItem = $(this).prop('checked')
        let checkboxItem = $(this).closest('li').find('.item-role');
        checkboxItem.prop('checked', isCheckItem);
    });

    checkboxItemRole.change(function() { //thay đổi check của item-role
        let ulNode = $(this).closest('ul');
        let isCheckItemAll = ulNode.find('.item-role').length === ulNode.find('.item-role:checked').length
        let checkFullItem = ulNode.closest('li').find('input[name="checkFullItem"]');
        checkFullItem.prop('checked', isCheckItemAll) //thay đổi checkbox của checkFullItem
        let isCheckAll = checkboxFullItem.length === $('.phanquyen-action-item>input[name="checkFullItem"]:checked').length;
        checkboxAll.prop('checked', isCheckAll); //thay đổi checkTotal
    })

    $('#cuocthiForm').on('submit', function(e) {
        e.preventDefault();
        let tennhomquyen = $('#tennhomquyen').val();
        let mota = $('#mota').val();
        let quyenList = [];
        $('.item-role:checked').each(function() {
            quyenList.push($(this).val())
        });
        $.ajax({
            url: '/quantrihethong/nhomquyen/add',
            method: 'POST',
            data: {
                tennhomquyen,
                mota,
                quyenList: JSON.stringify(quyenList),
            },
            errror: function() {
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
                $('#cuocthiForm')[0].reset()
                table.ajax.reload(null, false);
                let toast = $('#add-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: true
                })
                bsToast.show(); //show toast
            }
        })
    });
    const tableNhomquyen = () => {
        table = $('#tableGiaithethao').DataTable({
            ajax: {
                url: '/quantrihethong/nhomquyen/tableNhomquyen',
                dataSrc: ''
            },
            "lengthMenu": [5],
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
                        return `<p class="tennhomquyen" id="${data._id}">${data.tennhomquyen}</p>`
                    },
                    "width": "35%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<p  class="mota">${data.mota}</p>`
                    },
                    "width": "60%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('sua-phan-quyen') !== -1) {
                            dataRender += `<i class="fas fa-edit editCuocthi" data-bs-toggle="modal" data-bs-target="#modalEditCuocthi" data-bs-backdrop='static'  title="Sửa"> </i>`
                        }
                        return dataRender
                    },
                    "width": "1%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('xoa-phan-quyen') !== -1) {
                            dataRender += `<i class="fas fa-trash deleteCuocthi"   title="Xóa"> </i>`
                        }
                        return dataRender
                    },
                    "width": "1%"
                }
            ]
        });
        table.on('order.dt search.dt', function() {
            table.column(0).nodes().each(function(cell, i) {
                cell.innerHTML = `<p style="text-align:center">${i+1}</p>`
            });
        }).draw();
    };
    tableNhomquyen()

    //Chỉnh sửa phân quyền

    var checkboxAll_Edit = $('input[name="checkTotal_Edit"]');
    var checkboxFullItem_Edit = $('.phanquyen-action-item>input[name="checkFullItem_Edit"]')
    var checkboxItemRole_Edit = $('.item-role_Edit');

    checkboxAll_Edit.change(function() { //chọn tất cả quyền thì checkFullItem và checkboxRolr sẽ check theo giá trị này
        let isCheckboxAll = $(this).prop('checked');
        checkboxFullItem_Edit.prop('checked', isCheckboxAll);
        checkboxItemRole_Edit.prop('checked', isCheckboxAll);
    });


    checkboxFullItem_Edit.change(function() { //checkFullItem thay đổi 
        let isCheckAll = checkboxFullItem_Edit.length === $('.phanquyen-action-item>input[name="checkFullItem_Edit"]:checked').length;
        checkboxAll_Edit.prop('checked', isCheckAll); // kiểm tra checTotal

        //các checkbox con bên trong nó từng item-role bên trong checkFullItem
        let isCheckItem = $(this).prop('checked')
        let checkboxItem = $(this).closest('li').find('.item-role_Edit');
        checkboxItem.prop('checked', isCheckItem);
    });

    checkboxItemRole_Edit.change(function() { //thay đổi check của item-role
        let ulNode = $(this).closest('ul');
        let isCheckItemAll = ulNode.find('.item-role_Edit').length === ulNode.find('.item-role_Edit:checked').length
        let checkFullItem = ulNode.closest('li').find('input[name="checkFullItem_Edit"]');
        checkFullItem.prop('checked', isCheckItemAll) //thay đổi checkbox của checkFullItem
        let isCheckAll = checkboxFullItem_Edit.length === $('.phanquyen-action-item>input[name="checkFullItem_Edit"]:checked').length;
        checkboxAll_Edit.prop('checked', isCheckAll); //thay đổi checkTotal
    });


    let idEdit;
    $(document).on('click', '.editCuocthi', function() {
        let row = $(this).closest('tr');
        idEdit = row.find('.tennhomquyen').attr('id');
        $.ajax({
            url: `/quantrihethong/nhomquyen/edit/${idEdit}`,
            method: 'GET',
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
                $('#tennhomquyen_Edit').val(data.tennhomquyen);
                $('#mota_Edit').val(data.mota);
                data.quyenList.forEach(i => {
                    $(`input[name="${i}-edit"]`).prop("checked", true);
                    let ulNode = $(`input[name="${i}-edit"]`).closest('ul');
                    let isCheckItemAll = ulNode.find('.item-role_Edit').length === ulNode.find('.item-role_Edit:checked').length
                    let checkFullItem = ulNode.closest('li').find('input[name="checkFullItem_Edit"]');
                    checkFullItem.prop('checked', isCheckItemAll) //thay đổi checkbox của checkFullItem
                    let isCheckAll = checkboxFullItem_Edit.length === $('.phanquyen-action-item>input[name="checkFullItem_Edit"]:checked').length;
                    checkboxAll_Edit.prop('checked', isCheckAll); //thay đổi checkTotal
                })
            }
        })
        $(document).on('click', '#modalEditCuocthi', function() {
            if ($(this).attr('class') == "modal fade") {
                $('#EditCuocthiForm')[0].reset()
            }
        })
    });

    $('#EditCuocthiForm').on('submit', function(e) {
        e.preventDefault();
        let tennhomquyen = $('#tennhomquyen_Edit').val();
        let mota = $('#mota_Edit').val();
        let quyenList = [];
        $('.item-role_Edit:checked').each(function() {
            quyenList.push($(this).val())
        });
        $.ajax({
            url: '/quantrihethong/nhomquyen/edit/' + idEdit,
            method: 'POST',
            data: {
                tennhomquyen,
                mota,
                quyenList: JSON.stringify(quyenList),
            },
            errror: function() {
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
                $('.btn-close').click()
                $('#EditCuocthiForm')[0].reset()
                table.ajax.reload(null, false);
                let toast = $('#edit-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: true
                })
                bsToast.show(); //show toast
            }
        })
    });


    let idDelete;
    $(document).on('click', '.deleteCuocthi', function() {
        let row = $(this).closest('tr');
        let quyen = row.find('.tennhomquyen').text()
        idDelete = row.find('.tennhomquyen').attr('id');
        let isDelete = confirm('Bạn có muốn xóa quyền ' + quyen + ' khỏi danh sách nhóm quyền?')
        if (isDelete) {
            $.ajax({
                url: `/quantrihethong/nhomquyen/delete/${idDelete}`,
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
                    bsToast.show(); //show toast
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