// signup.js
var customer_id = "";
var signup = function() {
	customer_nickname = $("input[name='user[login]']").val();
    customer_password = $("input[name='user[password]']").val();
    customer_mobile_number = $("input[name='user[email]']").val();
    console.log("get from html:"+customer_nickname+customer_password+customer_mobile_number);
    $.getJSON('/signup/_submit',{"customer_password":customer_password,"customer_mobile_number":customer_mobile_number,"customer_nickname":customer_nickname},function(data){
        console.log('sent:'+customer_password+customer_mobile_number+customer_nickname);
        if (data.ERROR) {
            alert("get unsuccess response!");
            alert(data.ERROR);
        } else {
            customer_id = data.customer_id;
            // window.open ('home_page.htm');
            window.location.href = 'home_page?customer_id='+customer_id+'&customer_nickname='+customer_nickname;
            // window.location.replace("http://www.baidu.com");
        }
    });
}