$(document).ready(function() {
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
                                    <td>${item.donviduockiemtra.kyhieu}</td>
                                    <td>${item.ghichu}</td>
                                    <td style="text-align: center"><a class="download" href="/congtacdieulenh/quantri/kiemtra/theluc/download/${item.tep}"><i style="font-size:20px" class="fas fa-file-word"></i></a></td>
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

    let dataRender4 = [];
    $('#btn-search-vianninh').click(function(e) {
        let nam = $('#nam-vianninh').val();
        $.ajax({
            url: `/pm/thiduakhenthuong/filterKiemtratheluc`,
            data: { nam },
            success: function(data) {
                dataRender2 = data;
                paginated(dataRender2, 1);
            }
        });
        $.ajax({
            url: `/pm/thiduakhenthuong/filterKiemtratheluc/theluc/khongdat/${nam}`,
            success: function(data) {
                dataRender4 = data;
                paginated4(dataRender4, 1);
            }
        });

    });



    $(document).on('click', '.page-item2.page-current2', function(event) {
        event.preventDefault();
    });
    $(document).on('click', '.page-item2:not(.page-current2)', function(event) {
        event.preventDefault();
        page2 = parseInt($(this).find('.page-link').html());
        paginated(dataRender2, page2)
        $('.page-current').removeClass('page-current2');
        $(this).addClass('page-current2');
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
    //Download file
    $(document).on('click', '.download', function(e) {
        e.preventDefault();
        let url = $(this).attr('href'); //lấy ra link download
        window.location.href = url //tiến hành download
    });
    $('.btn-search-nam').click()


    //danh sách k đạt
    let page4 = 1;
    let perPage4 = 10;
    let start4 = (page4 - 1) * perPage4;
    let end4 = page4 * perPage4;
    let totalPage4 = 0;

    const paginated4 = (dataRender4, page4) => {
        page4 = parseInt(page4)
        totalPage4 = Math.ceil(dataRender4.length / perPage4);
        start4 = (page4 - 1) * perPage4;
        end4 = page4 * perPage4;
        result = dataRender4.slice(start4, end4);
        $('#bang4').html('');
        $('#total4').html(dataRender4.length);
        result.forEach((item, index) => {
                $('#bang4').append(`
              <tr>
                  <td>${(page4 - 1)*perPage4 + index + 1}</td>
                  <td>${item.hoten}</td>
                  <td><img src="${item.img}" style="width: 150px;
                  display: block;margin: 0 auto"></td>
                  <td>${item.capbac}</td>
                  <td>${item.chucvu}</td>
                  <td>${item.donvicongtac.ten}</td>
                  <td>${item.room.kyhieu}</td>
                  <td><button class="btn-view"><a href="/pm/thiduakhenthuong/trangcanhan/${item._id}"><i class="far fa-eye"></i> Xem</a></button></td>   
              </tr>`)
            })
            // Check điều kiện trang đầu tiên 
        if (totalPage4 == 0) {
            $('#pagination4').html('');
        } else if (page4 == 1 && totalPage4 == 1) {
            $('#pagination4').html('');
            $('#pagination4').append(`
                        <ul class="pagination">
                              <li class="page-item4  page-current4"><a class="page-link4" href="#">1</a></li>
                        </ul>
                        `);
        } else if (page4 == 1 && totalPage4 == 2) {
            $('#pagination4').html('');
            $('#pagination4').append(`
                        <ul class="pagination">
                              <li class="page-item4  page-current4"><a class="page-link4" href="#">1</a></li>
                              <li class="page-item4"><a class="page-link4" href="#">2</a></li>
                              <li class="page-item4-next4">
                                    <a class="page-link4" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                    </a>
                              </li>
                        </ul>
                        `);
        } else if (page4 == 1 && totalPage4 > 2) {
            $('#pagination4').html('');
            $('#pagination4').append(`
                        <ul class="pagination">
                              <li class="page-item4  page-current4"><a class="page-link4" href="#">1</a></li>
                              <li class="page-item4"><a class="page-link4" href="#">2</a></li>
                              <li class="page-item4"><a class="page-link4" href="#">3</a></li>
                              <li class="page-item4-next4">
                                    <a class="page-link4" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                    </a>
                              </li>
                        </ul>
                        `);
        } else if (page4 == totalPage4 && page4 > 2) {
            $('#pagination4').html('');
            $('#pagination4').append(`
                        <ul class="pagination">
                        <li class="page-item4-prev4">
                              <a class="page-link4" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                              </a>
                        </li>
                        <li class="page-item4"><a class="page-link4" href="#">${page4 - 2}</a></li>
                        <li class="page-item4"><a class="page-link4" href="#">${page4 -1}</a></li>
                        <li class="page-item4 page-current4"><a class="page-link4" href="#">${page4}</a></li>
                        </ul>
                        `);
        } else if (page4 == totalPage4 && page4 <= 2) {
            $('#pagination4').html('');
            $('#pagination4').append(`
                        <ul class="pagination">
                        <li class="page-item4-prev4">
                              <a class="page-link4" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                              </a>
                        </li>
                        <li class="page-item4"><a class="page-link4" href="#">${page4-1}</a></li>
                        <li class="page-item4 page-current4"><a class="page-link4" href="#">${page4}</a></li>
                        </ul>
                        `);
        } else {
            $('#pagination4').html('');
            $('#pagination4').append(`
                        <ul class="pagination">
                        <li class="page-item4-prev4">
                        <a class="page-link4" href="#" aria-label="Previous">
                              <span aria-hidden="true">&laquo;</span>
                        </a>
                        </li>
                        <li class="page-item4"><a class="page-link4" href="#">${page4 - 1}</a></li>
                        <li class="page-item4 page-current4"><a class="page-link4" href="#">${page4}</a></li>
                        <li class="page-item4"><a class="page-link4" href="#">${page4 + 1}</a></li>
                        <li class="page-item4-next4">
                        <a class="page-link4" href="#" aria-label="Next">
                              <span aria-hidden="true">&raquo;</span>
                        </a>
                        </li>
                  </ul>
                        `);
        };
    };
    paginated4(dataRender4, page4)

    $(document).on('click', '.page-item4.page-current4', function(event) {
        event.preventDefault();
    });
    $(document).on('click', '.page-item4:not(.page-current4)', function(event) {
        event.preventDefault();
        page4 = parseInt($(this).find('.page-link4').html());
        paginated4(dataRender4, page4)
    });
    $(document).on('click', '.page-item4-next4', function(event) {
        event.preventDefault();
        page4 = parseInt(page4) + 1;
        paginated4(dataRender4, page4)
    });

    $(document).on('click', '.page-item4-prev4', function(event) {
        event.preventDefault();
        page4 = parseInt(page4) - 1;
        paginated4(dataRender4, page4)
    });


    $('#open-form').click(function() {
        $('.search-component').fadeIn();
    });
    $('#close-form').click(function() {
        $('.search-component').fadeOut();
    });

    $('#form-filter').on('submit', function(e) {
        e.preventDefault();
        let hoten = $('#search-hoten').val().trim();
        let capbac = $('#search-capbacCB').val();
        let donvicongtac = $('#search-donvicongtac').val();
        let filterList = dataRender4.filter(item => {
            return item.hoten.toLowerCase().indexOf(hoten.toLowerCase()) !== -1 &&
                item.capbac.toLowerCase().indexOf(capbac.toLowerCase()) !== -1 &&
                item.donvicongtac.ten.toLowerCase().indexOf(donvicongtac.toLowerCase()) !== -1
        });
        paginated4(filterList, page4)
    });
})