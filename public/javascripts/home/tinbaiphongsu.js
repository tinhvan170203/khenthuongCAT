$(document).ready(function() {
    let muctinList = JSON.parse($('#data-muctin').html());

    let page2 = 1;
    let perPage2 = 10;
    let start2 = (page2 - 1) * perPage2;
    let end2 = page2 * perPage2;
    let totalPage2 = 0;
    let dataRender2 = [];

    const paginated = (dataRender2, page2) => {
        page2 = parseInt(page2)
        totalPage2 = Math.ceil(dataRender2.length / perPage2);
        start2 = (page2 - 1) * perPage2;
        end2 = page2 * perPage2;
        result = dataRender2.slice(start2, end2);
        $('#total').html(dataRender2.length)
        $('#bang2').html('');
        if (dataRender2.length > 0) {
            result.forEach((item, index) => {
                $('#bang2').append(`
                          <tr>
                                  <td>${(page2 - 1)*perPage2 + index + 1}</td>
                                  <td>${item.tieude}</td>
                                  <td>${item.tacgia}</td>
                                  <td>${item.ngaydang.split('-').reverse().join('/')}</td>
                                  <td>${item.trichyeunoidung}</td>
                                  <td>${item.donviphoihop}</td>
                                  <td>${item.muctin.muctin}</td>
                          </tr>
                          `)
            });
        }
        // Check điều kiện trang đầu tiên 
        if (totalPage2 == 0) {
            $('#pagination2').html('');
        } else if (page2 == 1 && totalPage2 == 1) {
            $('#pagination2').html('');
            $('#pagination2').append(`
                              <ul class="pagination">
                                  <li class="page-item2  page-current2"><a class="page-link" href="#">1</a></li>
                              </ul>
                          `);
        } else if (page2 == 1 && totalPage2 == 2) {
            $('#pagination2').html('');
            $('#pagination2').append(`
                              <ul class="pagination">
                                  <li class="page-item2  page-current2"><a class="page-link" href="#">1</a></li>
                                  <li class="page-item2"><a class="page-link" href="#">2</a></li>
                                  <li class="page-item2-next2">
                                      <a class="page-link" href="#" aria-label="Next">
                                          <span aria-hidden="true">&raquo;</span>
                                      </a>
                                  </li>
                              </ul>
                          `);
        } else if (page2 == 1 && totalPage2 > 2) {
            $('#pagination2').html('');
            $('#pagination2').append(`
                              <ul class="pagination">
                                  <li class="page-item2  page-current2"><a class="page-link" href="#">1</a></li>
                                  <li class="page-item2"><a class="page-link" href="#">2</a></li>
                                  <li class="page-item2"><a class="page-link" href="#">3</a></li>
                                  <li class="page-item2-next2">
                                      <a class="page-link" href="#" aria-label="Next">
                                          <span aria-hidden="true">&raquo;</span>
                                      </a>
                                  </li>
                              </ul>
                          `);
        } else if (page2 == totalPage2 && page2 > 2) {
            $('#pagination2').html('');
            $('#pagination2').append(`
                          <ul class="pagination">
                              <li class="page-item2-prev2">
                                  <a class="page-link" href="#" aria-label="Previous">
                                      <span aria-hidden="true">&laquo;</span>
                                  </a>
                              </li>
                              <li class="page-item2"><a class="page-link" href="#">${page2 - 2}</a></li>
                              <li class="page-item2"><a class="page-link" href="#">${page2 -1}</a></li>
                              <li class="page-item2 page-current2"><a class="page-link" href="#">${page2}</a></li>
                          </ul>
                          `);
        } else if (page2 == totalPage2 && page2 <= 2) {
            $('#pagination2').html('');
            $('#pagination2').append(`
                          <ul class="pagination">
                              <li class="page-item2-prev2">
                                  <a class="page-link" href="#" aria-label="Previous">
                                      <span aria-hidden="true">&laquo;</span>
                                  </a>
                              </li>
                              <li class="page-item2"><a class="page-link" href="#">${page2-1}</a></li>
                              <li class="page-item2 page-current2"><a class="page-link" href="#">${page2}</a></li>
                          </ul>
                          `);
        } else {
            $('#pagination2').html('');
            $('#pagination2').append(`
                          <ul class="pagination">
                          <li class="page-item2-prev2">
                              <a class="page-link" href="#" aria-label="Previous">
                                  <span aria-hidden="true">&laquo;</span>
                              </a>
                          </li>
                          <li class="page-item2"><a class="page-link" href="#">${page2 - 1}</a></li>
                          <li class="page-item2 page-current2"><a class="page-link" href="#">${page2}</a></li>
                          <li class="page-item2"><a class="page-link" href="#">${page2 + 1}</a></li>
                          <li class="page-item2-next2">
                              <a class="page-link" href="#" aria-label="Next">
                                  <span aria-hidden="true">&raquo;</span>
                              </a>
                          </li>
                      </ul>
                          `);
        };
    };

    $(document).on('click', '.page-item2.page-current2', function(event) {
        event.preventDefault();
    });
    $(document).on('click', '.page-item2:not(.page-current2)', function(event) {
        event.preventDefault();
        page2 = parseInt($(this).find('.page-link').html());
        paginated(dataRender2, page2)
    });
    $(document).on('click', '.page-item2-next2', function(event) {
        event.preventDefault();
        page2 = parseInt(page2) + 1;
        paginated(dataRender2, page2)
    });

    $(document).on('click', '.page-item2-prev2', function(event) {
        event.preventDefault();
        page2 = parseInt(page2) - 1;
        paginated(dataRender2, page2)
    });

    // $('#form-filter').submit()


    $('#open-form').click(function() {
        $('.search-component').fadeIn();
    });
    $('#close-form').click(function() {
        $('.search-component').fadeOut();
    });

    $('#form-filter').on('submit', function(e) {
        e.preventDefault();
        let tieude = $('#search-tieude').val().trim();
        let tacgia = $('#search-tacgia').val().trim();
        let trichyeunoidung = $('#search-trichyeunoidung').val().trim();
        let donviphoihop = $('#search-donviphoihop').val()
        let chuyenmuc = $('#search-chuyenmuc').val();
        let muctin = $('#search-muctin').val();
        let ngay_start = $('#search-ngay-start').val();
        let ngay_end = $('#search-ngay-end').val();
        $.ajax({
            url: `/pm/thiduakhenthuong/filterTinbaiNangcao`,
            data: { tieude, tacgia, donviphoihop, chuyenmuc, muctin, trichyeunoidung, ngay_start, ngay_end },
            success: function(data) {
                dataRender2 = data;
                $('#ngay-from').html(ngay_start.split('-').reverse().join('/'));
                $('#ngay-to').html(ngay_end.split('-').reverse().join('/'));
                paginated(dataRender2, 1);
            }
        })
    });



    $('#search-chuyenmuc').on('change', function() {
        let chuyenmuc = $(this).val();
        let newMuctinList = muctinList.filter(item => {
            return item.chuyenmuc.indexOf(chuyenmuc) !== -1;
        });
        $('#search-muctin').html('');
        $('#search-muctin').append(`
            <option value="">--- Tất cả ---</option>
        `)
        newMuctinList.forEach(item => {
            $('#search-muctin').append(`
            <option value="${item._id}">${item.muctin}</option>
        `)
        });
    })

    // $('.btn-search-nam').click()

    $('#search-ngay-start').change(function() {
        let min = $(this).val();
        $('#search-ngay-end').attr('min', min) // ngày đến min luôn phải lớn hơn giá trị ngày search-ngay-start
        $('#search-ngay-end').click()
    });

    $('#search-ngay-end').change(function() {
        let max = $(this).val();
        $('#search-ngay-start').attr('max', max) // ngày từ mãx luôn phải nhỏ hơn giá trị ngày search-ngay-end
    });


    const chart = (title, data) => {
        let muctin = data.result.map(i => i.muctin);
        let sotinbai = data.result.map(i => i.sotinbai);
        Highcharts.chart('chart', {
            chart: {
                type: 'bar',
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
                    text: 'Mục tin',
                    style: {
                        color: '#333',
                        fontFamily: "Time new Roman",
                        fontSize: '16px'
                    }
                },
                lineColor: '#030303',
                labels: {
                    style: {
                        color: '#636464',
                        fontSize: '12px'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'lượt',
                },
                labels: {
                    overflow: 'justify',
                    style: {
                        color: '#222',
                        fontSize: '12px'
                    }
                },
            },
            tooltip: {
                valueSuffix: ' lượt',
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
                color: '#00cca7',
                data: sotinbai
            }]
        });
    }

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
            url: `/pm/thiduakhenthuong/filterTinbaiChung`,
            data: { min, max },
            success: function(data) {
                console.log(data)
                $('#search-ngay-start').val(min)
                $('#search-ngay-end').val(max)
                let ngay_start = $('#search-ngay-start').val();
                let ngay_end = $('#search-ngay-end').val();
                $('#ngay-from').html(ngay_start.split('-').reverse().join('/'));
                $('#ngay-to').html(ngay_end.split('-').reverse().join('/'));
                $('#thongke-chuyenmuc').html('');
                data.chuyenmucData.forEach(item => {
                    $('#thongke-chuyenmuc').append(`
                    <li class="thongke-item">
                        <span class="thongke-item-tilte"> + ${item.tenchuyenmuc}:<span class="thongke-item-soluong"> ${item.sotinbai}</span> lượt</span>
                    </li>
                    `)
                })
                $('#tongcongtinbai').text(data.total);
                $('#phoihopbaocuatinh').text(data.phoihopbaocuatinh);
                $('#phoihopdoanthanhnien').text(data.phoihopdoanthanhnien);
                $('#phoihophoiphunu').text(data.phoihophoiphunu);
                $('#phoihopcahuyen').text(data.phoihopcahuyen);
                $('#phoihopvoibo').text(data.phoihopvoibo);
                $('#phoihopnganhngoai').text(data.phoihopnganhngoai);
                $('#khongphoihop').text(data.khongphoihop);
                let title = ` từ ngày ${min.split('-').reverse().join('/')} đến ngày ${max.split('-').reverse().join('/')}`
                chart(title, data);
                dataRender2 = data.tinbaiList;
                paginated(dataRender2, 1)
            }
        })
    });
    $('#btn-search-time').click()

})