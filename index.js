var runtime = require('runtimejs');

var TCPSocket = runtime.net.TCPSocket;
var TCPServerSocket = runtime.net.TCPServerSocket;
var IP4Address = runtime.net.IP4Address;
var encoder = new TextEncoder('utf-8');
var decoder = new TextDecoder('utf-8');

var socket = new TCPServerSocket();

var body = '<html><body>Hello World!</body></html>';
var response = [
  'HTTP/1.1 200 OK',
  'Content-Type: text/html',
  'Connection: close',
  'Content-Length: ' + body.length,
  '',
  body
];

var buf = encoder.encode(response.join('\r\n'));

socket.onconnect = function(socket) {
  socket.ondata = function(u8) {
    var str = decoder.decode(u8);
    socket.send(buf);
    socket.close();
  };

  socket.onend = function() {};
  socket.onclose = function() {};
};

socket.listen(9000);
console.log('Listening to port 9000');
