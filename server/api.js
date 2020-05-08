/*
    调用第三方接口-获取天气信息-封装通用的天气查询模块
*/

const http = require('http');
const querystring = require('querystring');
// 101280101 广州
exports.queryWeather = (cityCode,callback) => {
    let options = {
        protocol : 'http:',
        hostname : 'www.weather.com.cn',
        port : 80,
        path : '/data/sk/'+cityCode+'.html',
        method : 'get'
    }

    let req = http.request(options,(res)=>{
        let info = '';

        res.on('data',(chunk)=>{
            info += chunk;
        });
        res.on('end',()=>{
            info = JSON.parse(info);
            callback(info);
        });
    });

    req.end();
}
