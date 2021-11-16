$(document).ready(function() {
    const id = $('.menu-left').attr('id');
    $('#btn-search-vianninh').click(function() {
        let nam = $('#nam-vianninh').val();
        $.ajax({
            url: `/pm/thiduakhenthuong/doi/${id}/filterThiduanamDoi/${nam}`,
            success: function(data) {
                $('#load-data').html('');
                data.forEach((item, index) => {
                    $('#load-data').append(`
                             <tr>
                                <td style="text-align:center">${index + 1}</td>
                                <td>${item.hoten}</td>
                                <td style="text-align:center">${item.chucvu}</td>
                                <td style="text-align:center">${item.thiduanam[0].dangkithidua !== undefined ?  item.thiduanam[0].dangkithidua : ''}</td>     
                                <td style="text-align:center">${item.thiduanam[0].xeploai !== undefined ?  item.thiduanam[0].xeploai : ''}</td>     
                                <td style="text-align:center">${item.thiduanam[0].ghichu !== undefined ?  item.thiduanam[0].ghichu : ''}</td>     
                             </tr>
                             `)
                });
            }
        })
    });

    $('#btn-search-vianninh').click();

})