$(document).ready(function() {
    var allRole = JSON.parse($('#variableJSON').text());
    $('#variableJSON').remove();

    let actionList = [];
    var checkboxAll = $('input[name="checkTotal"]');
    var checkboxFullItem = $('.phanquyen-action-item>input[name="checkFullItem"]')
    var checkboxItemRole = $('.item-role');

    checkboxAll.change(function(e) { //chọn tất cả quyền thì checkFullItem và checkboxRolr sẽ check theo giá trị này
        let isCheckboxAll = $(this).prop('checked');
        checkboxFullItem.prop('checked', isCheckboxAll);
        checkboxItemRole.prop('checked', isCheckboxAll);
        $('.disable').prop('checked', true);
    });


    checkboxFullItem.change(function() { //checkFullItem thay đổi 
        let isCheckAll = checkboxFullItem.length === $('.phanquyen-action-item>input[name="checkFullItem"]:checked').length;
        checkboxAll.prop('checked', isCheckAll); // kiểm tra checTotal

        //các checkbox con bên trong nó từng item-role bên trong checkFullItem
        let isCheckItem = $(this).prop('checked')
        let checkboxItem = $(this).closest('li').find('.item-role');
        checkboxItem.prop('checked', isCheckItem);
        $('.disable').prop('checked', true);
    });

    checkboxItemRole.change(function() { //thay đổi check của item-role
        let ulNode = $(this).closest('ul');
        let isCheckItemAll = ulNode.find('.item-role').length === ulNode.find('.item-role:checked').length
        let checkFullItem = ulNode.closest('li').find('input[name="checkFullItem"]');
        checkFullItem.prop('checked', isCheckItemAll) //thay đổi checkbox của checkFullItem
        let isCheckAll = checkboxFullItem.length === $('.phanquyen-action-item>input[name="checkFullItem"]:checked').length;
        checkboxAll.prop('checked', isCheckAll); //thay đổi checkTotal
    })


    $('input[name="check-role-item"]').change(function(e) {
        let listRole = $(this).attr('class').split(',');
        let isChecked = e.target.checked;
        if (isChecked === true) {
            actionList = Array.from(new Set([...actionList, ...listRole])); //Gộp 2 mảng loại bỏ phần tử giống nhau  actionList.concat($(this).attr('class').split(',')); //array danh sách các quyền trong nhóm quyền
            actionList.forEach(i => {
                $(`input[name="${i}"]`).addClass('disable') // thêm class disable vào các quyền trong nhóm
                $(`input[name="${i}"]`).prop('checked', true);
                $(`input[name="${i}"]`).attr('disabled', true);
            })
        } else { // trường hợp bỏ chọn nhóm quyền
            $('input[type="checkbox"]:not(input[name="check-role-item"])').prop('checked', false)
            $('input[type="checkbox"]').attr('disabled', false);
            $('.disable').removeClass('disable')
            if ($('input[name="check-role-item"]:checked').length > 0) {
                actionList = Array.from(new Set($('input[name="check-role-item"]:checked').attr('class').split(',')));
                actionList.forEach(i => {
                    $(`input[name="${i}"]`).addClass('disable') //thêm class disable vào các quyền trong nhóm
                    $(`input[name="${i}"]`).prop('checked', true);
                    $(`input[name="${i}"]`).attr('disabled', true);
                })
            }
        }
    });

    $('#cuocthiForm').on('submit', function(e) {
        e.preventDefault();
        let tentaikhoan = $('#tennhomquyen').val();
        let matkhau = $('#mota').val();
        let trangthai = $('input[name="trangthai"]:checked').val();
        let chucnangrieng = [];
        let roles = [];
        $('input[name="check-role-item"]:checked').each(function() {
            roles.push($(this).val())
        });
        $('.item-role:not(.disable):checked').each(function() {
            chucnangrieng.push($(this).val())
        });
        $.ajax({
            url: `/quantrihethong/quantritaikhoan/taikhoan/add`,
            method: 'POST',
            data: { tentaikhoan, matkhau, trangthai, chucnangrieng: JSON.stringify(chucnangrieng), roles: JSON.stringify(roles) },
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
                if (data === "Tên tài khoản đã tồn tại") {
                    alert(data + '. Vui lòng thay đổi tên tài khoản.')
                } else {
                    $('#cuocthiForm')[0].reset();
                    table.ajax.reload(null, false)
                    let toast = $('#add-toast');
                    let bsToast = new bootstrap.Toast(toast, {
                        delay: 3000,
                        animation: true
                    })
                    bsToast.show(); //show toast
                }
            }
        })
    });

    const tableTaikhoan = () => {
        table = $('#tableGiaithethao').DataTable({
            ajax: {
                url: '/quantrihethong/quantritaikhoan/taikhoan/tableTaikhoan',
                dataSrc: ''
            },
            "lengthMenu": [10],
            select: true,
            "bSort": false,
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                "sInfoFiltered": "",
                "sInfo": "Tổng cộng  _TOTAL_ tài khoản",
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
                        return `<p  class="tentaikhoan" id=${data._id}>${data.tentaikhoan}</p>`
                    },
                    "width": "10%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = "";
                        data.roles.forEach(i => {
                            dataRender += `<span class="tennhomquyen" title="${i.quyenList}">${i.tennhomquyen}</span>, `
                        })
                        return dataRender;
                    },
                    "width": "15%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = "";
                        data.chucnangrieng.forEach(i => {
                            dataRender += `<button class="role-item">${i}</button>`
                        })
                        return dataRender;
                    },
                    "width": "25%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = data.trangthai === true ? '<button class="online1">Hoạt động</button>' : '<button class="offline1">Khóa tài khoản</button>';
                        return dataRender;
                    },
                    "width": "8%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('sua-nguoi-dung') !== -1) {
                            dataRender += `<i class="fas fa-edit editCuocthi" data-bs-toggle="modal" data-bs-target="#modalEditCuocthi" data-bs-backdrop='static' title="Sửa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "1%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('xoa-nguoi-dung') !== -1) {
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
    tableTaikhoan();

    //edit tài khoản
    let actionList_Edit = [];
    var checkboxAll_Edit = $('input[name="checkTotal_Edit"]');
    var checkboxFullItem_Edit = $('.phanquyen-action-item>input[name="checkFullItem_Edit"]')
    var checkboxItemRole_Edit = $('.item-role_Edit');

    checkboxAll_Edit.change(function(e) { //chọn tất cả quyền thì checkFullItem và checkboxRolr sẽ check theo giá trị này
        let isCheckboxAll = $(this).prop('checked');
        checkboxFullItem_Edit.prop('checked', isCheckboxAll);
        checkboxItemRole_Edit.prop('checked', isCheckboxAll);
        $('.disable').prop('checked', true);
    });


    checkboxFullItem_Edit.change(function() { //checkFullItem thay đổi 
        let isCheckAll = checkboxFullItem_Edit.length === $('.phanquyen-action-item>input[name="checkFullItem_Edit"]:checked').length;
        checkboxAll_Edit.prop('checked', isCheckAll); // kiểm tra checTotal

        //các checkbox con bên trong nó từng item-role bên trong checkFullItem
        let isCheckItem = $(this).prop('checked')
        let checkboxItem = $(this).closest('li').find('.item-role_Edit');
        checkboxItem.prop('checked', isCheckItem);
        $('.disable').prop('checked', true);
    });

    checkboxItemRole_Edit.change(function() { //thay đổi check của item-role
        let ulNode = $(this).closest('ul');
        let isCheckItemAll = ulNode.find('.item-role_Edit').length === ulNode.find('.item-role_Edit:checked').length
        let checkFullItem = ulNode.closest('li').find('input[name="checkFullItem_Edit"]');
        checkFullItem.prop('checked', isCheckItemAll) //thay đổi checkbox của checkFullItem
        let isCheckAll = checkboxFullItem_Edit.length === $('.phanquyen-action-item>input[name="checkFullItem_Edit"]:checked').length;
        checkboxAll_Edit.prop('checked', isCheckAll); //thay đổi checkTotal
    })


    $('input[name="check-role-item_Edit"]').change(function(e) {
        let listRole = $(this).attr('class').split(',');
        let isChecked = e.target.checked;
        if (isChecked === true) {
            actionList_Edit = Array.from(new Set([...actionList_Edit, ...listRole])); //Gộp 2 mảng loại bỏ phần tử giống nhau  actionList_Edit.concat($(this).attr('class').split(',')); //array danh sách các quyền trong nhóm quyền
            actionList_Edit.forEach(i => {
                $(`input[name="${i}-edit"]`).addClass('disable') // thêm class disable vào các quyền trong nhóm
                $(`input[name="${i}-edit"]`).prop('checked', true);
                $(`input[name="${i}-edit"]`).attr('disabled', true);
            })
        } else { // trường hợp bỏ chọn nhóm quyền
            $('input[type="checkbox"][disabled="disabled"]:not(input[name="check-role-item_Edit"])').prop('checked', false)
            $('input[type="checkbox"]').attr('disabled', false);
            $('.disable').removeClass('disable')
            if ($('input[name="check-role-item_Edit"]:checked').length > 0) {
                actionList_Edit = Array.from(new Set($('input[name="check-role-item_Edit"]:checked').attr('class').split(',')));
                actionList_Edit.forEach(i => {
                    $(`input[name="${i}-edit"]`).addClass('disable') //thêm class disable vào các quyền trong nhóm
                    $(`input[name="${i}-edit"]`).prop('checked', true);
                    $(`input[name="${i}-edit"]`).attr('disabled', true);
                })
            }
        }
    });

    let idEdit;
    $(document).on('click', '.editCuocthi', function() {
        let row = $(this).closest('tr');
        $('#tennhomquyen_Edit').val(row.find('.tentaikhoan').text());
        idEdit = row.find('.tentaikhoan').attr('id');
        $.ajax({
            url: `/quantrihethong/quantritaikhoan/taikhoan/edit/getdata/${idEdit}`,
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
                if (data.roles.length > 0) {
                    data.roles.forEach(i => {
                        $(`input[id="${i._id}-edit"]`).prop('checked', true);
                        i.quyenList.forEach(e => {
                            $(`input[name="${e}-edit"]`).addClass('disable') // thêm class disable vào các quyền trong nhóm
                            $(`input[name="${e}-edit"]`).prop('checked', true);
                            $(`input[name="${e}-edit"]`).attr('disabled', true);
                        })
                    });
                }
                data.chucnangrieng.forEach(i => {
                    $(`input[name="${i}-edit"]`).prop('checked', true);
                });
                if (data.trangthai === true) {
                    $(`input[name="trangthai_Edit"][value="true"]`).prop('checked', true)
                } else {
                    $(`input[name="trangthai_Edit"][value="false"]`).prop('checked', true)
                }
            }
        })

    })
    $(document).on('click', '#modalEditCuocthi', function() {
        if ($(this).attr('class') == "modal fade") {
            $('input[disabled="disabled"]').removeAttr('disabled');
            $('#EditCuocthiForm')[0].reset()
            $('.disable').removeClass('disable')
        }
    })

    $('#EditCuocthiForm').on('submit', function(e) {
        e.preventDefault()
        let trangthai = $('input[name="trangthai_Edit"]:checked').val();
        let chucnangrieng = [];
        let roles = [];
        $('input[name="check-role-item_Edit"]:checked').each(function() {
            roles.push($(this).val())
        });
        $('.item-role_Edit:not(.disable):checked').each(function() {
            chucnangrieng.push($(this).val())
        });
        $.ajax({
            url: `/quantrihethong/quantritaikhoan/taikhoan/edit/${idEdit}`,
            method: 'POST',
            data: { trangthai, chucnangrieng: JSON.stringify(chucnangrieng), roles: JSON.stringify(roles) },
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
                $('.btn-close').click()
                $('#EditCuocthiForm')[0].reset()
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

    let idDelete;
    $(document).on('click', '.deleteCuocthi', function() {
        let row = $(this).closest('tr');
        idDelete = row.find('.tentaikhoan').attr('id');
        let isDelete = confirm('Bạn có muốn xóa tài khoản này?')
        if (isDelete) {
            $.ajax({
                url: `/quantrihethong/quantritaikhoan/taikhoan/delete/${idDelete}`,
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