$(document).ready(function () {
    if (!!$.cookie('keep')) {
        $.urlParam = function (name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            return results[1] || 0;
        }
        var id = $.urlParam('id');
        var url = "http://localhost:3000/authens/" + id;
        console.log(url);
        $.get(url, function (data, status) {
            console.log("id" + data);
            $.ajax({
                type: 'GET',
                url: 'http://localhost:3000/authens/',
                mimeType: 'json',
                success: function (info) {
                    $.each(info, function (i, info) {
                        var body = '<hr class="style5">';
                        body += '<div class="row">';
                        body += '<div class="col-lg-2">';
                        body += '<img src="' + info.image + '" class="img-circle" style="max-width:50px">';
                        body += '</div>';
                        body += '<div class="col-lg-10">';
                        body += '<div style="font-weight:bold;">';
                        body += '&nbsp;&nbsp;<a style="cursor:pointer" href="memberUser.html?id=' + info.id + '">'
                            + info.fname + " " + info.lname +  '</a>';
                        body += '<span class="pull-right" title="Delete customer">';
                        body += '<br>';
                        body += '<a class="btn btn-xs btn-warning" href="memberUser.html?id=' + info.id + '">';
                        body += '<i class="fa fa-eye" style="color: black"></i>';
                        body += '</a>';
                        body += '</span>';
                        body += '</div>';
                        body += '<div> &nbsp;&nbsp;' + info.addr + " " + info.city + " " + info.zip + " " + info.country + '</div>';
                        body += '</div>';
                        body += '</div>';
                        if (info.id != 0 && info.username != "" && info.fname != "" && info.lname != "") {
                            $("#summary").append(body);
                        }
                    });
                },
                error: function () {
                    alert('Fail!');
                }
            });
        });
    } else {
        console.log('no cookie');
        window.location.href = "signin.html"
    }
});
