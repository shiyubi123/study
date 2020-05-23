const http = require('http')
//在create的时候可以传入express的app，他会将app绑定到http的事件上
const server = http.createServer()
module.export = server