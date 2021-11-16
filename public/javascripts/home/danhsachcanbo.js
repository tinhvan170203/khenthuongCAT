$(document).ready(function() {
    let page = 1;
    const id = $('.menu-left').attr('id');
    const getCanbo = (page) => {
        page = parseInt(page);
        $.ajax({
            url: `/pm/thiduakhenthuong/phong/${id}/danhsachcanbo/getData/${page}`,
            success: function(data) {
                $('#canbo-list').html('');
                data.canboList.forEach((user, index) => {
                    $('#canbo-list').append(`
                              <tr id="${user._id}">
                                  <td>${(page - 1)*data.perPage + index + 1}</td>
                                  <td>${user.hoten}</td>
                                  <td style="text-align:center">${user.ngaysinh.split('-').reverse().join('/')}</td>
                                  <td style="text-align:center">${user.sohieuCAND}</td>
                                  <td style="text-align:center">${user.capbac}</td>
                                  <td>${user.chucvu}</td>
                                  <td>${user.dangvien === "true" ? '<i style="font-size: 20px;color: #18a945;text-align: center;display: block;" class="fas fa-check"></i>' : ''}</td>
                                  <td>${user.donvicongtac.ten}</td>
                                  <td>   <button class="btn-view"><a href="/pm/thiduakhenthuong/trangcanhan/${user._id}"><i class="fas fa-eye"></i> Xem</a></button></td>
                              </tr>
                          `)
                });
                if (page > data.totalPage) {
                    getCanbo(data.totalPage)
                }
                // Check điều kiện trang đầu tiên 
                if (data.totalPage == 0) {
                    $('#pagination1').html('');
                } else if (page == 1 && data.totalPage == 1) {
                    $('#pagination1').html('');
                    $('#pagination1').append(`
                              <ul class="pagination">
                                  <li class="page-item  page-current"><a class="page-link" href="#">1</a></li>
                              </ul>
                          `);
                } else if (page == 1 && data.totalPage == 2) {
                    $('#pagination1').html('');
                    $('#pagination1').append(`
                              <ul class="pagination">
                                  <li class="page-item  page-current"><a class="page-link" href="#">1</a></li>
                                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                                  <li class="page-item-next">
                                      <a class="page-link" href="#" aria-label="Next">
                                          <span aria-hidden="true">&raquo;</span>
                                      </a>
                                  </li>
                              </ul>
                          `);
                } else if (page == 1 && data.totalPage > 2) {
                    $('#pagination1').html('');
                    $('#pagination1').append(`
                              <ul class="pagination">
                                  <li class="page-item  page-current"><a class="page-link" href="#">1</a></li>
                                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                                  <li class="page-item-next">
                                      <a class="page-link" href="#" aria-label="Next">
                                          <span aria-hidden="true">&raquo;</span>
                                      </a>
                                  </li>
                              </ul>
                          `);
                } else if (page == data.totalPage && page > 2) {
                    $('#pagination1').html('');
                    $('#pagination1').append(`
                          <ul class="pagination">
                              <li class="page-item-prev">
                                  <a class="page-link" href="#" aria-label="Previous">
                                      <span aria-hidden="true">&laquo;</span>
                                  </a>
                              </li>
                              <li class="page-item"><a class="page-link" href="#">${page - 2}</a></li>
                              <li class="page-item"><a class="page-link" href="#">${page-1}</a></li>
                              <li class="page-item page-current"><a class="page-link" href="#">${page}</a></li>
                          </ul>
                          `);
                } else if (page == data.totalPage && page <= 2) {
                    $('#pagination1').html('');
                    $('#pagination1').append(`
                          <ul class="pagination">
                              <li class="page-item-prev">
                                  <a class="page-link" href="#" aria-label="Previous">
                                      <span aria-hidden="true">&laquo;</span>
                                  </a>
                              </li>
                              <li class="page-item"><a class="page-link" href="#">${page-1}</a></li>
                              <li class="page-item page-current"><a class="page-link" href="#">${page}</a></li>
                          </ul>
                          `);
                } else {
                    $('#pagination1').html('');
                    $('#pagination1').append(`
                          <ul class="pagination">
                          <li class="page-item-prev">
                              <a class="page-link" href="#" aria-label="Previous">
                                  <span aria-hidden="true">&laquo;</span>
                              </a>
                          </li>
                          <li class="page-item"><a class="page-link" href="#">${page - 1}</a></li>
                          <li class="page-item page-current"><a class="page-link" href="#">${page}</a></li>
                          <li class="page-item"><a class="page-link" href="#">${page + 1}</a></li>
                          <li class="page-item-next">
                              <a class="page-link" href="#" aria-label="Next">
                                  <span aria-hidden="true">&raquo;</span>
                              </a>
                          </li>
                      </ul>
                          `);
                }
            }
        })
    };
    getCanbo(1)

    $(document).on('click', '.page-item:not(.page-current)', function(event) {
        event.preventDefault();
        page = $(this).find('.page-link').html();
        getCanbo(page);
        $('.page-current').removeClass('page-current');
        $(this).addClass('page-current');
    });

    $(document).on('click', '.page-item.page-current', function(event) {
        event.preventDefault();
    });

    $(document).on('click', '.page-item-next', function(event) {
        event.preventDefault();
        page = parseInt(page) + 1;
        getCanbo(page)
    });

    $(document).on('click', '.page-item-prev', function(event) {
        event.preventDefault();
        page = parseInt(page) - 1;
        getCanbo(page)
    });
})