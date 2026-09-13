import { test, expect } from '@playwright/test';

// Guardar el estado de autenticación para no tener que loguearse en cada test
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Navegación del Panel Administrativo', () => {
  test.beforeEach(async ({ page }) => {
    // Iniciar sesión antes de cada prueba de admin
    await page.goto('/login');
    await page.fill('input[type="email"]', 'mariacvidales@gmail.com');
    await page.fill('input[type="password"]', 'cami12345');
    await page.locator('button[type="submit"]').click();
    
    // Esperar a que la redirección a admin suceda (o forzar ir a admin si fue a perfil)
    await page.waitForURL(/.*(\/admin|\/perfil)/, { timeout: 10000 });
    if (!page.url().includes('/admin')) {
        await page.goto('/admin');
    }
    // Asegurarse de estar en el admin
    await expect(page).toHaveURL(/.*\/admin.*/);
  });

  test('puede ver la lista de boletas', async ({ page }) => {
    // El home de admin suele ser boletas o dashboard
    await expect(page.locator('text=Boletas').first()).toBeVisible();
  });

  test('puede navegar a la sección de Eventos', async ({ page }) => {
    // Buscar el link en la barra lateral
    await page.click('a[href="/admin/eventos"]');
    await expect(page).toHaveURL(/.*\/admin\/eventos/);
    await expect(page.locator('text=Eventos').first()).toBeVisible();
  });

  test('puede navegar a la sección de Artistas', async ({ page }) => {
    await page.click('a[href="/admin/artistas"]');
    await expect(page).toHaveURL(/.*\/admin\/artistas/);
    await expect(page.locator('text=Artistas').first()).toBeVisible();
  });
});
