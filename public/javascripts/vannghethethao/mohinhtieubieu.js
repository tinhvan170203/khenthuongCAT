var allRole = JSON.parse($('#variableJSON').text());
$('#variableJSON').remove();

let isEdit = allRole.indexOf('sua-mo-hinh') !== -1;
let isDelete = allRole.indexOf('xoa-mo-hinh') !== -1;

function sortIndex() {
    var table = document.getElementById("table");
    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i];
        row.cells[0].innerHTML = i
    }
}

function changeIsActive(event) {
    let ele = event.target;
    let id = ele.parentNode.parentNode.cells[1].getAttribute('id');
    let state = event.target.getAttribute('class');
    $.ajax({
        url: '/vannghethethao/quantri/mohinhtieubieu/changeTrangthai/' + id,
        method: 'GET',
        success: function(data) {
            if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                window.location.href = `/quantrihethong/checkRole/error/${data}`
            };
            if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                window.location.href = `/quantrihethong/checkRole/error/${data}`
            };
            if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                window.location.href = `/quantrihethong/checkRole/error/${data}`
            };
            switch (state) {
                case 'offline':
                    ele.className = 'online';
                    ele.innerText = 'Hiển thị';
                    break;
                case 'online':
                    ele.className = 'offline';
                    ele.innerText = 'Không hiển thị';
                    break;
            };
        }
    })
}

function buildTable(data) {
    var table = document.getElementById('dataTable')
    for (let i = 0; i < data.length; i++) {
        var row = `
          <tr style="border-bottom:1px solid #ccc; ">
              <td style="text-align:center;position:relative" class="index">${i+1}</td>
              <td id=${data[i]._id} style="text-align:center">
              <img class="img-row" style="width:150px;height:100px; margin: 5px auto;" src="/VanngheThethao/thumnail/${data[i].img}" alt="">
              </td>
              <td style="text-align:center">${data[i].mohinh}</td>
      `;
        if (data[i].trangthai === true) {
            row += `<td style="text-align:center">
                          <button class="online" onClick="changeIsActive(event)">Hiển thị</button>
                      </td>`
            if (isEdit) {
                row += `<td style="text-align:center" class="edit" data-bs-toggle="modal" data-bs-target="#modalEditMohinh" data-bs-backdrop='static'>
                          <svg style="width: 20px;color: #333333" aria-hidden="true" focusable="false" data-prefix="far" data-icon="edit" class="svg-inline--fa fa-edit fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"></path></svg>
                          </td>`
            } else {
                row += '<td></td>'
            };
            if (isDelete) {
                row += ` <td style="text-align:center" class="delete">
                        <svg style="width: 16px;color: #333333" aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path></svg>
                        </td>
                    </tr>`
            } else {
                row += '<td></td></tr>'
            }
        } else {
            row += `<td style="text-align:center">
                          <button class="offline" onClick="changeIsActive(event)">Không hiển thị</button>
                      </td>`
            if (isEdit) {
                row += `<td style="text-align:center" class="edit" data-bs-toggle="modal" data-bs-target="#modalEditMohinh" data-bs-backdrop='static'>
                                  <svg style="width: 20px;color: #333333" aria-hidden="true" focusable="false" data-prefix="far" data-icon="edit" class="svg-inline--fa fa-edit fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"></path></svg>
                                  </td>`
            } else {
                row += '<td></td>'
            };
            if (isDelete) {
                row += ` <td style="text-align:center" class="delete">
                                <svg style="width: 16px;color: #333333" aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path></svg>
                                </td>
                            </tr>`
            } else {
                row += '<td></td></tr>'
            }
        }
        table.innerHTML += row
    }
}


function fetch_img() {
    $.ajax({
        url: `/vannghethethao/quantri/mohinhtieubieu/getImg`,
        method: 'GET',
        success: function(data) {
            if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                window.location.href = `/quantrihethong/checkRole/error/${data}`
            };
            if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                window.location.href = `/quantrihethong/checkRole/error/${data}`
            };
            if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                window.location.href = `/quantrihethong/checkRole/error/${data}`
            };
            buildTable(data);
            getSelectedRow()
        }
    })
}
fetch_img()


var index; // variable to set the selected row index
function getSelectedRow() {
    var table = document.getElementById("table");
    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].onclick = function() {
            // clear the selected from the previous selected row
            // the first time index is undefined
            if (typeof index !== "undefined") {
                table.rows[index].classList.toggle("selected");
            }
            index = this.rowIndex;
            this.classList.toggle("selected");
        };
    }
}


document.addEventListener('keydown', logKey);

function logKey(e) {
    var rows = document.getElementById("table").rows;
    if (rows[index]) {
        switch (e.keyCode) {
            case 38:
                upNdown('up');
                break;
            case 40:
                upNdown('down');
                break;
        }
    }
}

getSelectedRow();

