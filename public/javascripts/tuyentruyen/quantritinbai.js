$(document).ready(function() {
    $('#yearCurrent1').html($("#yearCurrent").val())

    var allRole = JSON.parse($('#variableJSON').text());
    $('#variableJSON').remove();
    // Bắt sự kiện khi change chuyên mục 
    $('#chuyenmucList').change(function() {
        let id_chuyenmuc = $(this).val();
        $.ajax({
            url: '/tuyentruyen/' + id_chuyenmuc + '/fetchMuctinList',
            method: 'GET',
            success: function(muctinList) {
                $('#muctinList').html(`
                  <option selected disabled hidden value=''>--- Chọn mục tin cho tin bài ---</option>
                  `);
                muctinList.forEach(muctin => {
                    $('#muctinList').append(`
                            <option value=${muctin._id}>${muctin.muctin}</option>
                            `)
                })
            }
        })
    });
    // sự kiện chọn chuyên mục, mục tin khi update tin bai
    $('#chuyenmucListEdit').change(function() {
        let id_chuyenmuc = $(this).val();
        $.ajax({
            url: '/tuyentruyen/' + id_chuyenmuc + '/fetchMuctinList',
            method: 'GET',
            success: function(muctinList) {
                $('#muctinListEdit').html(`
                  <option value='' selected disabled hidden >--- Chọn mục tin cho tin bài ---</option>
                  `);
                muctinList.forEach(muctin => {
                    $('#muctinListEdit').append(`
                            <option value=${muctin._id}>${muctin.muctin}</option>
                            `)
                })
            }
        })
    });

    //Sự kiện khi thay đổi năm quản trị để lấy tin bài năm khác
    $('#yearCurrent').change(function() {
        $('#yearCurrent1').html($("#yearCurrent").val());
        year = parseInt(($("#yearCurrent").val()));
        getTinbaiTable(year)
    });

    // Add tin bài có 2 trường hợp thêm tin bài vào năm đang xem và xem tin bài không vào năm đang xem
    $('#tinbaiForm').on('submit', function(e) {
        e.preventDefault();
        let tieude = $('#tieude').val().trim();
        let tacgia = $('#tacgia').val().trim();
        let chuyenmucList = $('#chuyenmucList').val().trim();
        let muctinList = $('#muctinList').val().trim();
        let trichyeunoidung = $('#trichyeunoidung').val().trim();
        let donviphoihop = $('#donviphoihop').val().trim();
        let ngaydang = $('#ngaydang').val();
        $.ajax({
            url: '/tuyentruyen/quantri/' + chuyenmucList + '/' + muctinList + '/addTinbai',
            method: 'POST',
            data: { tieude, tacgia, donviphoihop, trichyeunoidung, ngaydang },
            error: function() {
                alert('Có lỗi xảy ra khi thêm chuyên mục mới...')
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
                $('#tinbaiForm')[0].reset();
                if (ngaydang.slice(0, 4) === $('#yearCurrent').val()) {
                    table.ajax.reload(null, false)
                };
                let toast = $('#add-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000
                })
                bsToast.show(); //show toast
            }
        })
    });
    // Fetch data table bảng tin bài , phóng sự, chuyên mục
    let yearCurrent = new Date().getFullYear(); // khai bao năm hiện tại 
    let table;
    const getTinbaiTable = (year) => {
        table = $('#tinbai-list').DataTable({
            ajax: {
                url: '/tuyentruyen/quantri/tinbai/' + year,
                dataSrc: ''
            },
            "bSort": false,
            "aoColumns": [{
                    "mData": function(data, type, dataToSet) { //data là từng đối tượng trả về trong arr
                        return `<span class="tieude" id=${data._id}-${data.muctin.id_muctin}>${data.tieude}</span>`
                    },
                    "sWidth": "18%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<span>${data.muctin.muctin}</span>`
                    },
                    "sWidth": "0"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<span>${data.chuyenmuc.chuyenmuc}</span>`
                    },
                    "sWidth": "0"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="tacgia" id=${data._id}-${data.chuyenmuc.id_chuyenmuc}>${data.tacgia}</span>`
                    },
                    "sWidth": "15%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="trichyeunoidung">${data.trichyeunoidung}</span>`
                    },
                    "sWidth": "25%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center" class="donviphoihop">${data.donviphoihop}</p>`
                    },
                    "sWidth": "15%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center" class="ngaydang">${data.ngaydang}</p>`
                    },
                    "sWidth": "10%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('sua-tin-bai') !== -1) {
                            dataRender += `<i class="fas fa-pen editTinbai" data-bs-toggle="modal" data-bs-target="#modalEditTinbai" data-bs-backdrop='static' title="Sửa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "2%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        let dataRender = '';
                        if (allRole.indexOf('xoa-tin-bai') !== -1) {
                            dataRender += `<i class="fas fa-trash deleteTinbai"  title="Xóa"> </i>`
                        };
                        return dataRender
                    },
                    "width": "2%"
                }
            ],
            order: [ //Chức năng sắp xếp
                [2, 'asc'],
                [1, 'asc']
            ],
            rowGroup: {
                dataSrc: ["chuyenmuc.chuyenmuc", "muctin.muctin"]
            },
            columnDefs: [{ //targer cột 2,3 và ẩn đi
                targets: [1, 2],
                visible: false
            }],
            scrollY: 350,
            "lengthMenu": [50],
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                "sInfoFiltered": "",
                "sInfo": "Tổng cộng  _TOTAL_ tin bài đã đăng",
                "sLengthMenu": "",
            },
            "destroy": true, // cho phép hủy bỏ table tạo table mới với cùng id table
        });
    };
    getTinbaiTable(yearCurrent)
        // Edit tên chuyên mục 
    let idTinbaiEdit; //khai báo id tin bài edit biến global
    let idOfMuctin;
    let idOfChuyenmuc;
    $(document).on('click', '.editTinbai', function() {
        let parentNode = $(this).closest('tr');
        let tieude = parentNode.find('.tieude').text().trim();
        let tacgia = parentNode.find('.tacgia').text().trim();
        let trichyeunoidung = parentNode.find('.trichyeunoidung').text().trim();
        let donviphoihop = parentNode.find('.donviphoihop').text().trim();
        let ngaydang = parentNode.find('.ngaydang').text().trim();
        idTinbaiEdit = parentNode.find('.tieude').attr('id').trim().slice(0, 24);
        idOfMuctin = parentNode.find('.tieude').attr('id').trim().slice(-24);
        idOfChuyenmuc = parentNode.find('.tacgia').attr('id').trim().slice(-24)
        $('#tieudeEdit').val(tieude);
        $('#tacgiaEdit').val(tacgia);
        $('#trichyeunoidungEdit').val(trichyeunoidung);
        $('#donviphoihopEdit').val(donviphoihop);
        $('#ngaydangEdit').val(ngaydang);
        $('#chuyenmucListEdit').val(idOfChuyenmuc);
        $.ajax({
            url: '/tuyentruyen/' + idOfChuyenmuc + '/fetchMuctinList',
            method: 'GET',
            success: function(muctinList) {
                $('#muctinListEdit').html('')
                muctinList.forEach(muctin => {
                    if (muctin._id == idOfMuctin) {
                        $('#muctinListEdit').append(`
                        <option selected value=${muctin._id}>${muctin.muctin}</option>
                        `)
                    } else {
                        $('#muctinListEdit').append(`
                                <option value=${muctin._id}>${muctin.muctin}</option>
                                `)
                    }
                })
            }
        });
    });

    //Submit Form Edit tin bài
    $('#EditTinbaiForm').on('submit', (e) => { //submit form
        e.preventDefault();
        let tieudeEdit = $('#tieudeEdit').val().trim();
        let tacgiaEdit = $('#tacgiaEdit').val().trim();
        let trichyeunoidungEdit = $('#trichyeunoidungEdit').val().trim();
        let ngaydangEdit = $('#ngaydangEdit').val().trim();
        let donviphoihopEdit = $('#donviphoihopEdit').val().trim();
        let NewIdOfChuyenmuc = $('#chuyenmucListEdit').val().trim();
        let NewIdOfMuctin = $('#muctinListEdit').val().trim();
        $.ajax({
            url: '/tuyentruyen/quantri/' + idOfChuyenmuc + '/' + idOfMuctin + '/editTinbai/' + idTinbaiEdit,
            method: 'POST',
            data: {
                tieudeEdit,
                tacgiaEdit,
                trichyeunoidungEdit,
                ngaydangEdit,
                donviphoihopEdit,
                NewIdOfMuctin,
                NewIdOfChuyenmuc
            },
            error: () => alert('Có lỗi xảy ra khi cập nhật tin bài...'),
            success: (data) => {
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
    //     End Edit tin bài

    // Delete tin bai
    let idTinbaiDelete; //khai báo biến global
    $(document).on('click', '.deleteTinbai', function() {
        let parentNode = $(this).closest('tr');
        idTinbaiDelete = parentNode.find('.tieude').attr('id').trim().slice(0, 24);
        idOfMuctin = parentNode.find('.tieude').attr('id').trim().slice(-24);
        idOfChuyenmuc = parentNode.find('.tacgia').attr('id').trim().slice(-24)
        let isDelete = confirm('Bạn có đồng ý xóa tin bài này?  Đồng ý xóa click "Ok", hủy bỏ click "Cancel"');
        if (isDelete) {
            $.ajax({
                url: '/tuyentruyen/quantri/' + idOfChuyenmuc + '/' + idOfMuctin + '/deleteTinbai/' + idTinbaiDelete,
                method: 'GET',
                error: () => {
                    alert('Có lỗi xảy ra khi xóa tin bài...')
                },
                success: (data) => {
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
});