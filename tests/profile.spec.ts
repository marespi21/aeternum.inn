import { test, expect } from '@playwright/test';

test.describe('Flujo de Perfil de Usuario Regular', () => {

  test('puede crear una cuenta y acceder al perfil', async ({ page }) => {
    await page.goto('/login?mode=signup');
    
    // Generar datos únicos
    const uniqueId = Date.now();
    const email = `testuser_${uniqueId}@example.com`;
    const password = `Test12345!`; // Cumple los requisitos (Mínimo 8, Mayúscula, Minúscula, Número, Especial)

    // Llenar formulario
    await page.fill('input[name="fullName"]', 'Usuario de Prueba');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="phone"]', '3000000000');
    
    // Enfocar el campo para que aparezca la validación y luego escribir
    await page.click('input[name="password"]');
    await page.fill('input[name="password"]', password);

    // Enviar el formulario
    await page.click('button[type="submit"]');

    // Debe ser redirigido a /perfil
    await page.waitForURL('**/perfil');
    
    await expect(page.locator('text=Tu Perfil')).toBeVisible();
    await expect(page.locator('text=Tus Entradas')).toBeVisible();
    await expect(page.locator('text=Cerrar Sesión')).toBeVisible();

    // Probar Cerrar Sesión
    await page.click('text=Cerrar Sesión');
    
    // Al cerrar sesión debe ser redirigido al home
    await page.waitForURL('**/');
    
    // Comprobar que no tiene acceso al perfil sin iniciar sesión
    await page.goto('/perfil');
    await page.waitForURL('**/login');
  });

});
