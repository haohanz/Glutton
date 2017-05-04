// your_profile.js




$("a#menu-list").bind('click', function(){
	$("a#menu-list.selected").attr("class","js-selected-navigation-item menu-item");
	$(this).addClass("selected");
	var change_id = $(this).html();
	var display_div = "div#"+change_id;
	$("div[name='display']").attr("style","display:none;");
	$("div[name='display']").attr("name","");
	$(display_div).attr("style","display:block;");
	$(display_div).attr("name","display");	
});

var hhhhh = function() {
	$("div#hhhhh").attr("style","display:block;");
}

$(document).ready(function(){
	var url = location.search;
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var url_vars = {}
        var str_split = str.split("&");
        for (var i = 0; i < str_split.length; i++) {
        	url_vars[str_split[i].split("=")[0]] = str_split[i].split("=")[1];
        }
        var restaurant_id = url_vars["restaurant_id"];
        $("a#restaurant_dish_management").attr("href","restaurant_dish_management?restaurant_id="+restaurant_id);
        $("a#restaurant_order_history").attr("href","restaurant_order_history?restaurant_id="+restaurant_id);


        $("a#navi_home_page").bind("click",function(){
            window.location.href="owner_home_page?customer_id="+restaurant_id;
        });

        $("a#navi_my_profile").bind("click",function(){
            window.location.href="restaurant_profile?restaurant_id="+restaurant_id;
        });

        $("a#navi_my_dishes").bind("click",function(){
            window.location.href="restaurant_dish_management?restaurant_id="+restaurant_id;
        });

        $("a#navi_my_orders").bind("click",function(){
            window.location.href="restaurant_order_history?restaurant_id="+restaurant_id;
        });

        $("#navi_search_home_page").click(function(){
            search_value = $("input[name='q_navi']").val();
            window.location.href="search_results?who=business&search_value="+search_value+'&customer_id='+restaurant_id;
        });


        $("button#change_password").bind("click",function(){
			var user_old_password = $("input#user_old_password").val();
			var user_new_password = $("input#user_new_password").val();
			var user_confirm_new_password = $("input#user_confirm_new_password").val();
			if (user_new_password && user_old_password && user_confirm_new_password) {
				if (user_confirm_new_password != user_new_password) {
					alert("Incorrect new passwords.");
				} else {
					$.getJSON("/change_restaurant_password",{"owner_password":user_new_password,"restaurant_id":restaurant_id},function(data){
						if (data.ERROR) {
							alert(data.ERROR);
						} else {
							alert("succeed!");
						}
					});
				}
			} else {
				alert("Incomplete Inputs.");
			} 
		}); 

		$("button#upload_your_profile").bind("click",function(){  
			var restaurant_name = $("input#user_profile_name").val();
			var restaurant_address = $("input#user_profile_birthday").val();
			var delivery_price = $("input#customer_appellation").val();
			var base_deliver_price = $("input#base_customer_appellation").val();
			var open_time = $("input#time_of_service").val();
			var restaurant_description = $("textarea#user_profile_add").val();
			// alert(restaurant_name+restaurant_address+delivery_price+base_delivery_price+open_time+restaurant_description);
			$.getJSON("/upload_restaurant_profile",
				{"base_deliver_price":base_deliver_price,
				"restaurant_id":restaurant_id,
				"open_time":open_time,
				"restaurant_name":restaurant_name,
				"restaurant_description":restaurant_description,
				"delivery_price":delivery_price,
				"restaurant_address":restaurant_address,
				"restaurant_id":restaurant_id},function(data){
				if (data.ERROR){
					alert(data.ERROR);
				} else {
					alert("upload succeed!");
				}
			})
		});
		$("button#add_dish").bind("click",function(){  
			var dish_name = $("input#dish_name").val();
			var dish_price = $("input#dish_price").val();
			alert("dish_price"+dish_price+"dish_name"+dish_name);
			$.getJSON("/add_dish",
				{"dish_name":dish_name,
				"restaurant_id":restaurant_id,
				"dish_price":dish_price},function(data){
				if (data.ERROR){
					alert(data.ERROR);
				} else {
					alert("upload succeed!");
				}
			})
		});
    }	
    $("a").css("cursor","pointer");
})





