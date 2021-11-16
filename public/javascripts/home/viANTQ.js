$(document).ready(function() {
    $('#btn-search-vianninh').click(function() {
        let nam = $('#nam-vianninh').val();
        $.ajax({
            url: `/conganhungyen/thiduakhenthuong/vianninhtoquoc/${nam}`,
            success: function(data) {
                tableVianninh(data);
                $('#anninhnam-text').html(`năm ${nam}`)
            }
        })
    });
    $('#btn-search-vianninh').click()


    // Phong trào vì an ninh 
    const tableVianninh = (data) => {
        table = $('#bang1').DataTable({
            data: data,
            "lengthMenu": [10],
            select: true,
            "bSort": false,
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                "sInfoFiltered": "",
                "sInfo": "",
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
                        return `<span class="tengiai" id=${data._id}>${data.donvi}</span>`
                    },
                    "width": "29%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p  class="ngaytochuc">${data.thiduanam.xeploai}</p>`
                    },
                    "width": "35%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<p class="diadiemtochuc">${data.thiduanam.ghichu}</p>`
                    },
                    "width": "35%"
                }
            ]
        })
        table.on('order.dt search.dt', function() {
            table.column(0).nodes().each(function(cell, i) {
                cell.innerHTML = `<p style="text-align:center">${i+1}</p>`
            });
        }).draw();
    };

})