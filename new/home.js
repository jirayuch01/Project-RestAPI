$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/authens/',
        mimeType: 'json',
        success: function (inf) {
            var ArrayContent = inf.length - 1;
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
                $.each(info.slice(0, 7), function (i, info) {
                    var body = '<div class="col-lg-4 col-sm-6 text-center mb-4" >';
                    body += '<img height="150" width="100" class="rounded-circle img-fluid d-block mx-auto" src="' + info.image + '">';
                    body += '<h3>' + info.fname + " " + info.lname;
                    body += '<br><small> Job:&nbsp;' + info.job + '</small>';
                    body += '</h3>';
                    body += '<a href="signin.html" class="btn btn-primary">';
                    body += '<i class="fa  fa-heart-o" aria-hidden="true"></i> Quick view';
                    body += '</a></div>';
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
});





