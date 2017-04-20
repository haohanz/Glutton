// restaurant_home_page.js

$(document).ready(function(){
	var url = location.search;
	alert("url is"+url);
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);

        var restaurant_name = str.split("&")[0].split("=")[1];
        var restaurant_id = str.split("&")[1].split("=")[1];
        // var nickname = str.split("&")[1].split("=")[1];
        $("span#restaurant_name").html(restaurant_name);
        $("span#restaurant_id").html("restaurant_id: "+restaurant_id);
        // $.getJSON("/restaurant_home_page",{"restaurant_name":restaurant_name,""})
    }
});	
