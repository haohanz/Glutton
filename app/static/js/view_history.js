// view_history.js

// [
// {"restaurant_name":restaurant_name,
// "order_id":order_id,
// "order_total_price":这里我需要一个此订单中所有dish的cost的总和～～,
// "dishes":[{"dish_name": dish_name,"dish_price", dish_price},{"dish_name": dish_name,"dish_price", dish_price}...],
// "order_received":1 或者 0     # 1代表已经收到，0代表没有收到
// },


// way to test:
// http://127.0.0.1:5000/view_history?customer_id=001


$(document).ready(function(){
	var url = location.search;
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var url_vals = {};
        var str_splits = str.split("&");
        for (var i = 0; i < str_splits.length; i++) {
        	url_vals[str_splits[i].split("=")[0]] = str_splits[i].split("=")[1];
        }
        var customer_id = url_vals["customer_id"];
        console.log("customer_id"+customer_id);
        $.getJSON("/get_user_history",{"customer_id":customer_id}, function(data){
            if (data.ERROR) {
                alert(data.ERROR);
                return;
            }
        	result = data.result;
        	var str= '<table>\
                        <tbody>\
                            <tr>';
        	var order_total_price = 0;
        	$.each(result, function(i, item){
        		var restaurant_name = item.restaurant_name;
                console.log("restaurant_name:"+restaurant_name);
        		var order_id = item.order_id;
                console.log("order_id"+item.order_id);
        		var order_total_price = item.order_total_price;
                console.log("order_total_price"+order_total_price);
        		var dishes = item.dishes;
        		var dish_list = '<ul class="list-style-none lh-condensed">';
        		$.each(dishes, function(j, dish_item){
                    console.log("if deleted:"+dish_item.deleted);
                    console.log("count:"+dish_item.count);
                    if (dish_item.deleted) {
                        console.log("deleted:"+dish_item);
                        return;
                    }
        			var dish_name = dish_item.dish_name;
        			var dish_price = dish_item.dish_price;
        			order_total_price += dish_price;
					dish_list += '<li class="mb-1">'+ dish_name+'<span class="default-currency">¥'+dish_price+'</span></li>';
        		});
        		dish_list += '</ul>';
        		if (i%3 == 0) {
        			if (i != 0) {
        				str += '</tr><tr>';
        			}
					// str += '<div class="plans-cards pt-3 my-3">';
				}
        		str += '\
                <td>\
					 <div class="plans-card text-center bg-white border rounded-2">\
					    <a class="d-block mb-0 py-2 px-3 border-bottom text-green no-underline">\
					      <h2 class="alt-h3">'+restaurant_name+'</h2>\
					    </a>\
					  <div class="plans-card-text p-3">\
					    <h3 class="alt-h2 text-normal mb-0 lh-condensed">\
					      <span class="default-currency">Total:'+order_total_price+'¥</span>\
					    </h3>\
					    <p class="mb-4 alt-text-small text-gray>\
					      order id: <span id="order_id">'+order_id+'</span>\
					    </p>\
					    <h4 class="alt-h4 lh-condensed mb-1">Includes:</h4>\
					    <ul class="list-style-none lh-condensed">\
					    '+dish_list+'\
					  </div>\
					    <a id="commit_receive" onclick="received_order(this,' + order_id + ')" class="btn btn-block btn-outline f4 plans-card-btn">Received the Dishes</a>\
					</div>\
                </td>';
                // console.log("final str is: "+str);
        	});
            str += '</tr></tbody></table>';
            $("#main_body").html(str);
        });
    }
});

var received_order = function(obj,order_id){
    if ($(obj).hasClass("disabled")) {
        return;
    } else {
        // var order_id = $(this).prev("span#order_id").html();
        console.log("order_id"+order_id);
        $.getJSON("/receive_order",{"order_id":order_id,"received":true},function(data){
            if (data.ERROR){
                alert(data.ERROR);
            }else {
                alert("success!")
                $(this).addClass("disabled");
            }
        })
    }
};




