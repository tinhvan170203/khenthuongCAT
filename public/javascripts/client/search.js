$(document).ready(function() {
    $('.search').click(function(e) {
        e.preventDefault();
        $('.search-canbo').toggleClass('search-canbo-show')
    })
    $('.close-search').click(function() {
        $('.search-canbo').toggleClass('search-canbo-show')
    })
    const tableTieubieu = () => {
        let hoten = $('#search-input').val();
        if (hoten === '') {
            hoten = ' '
        };
        let capbac = $('#search-capbac').val();
        let donvi = $('#search-donvi').val();
        tableInitTieubieu = $('#tableTieubieu').DataTable({
            ajax: {
                url: `/conganhungyen/thiduakhenthuong/tracuu/canbo/${capbac}/${donvi}/${hoten}`,
                dataSrc: ''
            },
            "lengthMenu": [10],
            "bSort": false,
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                // "sInfoFiltered": "",
                "sInfo": "Tổng cộng  _TOTAL_ kết quả",
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
                        return `<p style="text-align:left">${data.hoten}</p>`
                    },
                    "width": "20%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center"class="capbac">${data.capbac}</p>`
                    },
                    "width": "10%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center" class="chucvu">${data.chucvu}</p>`
                    },
                    "width": "30%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center" class="donvicongtac">${data.room.kyhieu}</p>`
                    },
                    "width": "20%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<button class="btn-view"><a href="/pm/thiduakhenthuong/trangcanhan/${data._id}" title="Đi tới trang cá nhân" target="_blank"
                    style="display: inline-block;float: right;"><i class="fas fa-eye"></i> Xem </a></button>`
                    },
                    "width": "10%"
                }
            ]
        });
        tableInitTieubieu.on('order.dt search.dt', function() {
            tableInitTieubieu.column(0).nodes().each(function(cell, i) {
                cell.innerHTML = `<p style="text-align:center">${i+1}</p>`
            });
        }).draw();
    };
    const tableTieubieu1 = () => {
        let hoten = $('#search-input1').val();
        if (hoten === '') {
            hoten = ' '
        };
        let capbac = $('#search-capbac1').val();
        let donvi = $('#search-donvi1').val();
        tableInitTieubieu1 = $('#tableTieubieu').DataTable({
            ajax: {
                url: `/conganhungyen/thiduakhenthuong/tracuu/canbo/${capbac}/${donvi}/${hoten}`,
                dataSrc: ''
            },
            "lengthMenu": [10],
            "bSort": false,
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                // "sInfoFiltered": "",
                "sInfo": "Tổng cộng  _TOTAL_ kết quả",
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
                        return `<p style="text-align:left"class="capbac">${data.hoten}</p>`
                    },
                    "width": "25%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center"class="capbac">${data.capbac}</p>`
                    },
                    "width": "10%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center" class="chucvu">${data.chucvu}</p>`
                    },
                    "width": "40%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center" class="donvicongtac">${data.room.kyhieu}</p>`
                    },
                    "width": "30%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<button class="btn-view"><a href="/pm/thiduakhenthuong/trangcanhan/${data._id}" title="Đi tới trang cá nhân" target="_blank"
                style="display:block;float: right;"><i class="fas fa-eye"></i> Xem </a></button>`
                    },
                    "width": "10%"
                }
            ]
        });
        tableInitTieubieu1.on('order.dt search.dt', function() {
            tableInitTieubieu1.column(0).nodes().each(function(cell, i) {
                cell.innerHTML = `<p style="text-align:center">${i+1}</p>`
            });
        }).draw();
    };
    $('#form-search').on('submit', function(e) {
        $('#result-search').html('')
        e.preventDefault();
        // $('.loading ').css('visibility', 'visible');
        // $('.loading ').css('opacity', '1');
        tableTieubieu();
        // setTimeout(() => {
        //     $('.loading ').css('visibility', 'hidden');
        //     $('.loading ').css('opacity', '0');
        // }, 2000)
        $('.search-canbo').toggleClass('search-canbo-show')
        $("#modalSearch").modal("toggle")
    })
    $('#form-search1').on('submit', function(e) {
        e.preventDefault();
        $('.loading ').css('visibility', 'visible');
        $('.loading ').css('opacity', '1');
        tableTieubieu1();
        setTimeout(() => {
            $('.loading ').css('visibility', 'hidden');
            $('.loading ').css('opacity', '0');
        }, 4000)
        $('.search-canbo').toggleClass('search-canbo-show')
        $("#modalSearch").modal("toggle")
    })
})