/**
 * 用户详情对话框（可用于添加和修改对话框）
 */
var UserInfoDlg = {
    data: {
        id: "",
        account: "",
        sex: "",
        password: "",
        rePassword: "",
        avatar: "",
        email: "",
        name: "",
        birthday: "",
        deptid: "",
        detpName: "",
        phone: ""
    }
};

/**
 * 关闭此对话框
 */
UserInfoDlg.close = function () {
    parent.layer.close(window.parent.MgrUser.layerIndex);
};

/**
 * 验证表单
 */
UserInfoDlg.validateForm = function () {

    var data = UserInfoDlg.data;

    if (data.account && data.password && data.name && data.deptid) {
        return true;
    }

    if (!data.account) {
        return "请输入账号";
    }
    if (!(data.password === data.rePassword)) {
        return "两次密码输入不一致";
    }
    if (!data.name) {
        return "请输入姓名";
    }
    if (!data.deptid) {
        return "请选择部门";
    }
};

/**
 * 提交添加用户
 */
UserInfoDlg.addSubmit = function () {
    var ajax = new $ax(Feng.ctxPath + "/mgr/add", function (data) {
        window.parent.Feng.success("添加成功!");
        window.parent.MgrUser.table.refresh();
        UserInfoDlg.close();
    }, function (data) {
        window.parent.Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.data);
    ajax.start();
};

/**
 * 提交修改
 */
UserInfoDlg.editSubmit = function () {
    var ajax = new $ax(Feng.ctxPath + "/mgr/edit", function (data) {
        Feng.success("修改成功!");
        if (window.parent.MgrUser !== undefined) {
            window.parent.MgrUser.table.refresh();
            UserInfoDlg.close();
        }
    }, function (data) {
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.data);
    ajax.start();
};

/**
 * 修改密码
 */
UserInfoDlg.chPwd = function () {
    var ajax = new $ax(Feng.ctxPath + "/mgr/changePwd", function (data) {
        Feng.success("修改成功!");
    }, function (data) {
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set("oldPwd");
    ajax.set("newPwd");
    ajax.set("rePwd");
    ajax.start();
};

$(function () {

    UserInfoDlg.app = new Vue({
        el: '#userAddForm',
        data: UserInfoDlg.data,
        methods: {
            submitForm: function (e) {
                var result = UserInfoDlg.validateForm();
                if (result === true) {
                    UserInfoDlg.addSubmit();
                } else {
                    Feng.alert(result);
                    e.preventDefault();
                }
            }
        }
    });

});
