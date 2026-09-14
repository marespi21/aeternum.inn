import json

for lang, extra_manifesto, extra_gallery in [
  ('es', {
    "obj_title1": "Embellecer Espacios",
    "obj_desc1": "Transformar locaciones patrimoniales e industriales.",
    "obj_title2": "Romper Estigmas",
    "obj_desc2": "Reivindicar la electrónica como arte y unión comunitaria.",
    "obj_title3": "Turismo Cultural",
    "obj_desc3": "Posicionar a Medellín en el circuito internacional.",
    "obj_title4": "Impulso a DJs Locales",
    "obj_desc4": "Producción audiovisual 4K para proyectar nuevo talento.",
    "unique_title1": "Calidad 4K",
    "unique_desc1": "Grabaciones audiovisuales cinematográficas con master 24-bit.",
    "unique_title2": "PROYECCION GLOBAL",
    "unique_desc2": "Conexión directa con audiencias y festivales de LATAM y el mundo.",
    "unique_title3": "Cultura Real",
    "unique_desc3": "Experiencias inmersivas 100% auténticas, sin filtros comerciales."
  }, {
    "view_all": "Ver toda la galería"
  }),
  ('en', {
    "obj_title1": "Beautify Spaces",
    "obj_desc1": "Transform heritage and industrial locations.",
    "obj_title2": "Break Stigmas",
    "obj_desc2": "Reclaim electronic music as art and community union.",
    "obj_title3": "Cultural Tourism",
    "obj_desc3": "Position Medellín in the international circuit.",
    "obj_title4": "Boost Local DJs",
    "obj_desc4": "4K audiovisual production to project new talent.",
    "unique_title1": "4K Quality",
    "unique_desc1": "Cinematic audiovisual recordings with 24-bit master.",
    "unique_title2": "GLOBAL PROJECTION",
    "unique_desc2": "Direct connection with audiences and festivals in LATAM and the world.",
    "unique_title3": "Real Culture",
    "unique_desc3": "100% authentic immersive experiences, without commercial filters."
  }, {
    "view_all": "View full gallery"
  })
]:
  data = json.load(open(f'messages/{lang}.json'))
  data["Manifesto"].update(extra_manifesto)
  data["Gallery"].update(extra_gallery)
  json.dump(data, open(f'messages/{lang}.json', 'w'), indent=2, ensure_ascii=False)
