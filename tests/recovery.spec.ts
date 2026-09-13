import { test, expect } from '@playwright/test';

test.describe('Flujo de Recuperación de Contraseña', () => {

  test('puede navegar a recuperar contraseña y simular envío', async ({ page }) => {
    // Ir al login
    await page.goto('/login');
    
    // Clic en recuperar contraseña
    await page.click('text=¿Olvidaste tu contraseña?');
    
    // Verificar que estamos en la ruta de recuperación
    await expect(page).toHaveURL(/.*\/recuperar/);
    
    // Verificar que los elementos UI están presentes
    await expect(page.locator('text=Recuperar Contraseña').first()).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    
    // Simular el envío de un correo (no podemos probar la recepción del correo en E2E básico sin servicios externos, 
    // pero probamos la UI del submit)
    await page.fill('input[type="email"]', 'test_recovery@example.com');
    await page.click('button[type="submit"]');
    
    // Esperamos a que la página reaccione (el action redireccionará con un message)
    // El mensaje de éxito suele contener "Revisa tu correo"
    await expect(page.locator('text=Revisa tu correo')).toBeVisible();
  });

  test('la vista de actualizar contraseña muestra los campos correctos', async ({ page }) => {
    // Simulamos que el usuario hizo clic en el enlace y llegó a actualizar-password
    await page.goto('/actualizar-password');
    
    await expect(page.locator('text=Nueva Contraseña').first()).toBeVisible();
    
    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput).toBeVisible();
    
    // El texto estático de requisitos de la nueva contraseña
    await expect(page.locator('text=Debe tener al menos 8 caracteres, una mayúscula y un número.')).toBeVisible();
  });

});
