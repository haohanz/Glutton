// your_profile.js

$("a#menu-list").attr("style","cursor:pointer");


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
		$.getJSON("/change_mobile_number",{"old_mobile_number":old_mobile_number,"user_password":user_password,"new_mobile_number":new_mobile_number,"customer_id":customer_id},function(){
			alert("Update mobile number succeed.");
		});
	} else {
		alert("Incomplete Inputs.");
	} 
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
        var customer_id = url_vars["customer_id"];

        $("a#navi_home_page").bind("click",function(){
            window.location.href="home_page?customer_id="+customer_id;
        });

        $("a#navi_my_profile").bind("click",function(){
            window.location.href="your_profile?customer_id="+customer_id;
        });

        $("a#navi_my_orders").bind("click",function(){
            window.location.href="view_history?customer_id="+customer_id;
        });

        $("#navi_search_home_page").click(function(){
            search_value = $("input[name='q_navi']").val();
            window.location.href="search_results?who=customer&search_value="+search_value+'&customer_id='+customer_id;
        });

        $.getJSON("initialize_homepage",{"customer_id":customer_id},function(data){
        	if(data.ERROR){
        		alert(data.ERROR);
        	} else {
        		var customer_avatar = data.customer_avatar;
        		console.log("customer_avatar:"+customer_avatar);
		        $("#avatar").attr("src","../static/img/avatars/"+customer_avatar+".jpg");
        	}
        })

        var customer_avatar = url_vars["customer_avatar"];

        $("button#change_password").bind("click",function(){
			var user_old_password = $("input#user_old_password").val();
			var user_new_password = $("input#user_new_password").val();
			var user_confirm_new_password = $("input#user_confirm_new_password").val();
			if (user_new_password && user_old_password && user_confirm_new_password) {
				if (user_confirm_new_password != user_new_password) {
					alert("Incorrect new passwords.");
				} else {
					alert(user_new_password+customer_id);
					$.getJSON("/change_password",{"customer_password":user_new_password,"customer_id":customer_id},function(data){
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
			var customer_nickname = $("input#user_profile_name").val();
			// var gender = $("#user_profile_gender").find("option:selected");
			var customer_address = $("input#user_profile_birthday").val();
			var customer_appellation = $("input#customer_appellation").val();
			var customer_description = $("textarea#user_profile_add").val();
			alert("NICKNAME"+customer_nickname + "DESCRIPTION"+customer_description + "ADDRESS"+customer_address + "ID"+customer_id + "APPELL"+customer_appellation);
			$.getJSON("/upload_your_profile",{"customer_nickname":customer_nickname,"customer_description":customer_description,"customer_appellation":customer_appellation,"customer_address":customer_address,"customer_id":customer_id},function(data){
				if (data.ERROR){
					alert(data.ERROR);
				} else {
					alert("upload succeed!");
				}
			})
		});

        // $("#avatar").attr("src","../static/img/avatars/"+customer_avatar+".jpg");

        $("#avatar").bind("click",function(){
            window.location.href = "change_avatar?customer_id="+customer_id;
        });

        $("#change_avatar").bind("click",function(){
            window.location.href = "change_avatar?customer_id="+customer_id;
        });
    }
    $("a").css("cursor","pointer");	
})





