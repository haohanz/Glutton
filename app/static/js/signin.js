// signup.js
var signin = function() {
    var password = $("input[name='password']").val();
    var mobile = $("input[name='login']").val();
    $.getJSON('/signin/_submit',{"password":password,"mobile":mobile},function(data){
        console.log('get response!');
        console.log('sent:'+password+mobile);
        if (data.ERROR) {
            alert("data.ERROR");
        } else {
        	console.log("success response!");
            window.location.href="home_page"
            // ("http://www.baidu.com");
        }
    });
}

$(document).ready(function(){
    var url = location.search;
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var who = str.split("&")[0].split("=")[1];
        if (who=='business'){
            $("h1").children("strong").html('Sign in as owner');
        } else {
        }
        $("span#picture_nickname").html(nickname);
        $("span#USER_ID").html(customer_id);
    }
})