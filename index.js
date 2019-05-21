var fs =require('fs')
var f = fs.readFileSync('/tmp/shuatoken.conf','utf-8');
var schedule = require('node-schedule');
var fetch = require('node-fetch')
var ar = f.split(':')

if (ar.length !=2){
    console.log('create /tmp/shuatoken.conf')
    console.log('appid:appsecret')
    process.exit(1)
}
appid = f.split(':')[0].trim()
appsecret = f.split(':')[1].trim()

var url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${appsecret}`

function refresh() {
    fetch(url).then(function (rx) {
       rx.json.then(function (r) {
           console.log(r)
           fs.writeFileSync('/tmp/'+appid, JSON.stringify(r));
       })
    })
}
refresh()
var j = schedule.scheduleJob('1 1 * * *', function(){
    refresh()
});