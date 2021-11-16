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
                                <td>${item.ten}</td>
                                <td>${item.ngaytochuc.split('-').reverse().join('/')}</td>
                                <td>${item.diadiemtochuc}</td>
                                <td>${item.captochuc}</td>
                                <td>${item.ketqua}</td>
                                <td>${item.trichyeu}</td>
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
    // $('#form-filter').submit()


    $('#open-form').click(function() {
        $('.search-component').fadeIn();
    });
    $('#close-form').click(function() {
        $('.search-component').fadeOut();
    });


    $('#form-filter').on('submit', function(e) {
        e.preventDefault();
        let ten = $('#search-ten').val().trim();
        let diadiemtochuc = $('#search-diadiemtochuc').val().trim();
        let captochuc = $('#search-captochuc').val().trim();
        let ketqua = $('#search-ketqua').val().trim();
        let trichyeu = $('#search-trichyeu').val().trim();
        let ngay_start = $('#search-ngay-start').val();
        let ngay_end = $('#search-ngay-end').val();
        $.ajax({
            url: `/pm/thiduakhenthuong/filterCuocthituyentruyen`,
            data: { ten, diadiemtochuc, captochuc, ketqua, ngay_start, ngay_end, trichyeu },
            success: function(data) {
                dataRender2 = data;
                $('#ngay-from').html(ngay_start.split('-').reverse().join('/'));
                $('#ngay-to').html(ngay_end.split('-').reverse().join('/'));
                paginated(dataRender2, 1);
            }
        })
    });
    $('.btn-search-nam').click()

    $('#search-ngay-start').change(function() {
        let min = $(this).val();
        $('#search-ngay-end').attr('min', min) // ngày đến min luôn phải lớn hơn giá trị ngày search-ngay-start
        $('#search-ngay-end').click()
    });

    $('#search-ngay-end').change(function() {
        let max = $(this).val();
        $('#search-ngay-start').attr('max', max) // ngày từ mãx luôn phải nhỏ hơn giá trị ngày search-ngay-end
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

})