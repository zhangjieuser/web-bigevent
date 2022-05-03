$(function() {
    var $image = $("#image");
    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }
    $image.cropper(options);
    //为上传按钮绑定点击事件
    $('#btnChooseImage').on('click', function() {
        $("#file").click();
    });
    $("#file").on('change', function(e) {
        var filelist = e.target.files;
        if (filelist.length === 0) {
            return layer.msg('请选择照片');
        }
        var file = e.target.files[0];
        var imageURL = URL.createObjectURL(file);
        $image
            .cropper('destroy')
            .attr("src", imageURL)
            .cropper(options)
    });
    $('#btnUpload').on('click', function() {
        //1.要拿到用户裁剪之后的头像
        var dataURL = $image.cropper('getCroppedCanvas', {
                width: 100,
                height: 100
            }).toDataURL('image/png')
            //发请求
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function() {
                if (resizeBy.status !== 0) {
                    return '更换头像失败！';
                }
                layer.msg('更换头像成功！');
                window.parent.getUserInfo();
            }
        });
    });
});