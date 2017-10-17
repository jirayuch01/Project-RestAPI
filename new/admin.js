$(document).ready(function () {
    if (!!$.cookie('keep')) {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/authens/',
            mimeType: 'json',
            success: function (inf) {
                var ArrayContent = inf.length;
                document.getElementById("conunt").innerHTML = ArrayContent;
            }
        });

        var url = "http://localhost:3000/authens/";
        $.get(url, function (data, status) {
            $.ajax({
                type: 'GET',
                url: 'http://localhost:3000/authens/',
                mimeType: 'json',
                success: function (info) {
                    $.each(info.slice(0, 4), function (i, info) {
                        var body = '<hr class="style5">';
                        body += '<div class="row">';
                        body += '<div class="col-lg-2">';
                        body += '<img src="' + info.image + '" class="img-circle" style="max-width:50px">';
                        body += '</div>';
                        body += '<div class="col-lg-10">';
                        body += '<div style="font-weight:bold;">';
                        body += '<a style="cursor:pointer">' + info.name + '</a>';
                        body += '<span class="pull-right" title="Delete customer">';
                        body += '<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal2">';
                        body += '<i class="fa fa-trash"></i>';
                        body += '</button>';
                        body += '</span>';
                        body += '</div>';
                        body += '<div>' + info.addr + " " + info.city + " " + info.zip + " " + info.country + '</div>';
                        body += '</div>';
                        body += '</div>';
                        $("#summary").append(body);
                    });
                },
                error: function () {
                    alert('Fail!');
                }
            });
        });
        $.urlParam = function (name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            return results[1] || 0;
        }
        $(function () {
            var id = $.urlParam('id');
            var url = "http://localhost:3000/authens/?id=" + id;
            console.log(url);
            $.get(url, function (inf, status) {
                console.log(inf[0].image);
                $('.username').html(inf[0].username);
                var body = '<img style="max-width:30px" src="' + inf[0].image + '">';
                $(".pic").append(body);
                var body2 = '<br><br><img style="width:260px" class="img-circle" src="' + inf[0].image + '">';
                $(".pic2").append(body2);
                $('.name').html(inf[0].name);
                $('#name').val(inf[0].name);
                $("#pic3").val(inf[0].image);
                $('#job').val(inf[0].job);
                $('#addr').val(inf[0].addr);
                $('#city').val(inf[0].city);
                $('#zip').val(inf[0].zip);
                $('#country').val(inf[0].country);
                $('#tel').val(inf[0].tel);
                $('#email').val(inf[0].email);
                $('#date').val(inf[0].date);
                $('#canvas').val(inf[0].city
                    + "," + inf[0].zip
                    + "," + inf[0].country
                );
            });
        });
    } else {
        console.log('no cookie');
        window.location.href = "signin.html"
    }
});
