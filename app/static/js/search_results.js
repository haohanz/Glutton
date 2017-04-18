// search_results.js

var restaurant = "Restaurants";
var dishes = "Dishes";
var current_div = restaurant;
var initialized = false;
var page_num = 0;
var search = function(page,current_div){
	$("div#tofill").text('');
	console.log("hello");

	$.post("search_results_function",{"page":page,"current_div":current_div},function(data){
		console.log("getting json:"+data.search_results);
		console.log("page_num:"+data.page_num);
		console.log("total_result_len:"+data.total_result_len);
		$("span#total_result_len").text(data.total_result_len);
		$("span#current_div").text(current_div);
		if (page_num != data.page_num) {
			page_num = data.page_num;
			var str = '<span class="previous_page disabled" onclick="previous_page()">Previous</span>';
			for (var i = 1; i <= 5; i++) {
				if ( i <= page_num ) {
					if (i==1) {
			 			str += '<a id="page_n" class="current">' + (i).toString() + '</a>'
			 		} else {
			 			str += '<a id="page_n" class="">' + (i).toString() + '</a>'	
			 		}
			 	} else {
			 		break;
		 		}
		 	}
			$("div.pagination").text('');
			if (page_num < 8){
			$("div.pagination").append(str+'<span class="next_page" rel="next" onclick="next_page()">Next</span>');
			} else {
				$("div.pagination").append(str+'<span class="gap">…</span>'+'<span class="next_page" rel="next" onclick="next_page()">Next</span>');
			}
			$("a#page_n").bind("click",function(){toPage($(this).html(),this);});
			// alert("get:" + $("div.pagination").children("a#page_n").val());
		} 
			
		


		$("input#search_block_in_search_results").attr("value",data.search_value_in_search_results);
		$.each(data.search_results, function(i,eachData){
			console.log('eachData:'+eachData);
			eval(eachData);
			var name = eachData.name;
			var count = eachData.count;
			var str = '\
					<div class="repo-list-item d-flex flex-justify-start py-4 public source">\
					<div class="col-8 pr-3">\
					<h3>\
					<a href="https://github.com/helmetjs/csp" class="v-align-middle">'+name+'</a>\
					</h3>\
					<p class="col-9 d-inline-block text-gray mb-2 pr-4">\
					'+name+'\
					</p>\
					<div class="topics-row-container col-9 d-inline-flex flex-wrap flex-items-center f6 my-1">\
					<a href="https://github.com/search?q=topic%3Ajavascript+org%3Ahelmetjs&amp;type=Repositories" class="topic-tag topic-tag-link f6 my-1" data-ga-click="Topic, search results" data-octo-click="topic_click" data-octo-dimensions="topic:javascript,repository_id:23285482,repository_nwo:helmetjs/&lt;em&gt;csp&lt;/em&gt;,repository_public:true,repository_is_fork:false">\
					javascript\
					</a>\
					<a href="https://github.com/search?q=topic%3Acsp+org%3Ahelmetjs&amp;type=Repositories" class="topic-tag topic-tag-link f6 my-1" data-ga-click="Topic, search results" data-octo-click="topic_click" data-octo-dimensions="topic:csp,repository_id:23285482,repository_nwo:helmetjs/&lt;em&gt;csp&lt;/em&gt;,repository_public:true,repository_is_fork:false">\
					csp\
					</a>\
					<a href="https://github.com/search?q=topic%3Asecurity+org%3Ahelmetjs&amp;type=Repositories" class="topic-tag topic-tag-link f6 my-1" data-ga-click="Topic, search results" data-octo-click="topic_click" data-octo-dimensions="topic:security,repository_id:23285482,repository_nwo:helmetjs/&lt;em&gt;csp&lt;/em&gt;,repository_public:true,repository_is_fork:false">\
					security\
					</a>\
					<a href="https://github.com/search?q=topic%3Aheaders+org%3Ahelmetjs&amp;type=Repositories" class="topic-tag topic-tag-link f6 my-1" data-ga-click="Topic, search results" data-octo-click="topic_click" data-octo-dimensions="topic:headers,repository_id:23285482,repository_nwo:helmetjs/&lt;em&gt;csp&lt;/em&gt;,repository_public:true,repository_is_fork:false">\
					headers\
					</a>\
					</div>\
					<p class="f6 text-gray mb-0 mt-2">\
					Updated <relative-time datetime="2017-03-06T15:33:26Z" title="2017年3月6日 GMT+8 下午11:33">on 6 Mar</relative-time>\
					</p>\
					</div>\
					<div class="d-table-cell col-2 text-gray pt-2">\
					<span class="repo-language-color ml-0" style="background-color:#f1e05a;"></span>\
					JavaScript\
					</div>\
					<div class="col-2 text-right pt-1 pr-3 pt-2">\
					<a class="muted-link" href="https://github.com/helmetjs/csp/stargazers">\
					<svg aria-label="star" class="octicon octicon-star" height="16" role="img" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path></svg>\
					'+count+'\
					</a>\
					</div>\
					</div>\
					';
			console.log("name:"+name);
			$("div#tofill").append(str);
		});
	});
}
// $("div.paginate-container").add(function(){
// 	$(this).children("a").click(function(){
// 	console.log("console");
// 	var page = $(this).val();
// 	console.log("page"+$(this).val());
// 	search(page);
// });
// });


