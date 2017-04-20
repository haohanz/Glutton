// navi.js

$("a#navi").bind("click",function(){
    $("a#navi.selected").attr("class","js-selected-navigation-item nav-item");
    $(this).attr("class",'js-selected-navigation-item nav-item selected');
    if ($(this).html() == 'Business'){
    	window.location.href = 'front_page?who=business';
    }
    if ($(this).html() == 'Customer') {
    	window.location.href = 'front_page';
    }
})