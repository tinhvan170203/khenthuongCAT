$(document).ready(function() {
    const tableGiaiVannghe = (data) => {
        table = $('#tableGiaithethao').DataTable({
            data: data,
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
                        return `<td></td>`
                    },
                    "width": "1%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="tengiai" id=${data._id}>${data.tengiai}</span>`
                    },
                    "width": "15%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center" class="ngaytochuc">${data.ngaytochuc.split('-').reverse().join('-')}</p>`
                    },
                    "width": "8%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center" class="diadiemtochuc">${data.diadiemtochuc}</p>`
                    },
                    "width": "12%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center" class="donvitochuc">${data.donvitochuc}</p>`
                    },
                    "width": "10%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="ketqua">${data.ketqua}</span>`
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

    $('#time-from').change(function() {
        let min = $(this).val();
        $('#time-to').attr('min', min) // ngày đến min luôn phải lớn hơn giá trị ngày time-from
        $('#time-to').click()
    })
    $('#time-to').change(function() {
        let max = $(this).val();
        $('#time-from').attr('max', max) // ngày từ max luôn phải nhỏ hơn giá trị ngày time-to
    })
    $('#btn-search-time').click(function() {
        let min = $('#time-from').val();
        $('#time-to').attr('min', min)
        let max = $('#time-to').val();
        $.ajax({
            url: `/conganhungyen/thiduakhenthuong/giaivannghe`,
            data: { min, max },
            success: function(data) {
                tableGiaiVannghe(data)
            }
        })
    });
    $('#btn-search-time').click()
    const tableTieubieu = () => {
        let noidung = $('#filter-content').val();
        let nam = $('#filter-nam').val();
        tableInitTieubieu = $('#tableCanhanTieubieu').DataTable({
            ajax: {
                url: `/conganhungyen/thiduakhenthuong/vannghe/canhantieubieu/loaihinh/${noidung}/${nam}`,
                dataSrc: ''
            },
            "lengthMenu": [10],
            "bSort": false,
            "bAutoWidth": false,
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                // "sInfoFiltered": "",
                "sInfo": "Tổng cộng  _TOTAL_ cá nhân tiêu biểu",
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
    $('#filter').click(function() {
        $('#title-bang').html('')
        let loaihinh = $('#filter-content option:selected').text();
        let nam = $('#filter-nam').val();
        $('#title-bang').append(`
            ${loaihinh} năm ${nam} 
        `);
        tableTieubieu()
    });
    $('#filter').click();


    const tableHoatdongTieubieu = () => {
        let nam = $('#nam-vianninh').val();
        table3 = $('#tableHoatdongTieubieu').DataTable({
            ajax: {
                url: `/vannghethethao/quantri/hoatdongtieubieu/${nam}`,
                dataSrc: ''
            },
            "lengthMenu": [10],
            select: true,
            "bSort": false,
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                "sInfoFiltered": "",
                "sInfo": "Tổng cộng  _TOTAL_ hoạt động",
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
                    "width": "48%"
                }
            ]
        })
        table3.on('order.dt search.dt', function() {
            table3.column(0).nodes().each(function(cell, i) {
                cell.innerHTML = `<p style="text-align:center">${i+1}</p>`
            });
        }).draw();
    };
    $('#btn-search-time-tieubieu').click(function() {
        tableHoatdongTieubieu()
    });
    $('#btn-search-time-tieubieu').click()
})