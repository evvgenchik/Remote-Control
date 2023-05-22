import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import { AddressInfo, WebSocket, WebSocketServer, createWebSocketStream } from 'ws';
import commandController from '../controller/commandController.js';

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

const showParams = ({ port, address }: AddressInfo) => {
  console.log(`Websocket started on adress: ${address} and port: ${port}`);
};

export const wss = new WebSocketServer({ port: 8080 });

wss.on('listening', () => {
  const address = wss.address() as AddressInfo;
  showParams(address);
});

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  const duplex = createWebSocketStream(ws, { decodeStrings: false });

  duplex.on('data', (chunk) => {
    commandController(chunk.toString(), duplex);
  });
});

process.on('SIGINT', () => {
  console.log('Socket and server closed');
  // wss.close();
  httpServer.close();
});

export default httpServer;
