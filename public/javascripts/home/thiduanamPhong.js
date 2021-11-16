const id = $('.menu-left').attr('id')

function xeploaithiduanam(nam, data) {
    Highcharts.chart('thongke-thiduanam-xeploaicuoinam', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: 350,
            spacingTop: 20
        },
        credits: {
            enabled: false,
        },
        title: {
            style: { "fontFamily": "Arial, Helvetica, sans-serif", "fontSize": "12px" },
            text: ``,
            align: 'center',
            verticalAlign: 'middle',
            y: -150,
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.2f} %',
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            name: 'Đạt',
            data: [
                { name: 'CSTĐ', y: data.xeploai_chiensithiduaList, color: "#c20707" },
                { name: 'CSTT', y: data.xeploai_chiensitientienList, color: "#e7f003" },
                { name: 'HTNV', y: data.xeploai_hoanthanhnhiemvuList, color: "#2445bc" },
                { name: 'KHTNV', y: data.xeploai_khonghoanthanhnhiemvuList, color: "rgb(28, 28, 29)" },
                { name: 'Chưa có dữ liệu', y: data.xeploai_chuacodulieuList, color: "#29a4a8" },
            ]
        }]
    });
}

function dangkithiduaChart(title, data) {
    Highcharts.chart('thongke-thiduanam-dangkithidua', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: 350,
            spacingTop: 20
        },
        title: {
            text: '',
            style: { "fontFamily": "Arial, Helvetica, sans-serif", "fontSize": "12px" },
            align: 'center',
            verticalAlign: 'middle',
            y: -150,
        },
        credits: {
            enabled: false,
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.2f} %',
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            name: 'Đạt',
            data: [
                { name: 'CSTĐ', y: data.dangki_chiensithiduaList, color: "#c20707" },
                { name: 'CSTT', y: data.dangki_chiensitientienList, color: "#e7f003" },
                { name: 'HTNV', y: data.dangki_hoanthanhnhiemvuList, color: "#2445bc" },
                { name: 'KHTNV', y: data.dangki_khonghoanthanhnhiemvuList, color: "rgb(28, 28, 29)" },
                { name: 'Chưa có dữ liệu', y: data.dangki_chuacodulieuList, color: "#29a4a8" },
            ]
        }]
    });
}


$(document).ready(function() {

    //Thi đua năm
    $('#btn-search-thiduanam').click(function() {
        let nam = $('#nam-thiduanam').val();
        $.ajax({
            url: '/conganhungyen/thiduakhenthuong/thongke/thiduanam/' + nam,
            data: { id },
            success: function(data) {
                dangkithiduaChart(`Biểu đồ tỉ lệ đăng kí thi đua năm năm ${nam} Công an tỉnh Hưng Yên`, data)
                xeploaithiduanam(nam, data)
            }
        })
    });
    $('#btn-search-thiduanam').click();

    $('#btn-thongke-thiduanam').click(function() {
        let namFilter = $("#nam-thiduanam-thongke").val();
        let fieldFilter = $('input[name="thiduanam-filter"]:checked').val();
        titleThiduanam = $("input[name='thiduanam-filter']:checked").closest('li').find('span').text() + ' Năm ' + namFilter;

        //check request for ajax
        if (fieldFilter === "Chiến sĩ thi đua-3" || fieldFilter === "Không hoàn thành nhiệm vụ-3" || fieldFilter === "Hoàn thành nhiệm vụ-3") {
            //TwoCase
            titleThiduanam = $("input[name='thiduanam-filter']:checked").closest('li').find('span').text();
            $('#bangthiduanam-text').text(titleThiduanam)
            $.ajax({ //
                url: `/conganhungyen/thiduakhenthuong/thongke/thiduanam/${namFilter}/filterTwoCase`,
                data: { fieldFilter, id },
                success: function(data) {
                    $('#thiduanam-list').html('');
                    if (data.length > 0) {
                        $('#thiduanam-list').append(`
                            <tr class="sub-head">
                                 <th colspan="5">Tổng cộng: ${data.length} đồng chí</th>
                            </tr>
                            `)
                        data.forEach(function(i, index) {
                            $('#thiduanam-list').append(`
                                <tr title="Năm: ${i.nam}">
                                    <td style="text-align: center">${index + 1}</td>
                                    <td style="text-align: left">${i.hoten}</td>
                                    <td>${i.capbac}</td>
                                    <td>${i.chucvu}</td>
                                    <td>${i.room} - ${i.donvicongtac}<a href="/conganhungyen/thiduakhenthuong/trangcanhan/${i._id}" title="Đi tới trang cá nhân" target="_blank"
                                    style="display: inline-block;float: right;"><i class="far fa-id-badge link"></i></a></td>
                                </tr>
                                `);
                        })
                    } else {
                        $('#thiduanam-list').append(`
                            <tr class="sub-head">
                                 <th colspan="5" style="text-align: center">Không tìm thấy kết quả phù hợp</th>
                            </tr>
                            `)
                    }
                }
            });
        } else {
            $('#bangthiduanam-text').text(titleThiduanam)
            $.ajax({ // OneCase
                url: `/conganhungyen/thiduakhenthuong/thongke/thiduanam/${namFilter}/filterOneCase`,
                data: { fieldFilter, id },
                success: function(data) {
                    $('#thiduanam-list').html('');
                    if (data.length > 0) {
                        $('#thiduanam-list').append(`
                            <tr class="sub-head">
                                 <th colspan="5">Tổng cộng: ${data.length} đồng chí</th>
                            </tr>
                            `)
                        data.forEach(function(i, index) {
                            $('#thiduanam-list').append(`
                                <tr>
                                    <td style="text-align: center">${index + 1}</td>
                                    <td style="text-align: left">${i.hoten}</td>
                                    <td>${i.capbac}</td>
                                    <td>${i.chucvu}</td>
                                    <td>${i.room} - ${i.donvicongtac}<a href="/conganhungyen/thiduakhenthuong/trangcanhan/${i._id}" title="Đi tới trang cá nhân" target="_blank"
                                    style="display: inline-block;float: right;"><i class="far fa-id-badge link"></i></a></td>
                                </tr>
                                `);
                        })
                    } else {
                        $('#thiduanam-list').append(`
                            <tr class="sub-head">
                                 <th colspan="5" style="text-align: center">Không tìm thấy kết quả phù hợp</th>
                            </tr>
                            `)
                    }
                }
            })
        }
    });

    $('#btn-thongke-thiduanam').click()

})