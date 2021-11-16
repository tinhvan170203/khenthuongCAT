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
                                    <td>${item.donviduockiemtra.ten}</td>
                                    <td>${item.thoigian.slice(11)} ${item.thoigian.slice(0,10).split('-').reverse().join('/')}</td>
                                    <td>${item.tinhhuong.ten}</td>
                                    <td>${item.ketqua}</td>
                                    <td>${item.xuli}</td>
                                    <td style="text-align: center"><a class="download" href="/congtacdieulenh/kiemtra/tinhhuong/download/${item.tep}"><i style="font-size:20px" class="fas fa-file-word"></i></a></td>
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

    $('#form-filter').on('submit', function(e) {
        e.preventDefault();
        let donviduockiemtra = $('#search-donviduockiemtra').val().trim();
        let ketqua = $('#search-ketqua').val().trim();
        let tinhhuong = $('#search-tinhhuong').val();
        let xuli = $('#search-xuli').val().trim();
        let ngay_start = $('#search-ngay-start').val();
        let ngay_end = $('#search-ngay-end').val();
        $.ajax({
            url: `/pm/thiduakhenthuong/filterKiemtraTinhhuong`,
            data: { tinhhuong, donviduockiemtra, ketqua, xuli, ngay_start, ngay_end },
            success: function(data) {
                dataRender2 = data;
                paginated(dataRender2, 1);
            }
        })
    });


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
    //Download file
    $(document).on('click', '.download', function(e) {
        e.preventDefault();
        let url = $(this).attr('href'); //lấy ra link download
        window.location.href = url //tiến hành download
    });


    $('.btn-search-nam').click()
})