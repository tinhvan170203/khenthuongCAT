$(document).ready(function() {
            const id = $('.menu-left').attr('id');
            $('#btn-search-vianninh').click(function() {
                        let nam = $('#nam-vianninh').val();
                        $.ajax({
                                    url: `/pm/thiduakhenthuong/doi/${id}/filterThiduathangDoi/${nam}`,
                                    success: function(data) {
                                            $('#load-data').html('');
                                            const loadData = (data) => {
                                                    let dataRender = "";
                                                    for (let i = 1; i <= 12; i++) {
                                                        let row = `<td>
                                                                              ${data.thiduathang[0][`thang${i}`].flag === 'đỏ' ?     
                                                                              `<i title="${data.thiduathang[0][`thang${i}`].ghichu !== undefined ? data.thiduathang[0][`thang${i}`].ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #ff0000'></i>` : '' 
                                                                              || data.thiduathang[0][`thang${i}`].flag === 'xanh' ?   
                                                                              `<i title="${data.thiduathang[0][`thang${i}`].ghichu !== undefined ? data.thiduathang[0][`thang${i}`].ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #0592c6'></i>`: ''
                                                                              || data.thiduathang[0][`thang${i}`].flag === 'vàng' ?   
                                                                              `<i title="${data.thiduathang[0][`thang${i}`].ghichu !== undefined ? data.thiduathang[0][thang[i]].ghichu : ''}" class = "fas fa-flag"style = 'text-align:center;font-size: 16px;display: block;color: #c4aa00'></i>`: ''
                                                                        } 
                                                                        </td>`;
                                                                        dataRender += row;
                                                                  }
                                                return dataRender;
                                            };
                                            data.forEach((item, index) => {
                                                        $('#load-data').append(`
                     <tr>
                        <td style="text-align:center">${index + 1}</td>
                        <td>${item.hoten}</td>
                        <td style="text-align:center">${item.chucvu}</td>
                        ${loadData(item)}       
                     </tr>
                     `)
                })
            }
        })
    });
    
    $('#btn-search-vianninh').click()
})