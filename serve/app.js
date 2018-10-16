//使用express构建web服务器 --11:25
const express = require('express');
const bodyParser = require('body-parser');
const cors=require("cors");
let app = express();
let http = app.listen(3000);
const io = require('socket.io').listen(http);
/*引入路由模块*/
let login=require("./routes/login");
let friend = require("./routes/friend");
let forget =require("./routes/forget");
let find = require("./routes/find");
let background = require('./routes/background');
let msg = require('./routes/msg');
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
/**解决跨域请求 */
app.use(cors({
    origin:[
        "http://127.0.0.1:8080",
        "http://localhost:8080",
        "http://172.242.10.59:8080",
        "http://localhost:9001",
        "http://172.242.10.58:8080",
        "http://172.242.10.36:8080",
        "http://172.242.22.146.8080"
    ],
    credentials:true,
}));
//  socket.io 的使用
io.sockets.on('connection', (socket) => {
    console.log('连接成功');
    socket.emit('login', 'loginSuccess');
    socket.on('toggle', value => {
        console.log(value);
        socket.emit('toggle', !value);
    })
});
//托管静态资源到public目录下
app.use(express.static('public'));
/*使用路由器来管理路由*/
app.use("/login",login);
app.use("/friend",friend);
app.use("/forget",forget);
app.use("/find",find);
app.use('/background',background);
app.use('/msg',msg);

