//实现图书管理系统后台接口
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router.js');
const logger = require('morgan');
const app = express();

//设置允许跨域访问该服务
app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', '*');
	// res.header('Access-Control-Allow-Headers', 'Content-Type');
	// res.header('Content-Type', 'application/json;charset=utf-8');
	next();
});

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
	extended: false
}));

// 路由
app.use(router);

// 监听
app.listen(3000, () => {
	console.log('后端: http://localhost:3000/');
});
