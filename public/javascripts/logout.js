$(document).ready(function() {
    $('.change-pass').click(function() {
        $.ajax({
            url: `/quantrihethong/logout`,
            success: function() {
                window.location.href = '/quantrihethong/login'
            }
        })
    })
})