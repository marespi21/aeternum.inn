# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: recovery.spec.ts >> Flujo de Recuperación de Contraseña >> la vista de actualizar contraseña muestra los campos correctos
- Location: tests/recovery.spec.ts:29:7

# Error details

```
TypeError: (0 , _test.expect)(...).first is not a function
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "Aeternum Logo AETERNUM MDE" [ref=e5] [cursor=pointer]:
        - /url: /
        - img "Aeternum Logo" [ref=e7]
        - generic [ref=e8]:
          - generic [ref=e9]: AETERNUM
          - generic [ref=e10]: MDE
      - navigation [ref=e11]:
        - link "EVENTOS" [ref=e12] [cursor=pointer]:
          - /url: /#eventos
        - link "VIDEO SETS" [ref=e13] [cursor=pointer]:
          - /url: /#video-sets
        - link "ARTISTAS" [ref=e14] [cursor=pointer]:
          - /url: /#artistas
        - link "GALERIA" [ref=e15] [cursor=pointer]:
          - /url: /#experiencia
        - link "SOBRE NOSOTROS" [ref=e16] [cursor=pointer]:
          - /url: /#manifiesto
        - link "COMUNIDAD" [ref=e17] [cursor=pointer]:
          - /url: /#comunidad
      - link "Ingresar" [ref=e19] [cursor=pointer]:
        - /url: /login
  - main [ref=e24]:
    - generic [ref=e26]:
      - generic [ref=e27]:
        - heading "Nueva Contraseña" [level=1] [ref=e28]
        - paragraph [ref=e29]: Ingresa tu nueva contraseña para acceder a tu cuenta.
      - generic [ref=e31]:
        - generic [ref=e32]:
          - text: Nueva Contraseña
          - textbox "••••••••" [ref=e37]
          - paragraph [ref=e38]: Debe tener al menos 8 caracteres, una mayúscula y un número.
        - button "Actualizar Contraseña" [ref=e39]
  - button "Open Next.js Dev Tools" [ref=e47] [cursor=pointer]
  - alert [ref=e51]
  - iframe [ref=e52]:
    - generic [ref=f1e1]:
      - generic [ref=f1e2]:
        - paragraph [ref=f1e3]:
          - text: You have not provided a valid SoundCloud URL.
          - link "Learn more" [ref=f1e4] [cursor=pointer]:
            - /url: https://soundcloud.com/pages/embed
          - text: about using SoundCloud players.
        - link "SoundCloud.com" [ref=f1e5] [cursor=pointer]:
          - /url: http://soundcloud.com
      - link "SoundCloud privacy policy" [ref=f1e7] [cursor=pointer]:
        - /url: https://soundcloud.com/pages/privacy
        - text: Privacy policy
  - generic [ref=e54]:
    - generic [ref=e55]:
      - button "Reproducir Radio" [ref=e56]
      - generic [ref=e59]: ON AIR
    - generic [ref=e65]:
      - generic [ref=e66]:
        - img "Aeternum" [ref=e68]
        - generic [ref=e69]: Aeternum Radio
        - generic [ref=e70]: //
        - generic [ref=e71]: AETERNUM | AMOSER | CAPÍTULO 4 | La represa (https://on.soundcloud.com/bTrEG96jfAKMXQRENg)
      - generic [ref=e72]:
        - generic [ref=e73]: La Represa
        - generic [ref=e74]: ·
        - generic [ref=e75]: 134 ravers escuchando
    - generic [ref=e81]:
      - generic [ref=e82]:
        - button "Silenciar" [ref=e83]
        - slider [ref=e88] [cursor=pointer]: "0.8"
      - link "Lineup" [ref=e89] [cursor=pointer]:
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
  16 |     await expect(page.locator('text=Recuperar Acceso')).toBeVisible();
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
> 34 |     await expect(page.locator('text=Nueva Contraseña')).first().toBeVisible();
     |                                                         ^ TypeError: (0 , _test.expect)(...).first is not a function
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