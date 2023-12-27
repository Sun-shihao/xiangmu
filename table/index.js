function Ajax() { }
// Ajax.prototype.get = function (url, data, callback) {
//     var str = '';
//     if (typeof data !== 'function') {
//         str = "?";
//         for (var i in data) {
//             var key = i;
//             var value = data[i];
//             str += key + '=' + value + '&';
//         }
//         str = str.substring(0, str.length - 1);
//     } else {
//         callback = data;
//     }
//     var xml = new XMLHttpRequest();
//     xml.onreadystatechange = function () {
//         if (xml.readyState == 4) {
//             if (xml.status == 200) {
//                 callback(JSON.parse(xml.response));
//             } else {
//                 callback(xml.response);
//             }
//         }
//     }
//     xml.open("GET", url + str);
//     xml.send();
// }
Ajax.prototype.post = function (url, data, callback) {
    // form表单
    var str = '';
    if (typeof data !== 'function') {
        for (var i in data) {
            var key = i;
            var value = data[i];
            str += key + '=' + value + '&';
        }
        str = str.substring(0, str.length - 1);
    } else {
        callback = data;
    }

    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function () {
        if (xml.readyState == 4) {
            if (xml.status == 200) {
                callback(JSON.parse(xml.response));
            } else {
                callback(xml.response);
            }
        }
    }
    xml.open("POST", url);
    xml.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xml.send(str);
}
// Ajax.prototype.request = function (option) {
//     if (!option.url) {
//         throw new Error('小逼崽子 url呢 你发你M呢');
//     }

//     var xml = new XMLHttpRequest();
//     xml.onreadystatechange = function () {
//         if (xml.readyState == 4) {
//             if (xml.status == 200) {
//                 if (option.success) option.success(JSON.parse(xml.response));
//             } else {
//                 if (option.error) option.error(xml.response);
//             }
//         }
//     }

//     if (option.method == 'GET') {

//         if (checkType(option.data, 'Object')) {
//             var str = "?";
//             for (var i in option.data) {
//                 var key = i;
//                 var value = option.data[i];
//                 str += key + '=' + value + '&';
//             }
//             str = str.substring(0, str.length - 1);
//         } else {
//             str = '';
//         }

//         xml.open(option.method ? option.method : "GET", option.url + str);
//     } else {
//         xml.open(option.method ? option.method : "GET", option.url);
//     }

//     var contentType;
//     if (checkType(option.headers, 'Object')) {
//         for (var i in option.headers) {
//             var key = i;
//             var value = option.headers[i];
//             xml.setRequestHeader(key, value);
//         }
//         contentType = option.headers['Content-Type'];
//         if (!contentType) {
//             contentType = "application/x-www-form-urlencoded";
//             xml.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//         } else {
//             var arr = ['application/x-www-form-urlencoded', 'application/json'];
//             var state = true;
//             arr.forEach(function(item) {
//                 if (contentType == item) {
//                     state = false;
//                 }
//             })
//             if (state) {
//                 throw new Error("老逼登 你他妈单词都能写错 啊？ 老逼登");
//             }
//         }

//     } else {
//         contentType = "application/x-www-form-urlencoded";
//         xml.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     }

//     if (option.method != 'GET') {
//         // POST PUT DELETE
//         if (checkType(option.data, 'Object') && contentType == 'application/x-www-form-urlencoded') {
//             var str = "";
//             for (var i in option.data) {
//                 var key = i;
//                 var value = option.data[i];
//                 str += key + '=' + value + '&';
//             }
//             str = str.substring(0, str.length - 1);
//         } else if (contentType == 'application/json') {
//             str = JSON.stringify(option.data);
//         } else {
//             str = "";
//         }
//         xml.send(str);
//     } else {
//         xml.send();
//     }
// }

