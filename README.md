# node-server

实现一个能处理路由，支持静态目录的 server

1. 简单创建一个静态服务器
使用require来载入http模块，并将实例化的HTTP赋值给变量http

var http = require('http')

创建服务器，使用http.createServer()方法创建服务器，并使用listen方法绑定端口

http.createServer(funtion(request,response){
  response.write('hello,this is a test page!')
  response.end()
}).listen()
2. 实现处理路由，支持静态目录的 server
步骤一：创建一个服务器
步骤二：在服务器中处理路由
获取请求的地址
连接路径：将请求的地址与具体要返回数据的地址连接起来
通过路径来读取文件内容，处理文件读取不了的错误即正确时显示的内容
步骤三：用listen()方法绑定端口
var http = require('http')  //引入http模块，用来创建一个服务器
var path = require('path') //引入path模块，用来处理文件路径
var fs = require('fs')     //引入文件系统模块，用来读写文件，读写数据
var url = require('url')   //用来自动解析url，得到一个与url信息相关的对象

function staticRoot(staticPath,req,res){
  var pathObj = url.parse(req.url,true) //获取请求的地址
  //设置默认打开的文件为test.html,这也是网站明明没有请求test.html，却打开了的原因
  if(pathObj.pathname === '/'){
    pathObj.pathname += 'test.html'
  }
  var filePath = path.join(staticPath,pathObj.pathname) //用于连接路径，得到所请求文件的具体路径
  
  //异步读取文件内容
  fs.readFile(filePath,'binary',function(err,fileContent){
    // 文件读取错误时展现的内容
    if(err){
      res.writeHead(404,'not found')
      res.end('<h1>404 not found</h1>')
    } else {
      //文件正确读取时显示请求的页面内容
      res.writeHead(200,'ok')
      res.write(fileContent,'binary')
      res.end()
    }
  })

}

// 使用 http.createServer() 方法创建服务器
var server = http.createServer(function(req,res){
  staticRoot(path.join(__dirname,'simple'),req,res) //__dirname 表示当前执行脚本所在的目录
})
// 使用 listen 方法绑定 8080 端口
server.listen(8080)
