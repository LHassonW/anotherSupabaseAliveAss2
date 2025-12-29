const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // WE ADDED THE STRING HERE: '?source=KEEP_ALIVE_SCRIPT'
    // This string will travel through your logs as part of the request metadata
    const targetUrl = 'https://assignmenttwojinhua.great-site.net?source=666666666';
    
    console.log(`🌐 Navigating to ${targetUrl}...`);
    await page.goto(targetUrl); 

    console.log('📁 Uploading dummy file...');
    await page.setInputFiles('input[type="file"]', 'dummy.sql');

    console.log('🖱️ Clicking the button...');
    await page.click('text=Grade Assignment'); 

    console.log('⏳ Waiting for process to complete...');
    await page.waitForTimeout(10000); 

    console.log('✅ UI Action Successful! Search your logs for "KEEP_ALIVE_SCRIPT"');
  } catch (error) {
    console.error('❌ UI Action Failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
