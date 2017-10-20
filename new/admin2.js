$(document).ready(function () {
    if (!!$.cookie('keep')) {
        $.validator.setDefaults({
            submitHandler: function () {
                $("#suc").show();
                setTimeout(location.reload.bind(location), 900);
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
                    },
                    username: {
                        required: true,
                        minlength: 2
                    },
                    password: {
                        required: true,
                        minlength: 5
                    },
                    con_password: {
                        required: true,
                        minlength: 5,
                        equalTo: "#password"
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
                    username: {
                        required: "Please enter a username",
                        minlength: "Your username must consist of at least 2 characters"
                    },
                    password: {
                        required: "Please provide a password",
                        minlength: "Your password must be at least 5 characters long"
                    },
                    con_password: {
                        required: "Please provide a password",
                        minlength: "Your password must be at least 5 characters long",
                        equalTo: "Please enter the same password as above"
                    }
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

        $("#signup").click(function () {
            if ($("#signupForm").valid()) {
                var newuser2 = {};
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
                newuser2.username = $("#username").val();
                newuser2.password = $('#password').val();
                newuser2.con_password = $('#con_password').val();
                newuser2.date = $('#a_date').val();
                newuser2.status = $("#status:checked").val();
                console.log(newuser2);
                var urlss = "http://localhost:3000/authens";
                $.post(urlss, newuser2, function (data, status) {
                    console.log("Inserted " + data);
                    $("#err5").show();
                    //setTimeout(location.reload.bind(location), 900);
                    //window.location.reload();
                });
            }
        });
    } else {
        console.log('no cookie');
        window.location.href = "signin.html"
    }
});
