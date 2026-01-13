const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    const errors = [];

    // Collect console errors
    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(msg.text());
        }
    });

    // Collect page errors
    page.on('pageerror', err => {
        errors.push(err.message);
    });

    try {
        // Load the page
        await page.goto(`file://${process.cwd()}/index.html`, { waitUntil: 'networkidle' });
        console.log('Page loaded successfully');

        // Check if key elements exist
        const title = await page.title();
        console.log(`Page title: ${title}`);

        const heroText = await page.textContent('.hero h1');
        console.log(`Hero text found: ${heroText}`);

        // Check navigation links
        const navLinks = await page.$$('.nav-links a');
        console.log(`Navigation links found: ${navLinks.length}`);

        // Check sections exist
        const sections = await page.$$('section');
        console.log(`Sections found: ${sections.length}`);

        // Check for errors
        if (errors.length > 0) {
            console.log('\nConsole Errors:');
            errors.forEach(err => console.log(`  - ${err}`));
        } else {
            console.log('\nNo console errors detected!');
        }

        console.log('\nWebsite test completed successfully!');

    } catch (err) {
        console.error('Test failed:', err.message);
    } finally {
        await browser.close();
    }
})();
