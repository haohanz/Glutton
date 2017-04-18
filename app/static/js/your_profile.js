// your_profile.js

var upload_profile = function() {
	var NickName = $("input#user_profile_name").val();
	var gender = $("#user_profile_gender").find("option:selected");
	var birthDay = $("input#user_profile_birthday").val();
	var address = $("textarea#user_profile_add").val();
	$.post("/upload_profile",{"NickName":NickName,"gender":gender,"birthDay":birthDay,"address":address},function(){
		alert("upload successfully!");
	})
}

var change_div = function() {

}

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

var change_password = function() {
	var user_old_password = $("input#user_old_password").val();
	var user_new_password = $("input#user_new_password").val();
	var user_confirm_new_password = $("input#user_confirm_new_password").val();
	if (user_new_password && user_old_password && user_confirm_new_password) {
		if (user_confirm_new_password != user_new_password) {
			alert("Incorrect new passwords.");
		} else {
			$.post("/change_password",{"user_old_password":user_old_password,"user_new_password":user_new_password,"user_confirm_new_password":user_confirm_new_password},function(){
				alert("Update password succeed.");
			});
		}
	} else {
		alert("Incomplete Inputs.");
	} 
}


var change_mobile_number = function() {
	var old_mobile_number = $("input#old_mobile_number").val();
	var user_password = $("input#user_password").val();
	var new_mobile_number = $("input#new_mobile_number").val();
	if (old_mobile_number && user_password && new_mobile_number) {
		$.post("/change_mobile_number",{"old_mobile_number":old_mobile_number,"user_password":user_password,"new_mobile_number":new_mobile_number},function(){
			alert("Update password succeed.");
		});
	} else {
		alert("Incomplete Inputs.");
	} 
}

var delete_account = function() {
	$.post("/delete_account",{},function(){
		alert("succeed");
	})
}








