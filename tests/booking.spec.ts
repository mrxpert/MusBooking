import { test, Page, expect } from '@playwright/test';
import { log } from 'console';

test('book_appointment', async ({ page }) => {
    
    const url = 'https://musbooking.com/katalog/repetitsionnye-bazy/moskva-i-mo/repetitsionnaya-baza-proletarskaya-krestyanskaya-zastava-hendrix-studio-proletarskaya-i-vintage';
 
    const datePrettyfier = (date: Date) : string => (date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString());
    
    const currentDate = new Date();
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    const monthInAdvance = new Date(currentDate.getTime() + thirtyDays);
    const dateTimeLocator: string = `//div[@id="${datePrettyfier(monthInAdvance)}-23"]`; // refactor it
    
    const login = '9617847556';
    const password = 'Password1234!';

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

    // Нажатие на кнопку Далее
    await frame.locator('//a[contains(@class, "next_button_check") and span[text()="Далее"]]').click()

    // Ввод логина и пароля
    await frame.locator('//input[@id="login"]').fill(login)
    await frame.locator('//input[@id="password"]').fill(password)

    // Нажатие на "Войти"
    await frame.locator('//button[@id="login-modal_form__btn-submit"]').click()

    await expect(page).toHaveTitle('MUSbooking');
})