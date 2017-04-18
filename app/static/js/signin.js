// signup.js
var signin = function() {
    password = $("input[name='password']").val();
    mobile = $("input[name='login']").val();
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