const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // REPLACE THESE WITH YOUR ACTUAL DETAILS FROM SUPABASE SETTINGS
  const SUPABASE_PROJECT_ID = 'kyazmmjkarriixsiwxpo';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5YXptbWprYXJyaWl4c2l3eHBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxNjA1ODgsImV4cCI6MjA4MDczNjU4OH0.AqiqgHWu2OVMgwZH5SVSk1NeaI7H2aDoGo7xCnZ01WE'; 

  try {
    const targetUrl = 'https://assignmenttwojinhua.great-site.net?source=666666666';
    
    console.log(`🌐 Navigating to ${targetUrl}...`);
    await page.goto(targetUrl, { waitUntil: 'networkidle' }); 

    console.log('📁 Uploading dummy file...');
    // Ensure dummy.sql exists in your GitHub repo root!
    await page.setInputFiles('input[type="file"]', 'dummy.sql');

    console.log('🖱️ Clicking the button...');
    await page.click('text=Grade Assignment'); 

    console.log('⏳ Waiting for UI process...');
    await page.waitForTimeout(5000); 

    // --- THE FIX: DIRECT API HEARTBEAT ---
    console.log('⚡ Sending Direct API Heartbeat to Supabase...');
    await page.evaluate(async (projectId, anonKey) => {
      await fetch(`https://${projectId}.supabase.co/rest/v1/?apikey=${anonKey}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${anonKey}` }
      });
    }, SUPABASE_PROJECT_ID, SUPABASE_ANON_KEY);
    // -------------------------------------

    console.log('✅ UI Action & API Heartbeat Successful!');
  } catch (error) {
    console.error('❌ Action Failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
