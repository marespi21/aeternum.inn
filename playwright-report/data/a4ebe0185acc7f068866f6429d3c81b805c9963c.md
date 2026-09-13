# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: landing.spec.ts >> events section renders correctly
- Location: tests/landing.spec.ts:27:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

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
    - generic [ref=e25]:
      - main [ref=e26]:
        - heading "AETERNUM" [level=1] [ref=e29]
        - generic [ref=e31]:
          - generic [ref=e32]:
            - generic [ref=e33]: POTENCIAMOS DJS NACIONALES
            - generic [ref=e36]: RAVES EN LUGARES INEDITOS
            - generic [ref=e39]: MOMENTOS ETERNOS
            - generic [ref=e42]: LIVE SETS
          - generic [aria-hidden] [ref=e45]:
            - generic [ref=e46]: POTENCIAMOS DJS NACIONALES
            - generic [ref=e49]: RAVES EN LUGARES INEDITOS
            - generic [ref=e52]: MOMENTOS ETERNOS
            - generic [ref=e55]: LIVE SETS
        - generic [ref=e59]:
          - generic [ref=e60]:
            - generic [ref=e61]: UNDERGROUND TECHNO & AUDIOVISUAL PLATFORM
            - paragraph [ref=e66]: Colectivo y plataforma de música electrónica en Colombia. Transformamos espacios icónicos en templos sónicos para la eternidad.
          - generic [ref=e68]:
            - generic [ref=e71]:
              - generic [ref=e72]: PILAR 01
              - heading "POTENCIAMOS DJS NACIONALES" [level=3] [ref=e75]
              - paragraph [ref=e76]: Plataforma de desarrollo y proyección del talento local.
            - generic [ref=e79]:
              - generic [ref=e80]: PILAR 02
              - heading "RAVES EN LUGARES DE PELICULA" [level=3] [ref=e83]
              - paragraph [ref=e84]: Locaciones secretas, plantas industriales y miradores.
            - generic [ref=e87]:
              - generic [ref=e88]: PILAR 03
              - heading "MOMENTOS PARA LA ETERNIDAD" [level=3] [ref=e91]
              - paragraph [ref=e92]: Grabaciones en 4K, audio 24-bit y experiencias 360°.
        - generic [ref=e93]:
          - generic [ref=e94]:
            - generic [ref=e95]:
              - generic [ref=e96]: TEMPORADA 2026 // LINEUP OFICIAL
              - heading "PROXIMOS EVENTOS" [level=2] [ref=e98]
            - paragraph [ref=e99]: Raves inmersivos en locaciones exclusivas. Aforos limitados para preservar la experiencia y la cultura underground.
          - generic [ref=e100]:
            - generic [ref=e102] [cursor=pointer]:
              - generic [ref=e103]:
                - img "AETERNUM - JUST HOUSE MUSIC" [ref=e104]
                - generic [ref=e106]: 14/06/2026
                - generic [ref=e109]: AVAILABLE
              - generic [ref=e110]:
                - generic [ref=e111]:
                  - heading "AETERNUM - JUST HOUSE MUSIC" [level=3] [ref=e112]
                  - generic [ref=e113]: Secret Location
                - button "Comprar Tickets" [ref=e119]
            - generic [ref=e127] [cursor=pointer]:
              - generic [ref=e128]:
                - img "net" [ref=e129]
                - generic [ref=e131]: 11/09/2026
                - generic [ref=e134]: AVAILABLE
              - generic [ref=e135]:
                - generic [ref=e136]:
                  - heading "net" [level=3] [ref=e137]
                  - generic [ref=e138]: Secret Location
                - button "Comprar Tickets" [ref=e144]
        - generic [ref=e151]:
          - generic [ref=e152]:
            - generic [ref=e153]:
              - generic [ref=e154]: CANAL OFICIAL // YOUTUBE @AETERNUM-INN
              - heading "LUGARES DE PELICULA" [level=2] [ref=e157]
            - generic [ref=e158]:
              - paragraph [ref=e159]: Explora las grabaciones audiovisuales oficiales en 4K. Sets cinematográficos capturados en los escenarios más imponentes de Antioquia.
              - link "Suscribirse al Canal" [ref=e160] [cursor=pointer]:
                - /url: https://www.youtube.com/@aeternum-inn?sub_confirmation=1
          - generic [ref=e168]:
            - button "TODOS LOS SETS 3" [ref=e169]:
              - generic [ref=e170]: TODOS LOS SETS
              - generic [ref=e171]: "3"
            - button "CAPITULOS 3" [ref=e172]:
              - generic [ref=e173]: CAPITULOS
              - generic [ref=e174]: "3"
          - generic [ref=e175]:
            - generic [ref=e177] [cursor=pointer]:
              - generic [ref=e178]:
                - img "AETERNUM | CASSTRII | Capítulo 3 - El Puente" [ref=e179]
                - generic [ref=e185]: CAPITULO 03
                - generic [ref=e186]: 1:42:11
              - generic [ref=e190]:
                - generic [ref=e191]:
                  - generic [ref=e192]:
                    - generic [ref=e193]: CASSTRII
                    - generic [ref=e194]: 1.2K
                  - heading "AETERNUM | CASSTRII | Capítulo 3 - El Puente" [level=3] [ref=e198]
                  - generic [ref=e199]: El Puente
                - generic [ref=e204]:
                  - generic [ref=e205]: "#TECHNO"
                  - generic [ref=e206]: Ver Set
            - generic [ref=e211] [cursor=pointer]:
              - generic [ref=e212]:
                - img "AETERNUM | JEROMEHOUSE | Capítulo 2 | La Terraza" [ref=e213]
                - generic [ref=e219]: CAPITULO 02
                - generic [ref=e220]: 1:43:42
              - generic [ref=e224]:
                - generic [ref=e225]:
                  - generic [ref=e226]:
                    - generic [ref=e227]: JEROMEHOUSE
                    - generic [ref=e228]: 1.2K
                  - heading "AETERNUM | JEROMEHOUSE | Capítulo 2 | La Terraza" [level=3] [ref=e232]
                  - generic [ref=e233]: La Terraza
                - generic [ref=e238]:
                  - generic [ref=e239]: "#TECHNO"
                  - generic [ref=e240]: Ver Set
            - generic [ref=e245] [cursor=pointer]:
              - generic [ref=e246]:
                - img "AETERNUM | AHIOX | Capítulo 1 | La Montaña." [ref=e247]
                - generic [ref=e253]: CAPITULO 01
                - generic [ref=e254]: 1:21:26
              - generic [ref=e258]:
                - generic [ref=e259]:
                  - generic [ref=e260]:
                    - generic [ref=e261]: AHIOX
                    - generic [ref=e262]: 1.2K
                  - heading "AETERNUM | AHIOX | Capítulo 1 | La Montaña." [level=3] [ref=e266]
                  - generic [ref=e267]: La Montaña
                - generic [ref=e272]:
                  - generic [ref=e273]: "#TECHNO"
                  - generic [ref=e274]: Ver Set
        - generic [ref=e278]:
          - generic [ref=e279]:
            - generic [ref=e280]:
              - generic [ref=e281]: EL TALENTO // ROSTER OFICIAL
              - heading "NUESTROS ARTISTAS" [level=2] [ref=e285]
            - paragraph [ref=e286]: Los arquitectos del sonido de Aeternum. Perfiles, sets exclusivos y memorias de nuestros invitados de honor.
          - link "INDIRA PAGANOTTO INDIRA PAGANOTTO Ver Perfil" [ref=e289] [cursor=pointer]:
            - /url: /artistas/4419a276-a9c7-4b0c-911b-9808f5e82030
            - generic [ref=e290]:
              - img "INDIRA PAGANOTTO" [ref=e291]
              - generic [ref=e293]:
                - heading "INDIRA PAGANOTTO" [level=3] [ref=e294]
                - generic [ref=e295]: Ver Perfil
        - generic [ref=e299]:
          - generic [ref=e300]:
            - generic [ref=e301]:
              - generic [ref=e302]: NUESTRA ESENCIA // ARCHIVO VISUAL
              - heading "LA EXPERIENCIA" [level=2] [ref=e306]
            - paragraph [ref=e307]: Recuerdos de nuestras ediciones pasadas. La cultura underground viva en cada rincón.
          - list "Image accordion gallery" [ref=e309]:
            - listitem "AETERNUM // 1" [ref=e310] [cursor=pointer]:
              - img "AETERNUM // 1" [ref=e313]
            - listitem "AETERNUM // 2" [ref=e314] [cursor=pointer]:
              - img "AETERNUM // 2" [ref=e317]
            - listitem "AETERNUM // 3" [ref=e318] [cursor=pointer]:
              - img "AETERNUM // 3" [ref=e321]
            - listitem "AETERNUM // 4" [ref=e322] [cursor=pointer]:
              - img "AETERNUM // 4" [ref=e325]
            - listitem "AETERNUM // 5" [ref=e326] [cursor=pointer]:
              - img "AETERNUM // 5" [ref=e329]
          - link "Ver toda la galería" [ref=e331] [cursor=pointer]:
            - /url: /galeria
        - generic [ref=e336]:
          - generic [ref=e337]:
            - generic [ref=e338]: SOBRE NOSOTROS // MANIFIESTO
            - heading "nuestra razon de ser" [level=2] [ref=e342]
            - blockquote [ref=e343]: “Colombia se ha transformado en un epicentro creativo. Queremos resignificar los espacios de la ciudad y llevar a nuestros artistas locales a otro nivel.”
          - generic [ref=e344]:
            - generic [ref=e345]:
              - button "01 ¿QUIENES SOMOS?" [ref=e346]:
                - generic [ref=e347]: "01"
                - generic [ref=e348]: ¿QUIENES SOMOS?
              - button "02 MISION & VISION" [ref=e349]:
                - generic [ref=e350]: "02"
                - generic [ref=e351]: MISION & VISION
              - button "03 OBJETIVOS" [ref=e352]:
                - generic [ref=e353]: "03"
                - generic [ref=e354]: OBJETIVOS
              - button "04 ¿QUE NOS HACE UNICOS?" [ref=e355]:
                - generic [ref=e356]: "04"
                - generic [ref=e357]: ¿QUE NOS HACE UNICOS?
            - generic [ref=e359]:
              - generic [ref=e360]:
                - generic [ref=e361]: El Colectivo
                - generic [ref=e365]: MEDELLIN UNDERGROUND
              - paragraph [ref=e366]:
                - text: Somos un colectivo que fusiona
                - strong [ref=e367]: música electrónica, arte y lugares inéditos
                - text: . Creamos experiencias inmersivas que transforman espacios icónicos en escenarios únicos, conectando DJs locales con nuevas audiencias y oportunidades globales.
              - generic [ref=e368]:
                - generic [ref=e369]: ARTE VISUAL
                - generic [ref=e370]: SONIDO 24-BIT
                - generic [ref=e371]: LOCACIONES SECRETAS
        - generic [ref=e374]:
          - generic [ref=e375]:
            - generic [ref=e376]: AETERNUM SOCIETY // ACCESO EXCLUSIVO
            - heading "UNETE A LA COMUNIDAD" [level=2] [ref=e381]
            - paragraph [ref=e382]: Regístrate para recibir acceso prioritario a la preventa de boletos, y el contenido más reciente.
            - list [ref=e383]:
              - listitem [ref=e384]:
                - generic [ref=e388]: Live sets inéditos
              - listitem [ref=e389]:
                - generic [ref=e393]: Beneficios exclusivos en nuestros eventos
              - listitem [ref=e394]:
                - generic [ref=e398]: Acceso a grabaciones de live sets
          - generic [ref=e399]:
            - generic [ref=e400]:
              - heading "Membresía Gratuita" [level=3] [ref=e401]
              - paragraph [ref=e402]: Únete en menos de 1 minuto
            - link "Registrarme" [ref=e403] [cursor=pointer]:
              - /url: /login?mode=signup
            - generic [ref=e407]: Tus datos son 100% privados y confidenciales.
      - generic [ref=e413]:
        - generic [ref=e414]:
          - generic [ref=e415]:
            - link "Aeternum Logo AETERNUM" [ref=e416] [cursor=pointer]:
              - /url: "#"
              - img "Aeternum Logo" [ref=e418]
              - generic [ref=e419]: AETERNUM
            - paragraph [ref=e420]: Plataforma y colectivo de música electrónica de Medellín, Colombia. Fomentamos la cultura de rave underground, la grabación cinematográfica y la proyección de artistas locales.
            - generic [ref=e421]: TRANSMITIENDO DESDE MEDELLÍN PARA EL MUNDO
          - generic [ref=e424]:
            - heading "COMUNIDAD & REDES" [level=4] [ref=e425]
            - generic [ref=e426]:
              - link "YouTube @aeternum-inn" [ref=e427] [cursor=pointer]:
                - /url: https://www.youtube.com/@aeternum-inn
                - generic [ref=e431]:
                  - generic [ref=e432]: YouTube
                  - generic [ref=e433]: "@aeternum-inn"
              - link "Instagram @aeternum.inn" [ref=e434] [cursor=pointer]:
                - /url: https://instagram.com/aeternum.inn
                - generic [ref=e439]:
                  - generic [ref=e440]: Instagram
                  - generic [ref=e441]: "@aeternum.inn"
              - link "SoundCloud Aeternum Radio" [ref=e442] [cursor=pointer]:
                - /url: https://soundcloud.com/aeternum-inn
                - generic [ref=e446]:
                  - generic [ref=e447]: SoundCloud
                  - generic [ref=e448]: Aeternum Radio
              - link "TikTok @aeternum.mde" [ref=e449] [cursor=pointer]:
                - /url: https://tiktok.com
                - generic [ref=e453]:
                  - generic [ref=e454]: TikTok
                  - generic [ref=e455]: "@aeternum.mde"
              - link "WhatsApp Línea Directa" [ref=e456] [cursor=pointer]:
                - /url: https://wa.me/573001234567
                - generic [ref=e460]:
                  - generic [ref=e461]: WhatsApp
                  - generic [ref=e462]: Línea Directa
          - generic [ref=e463]:
            - generic [ref=e464]:
              - heading "LOCACIÓN PRINCIPAL" [level=4] [ref=e465]
              - paragraph [ref=e466]: "Valle de Aburrá, AntioquiaCoordenadas: 6.2442° N, 75.5812° WMedellín — Colombia"
            - button "Volver Arriba" [ref=e468]
        - generic [ref=e472]:
          - generic [ref=e473]: © 2026 AETERNUM. Todos los derechos reservados.
          - generic [ref=e474]:
            - generic [ref=e475] [cursor=pointer]: Términos & Condiciones
            - generic [ref=e476] [cursor=pointer]: Política de Privacidad
            - generic [ref=e477] [cursor=pointer]: Protocolo Rave Seguro
  - button "Open Next.js Dev Tools" [ref=e483] [cursor=pointer]
  - alert [ref=e487]
  - iframe [ref=e488]:
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
  - generic [ref=e490]:
    - generic [ref=e491]:
      - button "Reproducir Radio" [ref=e492]
      - generic [ref=e495]: ON AIR
    - generic [ref=e501]:
      - generic [ref=e502]:
        - img "Aeternum" [ref=e504]
        - generic [ref=e505]: Aeternum Radio
        - generic [ref=e506]: //
        - generic [ref=e507]: AETERNUM | AMOSER | CAPÍTULO 4 | La represa (https://on.soundcloud.com/bTrEG96jfAKMXQRENg)
      - generic [ref=e508]:
        - generic [ref=e509]: La Represa
        - generic [ref=e510]: ·
        - generic [ref=e511]: 136 ravers escuchando
    - generic [ref=e517]:
      - generic [ref=e518]:
        - button "Silenciar" [ref=e519]
        - slider [ref=e524] [cursor=pointer]: "0.8"
      - link "Lineup" [ref=e525] [cursor=pointer]:
        - /url: "#eventos"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('has title and brand text', async ({ page }) => {
  4  |   await page.goto('/');
  5  | 
  6  |   // Verificar que el título de la página principal sea correcto
  7  |   await expect(page).toHaveTitle(/AETERNUM/);
  8  | 
  9  |   // Verificar que el header tenga la marca visible
  10 |   const brand = page.locator('text=AETERNUM');
  11 |   await expect(brand.first()).toBeVisible();
  12 | });
  13 | 
  14 | test('navigation to main sections works', async ({ page }) => {
  15 |   await page.goto('/');
  16 | 
  17 |   // Test de navegación rápida a manifiesto
  18 |   await page.click('text=SOBRE NOSOTROS');
  19 |   
  20 |   // Verificamos que la URL contenga el hash o se haya hecho scroll
  21 |   await expect(page).toHaveURL(/.*#manifiesto/);
  22 |   
  23 |   // Verificamos que se renderice el manifiesto
  24 |   await expect(page.locator('text=NUESTRA RAZON DE SER').first()).toBeVisible();
  25 | });
  26 | 
  27 | test('events section renders correctly', async ({ page }) => {
> 28 |   await page.goto('/');
     |              ^ Error: page.goto: Test timeout of 30000ms exceeded.
  29 | 
  30 |   // Verificar que hay al menos algún evento renderizado
  31 |   const eventHeader = page.locator('text=PROXIMOS EVENTOS');
  32 |   await expect(eventHeader.first()).toBeVisible();
  33 | });
  34 | 
```