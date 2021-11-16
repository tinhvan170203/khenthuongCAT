function dangkixeploaidangvienChart(title, data) {
    Highcharts.chart('thongke-dangvien-dangkithidua', {
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
            innerSize: '50%',
            data: [
                { name: 'HTXSNV', y: data.dangki_hoanthanhxuatsacList, color: "#c20707" },
                { name: 'HTTNV', y: data.dangki_hoanthanhtotList, color: "#e7f003" },
                { name: 'HTNV', y: data.dangki_hoanthanhnhiemvuList, color: "#2445bc" },
                { name: 'KHTNV', y: data.dangki_khonghoanthanhnhiemvuList, color: "rgb(28, 28, 29)" },
                { name: 'Chưa có dữ liệu', y: data.dangki_chuacodulieuList, color: "#29a4a8" },
            ]
        }]
    });
}

function xeploaidangvien(nam, data) {
    Highcharts.chart('thongke-dangvien-xeploaicuoinam', {
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
            name: 'Share',
            innerSize: '50%',
            data: [
                { name: 'HTXSNV', y: data.xeploai_hoanthanhxuatsacList, color: "#c20707" },
                { name: 'HTTNV', y: data.xeploai_hoanthanhtotList, color: "#e7f003" },
                { name: 'HTNV', y: data.xeploai_hoanthanhnhiemvuList, color: "#2445bc" },
                { name: 'KHTNV', y: data.xeploai_khonghoanthanhnhiemvuList, color: "rgb(28, 28, 29)" },
                { name: 'Chưa có dữ liệu', y: data.xeploai_chuacodulieuList, color: "#29a4a8" },
            ]
        }]
    });
}

$(document).ready(function() {

    $('#btn-search-dangvien').click(function() {
        let nam = $('#nam-dangvien').val();
        $.ajax({
            url: '/conganhungyen/thiduakhenthuong/thongke/dangvien/' + nam,
            type: 'GET',
            async: true,
            dataType: "json",
            success: function(data) {
                dangkixeploaidangvienChart(`Biểu đồ tỉ lệ đăng kí xếp loại đảng viên năm ${nam} Công an tỉnh Hưng Yên`, data)
                xeploaidangvien(nam, data)
            }
        })
    });
    $('#btn-search-dangvien').click();

    $('#btn-thongke-dangvien').click(function() {
        let namFilter = $("#nam-dangvien-thongke").val();
        let fieldFilter = $('input[name="dangvien-filter"]:checked').val();
        titleDangvien = $("input[name='dangvien-filter']:checked").closest('li').find('span').text() + ' Năm ' + namFilter;
        //check request for ajax
        if (fieldFilter === "Hoàn thành xuất sắc nhiệm vụ-3" || fieldFilter === "Không hoàn thành nhiệm vụ-3" || fieldFilter === "Hoàn thành nhiệm vụ-3") {
            //TwoCase
            titleDangvien = $("input[name='dangvien-filter']:checked").closest('li').find('span').text();
            $('#bangdangvien-text').text(titleDangvien)
            $.ajax({ //
                url: `/conganhungyen/thiduakhenthuong/thongke/dangvien/${namFilter}/filterTwoCase`,
                data: { fieldFilter },
                success: function(data) {
                    $('#dangvien-list').html('');
                    if (data.length > 0) {
                        $('#dangvien-list').append(`
                            <tr class="sub-head">
                                 <th colspan="5">Tổng cộng: ${data.length} đảng viên</th>
                            </tr>
                            `)
                        data.forEach(function(i, index) {
                            $('#dangvien-list').append(`
                                <tr title="Năm: ${i.nam}">
                                    <td>${index + 1}</td>
                                    <td style="text-align: left">${i.hoten}</td>
                                    <td>${i.capbac}</td>
                                    <td>${i.chucvu}</td>
                                    <td>${i.room} - ${i.donvicongtac}<a href="/conganhungyen/thiduakhenthuong/trangcanhan/${i._id}" title="Đi tới trang cá nhân" target="_blank"
                                    style="display: inline-block;float: right;"><i class="far fa-id-badge link"></i></a></td>
                                </tr>
                                `);
                        })
                    } else {
                        $('#dangvien-list').append(`
                            <tr class="sub-head">
                                 <th colspan="5">Không tìm thấy kết quả phù hợp</th>
                            </tr>
                            `)
                    }
                }
            });
        } else {
            $('#bangdangvien-text').text(titleDangvien)
            $.ajax({ // OneCase
                url: `/conganhungyen/thiduakhenthuong/thongke/dangvien/${namFilter}/filterOneCase`,
                data: { fieldFilter },
                success: function(data) {
                    $('#dangvien-list').html('');
                    if (data.length > 0) {
                        $('#dangvien-list').append(`
                            <tr class="sub-head">
                                 <th colspan="5">Tổng cộng: ${data.length} đảng viên</th>
                            </tr>
                            `)
                        data.forEach(function(i, index) {
                            $('#dangvien-list').append(`
                                <tr>
                                    <td>${index + 1}</td>
                                    <td style="text-align: left">${i.hoten}</td>
                                    <td>${i.capbac}</td>
                                    <td>${i.chucvu}</td>
                                    <td>${i.room} - ${i.donvicongtac}<a href="/conganhungyen/thiduakhenthuong/trangcanhan/${i._id}" title="Đi tới trang cá nhân" target="_blank"
                                    style="display: inline-block;float: right;"><i class="far fa-id-badge link"></i></a></td>
                                </tr>
                                `);
                        })
                    } else {
                        $('#dangvien-list').append(`
                            <tr class="sub-head">
                                 <th colspan="5">Không tìm thấy kết quả phù hợp</th>
                            </tr>
                            `)
                    }
                }
            })
        }
    });
    $('#btn-thongke-dangvien').click()

})