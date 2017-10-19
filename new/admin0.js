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
                    $.each(info.reverse(), function (i, info) {
                        var body = '<hr class="style5">';
                        body += '<div class="row">';
                        body += '<div class="col-lg-2">';
                        body += '<img src="' + info.image + '" class="img-circle" style="max-width:50px">';
                        body += '</div>';
                        body += '<div class="col-lg-10">';
                        body += '<div style="font-weight:bold;">';
                        body += '<a style="cursor:pointer">' + info.name + '</a>';
                        body += '<span class="pull-right" title="Delete customer">';
                        body += '<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#del2">';
                        body += '<i class="fa fa-trash"></i>';
                        body += '</button>';
                        body += '</span>';
                        body += '</div>';
                        body += '<div>' + info.addr + " " + info.city + " " + info.zip + " " + info.country + '</div>';
                        body += '</div>';
                        body += '</div>';
                        if (info.id != 0 && info.username != "" && info.name != "") {
                            $("#summary").append(body);
                        }
                    });
                },
                error: function () {
                    //alert('Fail!');
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
            $.ajax({
                type: "GET",
                url: "http://localhost:3000/authens/?id=" + id,
                dataType: "JSON",
                success: function (response) {
                    $("input[name=e_status]").prop('checked', false); //uncheck all
                    $.each(response, function (i, resp) {
                        $("input[name=e_status][value=" + resp.status + "]").prop('checked', true);
                    });
                }
            });

            $.get(url, function (inf, status) {
                console.log(inf[0].image);
                $('.username').html(inf[0].username);
                var body = '<img style="max-width:30px" src="' + inf[0].image + '">';
                $(".pic").append(body);
                var body2 = '<br><br><img style="width:260px" class="img-circle" src="' + inf[0].image + '">';
                $(".pic2").append(body2);
                $('.name').html(inf[0].name);
                $('.name').val(inf[0].name);
                $(".pic3").val(inf[0].image);
                $('.job').val(inf[0].job);
                $('.addr').val(inf[0].addr);
                $('.city').val(inf[0].city);
                $('.zip').val(inf[0].zip);
                $('.country').val(inf[0].country);
                $('.tel').val(inf[0].tel);
                $('.email').val(inf[0].email);
                $('.date').val(inf[0].date);
                $('#canvas').val(inf[0].city
                    + "," + inf[0].zip
                    + "," + inf[0].country
                );
                $('.account').attr('href', "memberAdmin.html?id=" + inf[0].id);
                $('#e_name').val(inf[0].name);
                $("#e_image").val(inf[0].image);
                $('#e_job').val(inf[0].job);
                $('#e_addr').val(inf[0].addr);
                $('#e_city').val(inf[0].city);
                $('#e_zip').val(inf[0].zip);
                $('#e_country').val(inf[0].country);
                $('#e_tel').val(inf[0].tel);
                $('#e_mail').val(inf[0].email);
                function getFormattedDate() {
                    var hours = new Date().getHours();
                    var hours = (hours + 24 - 2) % 24;
                    var mid = 'am';
                    if (hours == 0) {
                        hours = 12;
                    } else if (hours > 12) {
                        hours = hours % 12;
                        mid = 'pm';
                    }
                    var date = new Date();
                    var weekday = new Array(7);
                    weekday[0] = "Sunday";
                    weekday[1] = "Monday";
                    weekday[2] = "Tuesday";
                    weekday[3] = "Wednesday";
                    weekday[4] = "Thursday";
                    weekday[5] = "Friday";
                    weekday[6] = "Saturday";
                    var month = new Array();
                    month[0] = "January";
                    month[1] = "February";
                    month[2] = "March";
                    month[3] = "April";
                    month[4] = "May";
                    month[5] = "June";
                    month[6] = "July";
                    month[7] = "August";
                    month[8] = "September";
                    month[9] = "October";
                    month[10] = "November";
                    month[11] = "December";
                    var nowDay = weekday[date.getDay()];
                    var nowMonth = month[date.getMonth()];
                    var str = nowDay + " "
                        + date.getDate() + " "
                        + nowMonth + " "
                        + date.getFullYear() + " " +
                        date.getHours() + ":" +
                        date.getMinutes() + ":" +
                        date.getSeconds() + " " + mid;
                    return str;
                }
                function formatAMPM(date) {
                    var hours = date.getHours();
                    var minutes = date.getMinutes();
                    var ampm = hours >= 12 ? 'pm' : 'am';
                    hours = hours % 12;
                    hours = hours ? hours : 12;
                    minutes = minutes < 10 ? '0' + minutes : minutes;
                    var strTime = hours + ':' + minutes + ' ' + ampm;
                    return strTime;
                }
                var strDateTime1 = getFormattedDate();
                $('#e_date').val(strDateTime1);
                $('#a_date').val(strDateTime1);
                $('#e_username').val(inf[0].username);
                $('#e_pass').val(inf[0].password);
                $('#e_con-pass').val(inf[0].con_password);
                $('.d_name').html(inf[0].name);
                $("#save").click(function () {
                    var newuser = {};
                    newuser.name = $('#e_name').val();
                    newuser.image = $("#e_image").val();
                    newuser.job = $('#e_job').val();
                    newuser.addr = $('#e_addr').val();
                    newuser.city = $('#e_city').val();
                    newuser.zip = $('#e_zip').val();
                    newuser.country = $('#e_country').val();
                    newuser.tel = $('#e_tel').val();
                    newuser.email = $('#e_mail').val();
                    newuser.username = $("#e_username").val();
                    newuser.password = $('#e_pass').val();
                    newuser.con_password = $('#e_con-pass').val();
                    newuser.date = $('#e_date').val();
                    newuser.status = $("#e_status:checked").val();
                    console.log(JSON.stringify(newuser));
                    var updateUrl = "http://localhost:3000/authens/" + inf[0].id;
                    $.ajax({
                        url: updateUrl,
                        type: 'PUT',
                        data: newuser,
                        success: function (result) {
                            console.log('Updated!');
                        }
                    });
                    $("#err").show();
                    setTimeout(location.reload.bind(location), 900);
                });
                $("#save").click(function () {
                    var newuser = {};
                    newuser.name = $('#e_name').val();
                    newuser.image = $("#e_image").val();
                    newuser.job = $('#e_job').val();
                    newuser.addr = $('#e_addr').val();
                    newuser.city = $('#e_city').val();
                    newuser.zip = $('#e_zip').val();
                    newuser.country = $('#e_country').val();
                    newuser.tel = $('#e_tel').val();
                    newuser.email = $('#e_mail').val();
                    newuser.username = $("#e_username").val();
                    newuser.password = $('#e_pass').val();
                    newuser.con_password = $('#e_con-pass').val();
                    newuser.date = $('#e_date').val();
                    newuser.status = $("#e_status:checked").val();
                    console.log(JSON.stringify(newuser));
                    var updateUrl = "http://localhost:3000/authens/" + inf[0].id;
                    $.ajax({
                        url: updateUrl,
                        type: 'PUT',
                        data: newuser,
                        success: function (result) {
                            console.log('Updated!');
                        }
                    });
                    $("#err").show();
                    setTimeout(location.reload.bind(location), 900);
                });
                $("#del").click(function () {
                    var ids = 0;
                    $.ajax({
                        type: 'DELETE',
                        url: "http://localhost:3000/authens/" + id,
                        mimeType: 'json',
                        success: function (inf) {
                            console.log('Delete!');
                            setTimeout(window.location.href = "memberAdmin.html?id=" + ids, 30000);
                        }
                    });
                    //setTimeout(location.reload.bind(location), 900);
                });
            });
        });
    } else {
        console.log('no cookie');
        window.location.href = "signin.html"
    }
});
