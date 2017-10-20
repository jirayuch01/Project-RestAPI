$(document).ready(function () {
    if (!!$.cookie('keep')) {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/authens/',
            mimeType: 'json',
            success: function (inf) {
                var ArrayContent = inf.length - 1;
                document.getElementById("conunt").innerHTML = ArrayContent;
            }
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
                var body2 = '<br><br><img style="width:260px" class="img-circle" src="' + inf[0].image + '">';
                $(".pic2").append(body2);
                $('.name').html(inf[0].fname + " " + inf[0].lname);
                $('.name').val(inf[0].fname + " " + inf[0].lname);
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

                // var moment = require('moment');
                // var date = moment();
                // console.log(date.format('LLLL'));
                
                var strDateTime1 = getFormattedDate();
                $('.date').val(strDateTime1);
            });
        });
    } else {
        console.log('no cookie');
        window.location.href = "signin.html"
    }
});
