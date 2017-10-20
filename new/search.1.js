$(document).ready(function () {
    if (!!$.cookie('keep')) {
        $("#search").click(function () {
            var url = "http://localhost:3000/authens";
            $.getJSON(url, function (data, status) {
                console.log(data);
                var index = -1;
                //var val = "Jirayu";
                var val = $('#find').val();
                var filteredObj = data.find(function (item, i) {
                    if (item.fname === val) {
                        index = i;
                        return i;
                    }
                });
                console.log(index, filteredObj);
                var results = filteredObj;
                console.log(results);
                if (index == -1) {
                    console.log("notfound");
                    results = '<hr class="style5">';
                    results += '<div class="row">';
                    results += '<center><span style="color: red;"> Not Found, ';
                    results += 'Please search again.<p></p>';
                    results += '</span></center>';
                    results += '<div class="col-lg-2">';
                    results += '<img src="' + data[0].image + '" class="img-circle" style="max-width:50px">';
                    results += '</div>';
                    results += '<div class="col-lg-10">';
                    results += '<div style="font-weight:bold;">';
                    results += '<p style="cursor:pointer">' + data[0].fname + data[0].lname + '</p>';
                    results += '<span class="pull-right" title="Delete customer">';
                    results += '<button disabled type="button" class="btn btn-xs btn-warning" data-toggle="modal" data-target="#del2">';
                    results += '<i class="fa fa-eye"></i>';
                    results += '</button>';
                    results += '</span>';
                    results += '</div>';
                    results += '<div>' + data[0].addr + " " + data[0].city + " " + data[0].zip + " " + data[0].country + '</div>';
                    results += '</div>';
                    results += '</div>';
                    document.getElementById("summary").innerHTML = results;
                } else {
                    console.log("found");
                    results = '<hr class="style5">';
                    results += '<div class="row">';
                    results += '<div class="col-lg-2">';
                    results += '<img src="' + data[index].image + '" class="img-circle" style="max-width:50px">';
                    results += '</div>';
                    results += '<div class="col-lg-10">';
                    results += '<div style="font-weight:bold;">';
                    results += '&nbsp;&nbsp;<a style="cursor:pointer" href="memberUser.html?id=' + data[index].id + '">'
                    + data[index].fname + data[index].lname + '</a>';
                    results += '<span class="pull-right" title="Delete customer">';
                    results += '<br>';
                    results += '<a class="btn btn-xs btn-warning" href="memberUser.html?id=' + data[index].id + '">';
                    results += '<i class="fa fa-eye" style="color: black"></i>';
                    results += '</a>';
                    results += '</span>';
                    results += '</div>';
                    results += '<div> &nbsp;&nbsp;' + data[index].addr + " " + data[index].city + " " + data[index].zip + " " + data[index].country + '</div>';
                    results += '</div>';
                    results += '</div>';
                    document.getElementById("summary").innerHTML = results;
                }
            });
        });
    } else {
        console.log('no cookie');
        window.location.href = "signin.html"
    }
});