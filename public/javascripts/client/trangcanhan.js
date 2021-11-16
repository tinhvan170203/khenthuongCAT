const id = $('.tenphong').attr('id'); //id ddooij
$(document).ready(function() {
    $('#khenthuong-phong').DataTable({
        bAutoWidth: false,
        aoColumns: [
            { "sWidth": "5%" },
            { "sWidth": "15%" },
            { "sWidth": "11%" },
            { "sWidth": "12%" },
            { "sWidth": "40%" },
            { "sWidth": "15%" }
        ],
        "destroy": true,
        "lengthMenu": [10],
        "ordering": false,
        "language": {
            "sInfoEmpty": "",
            "sEmptyTable": "Không có dữ liệu trong mục này",
            "sLengthMenu": "",
            "sInfoFilter": "",
            "sInfo": "Tìm thấy  _TOTAL_ kết quả "
        }
    });
    $('#kiluatcanhan').DataTable({
        bAutoWidth: false,
        aoColumns: [
            { "sWidth": "5%" },
            { "sWidth": "15%" },
            { "sWidth": "11%" },
            { "sWidth": "15%" },
            { "sWidth": "40%" }
        ],
        "destroy": true,
        "lengthMenu": [10],
        "ordering": false,
        "language": {
            "sInfoEmpty": "",
            "sEmptyTable": "Không có dữ liệu trong mục này",
            "sLengthMenu": "",
            "sInfoFilter": "",
            "sInfo": "Tìm thấy  _TOTAL_ kết quả "
        }
    });
    $('#thiduanam').DataTable({
        bAutoWidth: false,
        aoColumns: [
            { "sWidth": "5%" },
            { "sWidth": "25%" },
            { "sWidth": "30%" },
            { "sWidth": "45%" }
        ],
        "destroy": true,
        "lengthMenu": [10],
        "ordering": false,
        "language": {
            "sInfoEmpty": "",
            "sEmptyTable": "Không có dữ liệu trong mục này",
            "sLengthMenu": "",
            "sInfoFilter": "",
            "sInfo": ""
        }
    });
    $('#thiduathang').DataTable({
        bAutoWidth: false,
        "destroy": true,
        "lengthMenu": [9],
        "ordering": false,
        "language": {
            "sInfoEmpty": "",
            "sEmptyTable": "Không có dữ liệu trong mục này",
            "sLengthMenu": "",
            "sInfoFilter": "",
            "sInfo": ""
        }
    });
    $('#xeploaidangvien').DataTable({
        bAutoWidth: false,
        aoColumns: [
            { "sWidth": "5%" },
            { "sWidth": "45%" },
            { "sWidth": "50%" }
        ],
        "destroy": true,
        "lengthMenu": [4],
        "ordering": false,
        "language": {
            "sInfoEmpty": "",
            "sEmptyTable": "Không có dữ liệu trong mục này",
            "sLengthMenu": "",
            "sInfoFilter": "",
            "sInfo": ""
        }
    });


})