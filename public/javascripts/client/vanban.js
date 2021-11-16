$(document).ready(function() {
    let table = $('#myTable').DataTable({
        ajax: {
            url: '/getVB',
            dataSrc: ''
        },
        "lengthMenu": [10],
        "language": {
            "sInfoEmpty": "",
            "sEmptyTable": "Không có dữ liệu trong mục này",
            "sInfoFiltered": "",
            "sInfo": "Tổng cộng  _TOTAL_ văn bản",
            "sLengthMenu": "",

        },
        "bSort": false,
        "aoColumns": [{
                "mData": function(data, type, dataToSet) {
                    return `<span class="soVB" id="${data._id}">${data.soVB}</span>`
                },
                "width": "15%"
            },
            {
                "mData": function(data, type, dataToSet) {
                    return `<span class="tenVB">${data.tenVB}</span>`
                },
                "width": "20%"
            },
            {
                "mData": function(data, type, dataToSet) {
                    return `<span class="loaiVB">${data.loaiVB}</span>`
                },
                "width": "15%"
            },
            {
                "mData": function(data, type, dataToSet) {
                    return `<p><span class="text-note">- Ký hiệu văn bản :</span><span class="kyhieuVB"> ${data.kyhieuVB}</span></p>
                                  <p><span class="text-note">- Trích yếu :</span><span class="trichyeuVB"> ${data.trichyeu}</span></p>
                                  <p><span class="text-note">- Người ký :</span><span class="nguoiky"> ${data.nguoiky}</span></p>
                                  <p><span class="text-note">- Cơ quan ban hành :</span><span class="coquanbanhanh"> ${data.coquanbanhanh}</span></p>
                                  <p><span class="text-note">- Ngày ban hành :</span><span class="ngaybanhanh"> ${data.ngaybanhanh}</span></p>
                                  <p><span class="text-note">- Tệp đính kèm :</span><span><a class="tep" href="/${data.tep}" target="_blank">Xem tệp đính kèm</a></span></p>
                                `
                }
            }
        ]
    });
})