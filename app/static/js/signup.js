// signup.js
var USER_ID = "";
var signup = function() {
	nickname = $("input[name='user[login]']").val();
    password = $("input[name='user[password]']").val();
    mobile = $("input[name='user[email]']").val();
    console.log("get from html:"+nickname+password+mobile);
    $.getJSON('/signup/_submit',{"password":password,"mobile":mobile,"nickname":nickname},function(data){
        console.log('sent:'+password+mobile+nickname);
        if (data.ERROR) {
            alert("get unsuccess response!");
            alert(data.ERROR);
        } else {
            USER_ID = data.USER_ID;
            // window.open ('home_page.htm');
            window.location.href = 'home_page?USER_ID='+USER_ID+'&nickname='+nickname;
            // window.location.replace("http://www.baidu.com");
        }
    });
}