// home_page and search.js

var search_value = ""
$("#search_home_page").click(function(){
	search_value = $("input[name='q']").val();
    // console.log("searched,the value is:"+search_value);
    // console.log("searched,the page is:"+page);
    $.getJSON("/search",{"search_value":search_value},function(data){
    	if (data) {
    		console.log("get data");
    	}
       	console.log("search_value in post:"+search_value);
    	window.location.href="search_results";
    });
	console.log("search_value after post:"+search_value);
});

