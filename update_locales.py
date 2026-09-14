import json

es = json.load(open('messages/es.json'))
en = json.load(open('messages/en.json'))

es.update({
  "Events": {
    "header_badge": "TEMPORADA 2026 // LINEUP OFICIAL",
    "header_title": "PROXIMOS EVENTOS",
    "header_desc": "Raves inmersivos en locaciones exclusivas. Aforos limitados para preservar la experiencia y la cultura underground.",
    "no_events": "No hay eventos programados en este momento.",
    "status_available": "DISPONIBLE",
    "status_unavailable": "NO DISPONIBLE",
    "location_tbd": "Ubicación por definir",
    "btn_finished": "Evento Finalizado",
    "btn_buy": "Comprar Tickets"
  },
  "VideoSets": {
    "header_badge": "PODCAST // AETERNUM MDE",
    "header_title": "LUGARES DE PELICULA",
    "header_desc": "Explora las grabaciones audiovisuales oficiales en 4K. Sets cinematográficos capturados en los escenarios más imponentes de Antioquia.",
    "subscribe_btn": "Suscribirse al Canal",
    "tab_all": "TODOS LOS SETS",
    "tab_chapters": "CAPITULOS",
    "tab_forest": "SESIONES EN EL BOSQUE",
    "chapter": "CAPITULO",
    "view_set": "Ver Set",
    "view_catalog": "Ver Catálogo Completo"
  },
  "Artists": {
    "header_badge": "ROSTER OFICIAL",
    "header_title": "NUESTROS ARTISTAS",
    "header_desc": "Los arquitectos del sonido de Aeternum. Perfiles, sets exclusivos y memorias de nuestros invitados de honor.",
    "view_profile": "Ver Perfil",
    "view_all": "VER TODOS LOS ARTISTAS"
  },
  "Gallery": {
    "header_badge": "NUESTRA ESENCIA",
    "header_title": "LA EXPERIENCIA",
    "header_desc": "Recuerdos de nuestras ediciones pasadas. La cultura underground viva en cada rincón."
  },
  "Manifesto": {
    "header_badge": "SOBRE NOSOTROS // MANIFIESTO",
    "header_title": "NUESTRA RAZON DE SER",
    "quote": "“Colombia se ha transformado en un epicentro creativo. Queremos resignificar los espacios de la ciudad y llevar a nuestros artistas locales a otro nivel.”",
    "tab1": "¿QUIENES SOMOS?",
    "tab2": "MISION & VISION",
    "tab3": "OBJETIVOS",
    "tab4": "¿QUE NOS HACE UNICOS?",
    "t1_title": "EL COLECTIVO",
    "t1_sub": "MEDELLIN UNDERGROUND",
    "t1_desc": "Somos un colectivo que fusiona música electrónica, arte y lugares inéditos. Creamos experiencias inmersivas que transforman espacios icónicos en escenarios únicos, conectando DJs locales con nuevas audiencias y oportunidades globales.",
    "t1_tag1": "ARTE VISUAL",
    "t1_tag2": "SONIDO 24-BIT",
    "t1_tag3": "LOCACIONES SECRETAS",
    "t2_title": "PROPÓSITO",
    "t2_sub": "VISIÓN AL FUTURO",
    "t2_desc": "Nuestra misión es llevar la cultura electrónica nacional a un estándar internacional. Queremos construir una comunidad basada en el respeto, el arte y la conexión en la pista de baile, expandiendo nuestras fronteras.",
    "t2_tag1": "COMUNIDAD",
    "t2_tag2": "INNOVACIÓN",
    "t2_tag3": "TRASCENDENCIA",
    "t3_title": "METAS",
    "t3_sub": "CRECIMIENTO",
    "t3_desc": "Fomentar nuevos talentos, descubrir locaciones extraordinarias y producir los eventos con la mejor calidad técnica y audiovisual del país, creando recuerdos para la eternidad.",
    "t3_tag1": "TALENTO",
    "t3_tag2": "PRODUCCIÓN",
    "t3_tag3": "EXCELENCIA",
    "t4_title": "NUESTRO ADN",
    "t4_sub": "LA DIFERENCIA",
    "t4_desc": "Aeternum no es solo una fiesta. Es una propuesta audiovisual inmersiva donde el espacio es tan protagonista como la música. Rompemos las reglas tradicionales para crear ecosistemas sónicos propios.",
    "t4_tag1": "IDENTIDAD",
    "t4_tag2": "INMERSIÓN",
    "t4_tag3": "VANGUARDIA"
  },
  "GuestList": {
    "header_badge": "AETERNUM SOCIETY // ACCESO EXCLUSIVO",
    "header_title": "UNETE A LA COMUNIDAD",
    "header_desc": "Regístrate para recibir acceso prioritario a la preventa de boletos, y el contenido más reciente.",
    "feature1": "Live sets inéditos",
    "feature2": "Beneficios exclusivos en nuestros eventos",
    "feature3": "Acceso a grabaciones de live sets",
    "email_ph": "Tu correo electrónico",
    "join_btn": "Unirme Ahora",
    "toast_success": "Te has suscrito exitosamente a nuestra comunidad.",
    "toast_error": "Hubo un error al suscribirte."
  }
})

