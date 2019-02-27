import express from 'express';
import App from '../dist/ssr/app';
import { StaticRouter } from 'react-router';
import reactDOMServer from 'react-dom/server';

const app = express();

app.get('*', (req, res) => {
  const html=  reactDOMServer.renderToString(
               <StaticRouter
                 location={req.url}
                 context={{
                   name: 'leonidas'
                 }}
               >
                <App/>
               </StaticRouter>
             )
  res.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Platzi Video</title>
      <!-- <link rel="stylesheet" href="dist/css/home.7646f097e8e64cbf8f09.css"> -->
    </head>
    <body>
      <div id="home-container">Hola mundo ${html}</div>
      <div id="modal-container"></div>
      
      <script src="http://localhost:9000/js/app.js"></script>
      <!-- <script src="dist/js/home.7646f097e8e64cbf8f09.js"></script> -->
    </body>
    </html> 
  `);
  res.end();
})

app.listen(3000);
console.log('el server prendió en el puerto 3000');