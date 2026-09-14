import json

for lang, artistas_page, galeria_page in [
  ('es', {
    "back_to_home": "Volver al inicio",
    "header_badge": "ROSTER COMPLETO",
    "header_title": "TODOS LOS ARTISTAS",
    "header_desc": "Los arquitectos del sonido de Aeternum. Perfiles, sets exclusivos y memorias de nuestros invitados de honor.",
    "no_artists": "No hay artistas disponibles en este momento.",
    "view_profile": "Ver Perfil"
  }, {
    "back_to_home": "VOLVER AL INICIO",
    "header_badge": "ARCHIVO VISUAL",
    "header_title": "GALERIA",
    "header_desc": "Recuerdos de nuestras ediciones pasadas. La cultura electrónica viva en cada rincón.",
    "records": "registros",
    "no_files": "No hay archivos en la galería aún."
  }),
  ('en', {
    "back_to_home": "Back to Home",
    "header_badge": "FULL ROSTER",
    "header_title": "ALL ARTISTS",
    "header_desc": "The sound architects of Aeternum. Profiles, exclusive sets, and memories from our guests of honor.",
    "no_artists": "No artists available at the moment.",
    "view_profile": "View Profile"
  }, {
    "back_to_home": "BACK TO HOME",
    "header_badge": "VISUAL ARCHIVE",
    "header_title": "GALLERY",
    "header_desc": "Memories from our past editions. The electronic culture alive in every corner.",
    "records": "records",
    "no_files": "There are no files in the gallery yet."
  })
]:
  data = json.load(open(f'messages/{lang}.json'))
  data["ArtistasPage"] = artistas_page
  data["GaleriaPage"] = galeria_page
  json.dump(data, open(f'messages/{lang}.json', 'w'), indent=2, ensure_ascii=False)
