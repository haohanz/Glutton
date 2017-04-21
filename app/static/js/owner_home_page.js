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
        $("span#picture_nickname").html(url_vars["owner_nickname"]);
        $("span#USER_ID").html(url_vars["restaurant_id"]);
        $("div#owners_dishes").html('')
        $.getJSON("owner_get_dishes",{"restaurant_id":url_vars["restaurant_id"]},function(data){
            alert("get data"+data);
            var str = ''
            $.each(data, function(i,item){
                str += '<a href="restaurant_dish_management?restaurant_id='+item.restaurant_id+'&dish_id='+item.dish_id+'"class="exploregrid-item exploregrid-item-mini px-3 py-4">*\
      <h4 class="exploregrid-item-title">\
        <span class="text-bold">'+item.dish_name+'</span>\
      </h4>\
      <span class="repo-language-color pinned-repo-meta" style="background-color:#DA5B0B;"></span>价格：¥<span id="dish_price">\
      '+item.dish_price+'</span><span style="width: 300px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\
      <svg aria-label="star" class="octicon octicon-star" height="16" role="img" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"/></svg>月销量：<span id="month_sale">'+item.dish_month_sale+'</span></a>';
            });
        });
        $("#search_home_page").click(function(){
            search_value = $("input[name='q']").val();
            // console.log("searched,the value is:"+search_value);
            // console.log("searched,the page is:"+page);
            window.location.href="search_results?search_value="+search_value+"&who=business"+"&restaurant_id="+url_vars["restaurant_id"];
        });
    }
});

var jump_to_profile = function() {
    window.location.href = "your_profile";
}

