# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: recovery.spec.ts >> Flujo de Recuperación de Contraseña >> puede navegar a recuperar contraseña y simular envío
- Location: tests/recovery.spec.ts:5:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Recuperar Acceso')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('text=Recuperar Acceso') with timeout 5000ms
  - waiting for locator('text=Recuperar Acceso')

```

```yaml
- banner:
  - link "Aeternum Logo AETERNUM MDE":
    - /url: /
    - img "Aeternum Logo"
    - text: AETERNUM MDE
  - navigation:
    - link "EVENTOS":
      - /url: /#eventos
    - link "VIDEO SETS":
      - /url: /#video-sets
    - link "ARTISTAS":
      - /url: /#artistas
    - link "GALERIA":
      - /url: /#experiencia
    - link "SOBRE NOSOTROS":
      - /url: /#manifiesto
    - link "COMUNIDAD":
      - /url: /#comunidad
  - link "Ingresar":
    - /url: /login
- main:
  - link "Volver al inicio de sesión":
    - /url: /login
  - heading "Recuperar Contraseña" [level=1]
  - paragraph: Ingresa tu correo y te enviaremos un enlace para crear una nueva contraseña.
  - text: Correo Electrónico
  - textbox "tu@correo.com"
  - button "Enviar Enlace"
- alert
- iframe
- button "Reproducir Radio"
- text: ON AIR
- img "Aeternum"
- text: Aeternum Radio // AETERNUM | AMOSER | CAPÍTULO 4 | La represa (https://on.soundcloud.com/bTrEG96jfAKMXQRENg) La Represa · 134 ravers escuchando
- button "Silenciar"
- slider: "0.8"
- link "Lineup":
  - /url: "#eventos"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Flujo de Recuperación de Contraseña', () => {
  4  | 
  5  |   test('puede navegar a recuperar contraseña y simular envío', async ({ page }) => {
  6  |     // Ir al login
  7  |     await page.goto('/login');
  8  |     
  9  |     // Clic en recuperar contraseña
  10 |     await page.click('text=¿Olvidaste tu contraseña?');
  11 |     
  12 |     // Verificar que estamos en la ruta de recuperación
  13 |     await expect(page).toHaveURL(/.*\/recuperar/);
  14 |     
  15 |     // Verificar que los elementos UI están presentes
> 16 |     await expect(page.locator('text=Recuperar Acceso')).toBeVisible();
     |                                                         ^ Error: expect(locator).toBeVisible() failed
  17 |     await expect(page.locator('input[type="email"]')).toBeVisible();
  18 |     
  19 |     // Simular el envío de un correo (no podemos probar la recepción del correo en E2E básico sin servicios externos, 
  20 |     // pero probamos la UI del submit)
  21 |     await page.fill('input[type="email"]', 'test_recovery@example.com');
  22 |     await page.click('button[type="submit"]');
  23 |     
  24 |     // Esperamos a que la página reaccione (el action redireccionará con un message)
  25 |     // El mensaje de éxito suele contener "Revisa tu correo"
  26 |     await expect(page.locator('text=Revisa tu correo')).toBeVisible();
  27 |   });
  28 | 
  29 |   test('la vista de actualizar contraseña muestra los campos correctos', async ({ page }) => {
  30 |     // Simulamos que el usuario hizo clic en el enlace y llegó a actualizar-password
  31 |     await page.goto('/actualizar-password');
  32 |     
  33 |     // Verificamos elementos UI
  34 |     await expect(page.locator('text=Nueva Contraseña')).first().toBeVisible();
  35 |     
  36 |     const passwordInput = page.locator('input[type="password"]');
  37 |     await expect(passwordInput).toBeVisible();
  38 |     
  39 |     // El texto estático de requisitos de la nueva contraseña
  40 |     await expect(page.locator('text=Debe tener al menos 8 caracteres, una mayúscula y un número.')).toBeVisible();
  41 |   });
  42 | 
  43 | });
  44 | 
```