import {isExist} from './helper.mjs'

async function runHeaderTests(page){
    await isExist(page,'[data-test-id="Shop_Logo"]');
    await isExist(page,'[data-test-id="Shop_Name"]');
}

async function runItemsTests(page){
    await isExist(page,'[data-test-id="Category_Name"]');
    const element = await isExist(page,'[data-test-id="List_Item"]', true);
    if (element.length === 20) {
        console.log('Page has 20 items');
    } else {
        throw new Error('Page items are not equal 20');
    }
    console.log('All categories has items');
}


export default async function runListTests(page) {
    await runHeaderTests(page);
    await runItemsTests(page);
}