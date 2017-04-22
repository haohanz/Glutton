// signup.js
var customer_id = "";
var who = "";
var signup = function() {
    alert("who"+who);
    if(who==''){
    	customer_nickname = $("input[name='user[login]']").val();
        customer_password = $("input[name='user[password]']").val();
        customer_mobile_number = $("input[name='user[email]']").val();
        alert("get from html:"+customer_nickname + customer_password + customer_mobile_number);
        $.getJSON("/user_signup_submit",{"customer_password":customer_password,"customer_mobile_number":customer_mobile_number,"customer_nickname":customer_nickname,"who":who},function(data){
            console.log('sent:'+customer_password+customer_mobile_number+customer_nickname);
            alert("getdata"+data);
            if (data.ERROR) {
                alert(data.ERROR);
            } else {
                customer_id = data.customer_id;
                window.location.href = 'home_page?customer_id='+customer_id+'&customer_nickname='+customer_nickname+"&who="+who;
            }
    });
    } else {
        alert("who"+who);
        customer_nickname = $("input[name='user[login]']").val();
        customer_password = $("input[name='user[password]']").val();
        customer_mobile_number = $("input[name='user[email]']").val();
        alert("get from html:"+customer_nickname + customer_password+customer_mobile_number);
        $.getJSON('/restaurant_signup_submit',{"owner_password":customer_password,"owner_nickname":customer_nickname,"restaurant_name":customer_mobile_number},function(data){
            console.log('sent:'+customer_password+customer_nickname);
            alert("getdata"+data);
            if (data.ERROR) {
                alert(data.ERROR);
            } else {
                restaurant_id = data.restaurant_id;
                window.location.href = 'owner_home_page?who=business&owner_nickname='+customer_nickname+"&customer_id="+restaurant_id;
            }
        });
    }

}

$(document).ready(function(){
    var url = location.search;
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        who = str.split("&")[0].split("=")[1];
        if (who == 'business'){
            $("input[name='user[email]']").attr("placeholder","Input your restaurant name");
            var owner = true;
            $("h1").html('Sign up as owner');
            $("a#navi.selected").attr("class","js-selected-navigation-item nav-item");
            $("a[name='Business']").attr("class",'js-selected-navigation-item nav-item selected');
        } else {
        }
    }
})

$("a#navi").bind("click",function(){
    if ($(this).html() == 'Business'){
        window.location.href = 'front_page?who=business';
    }
    if ($(this).html() == 'Customer') {
        window.location.href = 'front_page';
    }
    if ($(this).html() == 'My Order' || $(this).html() == 'Home Page') {
        alert("sign in first!");
    }
})