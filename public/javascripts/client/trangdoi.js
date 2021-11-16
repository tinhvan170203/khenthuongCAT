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
        "lengthMenu": [6],
        "ordering": false,
        "language": {
            "sInfoEmpty": "",
            "sEmptyTable": "Không có dữ liệu trong mục này",
            "sLengthMenu": "",
            "sInfoFilter": "",
            "sInfo": "Tìm thấy  _TOTAL_ kết quả "
        }
    });

    const filterThiduathang = () => {
        let nam = $('#nam').val();
        table = $('#thiduathang').DataTable({
            ajax: {
                url: `/conganhungyen/thiduakhenthuong/trangdoi/${id}/thiduathang/${nam}`,
                dataSrc: ''
            },
            "lengthMenu": [25],
            select: true,
            "bSort": false,
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                "sInfoFilter": "",
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
                        return `<span>${data.hoten}<a href="/conganhungyen/thiduakhenthuong/trangcanhan/${data._id}" title="Đi tới trang cá nhân" target="_blank"
                        style="display: inline-block;float: right;"><i class="far fa-id-badge link"></i></a></span>`
                    },
                    "width": "15%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center" >${data.capbac}</p>`
                    },
                    "width": "8%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center" >${data.chucvu}</p>`
                    },
                    "width": "20%"
                },
                {
                    "mData": function(data, type, dataToSet) { // chia trường hợp xanh đỏ vàng từng tháng
                        let dataRender = '';
                        if (data.thiduathang[0].thang1.flag === 'đỏ') {
                            dataRender += `<i title="${data.thiduathang[0].thang1.ghichu !== undefined ? data.thiduathang[0].thang1.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color:  #bb0505'></i>`
                        } else if (data.thiduathang[0].thang1.flag === 'xanh') {
                            dataRender += `<i title="${data.thiduathang[0].thang1.ghichu !== undefined ? data.thiduathang[0].thang1.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #0592c6'></i>`
                        } else if (data.thiduathang[0].thang1.flag === 'vàng') {
                            dataRender += `<i title="${data.thiduathang[0].thang1.ghichu !== undefined ? data.thiduathang[0].thang1.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #c4aa00'></i>`
                        } else {
                            dataRender += ''
                        }
                        return dataRender
                    },
                    "width": "1%"
                },
                {
                    "mData": function(data, type, dataToSet) { // chia trường hợp xanh đỏ vàng từng tháng
                        let dataRender = '';
                        if (data.thiduathang[0].thang2.flag === 'đỏ') {
                            dataRender += `<i title="${data.thiduathang[0].thang2.ghichu !== undefined ? data.thiduathang[0].thang2.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color:  #bb0505'></i>`
                        } else if (data.thiduathang[0].thang2.flag === 'xanh') {
                            dataRender += `<i title="${data.thiduathang[0].thang2.ghichu !== undefined ? data.thiduathang[0].thang2.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #0592c6'></i>`
                        } else if (data.thiduathang[0].thang2.flag === 'vàng') {
                            dataRender += `<i title="${data.thiduathang[0].thang2.ghichu !== undefined ? data.thiduathang[0].thang2.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #c4aa00'></i>`
                        } else {
                            dataRender += ''
                        }
                        return dataRender
                    },
                    "width": "1%"
                },
                {
                    "mData": function(data, type, dataToSet) { // chia trường hợp xanh đỏ vàng từng tháng
                        let dataRender = '';
                        if (data.thiduathang[0].thang3.flag === 'đỏ') {
                            dataRender += `<i title="${data.thiduathang[0].thang3.ghichu !== undefined ? data.thiduathang[0].thang3.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color:  #bb0505'></i>`
                        } else if (data.thiduathang[0].thang3.flag === 'xanh') {
                            dataRender += `<i title="${data.thiduathang[0].thang3.ghichu !== undefined ? data.thiduathang[0].thang3.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #0592c6'></i>`
                        } else if (data.thiduathang[0].thang3.flag === 'vàng') {
                            dataRender += `<i title="${data.thiduathang[0].thang3.ghichu !== undefined ? data.thiduathang[0].thang3.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #c4aa00'></i>`
                        } else {
                            dataRender += ''
                        }
                        return dataRender
                    },
                    "width": "1%"
                },
                {
                    "mData": function(data, type, dataToSet) { // chia trường hợp xanh đỏ vàng từng tháng
                        let dataRender = '';
                        if (data.thiduathang[0].thang4.flag === 'đỏ') {
                            dataRender += `<i title="${data.thiduathang[0].thang4.ghichu !== undefined ? data.thiduathang[0].thang4.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color:  #bb0505'></i>`
                        } else if (data.thiduathang[0].thang4.flag === 'xanh') {
                            dataRender += `<i title="${data.thiduathang[0].thang4.ghichu !== undefined ? data.thiduathang[0].thang4.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #0592c6'></i>`
                        } else if (data.thiduathang[0].thang4.flag === 'vàng') {
                            dataRender += `<i title="${data.thiduathang[0].thang4.ghichu !== undefined ? data.thiduathang[0].thang4.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #c4aa00'></i>`
                        } else {
                            dataRender += ''
                        }
                        return dataRender
                    },
                    "width": "1%"
                },
                {
                    "mData": function(data, type, dataToSet) { // chia trường hợp xanh đỏ vàng từng tháng
                        let dataRender = '';
                        if (data.thiduathang[0].thang5.flag === 'đỏ') {
                            dataRender += `<i title="${data.thiduathang[0].thang5.ghichu !== undefined ? data.thiduathang[0].thang5.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color:  #bb0505'></i>`
                        } else if (data.thiduathang[0].thang5.flag === 'xanh') {
                            dataRender += `<i title="${data.thiduathang[0].thang5.ghichu !== undefined ? data.thiduathang[0].thang5.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #0592c6'></i>`
                        } else if (data.thiduathang[0].thang5.flag === 'vàng') {
                            dataRender += `<i title="${data.thiduathang[0].thang5.ghichu !== undefined ? data.thiduathang[0].thang5.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #c4aa00'></i>`
                        } else {
                            dataRender += ''
                        }
                        return dataRender
                    },
                    "width": "1%"
                },
                {
                    "mData": function(data, type, dataToSet) { // chia trường hợp xanh đỏ vàng từng tháng
                        let dataRender = '';
                        if (data.thiduathang[0].thang6.flag === 'đỏ') {
                            dataRender += `<i title="${data.thiduathang[0].thang6.ghichu !== undefined ? data.thiduathang[0].thang6.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color:  #bb0505'></i>`
                        } else if (data.thiduathang[0].thang6.flag === 'xanh') {
                            dataRender += `<i title="${data.thiduathang[0].thang6.ghichu !== undefined ? data.thiduathang[0].thang6.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #0592c6'></i>`
                        } else if (data.thiduathang[0].thang6.flag === 'vàng') {
                            dataRender += `<i title="${data.thiduathang[0].thang6.ghichu !== undefined ? data.thiduathang[0].thang6.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #c4aa00'></i>`
                        } else {
                            dataRender += ''
                        }
                        return dataRender
                    },
                    "width": "1%"
                },
                {
                    "mData": function(data, type, dataToSet) { // chia trường hợp xanh đỏ vàng từng tháng
                        let dataRender = '';
                        if (data.thiduathang[0].thang7.flag === 'đỏ') {
                            dataRender += `<i title="${data.thiduathang[0].thang7.ghichu !== undefined ? data.thiduathang[0].thang7.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color:  #bb0505'></i>`
                        } else if (data.thiduathang[0].thang7.flag === 'xanh') {
                            dataRender += `<i title="${data.thiduathang[0].thang7.ghichu !== undefined ? data.thiduathang[0].thang7.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #0592c6'></i>`
                        } else if (data.thiduathang[0].thang7.flag === 'vàng') {
                            dataRender += `<i title="${data.thiduathang[0].thang7.ghichu !== undefined ? data.thiduathang[0].thang7.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #c4aa00'></i>`
                        } else {
                            dataRender += ''
                        }
                        return dataRender
                    },
                    "width": "1%"
                },
                {
                    "mData": function(data, type, dataToSet) { // chia trường hợp xanh đỏ vàng từng tháng
                        let dataRender = '';
                        if (data.thiduathang[0].thang8.flag === 'đỏ') {
                            dataRender += `<i title="${data.thiduathang[0].thang8.ghichu !== undefined ? data.thiduathang[0].thang8.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color:  #bb0505'></i>`
                        } else if (data.thiduathang[0].thang8.flag === 'xanh') {
                            dataRender += `<i title="${data.thiduathang[0].thang8.ghichu !== undefined ? data.thiduathang[0].thang8.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #0592c6'></i>`
                        } else if (data.thiduathang[0].thang8.flag === 'vàng') {
                            dataRender += `<i title="${data.thiduathang[0].thang8.ghichu !== undefined ? data.thiduathang[0].thang8.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #c4aa00'></i>`
                        } else {
                            dataRender += ''
                        }
                        return dataRender
                    },
                    "width": "1%"
                },
                {
                    "mData": function(data, type, dataToSet) { // chia trường hợp xanh đỏ vàng từng tháng
                        let dataRender = '';
                        if (data.thiduathang[0].thang9.flag === 'đỏ') {
                            dataRender += `<i title="${data.thiduathang[0].thang9.ghichu !== undefined ? data.thiduathang[0].thang9.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color:  #bb0505'></i>`
                        } else if (data.thiduathang[0].thang9.flag === 'xanh') {
                            dataRender += `<i title="${data.thiduathang[0].thang9.ghichu !== undefined ? data.thiduathang[0].thang9.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #0592c6'></i>`
                        } else if (data.thiduathang[0].thang9.flag === 'vàng') {
                            dataRender += `<i title="${data.thiduathang[0].thang9.ghichu !== undefined ? data.thiduathang[0].thang9.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #c4aa00'></i>`
                        } else {
                            dataRender += ''
                        }
                        return dataRender
                    },
                    "width": "1%"
                },
                {
                    "mData": function(data, type, dataToSet) { // chia trường hợp xanh đỏ vàng từng tháng
                        let dataRender = '';
                        if (data.thiduathang[0].thang10.flag === 'đỏ') {
                            dataRender += `<i title="${data.thiduathang[0].thang10.ghichu !== undefined ? data.thiduathang[0].thang10.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color:  #bb0505'></i>`
                        } else if (data.thiduathang[0].thang10.flag === 'xanh') {
                            dataRender += `<i title="${data.thiduathang[0].thang10.ghichu !== undefined ? data.thiduathang[0].thang10.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #0592c6'></i>`
                        } else if (data.thiduathang[0].thang10.flag === 'vàng') {
                            dataRender += `<i title="${data.thiduathang[0].thang10.ghichu !== undefined ? data.thiduathang[0].thang10.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #c4aa00'></i>`
                        } else {
                            dataRender += ''
                        }
                        return dataRender
                    },
                    "width": "1%"
                },
                {
                    "mData": function(data, type, dataToSet) { // chia trường hợp xanh đỏ vàng từng tháng
                        let dataRender = '';
                        if (data.thiduathang[0].thang11.flag === 'đỏ') {
                            dataRender += `<i title="${data.thiduathang[0].thang11.ghichu !== undefined ? data.thiduathang[0].thang11.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color:  #bb0505'></i>`
                        } else if (data.thiduathang[0].thang11.flag === 'xanh') {
                            dataRender += `<i title="${data.thiduathang[0].thang11.ghichu !== undefined ? data.thiduathang[0].thang11.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #0592c6'></i>`
                        } else if (data.thiduathang[0].thang11.flag === 'vàng') {
                            dataRender += `<i title="${data.thiduathang[0].thang11.ghichu !== undefined ? data.thiduathang[0].thang11.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #c4aa00'></i>`
                        } else {
                            dataRender += ''
                        }
                        return dataRender
                    },
                    "width": "1%"
                },
                {
                    "mData": function(data, type, dataToSet) { // chia trường hợp xanh đỏ vàng từng tháng
                        let dataRender = '';
                        if (data.thiduathang[0].thang12.flag === 'đỏ') {
                            dataRender += `<i title="${data.thiduathang[0].thang12.ghichu !== undefined ? data.thiduathang[0].thang12.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color:  #bb0505'></i>`
                        } else if (data.thiduathang[0].thang12.flag === 'xanh') {
                            dataRender += `<i title="${data.thiduathang[0].thang12.ghichu !== undefined ? data.thiduathang[0].thang12.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #0592c6'></i>`
                        } else if (data.thiduathang[0].thang12.flag === 'vàng') {
                            dataRender += `<i title="${data.thiduathang[0].thang21.ghichu !== undefined ? data.thiduathang[0].thang12.ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #c4aa00'></i>`
                        } else {
                            dataRender += ''
                        }
                        return dataRender
                    },
                    "width": "1%"
                }
            ]
        })
        table.on('order.dt search.dt', function() {
            table.column(0).nodes().each(function(cell, i) {
                cell.innerHTML = `<p style="text-align:center">${i+1}</p>`
            });
        }).draw();
    }

    filterThiduathang()
    $('#btn-search-thiduathang').click(function() {
        let nam = $('#nam').val();
        table.ajax.url(`/conganhungyen/thiduakhenthuong/trangdoi/${id}/thiduathang/${nam}`, false).load()
    })


    const filterThiduanam = () => {
        let nam = $('#nam-thiduanam-thongke').val();
        table1 = $('#thiduanam').DataTable({
            ajax: {
                url: `/conganhungyen/thiduakhenthuong/trangdoi/${id}/thiduanam/${nam}`,
                dataSrc: ''
            },
            "lengthMenu": [25],
            select: true,
            "bSort": false,
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                "sInfoFilter": "",
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
                        return `<span>${data.hoten}<a href="/conganhungyen/thiduakhenthuong/trangcanhan/${data._id}" title="Đi tới trang cá nhân" target="_blank"
                        style="display: inline-block;float: right;"><i class="far fa-id-badge link"></i></a></span>`
                    },
                    "width": "15%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center" >${data.capbac}</p>`
                    },
                    "width": "8%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center" >${data.chucvu}</p>`
                    },
                    "width": "24%"
                },
                {
                    "mData": function(data, type, dataToSet) { // chia trường hợp xanh đỏ vàng từng tháng
                        return `<p style = "text-align:center">${data.thiduanam[0].dangkithidua !== undefined ?  data.thiduanam[0].dangkithidua : ''}</p>`
                    },
                    "width": "13%"
                },
                {
                    "mData": function(data, type, dataToSet) { // chia trường hợp xanh đỏ vàng từng tháng
                        return `<p style = "text-align:center">${data.thiduanam[0].xeploai !== undefined ?  data.thiduanam[0].xeploai : ''}<p>`
                    },
                    "width": "13%"
                },
                {
                    "mData": function(data, type, dataToSet) { // chia trường hợp xanh đỏ vàng từng tháng
                        return `<p style = "text-align:center">${data.thiduanam[0].ghichu !== undefined ?  data.thiduanam[0].ghichu : ''}</p>`
                    },
                    "width": "20%"
                }
            ]
        })
        table1.on('order.dt search.dt', function() {
            table1.column(0).nodes().each(function(cell, i) {
                cell.innerHTML = `<p style="text-align:center">${i+1}</p>`
            });
        }).draw();
    }

    filterThiduanam()
    $('#btn-search-thiduanam').click(function() {
        let nam = $('#nam-thiduanam-thongke').val();
        table1.ajax.url(`/conganhungyen/thiduakhenthuong/trangdoi/${id}/thiduanam/${nam}`, false).load()
    })

    const filterDangvien = () => {
        let nam = $('#nam-dangvien-thongke').val();
        table2 = $('#dangvien').DataTable({
            ajax: {
                url: `/conganhungyen/thiduakhenthuong/trangdoi/${id}/dangvien/${nam}`,
                dataSrc: ''
            },
            "lengthMenu": [25],
            select: true,
            "bSort": false,
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                "sInfoFilter": "",
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
                        return `<span>${data.hoten}<a href="/conganhungyen/thiduakhenthuong/trangcanhan/${data._id}" title="Đi tới trang cá nhân" target="_blank"
                        style="display: inline-block;float: right;"><i class="far fa-id-badge link"></i></a></span>`
                    },
                    "width": "15%"
                }, {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center" >${data.capbac}</p>`
                    },
                    "width": "8%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center" >${data.chucvu}</p>`
                    },
                    "width": "24%"
                },
                {
                    "mData": function(data, type, dataToSet) { // chia trường hợp xanh đỏ vàng từng tháng
                        return `<p>${data.thiduanam[0].dangkixeploaidangvien !== undefined ?  data.thiduanam[0].dangkixeploaidangvien : ''}</p>`
                    },
                    "width": "20%"
                },
                {
                    "mData": function(data, type, dataToSet) { // chia trường hợp xanh đỏ vàng từng tháng
                        return `<p>${data.thiduanam[0].xeploaidangvien !== undefined ?  data.thiduanam[0].xeploaidangvien : ''}<p>`
                    },
                    "width": "20%"
                }
            ]
        })
        table2.on('order.dt search.dt', function() {
            table2.column(0).nodes().each(function(cell, i) {
                cell.innerHTML = `<p style="text-align:center">${i+1}</p>`
            });
        }).draw();
    }

    filterDangvien()
    $('#btn-search-dangvien').click(function() {
        let nam = $('#nam-dangvien-thongke').val();
        table2.ajax.url(`/conganhungyen/thiduakhenthuong/trangdoi/${id}/dangvien/${nam}`, false).load()
    })

    $('#time-from').change(function() {
        let min = $(this).val();
        $('#time-to').attr('min', min) // ngày đến min luôn phải lớn hơn giá trị ngày time-from
        $('#time-to').click()
    })
    $('#time-to').change(function() {
        let max = $(this).val();
        $('#time-from').attr('max', max) // ngày từ mãx luôn phải nhỏ hơn giá trị ngày time-to
    })
    $('#btn-search-time').click(function() {
        let min = $('#time-from').val();
        $('#time-to').attr('min', min)
        let max = $('#time-to').val();
        $.ajax({
            url: `/conganhungyen/thiduakhenthuong/trangdoi/${id}/khenthuong`,
            data: { min, max },
            success: function(data) {
                $('#khenthuong-list').html('')
                $('#result-kt-doi').text(data.soluotkhenthuongcapdoi)
                $('#result-kt-total').text(data.tongcongluotkhenthuong)
                $('#result-kt-canhan').text(data.soluotkhenthuongcanhan)
                $('#result-canhan-kt').text(data.tongsocanhanduockhenthuong.length)

                if (data.tongsocanhanduockhenthuong.length > 0) {
                    data.tongsocanhanduockhenthuong.forEach((item, index) => {
                        $('#khenthuong-list').append(`
                         <tr>
                             <td style="text-align: center">${index+1}</td>
                             <td>${item.ten}<a href="/conganhungyen/thiduakhenthuong/trangcanhan/${item._id}" title="Đi tới trang cá nhân" target="_blank"
                             style="display: inline-block;float: right;"><i class="far fa-id-badge link"></i></a></td>
                             <td><img src="${item.img}" class="anhdaidien"></td>
                             <td style="text-align: center">${item.capbac}</td>
                             <td style="text-align: center">${item.chucvu}</td>
                             <td  style="text-align: center; font-size: 14px;font-weight: bold">${item.soluotduockhenthuong}</td>
                         </tr>     
                         `)
                    })
                } else {
                    $('#khenthuong-list').append(`
                    <tr class="sub-head">
                    <th colspan="6" style="text-align: center">Không có dữ liệu trong bảng này</th>
               </tr>
                    `)
                }
            }
        })
    });
    $('#btn-search-time').click()


    $('#ki-luat-time-from').change(function() {
        let min = $(this).val();
        $('#ki-luat-time-to').attr('min', min) // ngày đến min luôn phải lớn hơn giá trị ngày time-from
        $('#ki-luat-time-to').click()
    });
    $('#ki-luat-time-to').change(function() {
        let max = $(this).val();
        $('#ki-luat-time-from').attr('max', max) // ngày từ mãx luôn phải nhỏ hơn giá trị ngày time-to-ki-luat
    });
    $('#btn-search-time-ki-luat').click(function() {
        let max = $('#ki-luat-time-to').val();
        let min = $('#ki-luat-time-from').val();
        $.ajax({
            url: `/conganhungyen/thiduakhenthuong/trangdoi/${id}/kiluat`,
            data: { min, max },
            success: function(data) {
                $('#kiluat-list').html('')
                $('#result-kl-total').text(data.tongcongluotkiluat)
                $('#result-canhan-kl').text(data.tongsocanhanbikiluat.length)

                if (data.tongsocanhanbikiluat.length > 0) {
                    data.tongsocanhanbikiluat.forEach((item, index) => {
                        $('#kiluat-list').append(`
                         <tr>
                             <td style="text-align: center">${index+1}</td>
                             <td>${item.ten}<a href="/conganhungyen/thiduakhenthuong/trangcanhan/${item._id}" title="Đi tới trang cá nhân" target="_blank"
                             style="display: inline-block;float: right;"><i class="far fa-id-badge link"></i></a></td>
                             <td><img src="${item.img}" class="anhdaidien"></td>
                             <td style="text-align: center">${item.capbac}</td>
                             <td style="text-align: center">${item.chucvu}</td>
                             <td  style="text-align: center; font-size: 14px;font-weight: bold">${item.soluotbikiluat}</td>
                         </tr>     
                         `)
                    })
                } else {
                    $('#kiluat-list').append(`
                    <tr class="sub-head">
                    <th colspan="6" style="text-align: center">Không có dữ liệu trong bảng này</th>
               </tr>
                    `)
                }
            }
        })
    });
    $('#btn-search-time-ki-luat').click()

})