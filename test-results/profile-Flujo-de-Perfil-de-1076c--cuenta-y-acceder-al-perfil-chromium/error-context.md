# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: profile.spec.ts >> Flujo de Perfil de Usuario Regular >> puede crear una cuenta y acceder al perfil
- Location: tests/profile.spec.ts:5:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Tu Perfil Aeternum')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('text=Tu Perfil Aeternum') with timeout 5000ms
  - waiting for locator('text=Tu Perfil Aeternum')

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
  - link "Mi Perfil":
    - /url: /perfil
- main:
  - heading "Tu Perfil" [level=1]
  - paragraph: testuser_1789254578275@example.com
  - button "Cerrar Sesión"
  - heading "Tus Entradas" [level=2]
  - paragraph: No tienes entradas adquiridas.
  - link "Ver Eventos →":
    - /url: /#eventos
- alert: TU PERFIL
- iframe
- button "Reproducir Radio"
- text: ON AIR
- img "Aeternum"
- text: Aeternum Radio // AETERNUM | AMOSER | CAPÍTULO 4 | La represa (https://on.soundcloud.com/bTrEG96jfAKMXQRENg) La Represa · 133 ravers escuchando
- button "Silenciar"
- slider: "0.8"
- link "Lineup":
  - /url: "#eventos"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Flujo de Perfil de Usuario Regular', () => {
  4  | 
  5  |   test('puede crear una cuenta y acceder al perfil', async ({ page }) => {
  6  |     await page.goto('/login?mode=signup');
  7  |     
  8  |     // Generar datos únicos
  9  |     const uniqueId = Date.now();
  10 |     const email = `testuser_${uniqueId}@example.com`;
  11 |     const password = `Test12345!`; // Cumple los requisitos (Mínimo 8, Mayúscula, Minúscula, Número, Especial)
  12 | 
  13 |     // Llenar formulario
  14 |     await page.fill('input[name="fullName"]', 'Usuario de Prueba');
  15 |     await page.fill('input[name="email"]', email);
  16 |     await page.fill('input[name="phone"]', '3000000000');
  17 |     
  18 |     // Enfocar el campo para que aparezca la validación y luego escribir
  19 |     await page.click('input[name="password"]');
  20 |     await page.fill('input[name="password"]', password);
  21 | 
  22 |     // Enviar el formulario
  23 |     await page.click('button[type="submit"]');
  24 | 
  25 |     // Debe ser redirigido a /perfil
  26 |     await page.waitForURL('**/perfil');
  27 |     
  28 |     // Verificar que la interfaz del perfil cargue
> 29 |     await expect(page.locator('text=Tu Perfil Aeternum')).toBeVisible();
     |                                                           ^ Error: expect(locator).toBeVisible() failed
  30 |     await expect(page.locator('text=Tus Entradas')).toBeVisible();
  31 |     await expect(page.locator('text=Cerrar Sesión')).toBeVisible();
  32 | 
  33 |     // Probar Cerrar Sesión
  34 |     await page.click('text=Cerrar Sesión');
  35 |     
  36 |     // Al cerrar sesión debe ser redirigido al home
  37 |     await page.waitForURL('**/');
  38 |     
  39 |     // Comprobar que no tiene acceso al perfil sin iniciar sesión
  40 |     await page.goto('/perfil');
  41 |     await page.waitForURL('**/login');
  42 |   });
  43 | 
  44 | });
  45 | 
```