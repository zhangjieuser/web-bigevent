$.ajaxPrefilter(function(options) {
    console.log(options.url);
    //在发起Ajax请求之前同意拼接根路径
    options.url = "http://api-breakingnews-web.itheima.net" + options.url;
    //同意为有权限的接口设置headers请求头
    if (options.url.indexOf("/my/") !== -1) {
        //个人认为这里面存在安全问题，如果有人在网址字符串后面login
        //和注册里面加入这个就会登录页面无法打开
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            localStorage.removeItem("token");
            location.href = "./login.html";
        }

    }
});