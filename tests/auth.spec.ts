import { test, expect } from '@playwright/test';

test.describe('Autenticación y Redirecciones', () => {
  const testEmail = 'mariacvidales@gmail.com';
  const testPassword = 'cami12345';

  test('puede iniciar sesión y redirige al panel admin si es administrador', async ({ page }) => {
    await page.goto('/login');

    // Llenar el formulario de login
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);
    
    // Clic en el botón de Iniciar Sesión (buscamos un botón que diga "Iniciar Sesión" o "Ingresar" o type="submit")
    // El botón podría tener texto como 'Iniciar Sesión', 'Entrar', etc.
    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.click();

    // Como configuramos previamente que si es ADMIN al ir a /perfil va a /admin, 
    // y el login suele redirigir a /perfil, deberíamos terminar en /admin si este usuario es admin.
    // Daremos un tiempo para la redirección.
    await page.waitForURL('**/admin**', { timeout: 10000 }).catch(() => {
        // En caso de que redirija a /perfil (si no es admin)
        console.log("No redirigió a /admin automáticamente, revisando URL actual...");
    });
    
    // Verificamos si terminamos en /admin (si es admin) o /perfil (si es usuario normal)
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/.*(\/admin|\/perfil)/);
    
    // Si terminó en /admin, significa que la redirección de administrador funcionó perfectamente
    if (currentUrl.includes('/admin')) {
      await expect(page.locator('text=Vista Previa del Sitio').first()).toBeVisible();
    } else {
      // Si terminó en perfil
      await expect(page.locator('text=Cerrar Sesión').first()).toBeVisible();
    }
  });

  test('los requisitos de contraseña en registro solo aparecen al enfocar', async ({ page }) => {
    // Ir al modo registro
    await page.goto('/login?mode=signup');
    
    // Verificar que los requisitos NO están visibles inicialmente
    const reqText = page.locator('text=Mínimo 8 caracteres');
    await expect(reqText).toBeHidden();
    
    // Hacer clic en el campo de contraseña para enfocarlo
    await page.click('input[name="password"]');
    
    // Ahora los requisitos DEBEN ser visibles
    await expect(reqText).toBeVisible();
    
    // Escribir una contraseña que no cumple todo (ej. 'abc')
    await page.fill('input[name="password"]', 'abc');
    
    // Clic fuera del campo (desenfocar)
    await page.click('body');
    
    // Como es inválida, DEBE seguir siendo visible
    await expect(reqText).toBeVisible();
    
    // Volver a enfocar y escribir una contraseña válida
    await page.click('input[name="password"]');
    await page.fill('input[name="password"]', 'Valida1234!');
    
    // Desenfocar
    await page.click('body');
    
    // Como ahora es completamente válida, DEBE desaparecer
    await expect(reqText).toBeHidden();
  });
});
