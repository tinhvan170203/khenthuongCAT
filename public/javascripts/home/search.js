$(document).ready(function() {
    let page0 = 1;
    let perPage0 = 10;
    let start0 = (page0 - 1) * perPage0;
    let end0 = page0 * perPage0;
    let totalPage0 = 0;
    let dataRender0 = [];
    $('.search').click(function(e) {
        e.preventDefault();
        $('.search-canbo').toggleClass('search-canbo-show')
    })
    $('.close-search').click(function() {
        $('.search-canbo').toggleClass('search-canbo-show')
    })

    const paginated0 = (dataRender0, page0) => {
        page0 = parseInt(page0)
        totalPage0 = Math.ceil(dataRender0.length / perPage0);
        start0 = (page0 - 1) * perPage0;
        end0 = page0 * perPage0;
        result = dataRender0.slice(start0, end0);
        $('#total8').html(dataRender0.length)
        $('#bang8').html('');
        if (dataRender0.length > 0) {
            result.forEach((item, index) => {
                $('#bang8').append(`
                        <tr>
                                <td>${(page0 - 1)*perPage0 + index + 1}</td>
                                <td>${item.hoten}</td>
                                <td>${item.capbac}</td>
                                <td>${item.chucvu}</td>
                                <td>${item.room.kyhieu}</td>
                                <td><button class="btn-view"><a href="/pm/thiduakhenthuong/trangcanhan/${item._id}" title="Đi tới trang cá nhân" target="_blank"
                                style="display: inline-block;float: right;"><i class="fas fa-eye"></i> Xem </a></button></td>
                        </tr>
                        `)
            });
        }
        // Check điều kiện trang đầu tiên 
        if (totalPage0 == 0) {
            $('#pagination0').html('');
        } else if (page0 == 1 && totalPage0 == 1) {
            $('#pagination0').html('');
            $('#pagination0').append(`
                            <ul class="pagination">
                                <li class="page-item0  page-current0"><a class="page-link" href="#">1</a></li>
                            </ul>
                        `);
        } else if (page0 == 1 && totalPage0 == 2) {
            $('#pagination0').html('');
            $('#pagination0').append(`
                            <ul class="pagination">
                                <li class="page-item0  page-current0"><a class="page-link" href="#">1</a></li>
                                <li class="page-item0"><a class="page-link" href="#">2</a></li>
                                <li class="page-item0-next0">
                                    <a class="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        `);
        } else if (page0 == 1 && totalPage0 > 2) {
            $('#pagination0').html('');
            $('#pagination0').append(`
                            <ul class="pagination">
                                <li class="page-item0  page-current0"><a class="page-link" href="#">1</a></li>
                                <li class="page-item0"><a class="page-link" href="#">2</a></li>
                                <li class="page-item0"><a class="page-link" href="#">3</a></li>
                                <li class="page-item0-next0">
                                    <a class="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        `);
        } else if (page0 == totalPage0 && page0 > 2) {
            $('#pagination0').html('');
            $('#pagination0').append(`
                        <ul class="pagination">
                            <li class="page-item0-prev0">
                                <a class="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li class="page-item0"><a class="page-link" href="#">${page0 - 2}</a></li>
                            <li class="page-item0"><a class="page-link" href="#">${page0 -1}</a></li>
                            <li class="page-item0 page-current0"><a class="page-link" href="#">${page0}</a></li>
                        </ul>
                        `);
        } else if (page0 == totalPage0 && page0 <= 2) {
            $('#pagination0').html('');
            $('#pagination0').append(`
                        <ul class="pagination">
                            <li class="page-item0-prev0">
                                <a class="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li class="page-item0"><a class="page-link" href="#">${page0-1}</a></li>
                            <li class="page-item0 page-current0"><a class="page-link" href="#">${page0}</a></li>
                        </ul>
                        `);
        } else {
            $('#pagination0').html('');
            $('#pagination0').append(`
                        <ul class="pagination">
                        <li class="page-item0-prev0">
                            <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li class="page-item0"><a class="page-link" href="#">${page0 - 1}</a></li>
                        <li class="page-item0 page-current0"><a class="page-link" href="#">${page0}</a></li>
                        <li class="page-item0"><a class="page-link" href="#">${page0 + 1}</a></li>
                        <li class="page-item0-next0">
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                        `);
        };
    };


    $('#form-search').on('submit', function(e) {
        e.preventDefault();
        $('.search-canbo').toggleClass('search-canbo-show')
        $('.loading ').css('visibility', 'visible');
        $('.loading ').css('opacity', '1');
        let hoten = $('#search-input').val();
        if (hoten === '') {
            hoten = ' '
        };
        let capbac = $('#search-capbac').val();
        let donvi = $('#search-donvi').val();
        $.ajax({
            url: `/pm/thiduakhenthuong/tracuu/canbo`,
            data: { capbac, donvi, hoten },
            success: function(data) {
                $('.loading ').css('visibility', 'hidden');
                $('.loading ').css('opacity', '0');

                $("#modalSearch").modal("toggle")
                dataRender0 = data;
                paginated0(dataRender0, 1);
            }
        })
    });
    $('#form-search1').on('submit', function(e) {
        e.preventDefault();
        $('.search-canbo').toggleClass('search-canbo-show')
        $('.loading ').css('visibility', 'visible');
        $('.loading ').css('opacity', '1');
        let hoten = $('#search-input1').val();
        if (hoten === '') {
            hoten = ' '
        };
        let capbac = $('#search-capbac1').val();
        let donvi = $('#search-donvi1').val();
        $.ajax({
            url: `/pm/thiduakhenthuong/tracuu/canbo`,
            data: { capbac, donvi, hoten },
            success: function(data) {
                $('.loading ').css('visibility', 'hidden');
                $('.loading ').css('opacity', '0');

                $("#modalSearch").modal("toggle")
                dataRender0 = data;
                paginated0(dataRender0, 1);
            }
        })
    });

    $(document).on('click', '.page-item0.page-current0', function(event) {
        event.preventDefault();
    });
    $(document).on('click', '.page-item0:not(.page-current0)', function(event) {
        event.preventDefault();
        page0 = parseInt($(this).find('.page-link').html());
        paginated0(dataRender0, page0)
        $('.page-current').removeClass('page-current0');
        $(this).addClass('page-current0');
    });
    $(document).on('click', '.page-item0-next0', function(event) {
        event.preventDefault();
        page0 = parseInt(page0) + 1;
        paginated0(dataRender0, page0)
    });

    $(document).on('click', '.page-item0-prev0', function(event) {
        event.preventDefault();
        page0 = parseInt(page0) - 1;
        paginated0(dataRender0, page0)
    });



})