const puppeteer = require('puppeteer-core')
// const request = require('request');
var fs = require("fs");
const http = require('http');
const os = require("os");
// const cluster = require("cluster");

// const cpuNum = os.cpus().length;

// console.log('---', cpuNum);

const executablePath = process.platform === 'darwin' ?
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' :
  '/usr/local/app/linux-515411/chrome-linux/chrome';

let HTML = fs.readFileSync('./index.html', 'utf8');

let count = 0;

// if (cluster.isMaster) {
//   const cpuNum = os.cpus().length;
//   for (let i = 0; i < cpuNum; ++i) {
//       cluster.fork();
//   }
// } else {
//   runServer();
// }

let browser;

const launchChrome = async () => {
  browser = await puppeteer.launch({
    executablePath: executablePath
  });
}

(async () => {
  if(!browser) {
    await launchChrome();
  }
  http.createServer(async (req, res) => {
    try {
      const page = await browser.newPage();
      await page.setViewport({
        width: 750,
        height: 1334,
        isMobile: true
      })
      await page.setContent(HTML)
      const img = await page.screenshot({ encoding: 'base64' })
      await page.close()

      count += 1;
      console.log('count', count);
      res.end(img);
    } catch (e) {
      console.log('error----', e);
    }
    
  }).listen(8000)

})();

  

  // server.listen(8000, '127.0.0.1', () => {
  //   console.log(`Server running at http://127.0.0.1:8000/`);
  // });

// })()

  
