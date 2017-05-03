// change_avatar.js


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
        console.log("customer_id:"+customer_id);
        $("a#avatar").bind("click",function(){
        	var name = $(this).prop("name");
        	console.log("name:"+name);
        	$.getJSON("customer_change_avatar",{"customer_id":customer_id,"customer_avatar":name},function(data){
        		if(data.ERROR){
        			alert(data.ERROR);
        		} else {
        			alert("change avatar succeed!");
        		}
        	});
        });
    } else {
    	alert("log in first!");
    }
});