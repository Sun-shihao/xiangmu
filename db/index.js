const mysql = require("mysql2");


module.exports = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'123456',
    port: 3306,
    database:'dome',
    connectionLimit:15,
});

// module.exports = { pool };



// create table `userinfo`(
//     `id` int(11) auto_increment primary Key,
//     `name` varchar(255) not null,
//     `gender` varchar(20) not null,
//     `age` varchar(20) not null,
//     `address` varchar(255) not null,
//     `qq` BigInt(12) unique not null,
//     `email` varchar(255) unique not null
// );

// insert into userinfo(`姓名`,`性别`,`年龄`,`地址`,`QQ`,`E-mail`) value("成千","男","20","成都","1723579865","sads@163.com");
