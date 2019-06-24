var StaticServer = require('static-server');
const serverPort = process.env.PORT || 8887
var server = new StaticServer({
  rootPath: '.',            // required, the root of the server file tree
  port: serverPort,               // required, the port to listen
  name: 'super-mauro-bros',   // optional, will set "X-Powered-by" HTTP header
  cors: '*',                // optional, defaults to undefined
  followSymlink: true,      // optional, defaults to a 404 error
  templates: {
    index: 'index.html',      // optional, defaults to 'index.html'
    notFound: '404.html'    // optional, defaults to undefined
  }
});

server.start(function () {
  console.log('Server listening to', server.port);
});
