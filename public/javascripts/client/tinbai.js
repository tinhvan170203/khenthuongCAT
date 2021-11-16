$(document).ready(function() {
    const chart = (title, data) => {
        let muctin = data.result.map(i => i.muctin);
        let sotinbai = data.result.map(i => i.sotinbai);
        Highcharts.chart('chart', {
            chart: {
                type: 'bar',
                // height: 600
            },
            title: {
                text: 'Biểu đồ thống kê số lượt tin bài, phóng sự đã đăng tải'
            },
            subtitle: {
                text: ` ${title}`
            },
            xAxis: {
                categories: muctin,
                title: {
                    text: 'Mục tin'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '',
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' lượt'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            legend: {
                enabled: false,
            },
            credits: {
                enabled: false
            },
            series: [{
                name: '',
                data: sotinbai
            }]
        });
    }
    const getTinbaiTable = (data) => {
        table = $('#tinbai-list').DataTable({
            data: data,
            "bSort": false,
            "aoColumns": [{
                    "mData": function(data, type, dataToSet) { //data là từng đối tượng trả về trong arr
                        return `<span class="tieude" id=${data._id}-${data.muctin.id_muctin}>${data.tieude}</span>`
                    },
                    "sWidth": "18%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<span>${data.muctin.muctin}</span>`
                    },
                    "sWidth": "0"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<span>${data.chuyenmuc.chuyenmuc}</span>`
                    },
                    "sWidth": "0"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="tacgia" id=${data._id}-${data.chuyenmuc.id_chuyenmuc}>${data.tacgia}</span>`
                    },
                    "sWidth": "15%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<span class="trichyeunoidung">${data.trichyeunoidung}</span>`
                    },
                    "sWidth": "25%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center" class="donviphoihop">${data.donviphoihop}</p>`
                    },
                    "sWidth": "16%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<p style="text-align:center" class="ngaydang">${data.ngaydang.split('-').reverse().join('-')}</p>`
                    },
                    "sWidth": "8%"
                }
            ],
            order: [ //Chức năng sắp xếp
                [2, 'asc'],
                [1, 'asc']
            ],
            rowGroup: {
                dataSrc: ["chuyenmuc.chuyenmuc", "muctin.muctin"]
            },
            columnDefs: [{ //targer cột 2,3 và ẩn đi
                targets: [1, 2],
                visible: false
            }],
            "lengthMenu": [20],
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                "sInfoFiltered": "",
                "sInfo": "Tổng cộng  _TOTAL_ tin bài",
                "sLengthMenu": "",
            },
            "destroy": true, // cho phép hủy bỏ table tạo table mới với cùng id table
        });
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
            url: `/conganhungyen/thiduakhenthuong/tinbai-phongsu/filterTinbai`,
            data: { min, max },
            success: function(data) {
                $('#tongcongtinbai').text(data.total);
                $('#phoihopbaocuatinh').text(data.phoihopbaocuatinh);
                $('#phoihopdoanthanhnien').text(data.phoihopdoanthanhnien);
                $('#phoihophoiphunu').text(data.phoihophoiphunu);
                $('#phoihopcahuyen').text(data.phoihopcahuyen);
                $('#phoihopvoibo').text(data.phoihopvoibo);
                $('#phoihopnganhngoai').text(data.phoihopnganhngoai);
                $('#khongphoihop').text(data.khongphoihop);
                let title = ` từ ${min} đến ${max}`
                chart(title, data);
                getTinbaiTable(data.allTinbai)
            }
        })
    });
    $('#btn-search-time').click()
})