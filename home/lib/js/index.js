var surl = 'http://localhost:3000';

var con =
	'<div class="title"><select><option value="101010100">北京</option><option value="101020100">上海</option><option value="101280101">广州</option><option value="101280601">深圳</option></select> <input type="button" value="天气查询" id="weather"><input type="button" value="添加图书" id="addBookId"></div><div class="content"><table cellpadding="0" cellspacing="0"><thead><tr><th>编号</th><th>名称</th><th>作者</th><th>分类</th><th>描述</th><th>操作</th></tr></thead><tbody id="dataList"></tbody></table></div>';

var jq = jQuery.noConflict();

jq(function() {

	// 登陆
	jq('.loginBtn').click(function() {
		var userData = {
			user: jq('.user').val(),
			psw: jq('.psw').val()
		};
		jq.ajax({
			type: 'post',
			url: surl + '/login',
			dataType: 'json',
			data: userData,
			success: function(data) {
				if (data.flag == '1') {
					var tip = new TipBox('登陆成功', 1, 'green');
					jq('.login').hide();
					jq('.box').append(con);
					initList();
					wead();
				} else if (data.flag == '0') {
					var tip = new TipBox('登陆失败!' + data.msg, 1, 'red');
					jq('.login').get(0).reset();
				} else if (data.flag == '2') {
					var tip = new TipBox('登陆失败!' + data.msg, 1, 'red');
					jq('.login').get(0).reset();
				}
			},
			error: function(textStatus, e) {
				console.log(e);
				var tip = new TipBox('登陆失败!', 1, 'red');
			}
		});
	})


	// 初始化数据列表
	function initList() {
		jq.ajax({
			type: 'get',
			url: surl + '/books',
			dataType: 'json',
			success: function(data) {
				// 渲染数据列表
				var html = template('indexTpl', {
					list: data
				});
				jq('#dataList').html(html);
				// 必须在渲染完成内容之后才可以操作DOM标签

				jq('#dataList').find('tr').each(function(index, element) {
					var td = jq(element).find('td:eq(5)');
					var id = jq(element).find('td:eq(0)').text();
					// 绑定编辑图书的单击事件
					td.find('a:eq(0)').click(function() {
						editBook(id);
					});
					// 绑定删除图书的单击事件
					td.find('a:eq(1)').click(function() {
						deleteBook(id);
					});

					// 绑定添加图书信息的单击事件
					addBook();

				});
			}
		});
	}

	// 删除图书信息
	function deleteBook(id) {
		if (confirm('是否删除?') == false) {
			return
		} else {
			jq.ajax({
				type: 'delete',
				url: surl + '/books/book/' + id,
				dataType: 'json',
				success: function(data) {
					// 删除图书信息之后重新渲染数据列表
					if (data.flag == '1') {
						initList();
						// 弹窗提示
						var tip = new TipBox('删除成功', 1, 'green');
					}
				}
			});
		}
	}

	// 编辑图书信息
	function editBook(id) {
		// 先根据数据id查询最新的数据
		jq.ajax({
			type: 'get',
			url: surl + '/books/book/' + id,
			dataType: 'json',
			success: function(data) {
				var form =
					'<form class="form" id="addBookForm"><input type="hidden" name="id"> 名称：<input type="text" name="name"><br>作者：<input type="text" name="author"><br>分类：<input type="text" name="category"><br>描述：<input type="text" name="description"><br><input type="button" value="提交"></form>';
				jq('.fromBox').html(form);
				// 初始化弹窗
				var mark = new MarkBox(600, 400, '编辑图书', jq('.form').get(0));
				mark.init();
				// 填充表单数据
				jq('.form').find('input[name=id]').val(data.id);
				jq('.form').find('input[name=name]').val(data.name);
				jq('.form').find('input[name=author]').val(data.author);
				jq('.form').find('input[name=category]').val(data.category);
				jq('.form').find('input[name=description]').val(data.description);
				// 对表单提交按钮重新绑定单击事件
				jq('.form').find('input[type=button]').unbind('click').click(function() {
					// 编辑完成数据之后重新提交表单
					jq.ajax({
						type: 'put',
						url: surl + '/books/book',
						data: jq('.form').serialize(),
						dataType: 'json',
						success: function(data) {
							if (data.flag == '1') {
								// 隐藏弹窗
								mark.close();
								// 重新渲染数据列表
								// 弹窗提示
								var tip = new TipBox('编辑成功', 1, 'green');
								initList();
							}
						}
					});
				});
			}
		});
	}

	// 添加图书信息
	function addBook() {
		jq('#addBookId').click(function() {
			var form =
				'<form class="form" id="addBookForm"><input type="hidden" name="id"> 名称：<input type="text" name="name"><br>作者：<input type="text" name="author"><br>分类：<input type="text" name="category"><br>描述：<input type="text" name="description"><br><input type="button" value="提交"></form>';
			jq('.fromBox').html(form);
			// 实例化弹窗对象
			var mark = new MarkBox(600, 400, '添加图书', jq('.form').get(0));
			mark.init();
			jq('.form').find('input[type=button]').unbind('click').click(function() {
				jq.ajax({
					type: 'post',
					url: surl + '/books/book',
					data: jq('.form').serialize(),
					dataType: 'json',
					success: function(data) {
						if (data.flag == '1') {
							// 关闭弹窗
							mark.close();
							// 添加图书成功之后重新渲染数据列表
							// 弹窗提示
							var tip = new TipBox('添加成功', 1, 'green');
							initList();
						}
					}
				});
			});
		});
	}

	// 查询天气
	function wead() {
		jq('#weather').click(function() {
			var cityCode = jq('select option:selected').val();
			jq.ajax({
				type: 'get',
				url: surl + '/weather/' + cityCode,
				dataType: 'json',
				success: function(data) {
					var html = template('weatherTpl', data.info);
					var mark = new MarkBox(null, null, '天气信息', jq(html).get(0));
					mark.init();
				}
			});
		});
	}


});
