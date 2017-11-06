var fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

// 从命令行参数获取root目录，默认是当前目录:var root = path.resolve(process.argv[2] || '.');
var root = path.resolve(process.argv[2] || '.');
console.log('Static root dir: ' + root);

var server = http.createServer(function (request, response) {
  var pathname = url.parse(request.url).pathname, // '/static/bootstrap.css'
      filepath = path.join(root, pathname);       // '/srv/www/static/bootstrap.css'
  console.log(request.url,pathname);
  // 获取文件状态:
  fs.stat(filepath, function (err, stats) {
    // 没有出错并且文件存在:
    if (!err && stats.isFile()) {
      // 发送200响应:
      console.log('200 ' + request.url);
      response.writeHead(200);
      // 将文件流导向response:
      fs.createReadStream(filepath).pipe(response);
    } else {
      // 出错了或者文件不存在:
      console.log('404 ' + request.url);
      // 发送404响应:
      response.writeHead(404);
      response.end('404 Not Found');
    }
  });
});

server.listen(6666);

console.log('Server is running at http://127.0.0.1:6666/');
