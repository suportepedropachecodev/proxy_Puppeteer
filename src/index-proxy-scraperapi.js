const puppeteer = require('puppeteer');
const proxyChain = require('proxy-chain');
require('dotenv').config();

const IDUSERNAME = process.env.IDUSERNAME;
const TOKEN = process.env.TOKEN;

const sitealvo = 'https://www.meuip.com.br/';

(async () => {
    console.time('#acesso');
    const oldProxyUrl = `http://${IDUSERNAME}:${TOKEN}@proxy-server.scraperapi.com:8001`;
    const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);

    console.log(newProxyUrl);

    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        args: [`--proxy-server=${newProxyUrl}`],
    });
    const page = await browser.newPage();
    
    console.log('Abrindo a pagina via proxy ...');

    //let tentativas = 12;
    await page.setDefaultNavigationTimeout(0);

    await page.goto(sitealvo);
    await page.screenshot({path: 'examplescraperapi2.png'});

    await browser.close();
    await proxyChain.closeAnonymizedProxy(newProxyUrl, true);
    console.timeEnd('#acesso');
})();