// view_history.js


$(document.ready(function(){



});
var dish_list = '<ul class="list-style-none lh-condensed">';

dish_list += '<li class="mb-1">'+ dish_name+'<span class="local-currency">'+dish_name+'</span></li>'+;

dish_list += '</ul>';


var str= '<div class="plans-cards pt-3 my-3">'




str += '\
	 <div class="plans-card col-12 col-sm-8 col-md-4 text-center bg-white border rounded-2">\
	    <a class="d-block mb-0 py-2 px-3 border-bottom text-green no-underline">\
	      <h2 class="alt-h3">'+Restaurant_name+'</h2>\
	    </a>\
	  <div class="plans-card-text p-3">\
	    <h3 class="alt-h2 text-normal mb-0 lh-condensed">\
	      <span class="default-currency">'+total_price+'</span>\
	    </h3>\
	    <p class="mb-4 alt-text-small text-gray">\
	      you have paid\
	    </p>\
	    <h4 class="alt-h4 lh-condensed mb-1">Includes:</h4>\
	    <ul class="list-style-none lh-condensed">\
	    '+dish_list+'\
	  </div>\
	    <a id="commit_receive" class="btn btn-block btn-outline f4 plans-card-btn">Received the Dishes</a>\
	</div>'




str+='</div>' 