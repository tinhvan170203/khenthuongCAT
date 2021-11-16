$(document).ready(function() {
    var allRole = JSON.parse($('#variableJSON').text());
    $('#variableJSON').remove();
    // Add chuyên mục 
    $('#chuyenmucForm').on('submit', function(e) {
        e.preventDefault();
        let new_chuyenmuc = $('#tenchuyenmuc').val().trim();
        $.ajax({
            url: '/tuyentruyen/addChuyenmuc',
            method: 'POST',
            data: { tenchuyenmuc: new_chuyenmuc },
            error: function() {
                alert('Có lỗi xảy ra khi thêm chuyên mục mới...')
            },
            success: function(id) {
                $('.btn-close').click();
                $('#tenchuyenmuc').val('');
                $('#chuyenmuc-list').append(`
                    <li class="demuc-item" id=${id}>
                        <img src="http://congan.hungyen.gov.vn/images/footer-logo.png" alt="" class="demuc-item-img">
                        <span class="demuc-item-title">${new_chuyenmuc}</span>
                        <div class="demuc-item-action">
                            <i class="fas fa-pen edit-demuc" data-bs-toggle="modal" data-bs-target="#modalEditChuyenmuc" data-bs-backdrop='static' title="Sửa"></i>
                            <i class="fas fa-times-circle delete-demuc" title="Xóa"></i>
                        </div>
                    </li>
                `);
                $('#accordionFlushExample').append(`
                <div class="accordion-item getmuctin">
                    <a href="#">
                        <h2 class="accordion-header" id="flush-heading-${id}">
                            <button id="${id}-btn" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${id}" aria-expanded="false" aria-controls="flush-collapseOne">
                                ${new_chuyenmuc}
                            </button>
                        </h2>
                        <div id="flush-collapse-${id}" class="accordion-collapse collapse" aria-labelledby="flush-heading-${id}" data-bs-parent="#accordionFlushExample">
                         
                        </div>
                    </a>
                </div>
                `)
                let toast = $('#add-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000
                })
                bsToast.show(); //show toast
            }
        })
    });
    // Edit tên chuyên mục 
    let idEdit; //khai báo id chuyên mục edit biến global
    $(document).on('click', '.edit-demuc', function() {
        $('#chuyenmuc-wrapper').fadeOut();
        let parentNode = $(this).closest('li');
        idEdit = parentNode.attr('id');
        let tenchuyenmuc = parentNode.find('.demuc-item-title').text().trim();
        $('#Edit_tenchuyenmuc').val(tenchuyenmuc)
    });
    $('#EditChuyenmucForm').on('submit', (e) => { //submit form
        e.preventDefault();
        let tenchuyenmuc_edit = $('#Edit_tenchuyenmuc').val().trim();
        $.ajax({
            url: '/tuyentruyen/editChuyenmuc',
            method: 'POST',
            data: {
                tenchuyenmuc: tenchuyenmuc_edit,
                idEdit
            },
            error: () => alert('Có lỗi xảy ra khi sửa tên chuyên mục...'),
            success: () => {
                $('.btn-close').click();
                $(`#${idEdit}-btn`).html(tenchuyenmuc_edit);
                $(`#${idEdit}`).find('.demuc-item-title').text($('#Edit_tenchuyenmuc').val())
                let toast = $('#edit-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: true
                })
                bsToast.show(); //show toast
            }
        })
    });
    //     End Edit chuyên mục 
    // Delete chuyên mục 
    let idDelete; //khai báo biến global

    $(document).on('click', '.delete-demuc', function() {
        let parentNode = $(this).closest('li');
        idDelete = parentNode.attr('id');
        let isDelete = confirm('Bạn có đồng ý xóa chuyên mục này? Nếu xóa chuyên mục, tất cả tin bài trong mục này sẽ bị xóa... Đồng ý xóa click "Ok", hủy bỏ click "Cancel"');
        if (isDelete) {
            $('#chuyenmuc-wrapper').fadeOut();
            $.ajax({
                url: '/tuyentruyen/deleteChuyenmuc/' + idDelete,
                method: 'GET',
                error: () => {
                    alert('Có lỗi xảy ra khi xóa chuyên mục...')
                },
                success: () => {
                    parentNode.remove();
                    $(`#${idDelete}-btn`).closest('div').remove();
                    let toast = $('#delete-toast');
                    let bsToast = new bootstrap.Toast(toast, {
                        delay: 3000,
                        animation: true
                    })
                    bsToast.show(); //show toast  
                }
            })
        }
    });

    // Biểu đồ tin bải theo năm 

    // Highcharts.chart('thongke-tinbai', {
    //     credits: {
    //         enabled: false
    //     },
    //     chart: {
    //         backgroundColor: { //màu nền
    //             linearGradient: [0, 0, 500, 500],
    //             stops: [
    //                 [0, 'rgb(255, 255, 255,0.8)'],
    //                 [1, 'rgb(100, 200, 255,0.8)']
    //             ]
    //         },
    //         type: 'column', //dạng biểu đồ
    //         height: 250, //chiều cao
    //         style: { "fontFamily": "Arial, Helvetica, sans-serif" }
    //     },
    //     subtitle: { //đề mục con
    //         text: 'Thống kê lượt tin bài trong năm 2021',
    //     },
    //     title: {
    //         text: ''
    //     },
    //     legend: { //chú giải
    //         enabled: false
    //     },
    //     xAxis: { //trục X ngang
    //         categories: [
    //             'Thg1',
    //             'Thg2',
    //             'Thg3',
    //             'Thg4',
    //             'Thg5',
    //             'Thg6',
    //             'Thg7',
    //             'Thg8',
    //             'Thg9',
    //             'Thg10',
    //             'Thg11',
    //             'Thg12'
    //         ],
    //         crosshair: true, // các trục khi hover vào
    //         borderWidth: 10,
    //     },
    //     yAxis: {
    //         min: 0,
    //         title: {
    //             text: 'Số lượng (tin bài)'
    //         }
    //     },
    //     tooltip: { // Chú thích với từng cột
    //         headerFormat: '<span style="font-size:12px">{point.key}</span><table>',
    //         pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
    //             '<td style="padding:0"><b>{point.y:.1f} tin bài</b></td></tr>',
    //         footerFormat: '</table>',
    //         shared: true,
    //         useHTML: true
    //     },
    //     plotOptions: {
    //         column: {
    //             pointPadding: 0.2,
    //             borderWidth: 0
    //         }
    //     },
    //     series: [{
    //         name: '',
    //         color: '#038eae',
    //         data: [49.9, 71.5, 16.4, 19.2, 44.0, 16.0, 35.6, 48.5, 16.4, 14.1, 5.6, 54.4],
    //     }]
    // });
    // let table;
    const getMuctin = (id) => {
        table = $('#muctin-list').DataTable({
            ajax: {
                url: '/tuyentruyen/' + id + '/muctin',
                dataSrc: ''
            },
            "lengthMenu": [8],
            "language": {
                "sInfoEmpty": "",
                "sEmptyTable": "Không có dữ liệu trong mục này",
                "sInfoFiltered": "",
                "sInfo": "Tổng cộng  _TOTAL_ mục tin",
                "sLengthMenu": "",

            },
            "destroy": true, // cho phép hủy bỏ table tạo table mới với cùng id table
            "aoColumns": [{
                    "mData": function(data, type, dataToSet) {
                        return `<span class="muctin" id=${data._id}>${data.muctin}</span>`
                    },
                    "width": "90%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<i class="fas fa-pen editMuctin" data-bs-toggle="modal" data-bs-target="#modalEditMuctin" data-bs-backdrop='static' title="Sửa"> </i>`
                    },
                    "width": "5%"
                },
                {
                    "mData": function(data, type, dataToSet) {
                        return `<i class="fas fa-trash deleteMuctin"  title="Xóa văn bản"> </i>`
                    },
                    "width": "5%"
                }
            ]
        });
    }
    let id_muctin;
    $(document).on('click', '.getmuctin', function() {
        $('#chuyenmuc-wrapper').fadeIn()
        $('.manage-chuyenmuc a').remove();
        let chuyenmuc = $(this).find('button').text().trim();
        id_muctin = $(this).find('.accordion-header').attr('id').trim().slice(14);
        $('.manage-chuyenmuc').append(`
        <a href="#">${chuyenmuc}</a>
        `);
        getMuctin(id_muctin);
    });

    //Thêm mới mục tin
    $('#muctinForm').on('submit', function(e) {
            e.preventDefault();
            let muctin = $('#muctin').val();
            $.ajax({
                url: '/tuyentruyen/' + id_muctin + '/addMuctin',
                method: 'POST',
                data: {
                    muctin
                },
                error: function() {
                    alert('Có lỗi xảy ra khi thêm mới mục tin')
                },
                success: function() {
                    $('.btn-close').click();
                    $('#muctin').val('');
                    table.ajax.reload(null, false);
                    let toast = $('#add-toast');
                    let bsToast = new bootstrap.Toast(toast, {
                        delay: 3000
                    })
                    bsToast.show(); //show toast
                }
            })
        })
        // Sửa mục tin
    let id_muctinEdit;
    $(document).on('click', '.editMuctin', function() {
        let row = $(this).closest('tr');
        $("#Edit_muctin").val(row.find('.muctin').text().trim());
        id_muctinEdit = row.find('.muctin').attr('id').trim()
    });
    $('#EditMuctinForm').on('submit', function(e) {
        e.preventDefault();
        let muctinEdit = $('#Edit_muctin').val();
        $.ajax({
            url: '/tuyentruyen/' + id_muctin + "/editMuctin/muctin/" + id_muctinEdit,
            method: 'POST',
            data: { muctinEdit },
            error: function() {
                alert('Có lỗi xảy ra khi cập nhập mục tin')
            },
            success: function() {
                $('.btn-close').click();
                table.ajax.reload(null, false);
                let toast = $('#edit-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000
                })
                bsToast.show(); //show toast
            }
        })
    });
    //Xóa mục tin
    $(document).on('click', '.deleteMuctin', function() {
        let row = $(this).closest('tr');
        id_muctinDelete = row.find('.muctin').attr('id').trim();
        let isDelete = confirm('Bạn có chắc chắn muốn xóa mục tin này? Nếu xóa mục tin này, các tin bài, phóng sự thuộc mục tin này cũng sẽ bị xóa. Đồng ý xóa click Ok, k xóa click hủy hoặc cancel...')
        if (isDelete) {
            $.ajax({
                url: '/tuyentruyen/' + id_muctin + "/deleteMuctin/muctin/" + id_muctinDelete,
                error: function() {
                    alert('Có lỗi xảy ra khi xóa mục tin')
                },
                success: function() {
                    table.ajax.reload(null, false);
                    let toast = $('#delete-toast');
                    let bsToast = new bootstrap.Toast(toast, {
                        delay: 3000,
                        animation: true
                    })
                    bsToast.show(); //show toast  
                }
            })
        }
    });
      $('#donvi').change(function() {
                $('#redirect').removeAttr('disabled');
            });
            $('#redirect').click(function(e) {
                e.preventDefault();
                let id = $('#donvi').val();
                window.location.href = '/admin/quantriphong/chitiet/' + id
            })
});