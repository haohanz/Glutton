// owner_home_page.js
var search_value = "";
$("#search_home_page").click(function(){
	search_value = $("input[name='q']").val();
    // console.log("searched,the value is:"+search_value);
    // console.log("searched,the page is:"+page);
	window.location.href="search_results?search_value="+search_value;
});

$(document).ready(function(){
    var url = location.search;
    alert("url is:"+url);
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var url_var = str.split("&");
        var url_vars = {}
        for (var i = 0; i < url_var.length; i++) {
            url_vars[url_var[i].split("=")[0]] = url_var[i].split("=")[1];
        }
        $("span#picture_nickname").html(url_vars["restaurant_name"]);
        $("span#USER_ID").html(url_vars["restaurant_id"]);
    }
});

var jump_to_profile = function() {
    window.location.href = "your_profile";
}

