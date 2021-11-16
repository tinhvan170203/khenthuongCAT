$(document).ready(function() {
    const id = $('.menu-left').attr('id');
    $('#btn-search-vianninh').click(function() {
        let nam = $('#nam-vianninh').val();
        $.ajax({
            url: `/pm/thiduakhenthuong/doi/${id}/filterDangvienDoi/${nam}`,
            success: function(data) {
                $('#load-data').html('');
                data.forEach((item, index) => {
                    $('#load-data').append(`
                               <tr>
                                  <td style="text-align:center">${index + 1}</td>
                                  <td>${item.hoten}</td>
                                  <td style="text-align:center">${item.chucvu}</td>
                                  <td style="text-align:center">${item.thiduanam[0].dangkixeploaidangvien !== undefined ?  item.thiduanam[0].dangkixeploaidangvien : ''}</td>     
                                  <td style="text-align:center">${item.thiduanam[0].xeploaidangvien !== undefined ?  item.thiduanam[0].xeploaidangvien : ''}</td>     
                               </tr>
                               `)
                });
            }
        })
    });

    $('#btn-search-vianninh').click();

})