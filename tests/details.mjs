import {isExist, wait} from './helper.mjs'

async function runNavigationTests(page){
    const element = await isExist(page,'[data-test-id="Navigation_All_Products"]');

    const tagName = await page.evaluate(el => el.tagName, element);

    if (tagName.toLowerCase() === 'a') {
        console.log('Element with data-test-id="Navigation_All_Products" is the link');
    } else {
        throw new Error('Element with data-test-id="Navigation_All_Products" is not the link');
    }
    await isExist(page,'[data-test-id="Navigation_Product_Name"]');
}

async function runItemTests(page){
    await isExist(page,'[data-test-id="Product_Picture"]');
    await isExist(page,'[data-test-id="Product_Name"]');
    await isExist(page,'[data-test-id="Product_Price"]');
    await isExist(page,'[data-test-id="Product_Rating"]');
    await isExist(page,'[data-test-id="Product_Description"]');
}


export default async function runDetailsTests(page) {
    const firstLink = await page.$('a');
    if (firstLink) {
        await firstLink.click();
    } else {
        throw new Error('No links found on the Product Lists page');
    }
    await wait(3000);
    await runNavigationTests(page);
    await runItemTests(page);
}