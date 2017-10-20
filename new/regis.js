$(document).ready(function () {
    if (!!$.cookie('keep')) {
        $.validator.setDefaults({
            submitHandler: function () {
                $("#suc").show();
            }
        });
        $.validator.methods.equal = function (value, element, param) {
            return value == param;
        };
        $().ready(function () {
            var validator = $("#signupForm").bind("invalid-form.validate", function () {
                $("#summary").html("Your form contains " + validator.numberOfInvalids() + " errors, see details below.");
            }).validate({
                debug: true,
                errorElement: "em",
                errorContainer: $("#warning, #summary"),
                errorPlacement: function (error, element) {
                    error.appendTo(element.parent("div").next("span"));
                },
                success: function (label) {
                    $("#err5").hide();
                },
                rules: {
                    fname: "required",
                    lname: "required",
                    image: "required",
                    job: "required",
                    addr: "required",
                    city: "required",
                    zip: "required",
                    country: "required",
                    email: {
                        required: true,
                        email: true
                    },
                    tel: {
                        required: true,
                        minlength: 10,
                        maxlength: 10,
                    }
                },
                messages: {
                    fname: "Please enter your first name",
                    lname: "Please enter your last name",
                    email: "Please enter a valid email address",
                    tel: "Please enter your telephone",
                    image: "Please enter your image",
                    job: "Please enter your job",
                    addr: "Please enter your address",
                    city: "Please enter your city",
                    zip: "Please enter your zip",
                    country: "Please enter your country",
                },
                highlight: function (element) {
                    $(element).closest('.form-group').addClass('has-error');
                    $("#err5").show();
                },
                unhighlight: function (element) {
                    $(element).closest('.form-group').removeClass('has-error');
                },
                errorElement: 'span',
                errorClass: 'help-block',
                errorPlacement: function (error, element) {
                    if (element.parent('.input-group').length) {
                        error.insertAfter(element.parent());
                    } else {
                        error.insertAfter(element);
                    }
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
                $('#a_date').val(strDateTime1);
                $('#id').val(inf[0].id);
                $('#username').val(inf[0].username);
                $('#password').val(inf[0].password);
                $('#con_password').val(inf[0].con_password);
                $('#status').val(inf[0].status);
                $(".signup__link").click(function () {
                    var id = $.urlParam('id');
                    setTimeout(window.location.href = "memberUser.html?id=" + id, 1000);
                });

                $("#signup").click(function () {
                    if ($("#signupForm").valid()) {
                        var newuser2 = {};
                        newuser2.id = $('#id').val();
                        newuser2.fname = $('#fname').val();
                        newuser2.lname = $('#lname').val();
                        newuser2.image = $("#image").val();
                        newuser2.job = $('#job').val();
                        newuser2.addr = $('#addr').val();
                        newuser2.city = $('#city').val();
                        newuser2.zip = $('#zip').val();
                        newuser2.country = $('#country').val();
                        newuser2.tel = $('#tel').val();
                        newuser2.email = $('#email').val();
                        newuser2.date = $('#date').val();
                        newuser2.username = $('#username').val();
                        newuser2.password = $('#password').val();
                        newuser2.con_password = $('#con_password').val();
                        newuser2.status = $('#status').val();
                        console.log(newuser2);
                        var updateUrl = "http://localhost:3000/authens/" + inf[0].id;
                        console.log(updateUrl);
                        $.ajax({
                            url: updateUrl,
                            type: 'PUT',
                            data: newuser2,
                            success: function (result) {
                                console.log('Updated!');
                                var id = $.urlParam('id');
                                setTimeout(window.location.href = "memberUser.html?id=" + id, 1000);
                            }
                        });
                    }
                });
            });
        });
    } else {
        console.log('no cookie');
        window.location.href = "signin.html"
    }
});