en.update({
  "Events": {
    "header_badge": "SEASON 2026 // OFFICIAL LINEUP",
    "header_title": "UPCOMING EVENTS",
    "header_desc": "Immersive raves in exclusive locations. Limited capacities to preserve the underground culture and experience.",
    "no_events": "No events scheduled at this moment.",
    "status_available": "AVAILABLE",
    "status_unavailable": "UNAVAILABLE",
    "location_tbd": "Location to be defined",
    "btn_finished": "Event Finished",
    "btn_buy": "Buy Tickets"
  },
  "VideoSets": {
    "header_badge": "PODCAST // AETERNUM MDE",
    "header_title": "CINEMATIC LOCATIONS",
    "header_desc": "Explore official 4K audiovisual recordings. Cinematic sets captured in Antioquia's most breathtaking scenarios.",
    "subscribe_btn": "Subscribe to Channel",
    "tab_all": "ALL SETS",
    "tab_chapters": "CHAPTERS",
    "tab_forest": "FOREST SESSIONS",
    "chapter": "CHAPTER",
    "view_set": "Watch Set",
    "view_catalog": "View Full Catalog"
  },
  "Artists": {
    "header_badge": "OFFICIAL ROSTER",
    "header_title": "OUR ARTISTS",
    "header_desc": "The sound architects of Aeternum. Profiles, exclusive sets, and memories from our guests of honor.",
    "view_profile": "View Profile",
    "view_all": "VIEW ALL ARTISTS"
  },
  "Gallery": {
    "header_badge": "OUR ESSENCE",
    "header_title": "THE EXPERIENCE",
    "header_desc": "Memories from our past editions. The underground culture alive in every corner."
  },
  "Manifesto": {
    "header_badge": "ABOUT US // MANIFESTO",
    "header_title": "OUR REASON FOR BEING",
    "quote": "“Colombia has transformed into a creative epicenter. We want to redefine city spaces and take our local artists to another level.”",
    "tab1": "WHO ARE WE?",
    "tab2": "MISSION & VISION",
    "tab3": "OBJECTIVES",
    "tab4": "WHAT MAKES US UNIQUE?",
    "t1_title": "THE COLLECTIVE",
    "t1_sub": "MEDELLIN UNDERGROUND",
    "t1_desc": "We are a collective fusing electronic music, art, and unseen locations. We create immersive experiences transforming iconic spaces into unique stages, connecting local DJs with new audiences and global opportunities.",
    "t1_tag1": "VISUAL ART",
    "t1_tag2": "24-BIT SOUND",
    "t1_tag3": "SECRET LOCATIONS",
    "t2_title": "PURPOSE",
    "t2_sub": "FUTURE VISION",
    "t2_desc": "Our mission is to elevate national electronic culture to an international standard. We want to build a community based on respect, art, and connection on the dance floor, expanding our borders.",
    "t2_tag1": "COMMUNITY",
    "t2_tag2": "INNOVATION",
    "t2_tag3": "TRANSCENDENCE",
    "t3_title": "GOALS",
    "t3_sub": "GROWTH",
    "t3_desc": "To foster new talent, discover extraordinary locations, and produce events with the best technical and audiovisual quality in the country, creating memories for eternity.",
    "t3_tag1": "TALENT",
    "t3_tag2": "PRODUCTION",
    "t3_tag3": "EXCELLENCE",
    "t4_title": "OUR DNA",
    "t4_sub": "THE DIFFERENCE",
    "t4_desc": "Aeternum is not just a party. It's an immersive audiovisual proposal where the space is as much a protagonist as the music. We break traditional rules to create our own sonic ecosystems.",
    "t4_tag1": "IDENTITY",
    "t4_tag2": "IMMERSION",
    "t4_tag3": "VANGUARD"
  },
  "GuestList": {
    "header_badge": "AETERNUM SOCIETY // EXCLUSIVE ACCESS",
    "header_title": "JOIN THE COMMUNITY",
    "header_desc": "Register to receive priority access to ticket presales and our latest content.",
    "feature1": "Unreleased live sets",
    "feature2": "Exclusive event benefits",
    "feature3": "Access to live set recordings",
    "email_ph": "Your email address",
    "join_btn": "Join Now",
    "toast_success": "You have successfully subscribed to our community.",
    "toast_error": "There was an error subscribing."
  }
})

json.dump(es, open('messages/es.json', 'w'), indent=2, ensure_ascii=False)
json.dump(en, open('messages/en.json', 'w'), indent=2, ensure_ascii=False)
