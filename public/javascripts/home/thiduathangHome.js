function thiduathang(data, year) {
    Highcharts.chart('thongke-thiduathang', {
        credits: {
            enabled: false
        },
        chart: {
            type: 'cylinder',
            options3d: {
                enabled: true,
                alpha: 0,
                beta: 10,
                depth: 50,
                viewDistance: 120
            },
            backgroundColor: '#ffffff',
            height: 350, //chiều cao,
            style: { "fontFamily": "Arial, Helvetica, sans-serif" },
        },
        subtitle: { //đề mục con
            text: 'Biểu đồ thống kê kết quả thi đua tháng trong năm ' + year,
        },
        title: {
            text: ''
        },
        legend: { //chú giải
            enabled: false
        },
        xAxis: { //trục X ngang
            categories: [
                'Tháng 1',
                'Tháng 2',
                'Tháng 3',
                'Tháng 4',
                'Tháng 5',
                'Tháng 6',
                'Tháng 7',
                'Tháng 8',
                'Tháng 9',
                'Tháng 10',
                'Tháng 11',
                'Tháng 12'
            ],
            crosshair: true, // các trục khi hover vào
            borderWidth: 15,
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: { // Chú thích với từng cột
            headerFormat: '<span style="font-size:12px;color: #333">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b style="margin-left: 2px;color: black"> {point.y:1f} lượt</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
            backgroundColor: "#ffffff",
            borderColor: "#ccc"
        },
        plotOptions: {
            series: {
                pointWidth: 18
            },
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
                name: 'cờ đỏ',
                color: '#c80404',
                data: [data[0].thang1.red, data[1].thang2.red,
                    data[2].thang3.red, data[3].thang4.red, data[4].thang5.red,
                    data[5].thang6.red, data[6].thang7.red, data[7].thang8.red,
                    data[8].thang9.red, data[9].thang10.red, data[10].thang11.red, data[11].thang12.red
                ]
            },
            {
                name: 'cờ xanh',
                color: '#186bc7',
                data: [data[0].thang1.blue, data[1].thang2.blue,
                    data[2].thang3.blue, data[3].thang4.blue, data[4].thang5.blue,
                    data[5].thang6.blue, data[6].thang7.blue, data[7].thang8.blue,
                    data[8].thang9.blue, data[9].thang10.blue, data[10].thang11.blue, data[11].thang12.blue
                ]
            },
            {
                name: 'cờ vàng',
                color: '#c7b517',
                data: [data[0].thang1.yellow, data[1].thang2.yellow,
                    data[2].thang3.yellow, data[3].thang4.yellow, data[4].thang5.yellow,
                    data[5].thang6.yellow, data[6].thang7.yellow, data[7].thang8.yellow,
                    data[8].thang9.yellow, data[9].thang10.yellow, data[10].thang11.yellow, data[11].thang12.yellow
                ]
            },
        ]
    })
}

function thiduathangRate(red, blue) {
    Highcharts.chart('rate-thiduathang', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            height: 250
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            itemMarginTop: 10,
            itemMarginRight: 20,
            itemMarginBottom: 10
        },
        title: {
            text: 'Tỉ lệ xếp loại<br> thi đua tháng <br>cán bộ Công an tỉnh',
            align: 'center',
            verticalAlign: 'middle',
            y: 0,
            x: -128,
            style: { "fontFamily": "Arial, Helvetica, sans-serif", "fontSize": "12px" }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.4f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: false,
                    distance: 0,
                    style: {
                        fontWeight: 'bold',
                        color: '#333',
                        fontSize: 12
                    }
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            type: 'pie',
            showInLegend: true,
            name: 'Đạt',
            innerSize: '60%',
            data: [{
                name: blue + ' Cán bộ, chiến sĩ cờ xanh, vàng',
                y: blue,
                color: "#186bc7"
            }, {
                name: red + ' Cán bộ, chiến sĩ xếp loại cờ đỏ',
                y: red,
                color: "#c80404"
            }]
        }]
    });
}

