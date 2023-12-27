const express = require("express");
const md5 = require("md5")
const router = express.Router();
const database = require("../db");


let regN = /^[\u4e00-\u9fa5A-z_]{2,12}$/;
let regG = /^(男|女){1}$/;
let regA = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/;
let regS = /^[\u4e00-\u9fa5]{2,20}$/;
let regQ = /^[1-9][0-9]{8,11}$/;
let regE = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

//单个拿数据
router.post('/showInfo', (req, res) => {     // 在路由对象上配置具体路由，处理 POST 请求
    let { id } = req.body;
    database.getConnection((error, connection) => {
        if (error) {
            res.status(503).json({
                msg: "服务器出错"
            })
        } else {
            const sqlStr = `select * from userinfo where id="${id}"`;	// 查询SQL语句
            database.query(sqlStr, (err, results) => {
                if (err) {
                    return err.message
                } else {
                    // res.send(...results);
                    res.status(200).json({
                        results:results
                    })
                }
            })
        }
        database.releaseConnection(connection);
    })
});
module.exports = router;	// 导出路由模块


//拿所有数据
router.post('/showInfos', (req, res) => {     // 在路由对象上配置具体路由，处理 POST 请求
    // let { username } = req.body;
    database.getConnection((error, connection) => {
        if (error) {
            res.status(503).json({
                msg: "服务器出错"
            })
        } else {
            const sqlStr = `select * from userinfo`;	// 查询SQL语句
            connection.query(sqlStr, (err, results) => {
                if (err) {
                    return err.message
                } else {
                    // res.send(...results);
                    res.status(200).json({
                        results
                    })
                }
            })
        }
        database.releaseConnection(connection);
    })
});

module.exports = router


//添加接口
router.post("/add", (req, res) => {
    let { name, gender, age, address, qq, email } = req.body;

    // if (!regN.test(name)) {
    //     res.status(203).json({
    //         status: 11100,
    //         msg: "姓名格式不正确"
    //     })
    // }
    // if (!regG.test(gender)) {
    //     res.status(203).json({
    //         status: 11101,
    //         msg: "性别格式不正确"
    //     })
    // }
    // if (!regA.test(age)) {
    //     res.status(203).json({
    //         status: 11102,
    //         msg: "年龄格式不正确"
    //     })
    // }
    // if (!regS.test(address)) {
    //     res.status(203).json({
    //         status: 11103,
    //         msg: "地址格式不正确"
    //     })
    // }
    // if (!regQ.test(qq)) {
    //     res.status(203).json({
    //         status: 11104,
    //         msg: "QQ格式不正确"
    //     })
    // }
    // if (!regE.test(email)) {
    //     res.status(203).json({
    //         status: 11105,
    //         msg: "E-mail格式不正确"
    //     })
    // // }
    // if (regN.test(name) && regG.test(gender) && regA.test(age) && regS.test(address) && regQ.test(qq) && regE.test(email)) {
        database.getConnection((error, connection) => {
            if (error) {
                console.log(error);
                res.status(503).json({
                    status: 12000,
                    msg: "服务器崩溃了，请等待"
                });
            } else {
                connection.query(`insert into userinfo(name,gender,age,address,qq,email) value("${name}","${gender}","${age}","${address}","${qq}","${email}")`, (error, data) => {
                    if (error) {
                        console.log(error);
                        res.status(503).json({
                            status: 503333,
                            msg: "数据库出错，请检查数据"
                        })
                    } else {
                        res.status(200).json({
                            status: 10086,
                            msg: "添加成功",
                            id: data.insertId
                        })
                    }
                })
            };
            database.releaseConnection(connection);
        });
    // } else {
    //     res.status(203).json({
    //         status: 123456,
    //         msg: "格式错误"
    //     })
    // }
});

module.exports = router;

// 编辑接口
router.post('/redact', (req, res) => {
    let { name, gender, age, address, qq, email, id } = req.body;
    // if (!regN.test(name)) {
    //     res.status(203).json({
    //         status: 11100,
    //         msg: "姓名格式不正确"
    //     })
    // }
    // if (!regG.test(gender)) {
    //     res.status(203).json({
    //         status: 11101,
    //         msg: "性别格式不正确"
    //     })
    // }
    // if (!regA.test(age)) {
    //     res.status(203).json({
    //         status: 11102,
    //         msg: "年龄格式不正确"
    //     })
    // }
    // if (!regS.test(address)) {
    //     res.status(203).json({
    //         status: 11103,
    //         msg: "地址格式不正确"
    //     })
    // }
    // if (!regQ.test(qq)) {
    //     res.status(203).json({
    //         status: 11104,
    //         msg: "QQ格式不正确"
    //     })
    // }
    // if (!regE.test(email)) {
    //     res.status(203).json({
    //         status: 11105,
    //         msg: "E-mail格式不正确"
    //     })
    // }
    // if (regN.test(name) && regG.test(gender) && regA.test(age) && regS.test(address) && regQ.test(qq) && regE.test(email)) {
        database.getConnection((error, connection) => {
            if (error) {
                console.log(error);
                res.status(503).json({
                    status: 12000,
                    msg: "服务器崩溃了，请等待"
                });
            } else {
                connection.query(`update userinfo set name="${name}",gender="${gender}",age="${age}",address="${address}",qq="${qq}",email="${email}" where id="${id}"`, (error) => {
                    if (error) {
                        console.log(error);
                        res.status(503).json({
                            status: 503333,
                            msg: "数据库出错，请检查数据"
                        })
                    } else {
                        res.status(200).json({
                            status: 10086,
                            msg: "修改成功"
                        })
                    }
                })
            };
            database.releaseConnection(connection);
        });
    // } else {
    //     res.status(203).json({
    //         status: 123456,
    //         msg: "格式错误"
    //     })
    // }
})

module.exports = router;

//删除接口
router.post('/delete', (req, res) => {
    let { id } = req.body;
    database.getConnection((error, connection) => {
        if (error) {
            console.log(error);
            res.status(503).json({
                status: 12000,
                msg: "服务器崩溃了，请等待"
            });
        } else {
            connection.query(`delete from userinfo where id=${ id }`, (error) => {
                if (error) {
                    console.log(error);
                    res.status(503).json({
                        status: 503333,
                        msg: "数据库出错，请检查数据"
                    })
                } else {
                    res.status(200).json({
                        status: 10086,
                        msg: "删除成功"
                    })
                }
            })
        };
        database.releaseConnection(connection);
    });
});

module.exports = router;



