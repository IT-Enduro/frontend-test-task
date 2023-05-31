import puppeteer from 'puppeteer';
import yargs from 'yargs/yargs';
import {hideBin} from 'yargs/helpers';
import {wait} from './helper.mjs'
import runListTests from './list.mjs';
import runDetailsTests from './details.mjs';

const {argv} = yargs(hideBin(process.argv));

(async () => {
    const browser = await puppeteer.launch({headless: argv.headless && JSON.parse(argv.headless)});
    const page = await browser.newPage();
    const url = argv.url ?? 'http://localhost:8000/'
    await page.goto(url);
    await page.setViewport({width: 1280, height: 1024});

    console.log('Loading app...');
    await page.waitForSelector('[data-test-id="App"]', {timeout: 5000});
    await wait(3000);
    console.log('App loaded. Running tests...');
    try {
        await runListTests(page);
        await runDetailsTests(page);
        console.log('Tests ends successfully!');
    } catch (e) {
        console.error(`Tests failed due ${e.message}!`);
        throw e;
    } finally {
        await browser.close();
    }
})();