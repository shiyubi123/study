
var net = require('net')

var server = net.createServer()
var querystring = require('querystring')

var port = 8080

var msgs = [{
    name:1,
    message:'hello',
    timestamp:1567475447335,
}]

server.on('connection',conn => {
    conn.on('data',data => {
        var request = data.toString()
        var [header,body] = request.split('\r\n\r\n')
        var [firstLine,...headers] = header.split('\r\n')
        var [method,path] = firstLine.split(' ')
        
        
        if(method == 'POST'){
            var msg = querystring.parse(body)
            msg.timestamp = Date.now()
            msgs.push(msg)
            conn.write('HTTP/1.1 302 Moved\r\n')
            conn.write('Location:/\r\n\r\n')
            conn.end()
            return
        }
        debugger
        if(true || method == 'GET'){
            console.log(2)
            conn.write('HTTP/1.1 200 OK\r\n')
            conn.write('Content-Type:text/html;charset=UTF-8\r\n')
            conn.write('\r\n')
            conn.write(`
                <style>
                    .message-box{
                        border:1px solid;
                        margin:5px;
                        padding:10px;
                    }
                </style>
                <form method="POST" action="/">
                    Name:<br>
                    <input name = 'name'/> <br>
                    Message:<br>
                    <textarea name = 'message'></textarea>
                    <br>
                    <button>提交</button>
                </form>
                <hr>
            `)
            
            msgs.reduceRight((memo,msg) => {
                var html = `
                <div class = message-box>
                    <h3>${msg.name}<small>${new Date(msg.timestamp).toISOString()}</small></h3>
                    <pre>${msg.message}</pre>
                </div>
                `
                conn.write(html)
            },null)
            conn.end()
            return 
        }

    })
})

server.listen(port,() => {
    console.log('port ' + port + ' is listened')
})


