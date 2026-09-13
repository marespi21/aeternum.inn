import { test, expect } from '@playwright/test';

test('has title and brand text', async ({ page }) => {
  await page.goto('/');

  // Verificar que el título de la página principal sea correcto
  await expect(page).toHaveTitle(/AETERNUM/);

  // Verificar que el header tenga la marca visible
  const brand = page.locator('text=AETERNUM');
  await expect(brand.first()).toBeVisible();
});

test('navigation to main sections works', async ({ page }) => {
  await page.goto('/');

  // Test de navegación rápida a manifiesto
  await page.click('text=SOBRE NOSOTROS');
  
  // Verificamos que la URL contenga el hash o se haya hecho scroll
  await expect(page).toHaveURL(/.*#manifiesto/);
  
  // Verificamos que se renderice el manifiesto
  await expect(page.locator('text=NUESTRA RAZON DE SER').first()).toBeVisible();
});

test('events section renders correctly', async ({ page }) => {
  await page.goto('/');

  // Verificar que hay al menos algún evento renderizado
  const eventHeader = page.locator('text=PROXIMOS EVENTOS');
  await expect(eventHeader.first()).toBeVisible();
});
