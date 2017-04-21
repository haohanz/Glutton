// restaurant_home_page.js

$(document).ready(function(){
    var dish_counts = {};
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
        var restaurant_name = decodeURIComponent(route['restaurant_name']);
        var customer_id = route['customer_id'];
        $("span#restaurant_name").html(restaurant_name);
        $("span#restaurant_id").html("restaurant_id: "+restaurant_id);
        $.getJSON("/get_restaurant_detail",{"customer_id":customer_id,"restaurant_id":restaurant_id},function(data){
            alert("get data!!!~~~~~"+data);
            $("ul#dish_info").html('');
            var str = '';
            var restaurant_info = data.restaurant;
            var restaurant_description = restaurant_info.restaurant_description;
            var delivery_price = restaurant_info.delivery_price;
            var base_deliver_price = restaurant_info.base_deliver_price;
            var open_time = restaurant_info.open_time;
            var total_month_sale = restaurant.total_month_sale;
            var restaurant_address = restaurant.restaurant_address;
            var dishes = data.dish;
            var dish_num = dishes.length;
            $("relative-time#open_time").html(open_time);
            $.each(dishes, function(i,item){
                alert(i+item);
                var dish_id = item.dish_id;
                var dish_name = item.dish_name;
                var month_sale = item.month_sale;
                var dish_price = item.dish_price;
                dish_counts[dish_id] = 0;
                str += '\
            <li class="repo-list-item repo-list-item-with-avatar">\
              <h3 class="mb-1">\
                <a id="dish_name">'+dish_name+'</a>\
              </h3>\
                <div class="col-3 float-right">\
<div width="155" height="10">\
<a class="btn btn-sm disabled" id="cut_dish">Cut</a>\
<a class="js-social-count" id="dish_count">0</a>\
<a class="btn btn-sm btn-primary" id="add_dish">Add</a>\
</div>\
                </div>\
              <div class="f6 text-gray mt-2">\
                    <span class="repo-language-color ml-0" style="background-color:#f1e05a;"></span>\
                  <span class="mr-3" itemprop="programmingLanguage" id="dish_id">'+dish_id+'</span><br/>\
                  <a class="muted-link mr-3">\
                    <svg aria-label="star" class="octicon octicon-star" height="16" role="img" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path></svg>\
                    月销量:<span id="month_sale">'+month_sale+'</span>\
                  </a>\
              </div>\
            </li>';
            });
            $("ul#dish_info").html(str);

            
        })
    }
}); 













$("a#cut_dish").bind("click",function(){
    if ($(this).hasClass("disabled")){
        alert("disabled");
    } else {
        var dish_num = parseInt($(this).next().html());
        $(this).next().html(String(dish_num-1));
        dish_counts[$(this).next("span#dish_id:first").html()] = dish_num - 1;
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
        dish_counts[$(this).next("span#dish_id:first").html()] = dish_num + 1;
});

var submit_order = function() {
    $.getJSON("submit_order",{"dish_counts": dish_counts,"customer_id":customer_id,"restaurant_id":restaurant_id},function(data){
        alert("get data!!!"+data);
    });

}