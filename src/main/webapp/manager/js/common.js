if (typeof $ == "undefined")
    throw new Error("design requires jQuery");

var design = {
    base_url: "http://localhost:8080/Design_war",
    debug: true
};

design.log = function (msg) {
    if (this.debug) {
        console.log(msg);
    }
};

design.post = function (url, data, success_handler, error_handler, complete_handler) {
    url = design.base_url + url;
    $.ajax({
        type: "POST",
        async: true,
        url: url,
        data: data,
        dataType: "json",
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        success: function (resJson) {
            if (resJson.code == 20000) {
                success_handler ? success_handler(resJson) : "";
            } else {
                design.log(resJson);
                error_handler ? error_handler(resJson) : "";
            }
        },
        error: function (jqXHR, textcode, error) {
            design.log('发生错误：' + jqXHR.code + ':' + jqXHR.readyState + ': ' + textcode + ': ' + error);
            alert("网络发生错误了啦/数据没有填写完整，请填写完整");
            return false;
        }
    });
};
design.login = function (url, data, success_handler, error_handler, complete_handler) {
    url = design.base_url + url;
    $.ajax({
        type: "POST",
        async: true,
        url: url,
        data: data,
        dataType: "json",
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        success: function (resJson) {
            if (resJson.code == 20000) {
                success_handler ? success_handler(resJson) : "";
            } else {
                error_handler ? error_handler(resJson) : "";
            }
        },
        error: function (jqXHR, textcode, error) {
            design.log('发生错误：' + jqXHR.code + ':' + jqXHR.readyState + ': ' + textcode + ': ' + error);
            alert("网络发生错误了啦");
            return false;
        }
    });
};
design.formPost = function (url, data, success_handler, error_handler) {
    url = design.base_url + url;
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        contentType: false,
        processData: false,
        success: function (resJson) {
            if (resJson.code == 20000) {
                success_handler ? success_handler(resJson) : "";
            } else {
                error_handler ? error_handler(resJson) : "";
            }
        },
        error: function (jqXHR, textcode, error) {
            design.log('发生错误：' + jqXHR.code + ':' + jqXHR.readyState + ': ' + textcode + ': ' + error);
            alert("网络发生错误了啦");
            return false;
        }
    });
};

function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    var  o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (var  k in o) {
        var reg = "(" + k + ")";
        if (new RegExp(reg).test(fmt)) {
            var  str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}
function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

var uploadPicFlag = true;
function preview(file) {
    var prevDiv = document.getElementById('preview');
    if (file.files && file.files[0]) {
        var fileSize;
        var mb = file.files[0].size/1024/1024;
        if (mb > 1) {
            notie.alert(3, '不能选大于1M的图片', 2.5);
            uploadPicFlag = false;
            return false;
        } else {
            fileSize = (file.files[0].size/1024).toFixed(4) + "KB"
        }

        $(".file-size").html(fileSize);

        var reader = new FileReader();
        reader.onload = function (evt) {
            prevDiv.innerHTML = '<img src="' + evt.target.result + '" />';
            var data = evt.target.result;
            var image = new Image();
            image.src = data;
            image.onload = function(){
                $(".file-height").text(image.height+"px");
                $(".file-width").text(image.width+"px");
            };
        };
        reader.readAsDataURL(file.files[0]);
    }
    else {
        prevDiv.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';
    }
}

function uploadFile(url) {
    var data = new FormData($("#uploadForm")[0]);
    if (!uploadPicFlag) {
        notie.alert(3, '不能选大于1M的图片', 2.5);
    }
    $(".fix-load").show();
    $(".addBox").hide();
    design.formPost(url, data, function (res) {
        $(".fix-load").hide();
        $(".addBox").show();
        notie.alert(1, res.message, 2.5);
    }, function (err) {
        $(".fix-load").hide();
        $(".addBox").show();
        notie.alert(3, err.message, 2.5);
    });
}

function checkBoxOne(selector) {
    $(selector).on("click", function () {
        $(this).siblings("input").prop("checked",false);
    });
}


