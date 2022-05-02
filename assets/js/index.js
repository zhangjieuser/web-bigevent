$(function() {
    getUserInfo();
    var layer = layui.layer;
    $("#btnLoginout").on("click", function() {
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' },
            function(index) {
                //do something
                //清空本次存储token
                localStorage.removeItem("token");
                location.href = "./login.html";
                //关闭comfirm
                layer.close(index);
            });
    });
});
//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        /*  headers: {
             Authorization: localStorage.getItem("token") || ""
         }, */
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败");
            }
            //调用renderAvatar渲染用户的头像
            renderAvatar(res.data);
        },
        /* complete: function(res) {
            console.log(res);
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                localStorage.removeItem("token");
                location.href = "./login.html";
            }
        } */

    })
}
//渲染用户的头像
function renderAvatar(user) {
    //获取用户名称
    var name = user.nickname || user.username;
    //设置欢迎文本
    $("#welcome").html(`欢迎&nbsp;&nbsp;${name}`);
    //按需渲染用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        $(".layui-nav-img").hide();
        var first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
    }
}