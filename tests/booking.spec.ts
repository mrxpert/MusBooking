import { test, Page, expect } from '@playwright/test';

test('book_appointment', async ({ page }) => {
    
    const url = 'https://musbooking.com/katalog/repetitsionnye-bazy/moskva-i-mo/repetitsionnaya-baza-proletarskaya-krestyanskaya-zastava-hendrix-studio-proletarskaya-i-vintage';
 
    const datePrettyfier = (date: Date) : string => (date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString());
    
    const currentDate = new Date();
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    const monthInAdvance = new Date(currentDate.getTime() + thirtyDays);
    const dateTimeLocator: string = `//div[@id="${datePrettyfier(monthInAdvance)}-23"]`; // refactor it
    
    await page.goto(url, { timeout: 50000 });

    // Нажатие "Нет, спасибо" (отказаться от скачивания)
    await page.locator('//a[@class="download-popup-button secondary"]').click();

    // Нажатие "Забронировать"
    await page.locator('//button[@data-room_name="DRUMROOM"]').click();

    // Ожидание iframe со слотами
    await page.waitForSelector('iframe');
    const frame = page.frameLocator('iframe');

    // Нажатие на слот в таблице
    await frame.locator(dateTimeLocator).click({ timeout: 50_000 });

    await expect(page).toHaveTitle('MUSbooking');
})