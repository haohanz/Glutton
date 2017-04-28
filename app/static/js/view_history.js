// view_history.js

// [
// {"restaurant_name":restaurant_name,
// "order_id":order_id,
// "order_total_price":这里我需要一个此订单中所有dish的cost的总和～～,
// "dishes":[{"dish_name": dish_name,"dish_price", dish_price},{"dish_name": dish_name,"dish_price", dish_price}...],
// "order_received":1 或者 0     # 1代表已经收到，0代表没有收到
// },


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
        alert("customer_id"+customer_id);
        $.getJSON("/get_user_history",{"customer_id":customer_id}, function(data){
        	alert("get data!"+data.result);
        	data = eval(data.result);
        	console.log("data"+data);
        	console.log("data[o]"+eval(data[0]));
        	console.log("eval data"+eval(data));
        	alert(typeof(data));
        	var str= '';
        	var order_total_price = 0;
        	$.each(data, function(i, item){
        		var restaurant_name = item.restaurant_name;
        		var order_id = item.order_id;
        		// var order_total_price = item.order_total_price;
        		var dishes = item.dishes;
        		var dish_list = '<ul class="list-style-none lh-condensed">';
        		$.each(dishes, function(i, dish_item){
        			var dish_name = dish_item.dish_name;
        			var dish_price = dish_item.dish_price;
        			order_total_price += dish_price;
					dish_list += '<li class="mb-1">'+ dish_name+'<span class="default-currency">¥'+dish_price+'</span></li>';
        		});
        		dish_list += '</ul>';
        		if (i%3 == 0) {
        			if (i != 0) {
        				str += '</div>';
        			}
					str += '<div class="plans-cards pt-3 my-3">';
				}
        		str += '\
					 <div class="plans-card col-12 col-sm-8 col-md-4 text-center bg-white border rounded-2">\
					    <a class="d-block mb-0 py-2 px-3 border-bottom text-green no-underline">\
					      <h2 class="alt-h3">'+restaurant_name+'</h2>\
					    </a>\
					  <div class="plans-card-text p-3">\
					    <h3 class="alt-h2 text-normal mb-0 lh-condensed">\
					      <span class="default-currency">'+order_total_price+'</span>\
					    </h3>\
					    <p class="mb-4 alt-text-small text-gray id="order_id">\
					      order id: '+order_id+'\
					    </p>\
					    <h4 class="alt-h4 lh-condensed mb-1">Includes:</h4>\
					    <ul class="list-style-none lh-condensed">\
					    '+dish_list+'\
					  </div>\
					    <a id="commit_receive" class="btn btn-block btn-outline f4 plans-card-btn">Received the Dishes</a>\
					</div>';

        	});
     
			$("a#commit_receive").bind('click',function(){
				if ($(this).hasClass("disabled")) {
					return;
				} else {
					$(this).addClass("disabled");
					var order_id = parseInt($(this).prev("p#order_id:first").html());
					$.getJSON("/receive_order",{"customer_id":customer_id,"order_id":order_id,"received":true},function(data){
						if (data.ERROR){
							alert(data.ERROR);
						}else {
							alert("success!")
						}
					})
				}
			});
        });
    }
});





