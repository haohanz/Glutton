// restaurant_home_page.js

var viewing_dish_id=0;

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
        alert("restaurant_id"+restaurant_id);
        $("a#add_dish").attr("href","restaurant_profile?restaurant_id="+restaurant_id);
        alert("added href");
        // var restaurant_name = decodeURIComponent(route['restaurant_name']);
        var who = route['who'];
        if (who == 'business') {
            $("a#submit_order").addClass("disabled");
        }
        $("span#restaurant_id").html("restaurant_id: "+restaurant_id);
        $.getJSON("/get_restaurant_detail",{"restaurant_id":restaurant_id},function(data){
            console.log("get data!!!~~~~~"+data);
            $("ul#dish_info").html('');
            var str = '';
            var restaurant_info = eval(data.restaurant);
            eval(restaurant_info);
            var restaurant_description = restaurant_info.restaurant_description;
            var delivery_price = restaurant_info.delivery_fee;
            var base_deliver_price = restaurant_info.base_deliver_price;
            var restaurant_name = restaurant_info.restaurant_name;
            var open_time = restaurant_info.open_time;
            var time_span = restaurant_info.time_span;
            var total_month_sale = restaurant_info.total_month_sale;
            var restaurant_address = restaurant_info.restaurant_address;
            var dishes = data.dish;
            var dish_num = dishes.length;
	        $("span#restaurant_name").html(restaurant_name);
            $("span#open_time_restaurant").html(open_time);
            $("span#delivery_span").html(time_span);
            $("span#month_total_sale").html(total_month_sale);
            $.each(dishes, function(i,item){
                var dish_id = item.dish_id;
                var dish_name = item.dish_name;
                var month_sale = item.dish_month_sale;
                var dish_price = item.dish_price;
                dish_counts[dish_id] = 0;
                str += '\
                <li class="repo-list-item" style="width:90%">\
              <h3 class="mb-1">\
              	<span id="dish_id" style="display:none;">'+dish_id+'</span>\
                <a href="#faceboxdiv" rel="facebox" id="dish_name">'+dish_name+'\
                </a>\
              </h3>\
              <div>\
                  <div class="d-inline-block col-9 text-gray pr-4">\
                      <div class="f6 text-gray mt-2">\
                            <span class="repo-language-color ml-0" style="background-color:#e34c26;"></span>\
                          <span class="mr-3" itemprop="programmingLanguage">\
                            价格: '+dish_price+'¥\
                          </span>\
                          <a class="muted-link mr-3" href="https://github.com/WebpageFX/emoji-cheat-sheet.com/stargazers">\
                            <svg aria-label="star" class="octicon octicon-star" height="16" role="img" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path></svg>\
                            月销量: '+month_sale+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
                          </a>\
                      </div>\
                  </div>\
                <div class="col-3 float-right">   \
                  <div width="155" height="30">\
              	  <span id="dish_id" style="display:none;">'+dish_id+'</span>\
                  <a id="dish_name" href="#faceboxdiv" rel="facebox" class="btn btn-sm btn-primary" id="cut_dish" style="width:59.28px; text-align:center">Edit</a>\
              	  <span id="dish_id" style="display:none;">'+dish_id+'</span>\
                	<a class="btn btn-danger btn-sm btn-primary" id="delete_dish">Delete</a>\
                  </div>\
                </div>\
              </div>\
            </li>';
      //       	str+=
				  // '\
				  // <div id="faceboxdiv" class="column" style="display: none">\
				  // <div class="Subhead mt-0 mb-0">\
				  //   <h2 id="edit_info" class="Subhead-heading">Edit info</h2>\
				  // </div>\
				  //         <dl class="form-group">\
				  //           <dt><label>Rename this dish</label></dt>\
				  //           <dd><input class="form-control" id="dish_name" size="30" placeholder="Input a new dish name" type="text" value=""></dd>\
				  //         </dl>\
				  //       <dl class="form-group">\
				  //         <dt><label>Input the price of this dish(¥)</label></dt>\
				  //           <dd><input placeholder="Input the price of this dish" class="form-control" id="dish_price" size="30" type="text" value=""></dd>\
				  //         </dl>\
				  //       <dl class="form-group">\
				  //       </dl>\
				  //       <p><button class="btn" id="change_dish">Update dish info</button></p>\
				  // </div>';
            });
            $("ul#dish_info").html(str);
            $("a#dish_name").bind("click",function(){
            	viewing_dish_id = $(this).prev("span#dish_id:first").html();
            	alert(viewing_dish_id);
            	// $(this).attr("href","#faceboxdiv");
            	// $(this).attr("rel","facebox");
            });
            alert($("h2#edit_info").html());
            $("h2#edit_info").click(function(){
            	alert("clicked edit info");
            });
            $("a#delete_dish").bind("click",function(){
            	var delete_dish_id = $(this).prev("span#dish_id:first").html();
            	alert('are you sure to delete dish:'+delete_dish_id+"?");
            	$.getJSON("/delete_dish",{"dish_id":delete_dish_id},function(data){
            		if (data.ERROR){
            			alert(data.ERROR);
            		} else {
            			alert("delete dish succeed!");
            		}
            	});
            });   
        });

    }
}); 




var dish_name = $("input#dish_name").text();
var dish_price = $("input#dish_price").val();

var set_dish_name = function(obj) {
	dish_name = obj.value;
}

var set_dish_price = function(obj) {
	dish_price = obj.value;
}

var submit_change_dish = function() {
	console.log("clicked");
	console.log("dish_name"+dish_name+dish_price+"viewing_dish_id"+viewing_dish_id);
	$.getJSON("/change_dish",{"dish_id":viewing_dish_id,"dish_name":dish_name,"dish_price":dish_price},function(data){
		console.log("get response"+data);
		if (data.ERROR){
			alert(data.ERROR);
		} else {
			alert("Succeed!");
		}
	});
}









var submit_order = function() {
    $.getJSON("submit_order",{"dish_counts": dish_counts,"customer_id":customer_id,"restaurant_id":restaurant_id},function(data){
        alert("get data!!!"+data);
    });

}