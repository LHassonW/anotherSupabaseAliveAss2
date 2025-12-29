const { chromium } = require('playwright');

(async () => {
  // 1. Launch the browser
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    console.log('🌐 Navigating to your website...');
    // REPLACE with your actual published website URL
    await page.goto('https://assignmenttwojinhua.great-site.net'); 

    // 2. Simulate File Upload
    // This looks for an <input type="file">. 
    // We will create a small 'dummy.sql' in the repo to upload.
    console.log('📁 Uploading dummy file...');
    await page.setInputFiles('input[type="file"]', 'dummy.sql');

    // 3. Click the Submit/Grade Button
    // Replace 'Submit' with the actual text on your button
    console.log('🖱️ Clicking the button...');
    await page.click('text=Grade Assignment'); 

    // 4. Wait for a few seconds to let the Edge Function finish
    console.log('⏳ Waiting for process to complete...');
    await page.waitForTimeout(10000); 

    console.log('✅ UI Action Successful! Project stack is fully active.');
  } catch (error) {
    console.error('❌ UI Action Failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
