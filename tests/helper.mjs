export async function isExist(page, selector, multi) {
    let element;
    if (multi) {
        element = await page.$$(selector);
    } else {
        element = await page.$(selector);
    }

    if (multi && element?.length || element) {
        console.log(`Element with selector ${selector} exists`);
    } else {
        throw new Error(`Element with selector ${selector} does not exist`);
    }

    return element;
}

export function wait(ms) {
    return new Promise(r => setTimeout(r, ms));
}