$(document).ready(function() {
    const tableHoatdongTieubieu = () => {
        let nam = $('#nam').val();
        table = $('#tableGiaithethao').DataTable({
            ajax: {
                url: `/vannghethethao/quantri/hoatdongtieubieu/${nam}`,
                dataSrc: ''
            },
            "lengthMenu": [15],
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
        table.on('order.dt search.dt', function() {
            table.column(0).nodes().each(function(cell, i) {
                cell.innerHTML = `<p style="text-align:center">${i+1}</p>`
            });
        }).draw();
    };
    $('#btn-search-time').click(function() {
        tableHoatdongTieubieu()
    });
    $('#btn-search-time').click()
})