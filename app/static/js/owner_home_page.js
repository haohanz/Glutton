// owner_home_page.js
var search_value = "";


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
        console.log($("span#picture_nickname").html());
        $("span#picture_nickname").html(url_vars["owner_nickname"]);
        $("span#USER_ID").html(url_vars["customer_id"]);
        console.log($("span#picture_nickname").html());
        console.log(JSON.stringify(url_vars));
        var customer_id = url_vars["customer_id"];
        $("#search_home_page").click(function(){
            search_value = $("input[name='q']").val();
            // console.log("searched,the value is:"+search_value);
            // console.log("searched,the page is:"+page);
            window.location.href="search_results?who=business&search_value="+search_value+'&customer_id='+url_vars["customer_id"];
        });
        $("a#jump_to_profile").bind("click",function() {
            window.location.href = "restaurant_profile?restaurant_id="+customer_id;
        });
    } else {
        alert("Sign in first!");
    }
        console.log($("span#picture_nickname").html());
    
});


