$(document).ready(() => {
    let ajax = new Ajax();
    ; (() => {
        ajax.post(
            "http://localhost:8080/showInfos",
            data => {
                let datas = data.results
                $.each(datas, (items) => {
                    let data = datas[items]
                    let tr = $("<tr>").addClass("tr");
                    let id = $("<td>").text(data.id).css("display", "none");
                    let sid = $("<td>").text(items + 1)
                    let name = $("<td>").text(data.name);
                    let gender = $("<td>").text(data.gender);
                    let age = $("<td>").text(data.age);
                    let adress = $("<td>").text(data.address);
                    let qq = $("<td>").text(data.qq);
                    let email = $("<td>").text(data.email);
                    let btn = $("<td>").attr("id", "button");
                    let btn1 = $("<button>").text("编辑").addClass("btn btn-primary compile");
                    let btn2 = $("<button>").text("删除").addClass("btn btn-danger del");
                    btn.append(btn1).append(btn2);
                    tbody.append(tr);
                    tr.append(id).append(sid).append(name).append(gender)
                        .append(age).append(adress).append(qq).append(email).append(btn);
                })
            }
        );
    })();
    let entirety = $(".entirety");
    let quxiao = $(".quxiao");
    let success = $("#success");
    let cancel = $("#cancel");
    let name = $("#name");
    let gender = $("#gender");
    let age = $("#age");
    let address = $("#address");
    let qq = $("#qq");
    let email = $("#email");
    let tbody = $("#tbody");
    let ssh = 0;
    $("#add").click(() => {
        ssh = 0;
        entirety.css("display", "block");
        name.val('');
        gender.val('');
        age.val('');
        address.val('');
        qq.val('')
        email.val('')
    });
    let cId;
    tbody.on("click", ".compile", function () {
        ssh = 1;
        cId = $(this).parent().parent().children().eq(0).text()
        let namet = $(this).parent().parent().children().eq(2).text();
        let gendert = $(this).parent().parent().children().eq(3).text();
        let aget = $(this).parent().parent().children().eq(4).text();
        let addresst = $(this).parent().parent().children().eq(5).text();
        let qqt = $(this).parent().parent().children().eq(6).text();
        let emailt = $(this).parent().parent().children().eq(7).text();
        name.val(namet);
        gender.val(gendert);
        age.val(aget);
        address.val(addresst);
        qq.val(qqt);
        email.val(emailt);
        entirety.css("display", "block");

        success.click(() => {
            if (ssh == 1) {
                ajax.post(
                    "http://localhost:8080/redact",
                    {
                        name: name.val(),
                        gender: gender.val(),
                        age: +age.val(),
                        address: address.val(),
                        qq: qq.val(),
                        email: email.val(),
                        id: cId
                    },
                    (data) => {
                        ajax.post(
                            "http://localhost:8080/showInfo",
                            {
                                id: cId,
                            },
                            data => {
                                let datas = data.results[0]
                                $(this).parent().parent().children().eq(2).text(datas.name);
                                $(this).parent().parent().children().eq(3).text(datas.gender);
                                $(this).parent().parent().children().eq(4).text(datas.age);
                                $(this).parent().parent().children().eq(5).text(datas.address);
                                $(this).parent().parent().children().eq(6).text(datas.qq);
                                $(this).parent().parent().children().eq(7).text(datas.email);
                            }
                        )
                    }
                );
            }
        })
    });
    quxiao.click(() => {
        entirety.css("display", "none");
    });
    cancel.click(() => {
        entirety.css("display", "none");
    });
    success.click(() => {
        let length = tbody.children().length;
        if (ssh == 0) {
            ajax.post(
                "http://localhost:8080/add",
                {
                    name: name.val(),
                    gender: gender.val(),
                    age: +age.val(),
                    address: address.val(),
                    qq: qq.val(),
                    email: email.val()
                },
                (data) => {
                    let idv = data.id
                    ajax.post(
                        "http://localhost:8080/showInfo",
                        {
                            id: idv,
                        },
                        data => {
                            let datas = data.results[0];
                            let tr = $("<tr>").addClass("tr");
                            let id = $("<td>").text(datas.id).css("display", "none");
                            let sid = $("<td>").text(length)
                            let name = $("<td>").text(datas.name);
                            let gender = $("<td>").text(datas.gender);
                            let age = $("<td>").text(datas.age);
                            let adress = $("<td>").text(datas.address);
                            let qq = $("<td>").text(datas.qq);
                            let email = $("<td>").text(datas.email);
                            let btn = $("<td>").attr("id", "button");
                            let btn1 = $("<button>").text("编辑").addClass("btn btn-primary compile");
                            let btn2 = $("<button>").text("删除").addClass("btn btn-danger del");
                            btn.append(btn1).append(btn2);
                            tbody.append(tr);
                            tr.append(id).append(sid).append(name).append(gender)
                                .append(age).append(adress).append(qq).append(email).append(btn);
                        }
                    )
                }
            )
        }
        entirety.css("display", "none");
       
    })
    tbody.on("click", ".del", function () {
        $(".entirety_one").css("display", "block");
        let dId = $(this).parent().parent().children().eq(0).text()
        $("#success1").click(() => {
            ajax.post(
                "http://localhost:8080/delete",
                {
                    id: dId
                },
                (data) => {
                    ajax.post(
                        "http://localhost:8080/showInfo",
                        {
                            id: dId,
                        },
                        (data) => {
                            $(this).parent().parent().remove();
                        }
                    )
                }
            );
            $(".entirety_one").css("display", "none");
        })
        $("#cancel1").click(() => {
            $(".entirety_one").css("display", "none");
        })
    })
});