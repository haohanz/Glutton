// signup.js
var signup = function() {
	nickname = $("input[name='user[login]']").val();
    password = $("input[name='user[password]']").val();
    mobile = $("input[name='user[email]']").val();
    console.log("get from html"+nickname+password+mobile);
    $.getJSON('/signup/_submit',{"password":password,"mobile":mobile,"nickname":nickname},function(data){
        console.log('sent:'+password+mobile+nickname);
        console.log('get response!');
        if (data.ERROR) {
            console.log("get unsuccess response!");
            alert(data.ERROR);
        } else {
            console.log("get success response!");
            window.location.href='home_page';
            // window.location.replace("http://www.baidu.com");
        }
    });
}