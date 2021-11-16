$(document).ready(function() {
    let page2 = 1;
    let perPage2 = 1;
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
                          <td style="text-align:center">${(page2 - 1)*perPage2 + index + 1}</td>
                          <td>${item.hoten}</td>
                          <td style="text-align:center"><img style="width: 150px;display:block;
                          margin: 0 auto" src="${item.img}"></td>
                          <td style="text-align:center">${item.capbac}</td>     
                          <td style="text-align:center">${item.chucvu}</td>     
                          <td style="text-align:center">${item.room.ten}</td>     
                          <td style="text-align:center"><button class="btn-view"><a href="/pm/thiduakhenthuong/trangcanhan/${item._id}"><i class="fas fa-eye"></i> Chi tiết</a></button></td>     
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


    $('#form').on('submit', function(e) {
        e.preventDefault();
        let nam = $('#nam-vianninh').val();
        let loaihinh = $('#loaihinhvannghe').val();
        $.ajax({
            url: `/pm/thiduakhenthuong/filterThethaoList`,
            data: { nam, loaihinh },
            success: function(data) {
                $('#nam').text(nam)
                $('#loaihinh').text($('#loaihinhvannghe option:selected').html())
                dataRender2 = data;
                paginated(dataRender2, 1);
            }
        })
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
    //     $('#btn-search-vianninh').click();

})