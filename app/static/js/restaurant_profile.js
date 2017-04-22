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

var change_mobile_number = function(customer_id) {
	var old_mobile_number = $("input#old_mobile_number").val();
	var user_password = $("input#user_password").val();
	var new_mobile_number = $("input#new_mobile_number").val();
	if (old_mobile_number && user_password && new_mobile_number) {
		$.post("/change_mobile_number",{"old_mobile_number":old_mobile_number,"user_password":user_password,"new_mobile_number":new_mobile_number,"customer_id":customer_id},function(){
			alert("Update mobile number succeed.");
		});
	} else {
		alert("Incomplete Inputs.");
	} 
}



$(document).ready(function(){
	var url = location.search;
    alert("url is:"+url);
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var url_vars = {}
        var str_split = str.split("&");
        for (var i = 0; i < str_split.length; i++) {
        	url_vars[str_split[i].split("=")[0]] = str_split[i].split("=")[1];
        }
        var restaurant_id = url_vars["restaurant_id"];
        $("button#change_password").bind("click",function(){
			var user_old_password = $("input#user_old_password").val();
			var user_new_password = $("input#user_new_password").val();
			var user_confirm_new_password = $("input#user_confirm_new_password").val();
			if (user_new_password && user_old_password && user_confirm_new_password) {
				if (user_confirm_new_password != user_new_password) {
					alert("Incorrect new passwords.");
				} else {
					$.post("/change_restaurant_password",{"owner_password":user_new_password,"restaurant_id":restaurant_id},function(data){
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
    }	
})





