import json

for lang, data in [
  ('es', {
    "mission_title": "MISION",
    "mission_desc": "Impulsar el talento local a través de live sets profesionales, embellecer espacios patrimoniales y resignificar la cultura electrónica como arte, pasión y expresión colectiva.",
    "vision_title": "VISION",
    "vision_desc": "Consolidarnos como plataforma referente en Latinoamérica para DJs emergentes, visibilizando sus proyectos y proyectando a Colombia como escenario vivo de música ante el mundo."
  }),
  ('en', {
    "mission_title": "MISSION",
    "mission_desc": "Boost local talent through professional live sets, beautify heritage spaces, and redefine electronic culture as art, passion, and collective expression.",
    "vision_title": "VISION",
    "vision_desc": "Establish ourselves as a benchmark platform in Latin America for emerging DJs, giving visibility to their projects and projecting Colombia as a living music stage to the world."
  })
]:
  f = json.load(open(f'messages/{lang}.json'))
  f["Manifesto"].update(data)
  json.dump(f, open(f'messages/{lang}.json', 'w'), indent=2, ensure_ascii=False)
