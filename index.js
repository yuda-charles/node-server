var http = require('http')
var path = require('path')
var fs = require('fs')
var url = require('url')

function staticRoot(staticPath,req,res){
  var pathObj = url.parse(req.url,true) //获取请求的地址
  if(pathObj.pathname === '/'){
    pathObj.pathname += 'test.html'
  }
  var filePath = path.join(staticPath,pathObj.pathname)
  
  //异步读取文件内容
  fs.readFile(filePath,'binary',function(err,fileContent){
    if(err){
      res.writeHead(404,'not found')
      res.end('<h1>404 not found</h1>')
    } else {
      res.writeHead(200,'ok')
      res.write(fileContent,'binary')
      res.end()
    }
  })

}

var server = http.createServer(function(req,res){
  staticRoot(path.join(__dirname,'simple'),req,res)
})
server.listen(8080)
