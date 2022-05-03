$(function() {
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/],
        samePwd: function(value) {
            if (value === $("[name=oldpwd]").val()) {
                return "新旧密码相同";
            }
        },
        rePwd: function(value) {
            if (value !== $("[name=rePwd]").val()) {
                return "两次密码不一致";
            }
        }
    })
    $('.layui-form').on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/updateped',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！');
                }
                layui.layer.msg('更新密码成功！');
                $(".layui-form")[0].reset();
            }
        });
    });
});