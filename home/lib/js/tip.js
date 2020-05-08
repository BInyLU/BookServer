/**
 **  msgTest  用户自定义信息
 **  msgTimer 用户自定义提示框出现时间
 **  msgColor 用户自定义提示框颜色
 **  callback 用户自定义回调事件
 **  
 **  实例化例子: var TipBoxDemo = new TipBox('你好', 1, 'blue', function(){ } )
 **/
function TipBox(msgText, msgTimer, msgColor, callback) {
	msgText ? this.msgText = msgText : this.msgText = '初始化 TipBox.js 成功!';
	msgTimer ? this.msgTimer = msgTimer : this.msgTimer = 2;
	msgColor ? this.msgColor = msgColor : this.msgColor = 'red';
	callback ? this.callback = callback() : this.initCallbacks();
	this.init();
}

function $(elemt) {
	return document.querySelector(elemt);
}

TipBox.prototype = {
	init: function() {
		if ($('.tipDiv')) {
			if ($('#styleEl')) {
				document.head.removeChild($('#styleEl'));
			}
			document.body.removeChild($('.tipDiv'));
			this.caretMsgBox();
			return;
		}
		this.caretMsgBox();
	},
	caretMsgBox: function() {
		var tipDiv = document.createElement('div');
		tipDiv.className = 'tipDiv';
		document.body.appendChild(tipDiv);
		var msgDiv = '';
		msgDiv += this.msgText;
		$('.tipDiv').innerHTML = msgDiv;
		this.caretMsgStyle($('.tipDiv'));
	},
	caretMsgStyle: function(oTipDiv) {
		var styleEl = document.createElement('style');
		styleEl.id = 'styleEl';
		document.head.appendChild(styleEl);
		styleEl.innerHTML = ".tipDiv{background-color: " + this.msgColor +
			";color: #fff;position: fixed;bottom: 10%;left: 50%;transform: translate(-50%,-50%);padding: 10px 20px;box-shadow: 10px 10px 30px rgba(0,0,0,.2);opacity: 0;animation: tipboxfadein " +
			this.msgTimer +
			"s ease-in-out forwards;}@keyframes tipboxfadein{0%{opacity: 0;bottom: 0;}20%{opacity: .8;bottom: 10%;}80%{opacity: .8;bottom: 10%;}100%{opacity: 0;bottom: 0;}}@-ms-keyframes tipboxfadein{0%{opacity: 0;bottom: 0;}20%{opacity: .8;bottom: 10%;}80%{opacity: .8;bottom: 10%;}100%{opacity: 0;bottom: 0;}}@-webkit-keyframes {0%{opacity: 0;bottom: 0;}20%{opacity: .8;bottom: 10%;}80%{opacity: .8;bottom: 10%;}100%{opacity: 0;bottom: 0;}}@-moz-keyframes {0%{opacity: 0;bottom: 0;}20%{opacity: .8;bottom: 10%;}80%{opacity: .8;bottom: 10%;}100%{opacity: 0;bottom: 0;}}";
	},
	initCallbacks: function() {
		console.log('初始化 TipBox.js 默认回调事件.')
	}
}