function upNdown(direction) {
    var rows = document.getElementById("table").rows;
    parent = rows[index].parentNode;
    if (direction === "up") {
        if (index > 1) {
            parent.insertBefore(rows[index], rows[index - 1]);
            // when the row go up the index will be equal to index - 1
            index--;
        }
    }

    if (direction === "down") {
        if (index < rows.length - 1) {
            parent.insertBefore(rows[index + 1], rows[index]);
            // when the row go down the index will be equal to index + 1
            index++;
        }
    };
    $('#saveTT').addClass('show')
    sortIndex()
}

function anh() {
    let fileSelected = document.getElementById('file').files;
    if (fileSelected.length > 0) {
        let fileToLoad = fileSelected[0];
        let fileReader = new FileReader();
        fileReader.onload = function(fileLoaderEvent) {
            let srcData = fileLoaderEvent.target.result;
            let newImage = document.getElementById('anhminhhoa')
            newImage.src = srcData;
        };
        fileReader.readAsDataURL(fileToLoad);
    }
};

function anhchange() {
    let fileSelected = document.getElementById('file1').files;
    if (fileSelected.length > 0) {
        let fileToLoad = fileSelected[0];
        let fileReader = new FileReader();
        fileReader.onload = function(fileLoaderEvent) {
            let srcData = fileLoaderEvent.target.result;
            let newImage = document.getElementById('anhminhhoa1')
            newImage.src = srcData;
        };
        fileReader.readAsDataURL(fileToLoad);
    }
};

function addRow(item) {
    var table = document.getElementById('dataTable');
    var row = `
              <tr style="border-bottom:1px solid #ccc;">
                  <td style="text-align:center" class="index">${table.rows.length +1}</td>
                  <td id=${item._id} style="text-align:center">
                  <img class="img-row" style="width:150px;height:100px; margin: 5px auto;" src="/VanngheThethao/thumnail/${item.img}" alt="">
                  </td>
                  <td style="text-align:center">${item.mohinh}</td>`
    if (item.trangthai === true) {
        row += `<td style="text-align:center">
                                  <button class="online" onClick="changeIsActive(event)">Hiển thị</button>
                              </td>`
        if (isEdit) {
            row += `<td style="text-align:center" class="edit" data-bs-toggle="modal" data-bs-target="#modalEditMohinh" data-bs-backdrop='static'>
                                  <svg style="width: 20px;color: #333333" aria-hidden="true" focusable="false" data-prefix="far" data-icon="edit" class="svg-inline--fa fa-edit fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"></path></svg>
                                  </td>`
        } else {
            row += '<td></td>'
        };
        if (isDelete) {
            row += ` <td style="text-align:center" class="delete">
                                <svg style="width: 16px;color: #333333" aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path></svg>
                                </td>
                            </tr>`
        } else {
            row += '<td></td></tr>'
        }
    } else {
        row += `<td style="text-align:center">
                                  <button class="offline" onClick="changeIsActive(event)">Không hiển thị</button>
                              </td>`
        if (isEdit) {
            row += `<td style="text-align:center" class="edit" data-bs-toggle="modal" data-bs-target="#modalEditMohinh" data-bs-backdrop='static'>
                                          <svg style="width: 20px;color: #333333" aria-hidden="true" focusable="false" data-prefix="far" data-icon="edit" class="svg-inline--fa fa-edit fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"></path></svg>
                                          </td>`
        } else {
            row += '<td></td>'
        };
        if (isDelete) {
            row += ` <td style="text-align:center" class="delete">
                                        <svg style="width: 16px;color: #333333" aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path></svg>
                                        </td>
                                    </tr>`
        } else {
            row += '<td></td></tr>'
        }
    }
    table.innerHTML += row;
}
$('#newMohinh').on('submit', function(e) {
    e.preventDefault();
    let img = $('#anhminhhoa')[0].currentSrc;
    let mohinh = $('#content-img').val().trim();
    let trangthai = $('#isDisplay').val();
    if (img === "") {
        alert('Chưa chọn hình ảnh nên thao tác "Đăng tải" bị chặn bởi trình duyệt!')
    } else {
        let fd = new FormData();
        fd.append('mohinh', mohinh);
        fd.append('trangthai', trangthai);
        fd.append('file', $('#file')[0].files[0]);
        $.ajax({
            url: "/vannghethethao/quantri/mohinhtieubieu/add",
            method: 'POST',
            processData: false,
            contentType: false,
            data: fd,
            error: function(err) {
                console.log(err)
                alert('Có lỗi xảy ra trong quá trình thêm mới mô hình tiêu biểu')
            },
            success: function(newItem) {
                if (newItem === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                    window.location.href = `/quantrihethong/checkRole/error/${newItem}`
                };
                if (newItem === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                    window.location.href = `/quantrihethong/checkRole/error/${newItem}`
                };
                if (newItem === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                    window.location.href = `/quantrihethong/checkRole/error/${newItem}`
                };
                $('#newMohinh')[0].reset();
                $('#anhminhhoa').removeAttr('src')
                $('.btn-close').click();
                addRow(newItem);
                let toast = $('#add-toast');
                let bsToast = new bootstrap.Toast(toast, {
                    delay: 3000,
                    animation: true
                })
                bsToast.show(); //show toast  
                getSelectedRow()
            }
        });
    }
})
$('table').on('click', '.edit', function() {
    let row = $(this)[0].closest('tr');
    let isDisplay = row.cells[3].children[0].classList.contains('online');
    if (isDisplay) {
        $('#isDisplay1').val("true")
    } else {
        $('#isDisplay1').val("false")
    }
    $('#content-img1').val(`${row.cells[2].innerHTML}`);
    let indexSlice = row.cells[1].children[0].src.indexOf('thumnail'); //vị trí bắt đầu chứa thumnail để slice thay đổi link ảnh cần edit
    let imgEdit = "/Vannghethethao/" + row.cells[1].children[0].src.slice(indexSlice + 9);
    $('#anhminhhoa1').attr('src', `${imgEdit}`)
});

