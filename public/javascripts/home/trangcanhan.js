$(document).ready(function() {
            let data_khenthuong = JSON.parse($('#data-khenthuong').html());

            let page2 = 1;
            let perPage2 = 10;
            let start2 = (page2 - 1) * perPage2;
            let end2 = page2 * perPage2;
            let totalPage2 = 0;

            const paginated = (data_khenthuong, page2) => {
                page2 = parseInt(page2)
                totalPage2 = Math.ceil(data_khenthuong.length / perPage2);
                start2 = (page2 - 1) * perPage2;
                end2 = page2 * perPage2;
                result = data_khenthuong.slice(start2, end2);
                $('#total').html(data_khenthuong.length)
                $('#bang2').html('');
                if (data_khenthuong.length > 0) {
                    result.forEach((item, index) => {
                        $('#bang2').append(`
                        <tr>
                                <td>${(page2 - 1)*perPage2 + index + 1}</td>
                                <td>${item.soQD}</td>
                                <td>${item.ngayQD.split('-').reverse().join('/')}</td>
                                <td>${item.noidungkhenthuong}</td>
                                <td>${item.capkhenthuong}</td>
                                <td>${item.hinhthuckhenthuong}</td>
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
            paginated(data_khenthuong, page2)

            $(document).on('click', '.page-item2.page-current2', function(event) {
                event.preventDefault();
            });
            $(document).on('click', '.page-item2:not(.page-current2)', function(event) {
                event.preventDefault();
                page2 = parseInt($(this).find('.page-link').html());
                paginated(data_khenthuong, page2)
            });
            $(document).on('click', '.page-item2-next2', function(event) {
                event.preventDefault();
                page2 = parseInt(page2) + 1;
                paginated(data_khenthuong, page2)
            });

            $(document).on('click', '.page-item2-prev2', function(event) {
                event.preventDefault();
                page2 = parseInt(page2) - 1;
                paginated(data_khenthuong, page2)
            });


            let data_thiduathang = JSON.parse($('#data-thiduathang').html());
            let page3 = 1;
            let perPage3 = 5;
            let start3 = (page3 - 1) * perPage3;
            let end3 = page3 * perPage3;
            let totalPage3 = 0;

            const paginated3 = (data_thiduathang, page3) => {
                    page3 = parseInt(page3)
                    totalPage3 = Math.ceil(data_thiduathang.length / perPage3);
                    start3 = (page3 - 1) * perPage3;
                    end3 = page3 * perPage3;
                    result = data_thiduathang.slice(start3, end3);
                    $('#bang3').html('');

                    const loadData = (data) => {
                            let dataRender = "";
                            for (let i = 1; i <= 12; i++) {
                                let row = `<td>
                                            ${data[`thang${i}`] === undefined ? '' : ''
                                          || data[`thang${i}`].flag === 'đỏ' ?     
                                            `<i title="${data[`thang${i}`].ghichu !== undefined ? data[`thang${i}`].ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #ff0000'></i>` : '' 
                                            || data[`thang${i}`].flag === 'xanh' ?   
                                            `<i title="${data[`thang${i}`].ghichu !== undefined ? data[`thang${i}`].ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #0592c6'></i>`: ''
                                            || data[`thang${i}`].flag === 'vàng' ?   
                                            `<i title="${data[`thang${i}`].ghichu !== undefined ? data[thang[i]].ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #c4aa00'></i>`: ''
                                      } 
                                      </td>`;
                                      dataRender += row;
                                }
              return dataRender;
          };

            if (data_thiduathang.length > 0) {
                result.forEach((item, index) => {
                    $('#bang3').append(`
                          <tr>
                               <td>${item.nam}</td>
                             ${loadData(item)}
                          </tr>
                          `)
                });
            }
            // Check điều kiện trang đầu tiên 
            if (totalPage3 == 0) {
                $('#pagination3').html('');
            } else if (page3 == 1 && totalPage3 == 1) {
                $('#pagination3').html('');
                $('#pagination3').append(`
                              <ul class="pagination">
                                  <li class="page-item3  page-current3"><a class="page-link3" href="#">1</a></li>
                              </ul>
                          `);
            } else if (page3 == 1 && totalPage3 == 2) {
                $('#pagination3').html('');
                $('#pagination3').append(`
                              <ul class="pagination">
                                  <li class="page-item3  page-current3"><a class="page-link3" href="#">1</a></li>
                                  <li class="page-item3"><a class="page-link3" href="#">2</a></li>
                                  <li class="page-item3-next3">
                                      <a class="page-link3" href="#" aria-label="Next">
                                          <span aria-hidden="true">&raquo;</span>
                                      </a>
                                  </li>
                              </ul>
                          `);
            } else if (page3 == 1 && totalPage3 > 2) {
                $('#pagination3').html('');
                $('#pagination3').append(`
                              <ul class="pagination">
                                  <li class="page-item3  page-current3"><a class="page-link3" href="#">1</a></li>
                                  <li class="page-item3"><a class="page-link3" href="#">2</a></li>
                                  <li class="page-item3"><a class="page-link3" href="#">3</a></li>
                                  <li class="page-item3-next3">
                                      <a class="page-link3" href="#" aria-label="Next">
                                          <span aria-hidden="true">&raquo;</span>
                                      </a>
                                  </li>
                              </ul>
                          `);
            } else if (page3 == totalPage3 && page3 > 2) {
                $('#pagination3').html('');
                $('#pagination3').append(`
                          <ul class="pagination">
                              <li class="page-item3-prev3">
                                  <a class="page-link3" href="#" aria-label="Previous">
                                      <span aria-hidden="true">&laquo;</span>
                                  </a>
                              </li>
                              <li class="page-item3"><a class="page-link3" href="#">${page3 - 2}</a></li>
                              <li class="page-item3"><a class="page-link3" href="#">${page3 -1}</a></li>
                              <li class="page-item3 page-current3"><a class="page-link3" href="#">${page3}</a></li>
                          </ul>
                          `);
            } else if (page3 == totalPage3 && page3 <= 2) {
                $('#pagination3').html('');
                $('#pagination3').append(`
                          <ul class="pagination">
                              <li class="page-item3-prev3">
                                  <a class="page-link3" href="#" aria-label="Previous">
                                      <span aria-hidden="true">&laquo;</span>
                                  </a>
                              </li>
                              <li class="page-item3"><a class="page-link3" href="#">${page3-1}</a></li>
                              <li class="page-item3 page-current3"><a class="page-link3" href="#">${page3}</a></li>
                          </ul>
                          `);
            } else {
                $('#pagination3').html('');
                $('#pagination3').append(`
                          <ul class="pagination">
                          <li class="page-item3-prev3">
                              <a class="page-link3" href="#" aria-label="Previous">
                                  <span aria-hidden="true">&laquo;</span>
                              </a>
                          </li>
                          <li class="page-item3"><a class="page-link3" href="#">${page3 - 1}</a></li>
                          <li class="page-item3 page-current3"><a class="page-link3" href="#">${page3}</a></li>
                          <li class="page-item3"><a class="page-link3" href="#">${page3 + 1}</a></li>
                          <li class="page-item3-next3">
                              <a class="page-link3" href="#" aria-label="Next">
                                  <span aria-hidden="true">&raquo;</span>
                              </a>
                          </li>
                      </ul>
                          `);
            };
        };
        paginated3(data_thiduathang, page3)

        $(document).on('click', '.page-item3.page-current3', function(event) {
            event.preventDefault();
        });
        $(document).on('click', '.page-item3:not(.page-current3)', function(event) {
            event.preventDefault();
            page3 = parseInt($(this).find('.page-link3').html());
            console.log($(this))
            paginated3(data_thiduathang, page3)
        });
        $(document).on('click', '.page-item3-next3', function(event) {
            event.preventDefault();
            page3 = parseInt(page3) + 1;
            paginated3(data_thiduathang, page3)
        });

        $(document).on('click', '.page-item3-prev3', function(event) {
            event.preventDefault();
            page3 = parseInt(page3) - 1;
            paginated3(data_thiduathang, page3)
        });


      let data_thiduanam = JSON.parse($('#data-thiduanam').html());
      let page4 = 1;
      let perPage4 = 5;
      let start4 = (page4 - 1) * perPage4;
      let end4 = page4 * perPage4;
      let totalPage4 = 0;

      const paginated4 = (data_thiduanam, page4) => {
                  page4 = parseInt(page4)
                  totalPage4 = Math.ceil(data_thiduanam.length / perPage4);
                  start4 = (page4 - 1) * perPage4;
                  end4 = page4 * perPage4;
                  result = data_thiduanam.slice(start4, end4);
                  $('#bang4').html('');
let dangvien = $('#bang4').attr('class') === "true";
if(dangvien){
      if (data_thiduanam.length > 0) {
            result.forEach((item, index) => {
                  $('#bang4').append(`
                        <tr>
                              <td style="text-align:center">${item.nam}</td>
                              <td style="text-align:center">${item.dangkithidua === undefined ? '' : item.dangkithidua}</td>
                              <td style="text-align:center">${item.xeploai === undefined ? '' : item.xeploai}</td>
                              <td style="text-align:center">${item.dangkixeploaidangvien === undefined ? '' : item.dangkixeploaidangvien}</td>
                              <td style="text-align:center">${item.xeploaidangvien === undefined ? '' : item.xeploaidangvien}</td>
                              <td>${item.ghichu === undefined ?  '' : item.ghichu}</td>
                        </tr>
                        `)
            })
      };
}else{
      if (data_thiduanam.length > 0) {
            result.forEach((item, index) => {
                  $('#bang4').append(`
                        <tr>
                              <td style="text-align:center">${item.nam}</td>
                              <td style="text-align:center">${item.dangkithidua === undefined ? '' : item.dangkithidua}</td>
                              <td style="text-align:center">${item.xeploai === undefined ? '' : item.xeploai}</td>
                              <td>${item.ghichu === undefined ?  '' : item.ghichu}</td>
                        </tr>
                        `)
            })
      };
}
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
  paginated4(data_thiduanam, page4)

      $(document).on('click', '.page-item4.page-current4', function(event) {
      event.preventDefault();
      });
      $(document).on('click', '.page-item4:not(.page-current4)', function(event) {
      event.preventDefault();
      page4 = parseInt($(this).find('.page-link4').html());
      console.log($(this))
      paginated4(data_thiduanam, page4)
      });
      $(document).on('click', '.page-item4-next4', function(event) {
      event.preventDefault();
      page4 = parseInt(page4) + 1;
      paginated4(data_thiduanam, page4)
      });

      $(document).on('click', '.page-item4-prev4', function(event) {
      event.preventDefault();
      page4 = parseInt(page4) - 1;
      paginated4(data_thiduanam, page4)
      });
})