/**
 * 角色详情对话框（可用于添加和修改对话框）
 */
var NoticeEditDlg = {
    editor: null,
    data: {
        noticeId: $("#noticeId").val(),
        title: $("#title").val(),
        content: $("#content").val()
    }
};

/**
 * 关闭此对话框
 */
NoticeEditDlg.close = function () {
    parent.layer.close(window.parent.Notice.layerIndex);
};

/**
 * 验证表单
 */
NoticeEditDlg.validateForm = function () {

    var data = NoticeEditDlg.data;

    if (!data.title) {
        return "请输入标题";
    }

    if (!data.content) {
        return "请输入内容";
    }

    return true;
};

/**
 * 提交添加角色
 */
NoticeEditDlg.editSubmit = function () {
    var ajax = new $ax(Feng.ctxPath + "/notice/update", function (data) {
        parent.Feng.success("修改成功!");
        window.parent.Notice.table.refresh();
        parent.layer.close(window.parent.Notice.layerIndex);
    }, function (data) {
        parent.Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(NoticeEditDlg.data);
    ajax.start();
};

$(function () {
    NoticeEditDlg.app = new Vue({
        el: '#noticeForm',
        data: NoticeEditDlg.data,
        methods: {
            submitForm: function (e) {
                e.preventDefault();
            },
            ensure: function () {
                var result = NoticeEditDlg.validateForm();
                if (result === true) {
                    NoticeEditDlg.editSubmit();
                } else {
                    Feng.alert(result);
                }
            },
            close: function () {
                NoticeEditDlg.close();
            }
        }
    });

});