var toPage = function(page, obj) {
	console.log("console");
	if (page!=1) {
		$("span.previous_page").attr("class","previous_page");
	} else {
		$("span.previous_page").attr("class","previous_page disabled");
	} 
	if (page!=page_num) {
		$("span.next_page").attr("class","next_page");
	} else {
		$("span.next_page").attr("class","next_page disabled");
	}
	console.log("page:"+page);
	$("a.current").attr("class",'');
	$(obj).attr("class","current");
	search(parseInt(page), current_div);
}


var getDishes = function() {
	$("a#getDishes").attr("class","underline-nav-item selected");
	$("a#getRestaurants").attr("class","underline-nav-item");
	current_div = dishes;
	search(0, current_div);
}

var getRestaurants = function() {
	$("a#getDishes").attr("class","underline-nav-item");
	$("a#getRestaurants").attr("class","underline-nav-item selected");
	current_div = restaurant;
	search(0, current_div);
}

var next_page = function() {
	if ($("span.next_page").hasClass("disabled")) {
		return
	} else {
		var page = $("a#page_n.current").html();
		obj = $("a#page_n.current").next();
		if (obj.html() == '…') {
			var start_page = parseInt(page)+1;
			var str = '<span class="previous_page" onclick="previous_page()">Previous</span>'+'<span class="gap">…</span>';
			for (var i = 0; i < 8; i++) {
				if ( start_page + i <= page_num ) {
					if (i==0) {
			 			str += '<a id="page_n" class="current">' + (start_page + i).toString() + '</a>'
			 		} else {
			 			str += '<a id="page_n" class="">' + (start_page + i).toString() + '</a>'	
			 		}
			 	} else {
			 		break;
			 	}
			}
			$("div.pagination").text('');
			$("div.pagination").append(str+'<span class="gap">…</span>'+'<span class="next_page" rel="next" onclick="next_page()">Next</span>');
			$("a#page_n").bind("click",function(){toPage($(this).html(),this);});
			// alert("get:" + $("div.pagination").children("a#page_n").val());
			toPage(parseInt(page)+1, $("div.pagination").children("a#page_n:first"));
		} else {
			toPage(parseInt(page)+1, obj);
		}
	}
}

var previous_page = function() {
	if ($("span.previous_page").hasClass("disabled")) {
		return
	} else {
		var page = $("a#page_n.current").html();
		obj = $("a#page_n.current").prev();
		if (obj.html() == '…') {
			var start_page = parseInt(page)-1;
			var str = '';
			for (var i = 0; i < 8; i++) {
				if ( start_page - i > 0 ) {
					if (i==0) {
			 			str = '<a id="page_n" class="current">' + (start_page - i).toString() + '</a>' + str;
			 		} else {
			 			str = '<a id="page_n" class="">' + (start_page - i).toString() + '</a>'	+ str;
			 		}
			 	} else {
			 		break;
			 	}
			}
			$("div.pagination").text('');
			$("div.pagination").append('<span class="previous_page" onclick="previous_page()">Previous</span>'+'<span class="gap">…</span>'+str + '<span class="gap">…</span>'+'<span class="next_page" rel="next" onclick="next_page()">Next</span>' );
			$("a#page_n").bind("click",function(){toPage($(this).html(),this);});
			toPage(parseInt(page)+1, $("div.pagination").children("a#page_n:last"));
		} else {
			toPage(parseInt(page) - 1, obj);
		}
	}
}

$(document).ready(function(){
	search(0,"Restaurants");
	$("a#page_n").bind("click",function(){toPage($(this).html(),this);});
});




















