$(document).ready(function() {
    const tableKetquaKTDieulenh = (data) => {
        table = $('#tableGiaithethao').DataTable({
            data: data,
            "lengthMenu": [15],
            select: true,
            "bSort": false,
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                "sInfoFiltered": "",
                "sInfo": "Tổng cộng  _TOTAL_  kết quả",
                "sLengthMenu": "",

            },
            "destroy": true, // cho phép hủy bỏ table tạo table mới với cùng id table
            "aoColumns": [{
                    "mData": function(data, type, dataToSet) {
                        return `<td></td>`
                    },
                    "width": "0.5%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center"  class="thoigian" id=${data._id}>${data.thoigian}</p>`
                    },
                    "width": "15%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center" id="${data.donviduockiemtra._id}" class="donviduockiemtra">${data.donviduockiemtra.kyhieu}</p>`
                    },
                    "width": "15%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<p  class="ketqua">${data.ketqua}</p>`
                    },
                    "width": "30%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="xuli">${data.xuli}</span>`
                    },
                    "width": "40%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<p class="xuli" style="text-align:center"><a class="download"  href="/congtacdieulenh/kiemtra/download/${data.tep}"><i style="font-size:20px" class="fas fa-file-word"></i></a></p>`
                    },
                    "width": "0.5%"
                }
            ]
        })
        table.on('order.dt search.dt', function() {
            table.column(0).nodes().each(function(cell, i) {
                cell.innerHTML = `<p style="text-align:center">${i+1}</p>`
            });
        }).draw();
    };

    //Download file
    $(document).on('click', '.download', function(e) {
        e.preventDefault();
        let url = $(this).attr('href'); //lấy ra link download
        window.location.href = url //tiến hành download
    });

    $('#time-from').change(function() {
        let min = $(this).val();
        $('#time-to').attr('min', min) // ngày đến min luôn phải lớn hơn giá trị ngày time-from
    })
    $('#time-to').change(function() {
        let max = $(this).val();
        $('#time-from').attr('max', max) // ngày từ max luôn phải nhỏ hơn giá trị ngày time-to
    })
    $('#btn-search-time').click(function() {
        let min = $('#time-from').val();
        let max = $('#time-to').val();
        $.ajax({
            url: `/conganhungyen/thiduakhenthuong/congtacdieulenh/ketquakiemtradieulenh`,
            data: { min, max },
            success: function(data) {
                tableKetquaKTDieulenh(data)
            }
        })
    });
    $('#btn-search-time').click();

    const tableKetquaKTTH = (data) => {
        table1 = $('#tableGiaithethao1').DataTable({
            data: data,
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
                        return `<p class="tinhhuong" id="${data.tinhhuong._id}">${data.tinhhuong.ten}</p>`
                    },
                    "width": "15%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center" id="${data.donviduockiemtra._id}" class="donviduockiemtra">${data.donviduockiemtra.donvicaptren.kyhieu} - ${data.donviduockiemtra.ten}</p>`
                    },
                    "width": "15%"
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
                        return `<p class="xuli" style="text-align:center"><a class="download1"  href="/congtacdieulenh/kiemtra/tinhhuong/download/${data.tep}"><i style="font-size:20px" class="fas fa-file-word"></i></a></p>`
                    },
                    "width": "0.5%"
                }
            ]
        })
        table1.on('order.dt search.dt', function() {
            table1.column(0).nodes().each(function(cell, i) {
                cell.innerHTML = `<p style="text-align:center">${i+1}</p>`
            });
        }).draw();
    };
    $('#time-from-ki-luat').change(function() {
        let min = $(this).val();
        $('#time-to-ki-luat').attr('min', min) // ngày đến min luôn phải lớn hơn giá trị ngày time-from-ki-luat
    })
    $('#time-to-ki-luat').change(function() {
        let max = $(this).val();
        $('#time-from-ki-luat').attr('max', max) // ngày từ max luôn phải nhỏ hơn giá trị ngày time-to-ki-luat
    })
    $('#btn-search-time-ki-luat').click(function() {
        let min = $('#time-from-ki-luat').val();
        let max = $('#time-to-ki-luat').val();
        $.ajax({
            url: `/conganhungyen/thiduakhenthuong/congtacdieulenh/ketquakiemtratinhhuong`,
            data: { min, max },
            success: function(data) {
                tableKetquaKTTH(data)
            }
        })
    });
    $('#btn-search-time-ki-luat').click();
    $(document).on('click', '.download1', function(e) {
        e.preventDefault();
        let url = $(this).attr('href'); //lấy ra link download
        window.location.href = url //tiến hành download
    });
})