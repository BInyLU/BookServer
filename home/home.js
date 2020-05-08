const express = require('express');
const fs = require('fs');
const app = express();

// 打开监听端口
var servers = app.listen(3001, function() {
    var host = servers.address().address;
    var port = servers.address().port;
    console.log('前端: http://localhost:' + port + '/');
});

// 静态资源
app.use('/public', express.static('lib'));
app.use('/', express.static('views'));

// 主页
app.get('/', (req, res) => {
	fs.readFile("./views/index.html", function(err, data) {
		if (err) {
			console.log(err);
		} else {
			res.writeHead(200, {
				"Content-Type": "text/html"
			});
			res.write(data.toString());
		}
		res.end();
	});
});