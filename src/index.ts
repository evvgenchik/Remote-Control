import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import dotenv from 'dotenv';
import { AddressInfo, WebSocketServer, createWebSocketStream } from 'ws';
import commandController from './controller/commandController.js';

dotenv.config();

const PORT = process.env.HTTP_PORT || 8181;
const WSSPORT = Number(process.env.WSS_PORT) || 8080;

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

httpServer.listen(PORT, () => {
  console.log(`Server start ${PORT}`);
});

const wss = new WebSocketServer({ port: WSSPORT });

const showParams = ({ port, address }: AddressInfo) => {
  console.log(`Websocket connected on adress: ${address} and port: ${port}`);
};

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  const address = wss.address() as AddressInfo;
  showParams(address);

  const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

  duplex.on('data', (chunk) => {
    commandController(chunk, duplex);
  });
});

process.on('SIGINT', () => {
  console.log('Socket and server closed');
  wss.close();
  httpServer.close();
});

export default httpServer;
