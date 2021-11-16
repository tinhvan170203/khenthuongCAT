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
            backgroundColor: '#f1f4f5',
            borderWidth: 2,
            borderColor: "#cccccc",
            height: 350, //chiều cao,
            style: { "fontFamily": "Arial, Helvetica, sans-serif" },
        },
        subtitle: { //đề mục con
            text: 'Thống kê kết quả thi đua tháng trong năm ' + year,
            color: '#038eae',
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
            height: 250,
            width: 600
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
let dataPrint = '';
let dataThiduanamPrint = '';
let dataDangvienPrint = '';
let titleDangvienPrint = '';
let title = '';
let titleThiduanam = '';

let print = function(title, dataPrint) {
    let day = new Date().getUTCDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let printPage = window.open("", 'page1', 'height=600; width=1400');
    printPage.document.write(`
            <style>       
            .header {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
            }

        .header__left {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .img-huyhieu {
            width: 100px;
        }

        .header-name {
            text-transform: uppercase;
            font-size: 18px;
            font-weight: 900;
        }

        @page {
            size: auto;
            margin: 20mm 18mm 20mm 35mm;
        }

        .header__right {
            position: relative;
            font-size: 18px;
            font-style: italic;
        }

        h4,
        h5 {
            margin: 0;
            padding: 0;
        }

        .header__right-doclap {
            position: relative;
            margin-left: 80px;
            margin-top: 10px;
        }

        .date {
            margin-top: 10px;
            font-weight: 100;
            margin-left: 132px
        }

        .main__print-title {
            font-size: 24px;
            text-align: center;
            margin-top: 30px;
        }

        .gachchan {
            width: 250px;
            height: 1px;
            background: black;
            margin-left: 90px;
        }

        table {
            font-family: 'Times New Roman', serif, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        td {
            border: 1px solid #333;
            text-align: left;
            font-size: 14px;
            padding: 8px;
        }

        .header__right-conghoa{
            text-transform: uppercase;
        }
        h3.main__print-title {
            margin-bottom: 10px;
        }

        h4.main__print-detail {
            text-align: center;
            margin-bottom: 50px;
            font-size: 16px;
        }
    </style>
    <div id="container2">
        <header class="header">
            <div class="header__left">
                <div class="header-name">Công an tỉnh Hưng Yên</div>
            </div>
            <div class="header__right">
                <h4 class="header__right-conghoa">phần mềm theo dõi thi đua khen thưởng</h4>
                <div class="gachchan"></div>
                <h5 class="date">Hưng Yên, ngày ${day} tháng ${month} năm ${year}</h5>
            </div>
        </header>
        <div class="main__print" style="margin-bottom: 60px">
            <h3 class="main__print-title">Danh sách</h3>
            <h4 class="main__print-detail"> Cán bộ, chiến sĩ ${title}</h4>
        </div>
        <table>
            <tr style="font-weight: bold; font-size: 14px; ">
                <td style="text-align:center;width: 10px">STT</td>
                <td style="text-align:center;width: 25%">Họ và tên</td>
                <td style="text-align:center;width: 15%">Cấp bậc</td>
                <td style="text-align:center;width: 35%">Chức vụ</td>
                <td style="text-align:center;width: 25%">Đơn vị</td>
            </tr>   
            ${dataPrint}  
        </table>
    </div>
    `);
    // element1.remove();
    printPage.stop();
    printPage.print();
    printPage.close()
};
let printThiduanam = function(title, dataPrint) {
    let day = new Date().getUTCDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let printPage = window.open("", 'page1', 'height=600; width=1400');
    printPage.document.write(`
            <style>       
            .header {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
            }

        .header__left {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .img-huyhieu {
            width: 100px;
        }

        .header-name {
            text-transform: uppercase;
            font-size: 18px;
            font-weight: 900;
        }

        @page {
            size: auto;
            margin: 20mm 18mm 20mm 35mm;
        }

        .header__right {
            position: relative;
            font-size: 18px;
            font-style: italic;
        }

        h4,
        h5 {
            margin: 0;
            padding: 0;
        }

        .header__right-doclap {
            position: relative;
            margin-left: 80px;
            margin-top: 10px;
        }

        .date {
            margin-top: 10px;
            font-weight: 100;
            margin-left: 132px
        }

        .main__print-title {
            font-size: 24px;
            text-align: center;
            margin-top: 30px;
        }

        .gachchan {
            width: 250px;
            height: 1px;
            background: black;
            margin-left: 90px;
        }

        table {
            font-family: 'Times New Roman', serif, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        td {
            border: 1px solid #333;
            text-align: left;
            font-size: 14px;
            padding: 8px;
        }

        .header__right-conghoa{
            text-transform: uppercase;
        }
        h3.main__print-title {
            margin-bottom: 10px;
        }

        h4.main__print-detail {
            text-align: center;
            margin-bottom: 50px;
            font-size: 16px;
        }
    </style>
    <div id="container2">
        <header class="header">
            <div class="header__left">
                <div class="header-name">Công an tỉnh Hưng Yên</div>
            </div>
            <div class="header__right">
                <h4 class="header__right-conghoa">phần mềm theo dõi thi đua khen thưởng</h4>
                <div class="gachchan"></div>
                <h5 class="date">Hưng Yên, ngày ${day} tháng ${month} năm ${year}</h5>
            </div>
        </header>
        <div class="main__print" style="margin-bottom: 60px">
            <h3 class="main__print-title">Danh sách</h3>
            <h4 class="main__print-detail"> Cán bộ, chiến sĩ ${title}</h4>
        </div>
        <table>
            <tr style="font-weight: bold; font-size: 14px; ">
                <td style="text-align:center;width: 10px">STT</td>
                <td style="text-align:center;width: 25%">Họ và tên</td>
                <td style="text-align:center;width: 15%">Cấp bậc</td>
                <td style="text-align:center;width: 35%">Chức vụ</td>
                <td style="text-align:center;width: 25%">Đơn vị</td>
            </tr>   
            ${dataPrint}  
        </table>
    </div>
    `);
    // element1.remove();
    printPage.stop();
    printPage.print();
    printPage.close()
};
let printDangvien = function(title, dataDangvienPrint) {
    let day = new Date().getUTCDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let printPage = window.open("", 'pageDangvien', 'height=600; width=1400');
    printPage.document.write(`
            <style>       
            .header {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
            }

        .header__left {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .img-huyhieu {
            width: 100px;
        }

        .header-name {
            text-transform: uppercase;
            font-size: 18px;
            font-weight: 900;
        }

        @page {
            size: auto;
            margin: 20mm 18mm 20mm 35mm;
        }

        .header__right {
            position: relative;
            font-size: 18px;
            font-style: italic;
        }

        h4,
        h5 {
            margin: 0;
            padding: 0;
        }

        .header__right-doclap {
            position: relative;
            margin-left: 80px;
            margin-top: 10px;
        }

        .date {
            margin-top: 10px;
            font-weight: 100;
            margin-left: 132px
        }

        .main__print-title {
            font-size: 24px;
            text-align: center;
            margin-top: 30px;
        }

        .gachchan {
            width: 250px;
            height: 1px;
            background: black;
            margin-left: 90px;
        }

        table {
            font-family: 'Times New Roman', serif, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        td {
            border: 1px solid #333;
            text-align: left;
            font-size: 14px;
            padding: 8px;
        }

        .header__right-conghoa{
            text-transform: uppercase;
        }
        h3.main__print-title {
            margin-bottom: 10px;
        }

        h4.main__print-detail {
            text-align: center;
            margin-bottom: 50px;
            font-size: 16px;
        }
    </style>
    <div id="container2">
        <header class="header">
            <div class="header__left">
                <div class="header-name">Công an tỉnh Hưng Yên</div>
            </div>
            <div class="header__right">
                <h4 class="header__right-conghoa">phần mềm theo dõi thi đua khen thưởng</h4>
                <div class="gachchan"></div>
                <h5 class="date">Hưng Yên, ngày ${day} tháng ${month} năm ${year}</h5>
            </div>
        </header>
        <div class="main__print" style="margin-bottom: 60px">
            <h3 class="main__print-title">Danh sách</h3>
            <h4 class="main__print-detail"> Đảng viên ${title}</h4>
        </div>
        <table>
            <tr style="font-weight: bold; font-size: 14px; ">
                <td style="text-align:center;width: 10px">STT</td>
                <td style="text-align:center;width: 25%">Họ và tên</td>
                <td style="text-align:center;width: 15%">Cấp bậc</td>
                <td style="text-align:center;width: 35%">Chức vụ</td>
                <td style="text-align:center;width: 25%">Đơn vị</td>
            </tr>   
            ${dataDangvienPrint}  
        </table>
    </div>
    `);
    // element1.remove();
    printPage.stop();
    printPage.print();
    printPage.close()
};

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
            text: `Biểu đồ tỉ lệ xếp loại thi đua năm ${nam} Công an tỉnh Hưng Yên`,
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
            data: [
                { name: 'Chiến sĩ thi đua', y: data.xeploai_chiensithiduaList, color: "#c20707" },
                { name: 'Chiến sĩ tiên tiến', y: data.xeploai_chiensitientienList, color: "#e7f003" },
                { name: 'Hoàn thành nhiệm vụ', y: data.xeploai_hoanthanhnhiemvuList, color: "#2445bc" },
                { name: 'Không hoàn thành nhiệm vụ', y: data.xeploai_khonghoanthanhnhiemvuList, color: "rgb(28, 28, 29)" },
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
            text: title,
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
                { name: 'Chiến sĩ thi đua', y: data.dangki_chiensithiduaList, color: "#c20707" },
                { name: 'Chiến sĩ tiên tiến', y: data.dangki_chiensitientienList, color: "#e7f003" },
                { name: 'Hoàn thành nhiệm vụ', y: data.dangki_hoanthanhnhiemvuList, color: "#2445bc" },
                { name: 'Không hoàn thành nhiệm vụ', y: data.dangki_khonghoanthanhnhiemvuList, color: "rgb(28, 28, 29)" },
                { name: 'Chưa có dữ liệu', y: data.dangki_chuacodulieuList, color: "#29a4a8" },
            ]
        }]
    });
}

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
            text: title,
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
                { name: 'Hoàn thành xuất sắc nhiệm vụ', y: data.dangki_hoanthanhxuatsacList, color: "#c20707" },
                { name: 'Hoàn thành tốt nhiệm vụ', y: data.dangki_hoanthanhtotList, color: "#e7f003" },
                { name: 'Hoàn thành nhiệm vụ', y: data.dangki_hoanthanhnhiemvuList, color: "#2445bc" },
                { name: 'Không hoàn thành nhiệm vụ', y: data.dangki_khonghoanthanhnhiemvuList, color: "rgb(28, 28, 29)" },
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
            text: `Biểu đồ tỉ lệ xếp loại đảng viên năm ${nam} Công an tỉnh Hưng Yên`,
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
                { name: 'Hoàn thành xuất sắc nhiệm vụ', y: data.xeploai_hoanthanhxuatsacList, color: "#c20707" },
                { name: 'Hoàn thành tốt nhiệm vụ', y: data.xeploai_hoanthanhtotList, color: "#e7f003" },
                { name: 'Hoàn thành nhiệm vụ', y: data.xeploai_hoanthanhnhiemvuList, color: "#2445bc" },
                { name: 'Không hoàn thành nhiệm vụ', y: data.xeploai_khonghoanthanhnhiemvuList, color: "rgb(28, 28, 29)" },
                { name: 'Chưa có dữ liệu', y: data.xeploai_chuacodulieuList, color: "#29a4a8" },
            ]
        }]
    });
}
$(document).ready(function() {
    $('#btn-search-vianninh').click(function() {
        let nam = $('#nam-vianninh').val();
        $.ajax({
            url: `/conganhungyen/thiduakhenthuong/vianninhtoquoc/${nam}`,
            success: function(data) {
                tableVianninh(data)
            }
        })
    });
    $('#btn-search-vianninh').click()


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
                dataPrint = '';
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
                         <td style="text-align: center">${index + 1}</td>
                         <td style="text-align: left">${i.hoten}</td>
                         <td style="text-align: center">${i.capbac}</td>
                         <td style="text-align: center">${i.chucvu}</td>
                         <td style="text-align: center">${i.donvicongtac}<a href="/conganhungyen/thiduakhenthuong/trangcanhan/${i._id}" title="Đi tới trang cá nhân" target="_blank"
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
                         <td style="text-align: center">${index + 1}</td>
                         <td style="text-align: left">${i.hoten}</td>
                         <td style="text-align: center">${i.capbac}</td>
                         <td style="text-align: center">${i.chucvu}</td>
                         <td style="text-align: center">${i.donvicongtac}<a href="/conganhungyen/thiduakhenthuong/trangcanhan/${i._id}" title="Đi tới trang cá nhân" target="_blank"
                         style="display: inline-block;float: right;"><i class="far fa-id-badge link"></i></a></td>
                         </tr>
                         `);
                        dataPrint += `
                         <tr>
                         <td style="text-align: center">${stt + 1}</td>
                         <td style="text-align: left">${i.hoten}</td>
                         <td style="text-align: center">${i.capbac}</td>
                         <td style="text-align: center">${i.chucvu}</td>
                         <td style="text-align: center">${i.donvicongtac}</td>
                         </tr>
                         `;
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
                             <td style="text-align: center">${index + 1}</td>
                             <td style="text-align: left">${i.hoten}</td>
                             <td style="text-align: center">${i.capbac}</td>
                             <td style="text-align: center">${i.chucvu}</td>
                             <td style="text-align: center">${i.donvicongtac}<a href="/conganhungyen/thiduakhenthuong/trangcanhan/${i._id}" title="Đi tới trang cá nhân" target="_blank"
                             style="display: inline-block;float: right;"><i class="far fa-id-badge link"></i></a></td>
                         </tr>
                     `);
                        dataPrint += `
                                 <tr>
                                     <td style="text-align: center">${stt + 1}</td>
                                     <td style="text-align: left">${i.hoten}</td>
                                     <td style="text-align: center">${i.capbac}</td>
                                     <td style="text-align: center">${i.chucvu}</td>
                                     <td style="text-align: center">${i.donvicongtac}</td>
                                 </tr>
                                 `;
                        stt += 1
                    })
                };
            }
        })
    })
    $('#print-thiduathang').click(function() {
        print(`thi đua tháng xếp loại cờ xanh, cờ vàng ${title}`, dataPrint)
    });

    //Thi đua năm
    $('#btn-search-thiduanam').click(function() {
        let nam = $('#nam-thiduanam').val();
        $.ajax({
            url: '/conganhungyen/thiduakhenthuong/thongke/thiduanam/' + nam,
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
                data: { fieldFilter },
                success: function(data) {
                    dataThiduanamPrint = '';
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
                                <td style="text-align: center">${i.capbac}</td>
                                <td style="text-align: center">${i.chucvu}</td>
                                <td style="text-align: center">${i.room}<a href="/conganhungyen/thiduakhenthuong/trangcanhan/${i._id}" title="Đi tới trang cá nhân" target="_blank"
                                style="display: inline-block;float: right;"><i class="far fa-id-badge link"></i></a></td>
                            </tr>
                            `);
                            dataThiduanamPrint += `
                            <tr>
                                <td style="text-align: center">${index + 1}</td>
                                <td style="text-align: left">${i.hoten}</td>
                                <td style="text-align: center">${i.capbac}</td>
                                <td style="text-align: center">${i.chucvu}</td>
                                <td style="text-align: center">${i.room}</td>
                            </tr>
                            `;
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
                data: { fieldFilter },
                success: function(data) {
                    dataThiduanamPrint = '';
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
                                <td style="text-align: center">${i.capbac}</td>
                                <td style="text-align: center">${i.chucvu}</td>
                                <td style="text-align: center">${i.room}<a href="/conganhungyen/thiduakhenthuong/trangcanhan/${i._id}" title="Đi tới trang cá nhân" target="_blank"
                                style="display: inline-block;float: right;"><i class="far fa-id-badge link"></i></a></td>
                            </tr>
                            `);
                            dataThiduanamPrint += `
                            <tr>
                                <td style="text-align: center">${index + 1}</td>
                                <td style="text-align: left">${i.hoten}</td>
                                <td style="text-align: center">${i.capbac}</td>
                                <td style="text-align: center">${i.chucvu}</td>
                                <td style="text-align: center">${i.room}</td>
                            </tr>
                            `;
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

    $('#print-thiduanam').click(function() {
        printThiduanam(`thi đua năm xếp loại  ${titleThiduanam}`, dataThiduanamPrint)
    });


    //Thống kê đảng viên
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
                    dataDangvienPrint = '';
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
                                <td style="text-align: center">${index + 1}</td>
                                <td style="text-align: left">${i.hoten}</td>
                                <td style="text-align: center">${i.capbac}</td>
                                <td style="text-align: center">${i.chucvu}</td>
                                <td style="text-align: center">${i.room}<a href="/conganhungyen/thiduakhenthuong/trangcanhan/${i._id}" title="Đi tới trang cá nhân" target="_blank"
                                style="display: inline-block;float: right;"><i class="far fa-id-badge link"></i></a></td>
                            </tr>
                            `);
                            dataDangvienPrint += `
                            <tr>
                                <td style="text-align: center">${index + 1}</td>
                                <td style="text-align: left">${i.hoten}</td>
                                <td style="text-align: center">${i.capbac}</td>
                                <td style="text-align: center">${i.chucvu}</td>
                                <td style="text-align: center">${i.room}</td>
                            </tr>
                            `;
                        })
                    } else {
                        $('#dangvien-list').append(`
                        <tr class="sub-head">
                             <th colspan="5" style="text-align: center">Không tìm thấy kết quả phù hợp</th>
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
                    dataDangvienPrint = '';
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
                                <td style="text-align: center">${index + 1}</td>
                                <td style="text-align: left">${i.hoten}</td>
                                <td style="text-align: center">${i.capbac}</td>
                                <td style="text-align: center">${i.chucvu}</td>
                                <td style="text-align: center">${i.room}<a href="/conganhungyen/thiduakhenthuong/trangcanhan/${i._id}" title="Đi tới trang cá nhân" target="_blank"
                                style="display: inline-block;float: right;"><i class="far fa-id-badge link"></i></a></td>
                            </tr>
                            `);
                            dataDangvienPrint += `
                            <tr>
                                <td style="text-align: center">${index + 1}</td>
                                <td style="text-align: left">${i.hoten}</td>
                                <td style="text-align: center">${i.capbac}</td>
                                <td style="text-align: center">${i.chucvu}</td>
                                <td style="text-align: center">${i.room}</td>
                            </tr>
                            `;
                        })
                    } else {
                        $('#dangvien-list').append(`
                        <tr class="sub-head">
                             <th colspan="5" style="text-align: center">Không tìm thấy kết quả phù hợp</th>
                        </tr>
                        `)
                    }
                }
            })
        }
    });
    $('#btn-thongke-dangvien').click()
    $('#print-dangvien').click(function() {
        printDangvien(` xếp loại  ${titleDangvien}`, dataDangvienPrint)
    });

    //Thống kê khen thưởng  
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
            url: `/conganhungyen/thiduakhenthuong/thongke/khenthuong`,
            data: { min, max },
            success: function(data) {
                $('#khenthuong-list').html('')
                $('#tongcongluotkhenthuong').text(data.tongcongluotkhenthuong)
                $('#soluotkhenthuongtapthe').text(data.soluotkhenthuongtapthe)
                $('#soluotkhenthuongcapphong').text(data.soluotkhenthuongcapphong)
                $('#soluotkhenthuongcapdoi').text(data.soluotkhenthuongcapdoi)
                $('#soluotkhenthuongcanhan').text(data.soluotkhenthuongcanhan)
                $('#tongsotaptheduockhenthuong').text(data.tongsophongduockhenthuong.length + data.tongsodoiduockhenthuong.length)
                $('#tongsocanhanduockhenthuong').text(data.tongsocanhanduockhenthuong.length)
                if (data.tongsophongduockhenthuong.length == 0 && data.tongsodoiduockhenthuong.length == 0 && data.tongsocanhanduockhenthuong.length == 0) {
                    $('#khenthuong-list').append(`
                        <tr class="sub-head">
                                <th colspan="5" style="text-align: center">Không tìm thấy kết quả phù hợp</th>
                           </tr>
                           `)
                };
                if (data.tongsophongduockhenthuong.length > 0) {
                    $('#khenthuong-list').append(`
                        <tr  class="sub-head">
                            <th colspan="5">Tập thể cấp phòng và tương đương trở lên: ${data.tongsophongduockhenthuong.length} đơnvị</th>
                        </tr>         
                    `)
                    data.tongsophongduockhenthuong.forEach((item, index) => {
                        $('#khenthuong-list').append(`
                        <tr>
                            <td>${index+1}</td>
                            <td colspan="4">${item.kyhieu}</td>
                        </tr>     
                        `)
                    })
                };
                if (data.tongsodoiduockhenthuong.length > 0) {
                    $('#khenthuong-list').append(`
                        <tr  class="sub-head">
                            <th colspan="5">Tập thể cấp đội và tương đương: ${data.tongsodoiduockhenthuong.length} đơn vị</th>
                        </tr>         
                    `)
                    data.tongsodoiduockhenthuong.forEach((item, index) => {
                        $('#khenthuong-list').append(`
                        <tr>
                            <td>${index+1}</td>
                            <td colspan="3">${item.ten}</td>
                            <td  style="text-align: center">${item.donvi}</td>
                        </tr>     
                        `)
                    })
                };
                if (data.tongsocanhanduockhenthuong.length > 0) {
                    $('#khenthuong-list').append(`
                        <tr  class="sub-head">
                            <th colspan="5">Cá nhân được khen thưởng: ${data.tongsocanhanduockhenthuong.length} cá nhân</th>
                        </tr>         
                    `)
                    data.tongsocanhanduockhenthuong.forEach((item, index) => {
                        $('#khenthuong-list').append(`
                        <tr>
                            <td>${index+1}</td>
                            <td>${item.ten}</td>
                            <td style="text-align: center">${item.capbac}</td>
                            <td style="text-align: center">${item.chucvu}</td>
                            <td  style="text-align: center">${item.donvicongtac}<a href="/conganhungyen/thiduakhenthuong/trangcanhan/${item._id}" title="Đi tới trang cá nhân" target="_blank"
                            style="display: inline-block;float: right;"><i class="far fa-id-badge link"></i></a></td>
                        </tr>     
                        `)
                    })
                };
            }
        })
    });
    $('#btn-search-time').click()

    //Thống kê kỉ luật
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
        let min = $('#ki-luat-time-from').val();
        $('#ki-luat-time-to').attr('min', min)
        let max = $('#ki-luat-time-to').val();
        $.ajax({
            url: `/conganhungyen/thiduakhenthuong/thongke/kiluat`,
            data: { min, max },
            success: function(data) {
                $('#kiluat-list').html('')
                $('#soluotkiluat').text(data.soluotkiluat)
                $('#tongsokiluatkhientrach').text(data.tongsokiluatkhientrach)
                $('#tongsokiluatcanhcao').text(data.tongsokiluatcanhcao)
                $('#tongsokiluatcachchuc').text(data.tongsokiluatcachchuc)
                $('#tongsocanbobikiluat').text(data.tongcongcanbobikiluat.length)
                if (data.tongcongcanbobikiluat.length > 0) {
                    data.tongcongcanbobikiluat.forEach((item, index) => {
                        $('#kiluat-list').append(`
                        <tr>
                            <td style="text-align: center">${index+1}</td>
                            <td>${item.ten}</td>
                            <td style="text-align: center">${item.capbac}</td>
                            <td style="text-align: center">${item.chucvu}</td>
                            <td  style="text-align: center">${item.donvicongtac}<a href="/conganhungyen/thiduakhenthuong/trangcanhan/${item._id}" title="Đi tới trang cá nhân" target="_blank"
                            style="display: inline-block;float: right;"><i class="far fa-id-badge link"></i></a></td>
                        </tr>     
                        `)
                    })
                } else {
                    Ơ
                    $('#kiluat-list').append(`
                    <tr class="sub-head">
                         <th colspan="5" style="text-align: center">Không tìm thấy kết quả phù hợp</th>
                    </tr>
                    `)
                }
            }
        })
    });
    $('#btn-search-time-ki-luat').click();

    // Phong trào vì an ninh 
    const tableVianninh = (data) => {
        table = $('#vianninh').DataTable({
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