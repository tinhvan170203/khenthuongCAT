$(document).ready(function() {
    const tableTheluc = (data) => {
        table = $('#tableGiaithethao').DataTable({
            data: data,
            "lengthMenu": [10],
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
                        return `<p style="text-align:center" class="donviduockiemtra" id="${data._id}">${data.donviduockiemtra.kyhieu}</p>`
                    },
                    "width": "20%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p id="${data.donviduockiemtra._id}" class="ghichu">${data.ghichu}</p>`
                    },
                    "width": "60%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<p  style="text-align:center"><a class="download"  href="/congtacdieulenh/quantri/kiemtra/dieulenhquansu/download/${data.tep}"><i style="font-size:20px" class="fas fa-file-word"></i></a></p>`
                    },
                    "width": "15%"
                }
            ]
        })
        table.on('order.dt search.dt', function() {
            table.column(0).nodes().each(function(cell, i) {
                cell.innerHTML = `<p style="text-align:center">${i+1}</p>`
            });
        }).draw();
    };

    $('#btn-search-time').click(function() {
        let nam = $('#nam').val();
        $.ajax({
            url: `/conganhungyen/thiduakhenthuong/congtacdieulenh/ketquakiemtratheluc/${nam}`,
            success: function(data) {
                tableTheluc(data)
            }
        })
    });
    $('#btn-search-time').click();


    const tableTieubieu = (data) => {
        tableInitTieubieu = $('#tableCanhanTieubieu').DataTable({
            data: data,
            "lengthMenu": [10],
            "bSort": false,
            "bAutoWidth": false,
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                // "sInfoFiltered": "",
                "sInfo": "Tổng cộng  _TOTAL_ cá nhân",
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
                    return `<span class="hoten" id=${data._id}>${data.hoten}<a href="/conganhungyen/thiduakhenthuong/trangcanhan/${data._id}" title="Đi tới trang cá nhân" target="_blank"
                    style="display: inline-block;float: right;"><i class="far fa-id-badge link"></i></a></span>`
                },
                "width": "20%"
            }, {
                "mData": function(data, type, dataToSet) {
                    return `<img class="anhdaidien" style="width: 150px;display:block;
                   margin: 0 auto" src="${data.img}">`
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
                "width": "20%"
            }]
        });
        tableInitTieubieu.on('order.dt search.dt', function() {
            tableInitTieubieu.column(0).nodes().each(function(cell, i) {
                cell.innerHTML = `<p style="text-align:center">${i+1}</p>`
            });
        }).draw();
    };
    $('#btn-search-time-ki-luat').click(function() {
        $('#filter-nam').html('');
        let nam = $('#nam-thiduathang').val()
        $('#filter-nam').append(`
           ${nam}
       `);
        $.ajax({
            url: '/conganhungyen/thiduakhenthuong/congtacdieulenh/theluc/khongdat/' + nam,
            success: function(data) {
                tableTieubieu(data)
            }
        })
    });
    $('#btn-search-time-ki-luat').click()
})