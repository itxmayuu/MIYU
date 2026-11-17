const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const filePath = path.join(__dirname, reqPath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Archivo no encontrado');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

function getLocalIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

let currentPort = 3000;

function startServer(port) {
  server.listen(port, '0.0.0.0', () => {
    const localIP = getLocalIP();
    console.log('\n======================================================');
    console.log('   🔥 MIYU Workout App - Servidor Local Listo');
    console.log('======================================================\n');
    console.log(`💻 En tu PC Asus (Windows):`);
    console.log(`   http://localhost:${port}\n`);
    console.log(`📱 En tu iPhone (conectado a la misma red Wi-Fi):`);
    console.log(`   http://${localIP}:${port}\n`);
    console.log('💡 TIP PARA IPHONE:');
    console.log('   Abre la URL en Safari, toca el botón "Compartir" y luego');
    console.log('   "Agregar a pantalla de inicio" para tenerla instalada como app.\n');
    console.log('Presiona Ctrl + C para detener el servidor.\n');
  });
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`⚠️  El puerto ${currentPort} ya está en uso por otra ventana o proceso.`);
    currentPort++;
    console.log(`🔄 Intentando automáticamente en el puerto ${currentPort}...\n`);
    startServer(currentPort);
  } else {
    console.error('Error en el servidor:', err);
  }
});

startServer(currentPort);
