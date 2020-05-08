const db = require('./db.js');
const weather = require('./api.js');

exports.login = (req, res) => {
	let info = req.body;
	console.log(info);
	let sql = 'select * from user where user =?';
	let userFine = info.user;
	db.base(sql, userFine, (result) => {
		if(result == ''){
			res.json({
				flag: 0,
				msg:'账号名不存在!'
			});
		}else{
			if(info.psw == result[0].password){
				res.json({
					flag: 1
				});
			}else{
				res.json({
					flag: 2,
					msg:'密码错误!'
				});
			}
		}
	});
};

exports.allBooks = (req, res) => {
	let sql = 'select * from book';
	db.base(sql, null, (result) => {
		res.json(result);
	});
};

exports.addBook = (req, res) => {
	let info = req.body;
	console.log(info);
	let sql = 'insert into book set ?';
	db.base(sql, info, (result) => {
		if (result.affectedRows == 1) {
			res.json({
				flag: 1
			});
		} else {
			res.json({
				flag: 2
			});
		}
	});
};

exports.getBookById = (req, res) => {
	let id = req.params.id;
	console.log(id);
	let sql = 'select * from book where id=?';
	let data = [id];
	db.base(sql, data, (result) => {
		console.log(result)
		res.json(result[0]);
	});
};

exports.editBook = (req, res) => {
	let info = req.body;
	console.log(info);
	let sql = 'update book set name=?,author=?,category=?,description=? where id=?';
	let data = [info.name, info.author, info.category, info.description, info.id];
	db.base(sql, data, (result) => {
		if (result.affectedRows == 1) {
			res.json({
				flag: 1
			});
		} else {
			res.json({
				flag: 2
			});
		}
	});
};

exports.deleteBook = (req, res) => {
	let id = req.params.id;
	console.log(id);
	let sql = 'delete from book where id=?';
	let data = [id];
	db.base(sql, data, (result) => {
		if (result.affectedRows == 1) {
			res.json({
				flag: 1
			});
		} else {
			res.json({
				flag: 2
			});
		}
	});
};

exports.queryWeather = (req, res) => {
	let cityCode = req.params.id;
	console.log(cityCode);
	weather.queryWeather(cityCode, (data) => {
		res.json({
			info: data.weatherinfo
		});
	});
}
