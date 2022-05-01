$.ajaxPrefilter(function(options) {
    console.log(options.url);
    //在发起Ajax请求之前同意拼接根路径
    options.url = "http://api-breakingnews-web.itheima.net" + options.url;
});