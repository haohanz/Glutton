// restaurant_home_page.js


$(document).ready(function(){
    var url = location.search;
    alert("url is"+url);
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);        
        var splits = str.split("&");
        var route = {}
        for (var i = 0; i < splits.length; i++){
            route[splits[i].split("=")[0]] = splits[i].split("=")[1];
        }
        var restaurant_id = route['restaurant_id'];
        var restaurant_name = route['restaurant_name'];
        $("span#restaurant_name").html(restaurant_name);
        $("span#restaurant_id").html("restaurant_id: "+restaurant_id);
    }
}); 

$("a#cut_dish").bind("click",function(){
    if ($(this).hasClass("disabled")){
        alert("disabled");
    } else {
        var dish_num = parseInt($(this).next().html());
        $(this).next().html(String(dish_num-1));
        if(dish_num-1 == 0) {
            $(this).attr("class","btn btn-sm disabled");
        }
    }
});

$("a#add_dish").bind("click",function(){
    var dish_num = parseInt($(this).prev("a#dish_count:first").html());
    if (dish_num == 0){
        $(this).prev().prev().removeClass("disabled");
    }
    $(this).prev("a#dish_count:first").html((dish_num+1).toString());
});