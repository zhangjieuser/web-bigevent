$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
            nickname: function(value) {
                if (value.length > 6) {
                    return "用户名必须在1-6位之间";
                }
            }
        })
        // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("获取用户信息失败！");
                }
                console.log(res);
                //调用form.val()快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }
    initUserInfo();
    //重置表单的数据
    $('#brnReset').on("click", function(e) {
        e.preventDefault();
        initUserInfo();
    });
    //监听表单的提交时事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        //ajax
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！');
                }
                layer.msg('更新用户信息成功！');
                window.parent.getUserInfo();
            }
        });
    });
});