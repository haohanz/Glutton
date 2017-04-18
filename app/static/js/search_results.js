// search_results.js
$(document).ready(function(){
	search(0);
});

var search = function(page){
	$("div#tofill").text('');
	console.log("hello");
	$.post("search_results_function",{"page":page},function(data){
		console.log("getting json:"+data.search_results);
		console.log("page_num:"+data.page_num);








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
	$("a#page_n").click(function(){
		console.log("console");
		var page = $(this).html();
		console.log("page:"+page);
		search(page);
		$("a.current").attr("class",'');
		$("this").attr("class","current");


	});




