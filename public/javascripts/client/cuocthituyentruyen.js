$(document).ready(function() {
    const getCuocthiList = (year) => {
        table = $('#ketquaTable').DataTable({
            ajax: {
                url: '/tuyentruyen/quantri/ketquathi/getCuocthiList/' + year,
                dataSrc: ''
            },
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
                        return `<p style="text-align:center" class="ngaytochuc">${data.ngaytochuc.split('-').reverse().join('-')}</p>`
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
                }
            ]
        });
        table.on('order.dt search.dt', function() {
            table.column(0).nodes().each(function(cell, i) {
                cell.innerHTML = `<p style="text-align:center">${i+1}</p>`
            });
        }).draw();
    };
    $('#btn-search-time').click(function() {
        let nam = $('#nam').val();
        getCuocthiList(nam)
    });
    $('#btn-search-time').click()
})