$(document).ready(function() {

    $('#btn-search-thiduathang').click(function() {
        let nam = $('#nam-thiduathang').val();
        $('#nam-thiduathang-render').text(nam)
        $.ajax({
            url: '/conganhungyen/thiduakhenthuong/thongke/thiduathang/' + nam,
            type: 'GET',
            async: true,
            dataType: "json",
            success: function(data) {
                thiduathang(data.soluong, nam);
                $('#btn-thongke-thiduathang').click();
            }
        })
    });
    $('#btn-search-thiduathang').click();

    $('#btn-thongke-thiduathang').click(function(e) {
        let nam = $('#nam-thiduathang-render').text();
        let query = $("input[name='thiduathang-filter']:checked").val();
        let noidung = $("input[name='thiduathang-filter']:checked").closest('li').find('span').text()
        $.ajax({
            url: `/conganhungyen/thiduakhenthuong/thongke/thiduathang/${nam}/${query}`,
            error: function() {
                alert('Có lỗi xảy ra...')
            },
            success: function(data) {
                let stt = 0;
                $('#main-content-right-title-noidung').text(noidung)
                title = $('#main-content-right-title-noidung').text() + ' ' + $('#nam-thiduathang-render').text()
                title = title.toLowerCase()
                let coxanhNumber = data.soluong.coxanh;
                let covangNumber = data.soluong.covang;
                let coxanhList = data.list.blue;
                let covangList = data.list.yellow;
                let total = data.total;
                $('#covang').text(covangNumber)
                $('#coxanh').text(coxanhNumber)
                $('#covang-chitiet').text(` lượt với ${covangList.length} đồng chí, chiếm tỉ lệ  ${parseFloat(data.list.yellow.length/total*100).toFixed(2)}%`)
                $('#coxanh-chitiet').text(` lượt với ${coxanhList.length} đồng chí, chiếm tỉ lệ  ${parseFloat(data.list.blue.length/total*100).toFixed(2)}%`)
                let doTotal = total - data.listRate.length;
                thiduathangRate(doTotal, data.listRate.length)
                $('#thiduathang-list').html('');
                if (data.two_noneRedList.length > 0) {
                    $('#thiduathang-list').append(`
                       <tr class="sub-head">
                       <th colspan="5">Có ít nhất 2 lần thi đua tháng xếp loại không đạt cờ đỏ: ${data.two_noneRedList.length} đồng chí, chiếm ${parseFloat(data.two_noneRedList.length/total*100).toFixed(2)}%</th>
                       </tr>
                       `)
                    data.two_noneRedList.forEach(function(i, index) {
                        $('#thiduathang-list').append(`
                           <tr>
                           <td>${index + 1}</td>
                           <td style="text-align: left">${i.hoten}</td>
                           <td>${i.capbac}</td>
                           <td>${i.chucvu}</td>
                           <td>${i.room} - ${i.donvicongtac}<a href="/conganhungyen/thiduakhenthuong/trangcanhan/${i._id}" title="Đi tới trang cá nhân" target="_blank"
                           style="display: inline-block;float: right;"><i class="far fa-id-badge link"></i></a></td>
                           </tr>
                           `)
                    })
                }
                if (data.list.blue.length > 0) {
                    $('#thiduathang-list').append(`
                       <tr class="sub-head">
                       <th colspan="5">Cờ xanh: ${data.list.blue.length} đồng chí, chiếm ${parseFloat(data.list.blue.length/total*100).toFixed(2)}%</th>
                       </tr>
                       `)
                    data.list.blue.forEach(function(i, index) {
                        $('#thiduathang-list').append(`
                           <tr>
                           <td>${index + 1}</td>
                           <td style="text-align: left">${i.hoten}</td>
                           <td>${i.capbac}</td>
                           <td>${i.chucvu}</td>
                           <td>${i.room} - ${i.donvicongtac}<a href="/conganhungyen/thiduakhenthuong/trangcanhan/${i._id}" title="Đi tới trang cá nhân" target="_blank"
                           style="display: inline-block;float: right;"><i class="far fa-id-badge link"></i></a></td>
                           </tr>
                           `);
                        stt += 1
                    })
                }
                if (data.list.yellow.length > 0) {
                    $('#thiduathang-list').append(`
                       <tr class="sub-head">
                       <th colspan="5">Cờ vàng: ${data.list.yellow.length} đồng chí, chiếm ${parseFloat(data.list.yellow.length/total*100).toFixed(2)}%</th>
                       </tr>
                       `)
                    data.list.yellow.forEach(function(i, index) {
                        $('#thiduathang-list').append(`
                           <tr>
                               <td>${index + 1}</td>
                               <td style="text-align: left">${i.hoten}</td>
                               <td>${i.capbac}</td>
                               <td>${i.chucvu}</td>
                               <td>${i.room} - ${i.donvicongtac}<a href="/conganhungyen/thiduakhenthuong/trangcanhan/${i._id}" title="Đi tới trang cá nhân" target="_blank"
                               style="display: inline-block;float: right;"><i class="far fa-id-badge link"></i></a></td>
                           </tr>
                       `);
                        stt += 1
                    })
                };
            }
        })
    })


})