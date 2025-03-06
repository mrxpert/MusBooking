import { test, Page, expect } from '@playwright/test';

test('book_appointment', async ({ page }) => {

    const url = 'https://musbooking.com/katalog/repetitsionnye-bazy/moskva-i-mo/repetitsionnaya-baza-proletarskaya-krestyanskaya-zastava-hendrix-studio-proletarskaya-i-vintage';
    const date = '//div[@id="{formatted_date}-23"]';
    
    await page.goto(url, { timeout: 50000 });
    console.log('11111111!!!');
    // Нажатие "Нет, спасибо" (отказаться от скачивания)
    await page.locator('//a[@class="download-popup-button secondary"]').click();

    // Нажатие "Забронировать"
    await page.locator('//button[@data-room_name="DRUMROOM"]').click();

    // Ожидание iframe со слотами
    await page.waitForSelector('iframe');
    const frame = page.frameLocator('iframe');
    console.log(frame);
    
    // 
    
    

    await expect(page).toHaveTitle('MUSbooking');
})