$('#editMohinh').on('submit', function(e) {
    e.preventDefault();
    var table = document.getElementById("table");
    var id = table.rows[index].cells[1].getAttribute('id');
    let mohinh = $('#content-img1').val().trim();
    let trangthai = $('#isDisplay1').val();
    let fd = new FormData();
    fd.append('mohinh', mohinh);
    fd.append('trangthai', trangthai);
    fd.append('file', $('#file1')[0].files[0]);
    //ajax edit trích yếu
    $.ajax({
        url: `/vannghethethao/quantri/mohinhtieubieu/edit/${id}`,
        method: 'POST',
        processData: false,
        contentType: false,
        data: fd,
        error: function(err) {
            console.log(err)
            alert('Có lỗi xảy ra khi cập nhật mô hình...')
        },
        success: function(data) {
            if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                window.location.href = `/quantrihethong/checkRole/error/${data}`
            };
            if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                window.location.href = `/quantrihethong/checkRole/error/${data}`
            };
            if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                window.location.href = `/quantrihethong/checkRole/error/${data}`
            };
            $('#editMohinh')[0].reset();
            $('.btn-close').click();
            table.rows[index].cells[1].children[0].src = `/VanngheThethao/thumnail/${data.img}`;
            table.rows[index].cells[2].innerHTML = mohinh;
            if (data.trangthai == true) {
                table.rows[index].cells[3].children[0].className = "online";
                table.rows[index].cells[3].children[0].innerHTML = "Hiển thị";
            } else {
                table.rows[index].cells[3].children[0].className = "offline";
                table.rows[index].cells[3].children[0].innerHTML = "Không hiển thị";
            }
            let toast = $('#edit-toast');
            let bsToast = new bootstrap.Toast(toast, {
                delay: 3000,
                animation: true
            })
            bsToast.show(); //show toast  
            getSelectedRow()
        }
    });
})

$('table').on('click', '.delete', function() {
    let row = $(this)[0].closest('tr');
    let idDelete = row.cells[1].getAttribute('id');
    let isDelete = confirm("Bạn có muốn xóa mô hình này?")
    if (isDelete) {
        $.ajax({
            url: `/vannghethethao/quantri/mohinhtieubieu/delete/${idDelete}`,
            method: 'GET',
            error: function() {
                alert('Có lỗi xảy ra khi xóa mô hình')
            },
            success: function(data) {
                if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                    window.location.href = `/quantrihethong/checkRole/error/${data}`
                };
                row.remove();
                index = 0;
                getSelectedRow()
                sortIndex();
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

$('#saveTT').click(function() {
    let table = document.getElementById("table");
    let data = [];
    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i];
        let id_Img = row.cells[1].getAttribute('id');
        data.push({ id: id_Img, index: i })
    };
    $.ajax({
        url: '/vannghethethao/quantri/mohinhtieubieu/sortTT',
        method: 'POST',
        data: {
            data: JSON.stringify(data) //gửi 1 mảng qua server
        },
        error: function() {
            alert('Có lỗi xảy ra khi lưu thứ tự mô hình')
        },
        success: function(data) {
            if (data === "Tài khoản đã bị xóa bởi Admin hệ thống.") {
                window.location.href = `/quantrihethong/checkRole/error/${data}`
            };
            if (data === "Mật khẩu đã thay đổi, Token đã hết hạn. Vui lòng đăng nhập lại.") {
                window.location.href = `/quantrihethong/checkRole/error/${data}`
            };
            if (data === "Người dùng không có quyền. Vui lòng đăng nhập tài khoản có chức năng này.") {
                window.location.href = `/quantrihethong/checkRole/error/${data}`
            };
            $('#saveTT').removeClass('show')
        }
    })
})
$('#donvi').change(function() {
    $('#redirect').removeAttr('disabled');
});
$('#redirect').click(function(e) {
    e.preventDefault();
    let id = $('#donvi').val();
    window.location.href = '/admin/quantriphong/chitiet/' + id
})