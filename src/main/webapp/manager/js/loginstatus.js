(function () {
    var phone = $.cookie("phone");
    if (!phone) {
        //window.location.href = "login.html";
    }
})();
$("#loginout").click(function () {
    design.post("/Home/User/logout", null, function (res) {
        notie.alert(1, res.message, 1.5);
        setTimeout(function () {
            $.cookie("phone", null);
            window.location.href = "login.html";
        }, 1500);
    }, function (err) {
        notie.alert(3, err.message, 2.5);
    });

});
$("#modify").on("click",function () {
    if($("#pre_password").val()===""||$("#new_password").val()===""||$("#comfirmpwd").val()===""){
        notie.alert(3, '不能为空', 2);
        return;
    }
    if($("#new_password").val()!==$("#comfirmpwd").val()){
        notie.alert(3, '密码不一致', 2);
        return;
    }
    var data={
        oPassword:$("#pre_password").val(),
        nPassword:$("#new_password").val()
    };
    design.post("/Home/User/modifyPassword",data,function (res){
        notie.alert(1, res.message, 2);
        setTimeout(function () {
            window.location.reload();
        }, 2000);
    },function (err){
        notie.alert(3, err.message, 2);
    });
});