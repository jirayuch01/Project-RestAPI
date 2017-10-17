$.validator.setDefaults({
    submitHandler: function() {
        $("#suc").show();
        setTimeout(window.location.href = "home.html", 1000);
    }
});
$.validator.methods.equal = function(value, element, param) {
    return value == param;
};
$().ready(function() {
    var validator = $("#signupForm").bind("invalid-form.validate", function() {
        $("#summary").html("Your form contains " + validator.numberOfInvalids() + " errors, see details below.");
    }).validate({
        debug: true,
        errorElement: "em",
        errorContainer: $("#warning, #summary"),
        errorPlacement: function(error, element) {
            error.appendTo(element.parent("div").next("span"));
        },
        success: function(label) {
            //label.text("").addClass("success");
            $("#err").hide();
        },
        rules: {
            username: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
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
            username: {
                required: "Please enter a username",
                minlength: "Your username must consist of at least 2 characters"
            },
            email: "Please enter a valid email address",
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
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
            $("#err").show();
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
});

$("#signup").click(function() {
    var newuser = {};
    newuser.username = $("#username").val();
    newuser.email = $("#email").val();
    newuser.password = $("#password").val();
    newuser.con_password = $("#con_password").val();
    newuser.status = $("#status").val();
    console.log(newuser);
    var url = "http://localhost:3000/authens";
    $.post(url, newuser, function(data, status) {
        console.log("Inserted " + data);
    });
});
