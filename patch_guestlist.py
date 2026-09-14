import json

for lang, extra in [
  ('es', {
    "free_membership": "Membresía Gratuita",
    "join_quick": "Únete en menos de 1 minuto",
    "register": "Registrarme",
    "privacy": "Tus datos son 100% privados y confidenciales."
  }),
  ('en', {
    "free_membership": "Free Membership",
    "join_quick": "Join in under 1 minute",
    "register": "Register Now",
    "privacy": "Your data is 100% private and confidential."
  })
]:
  data = json.load(open(f'messages/{lang}.json'))
  data["GuestList"].update(extra)
  json.dump(data, open(f'messages/{lang}.json', 'w'), indent=2, ensure_ascii=False)
