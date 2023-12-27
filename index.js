const express = require("express");
const cors = require("cors");
const path = require("path")
const app = express();
const port = 8080;
const indexRouter = require("./routes/index")

app.use(cors());

app.use(express.urlencoded());

app.use(express.json());

app.use('',indexRouter)

app.use(express.static(path.resolve(__dirname,"table")))

app.listen(port, () => {
    console.log(`服务器已启动，端口号为：${port}`)
})