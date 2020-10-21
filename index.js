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

// let browser;

// const launchChrome = async () => {
//   browser = await puppeteer.launch({
//     executablePath: executablePath,
//     args: [
//       '–no-first-run', // 没有设置首页。在启动的时候，就会打开一个空白页面。
//       '--no-sandbox', // 去沙箱（沙箱技术经常被用于执行未经测试的或不可信的客户程序）
//       '--disable-setuid-sandbox', 
//       '–single-process', // 将 Dom 解析和渲染放到同一进程
//       '–disable-gpu',
//       '–disable-dev-shm-usage',

//     ]
//   });
// }

// (async () => {
//   // if(!browser) {
//   //   await launchChrome();
//   // }
//   browser = await puppeteer.launch({
//     executablePath: executablePath,
//     args: [
//       '–no-first-run', // 没有设置首页。在启动的时候，就会打开一个空白页面。
//       '--no-sandbox', // 去沙箱（沙箱技术经常被用于执行未经测试的或不可信的客户程序）
//       '--disable-setuid-sandbox', 
//       '–single-process', // 将 Dom 解析和渲染放到同一进程

//     ]
//   });
// (async () => {
  
// })()

  http.createServer(async (req, res) => {
    const browser = await puppeteer.launch({
      executablePath: executablePath,
      args: [
        '–no-first-run', // 没有设置首页。在启动的时候，就会打开一个空白页面。
        '--no-sandbox', // 去沙箱（沙箱技术经常被用于执行未经测试的或不可信的客户程序）
        '--disable-setuid-sandbox', 
        '–single-process', // 将 Dom 解析和渲染放到同一进程
  
      ]
    });
    try {
      const page = await browser.newPage();
      await page.setViewport({
        width: 750,
        height: 1334,
        isMobile: true
      })
      await page.setContent(HTML)
      const img = await page.screenshot({ encoding: 'base64' });
      await browser.close()

      count += 1;
      // res.writeHead(200,{'Content-Type':'text/html'});
      // res.write(`<html><body>screenshort！！！！<img src="${img}" /> </body></html>`);
      console.log('count', count);
      res.end(img);
    } catch (e) {
      console.log('error----', e);
    }
    
  }).listen(8000)

  // server.listen(8000, '127.0.0.1', () => {
  //   console.log(`Server running at http://127.0.0.1:8000/`);
  // });

// })()

  
