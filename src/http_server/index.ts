import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import { WebSocketServer } from 'ws';

export const httpServer = http.createServer((req, res) => {
  const dirname = path.resolve(path.dirname(''));

  const filePath = dirname + (req.url === '/' ? '/front/index.html' : `/front${req.url}`);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

httpServer.listen(8181, () => {
  console.log(`Server start 8181`);
});

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('websocket connect');

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});

export default httpServer;
