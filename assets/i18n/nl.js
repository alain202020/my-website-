/* ===================================================================
   NEDERLANDS — pas hier de Nederlandse teksten van de website aan.
   (Engels: en.js · Arabisch: ar.js — zelfde opbouw.)
   =================================================================== */
(window.PROFILES = window.PROFILES || {}).nl = {
  langName: "Nederlands",
  name: "Omar Hassan",
  firstName: "Omar",
  lastName: "Hassan",
  initials: "OM",
  location: "Amsterdam",
  availability: "Beschikbaar voor stage · feb – jun · Amsterdam",
  titleStart: "Business IT Management student —",
  // Deze woorden worden één voor één 'getypt' op de homepage:
  typedWords: ["Power BI", "digitale transformatie", "Power Platform", "UX-strategie", "AI & agentic AI"],
  email: "omaralain2020@gmail.com",
  linkedin: "https://www.linkedin.com/in/omar-hassan-849558201",
  photo: "assets/omar.jpg", // leeg laten ("") om je initialen te tonen

  intro: "Tweedejaars student Business IT Management aan Hogeschool Inholland Amsterdam, met een passie voor digitale innovatie en AI. Ik werk op het snijvlak van technologie, psychologie en strategie.",

  about: [
    "Ik ben Omar, tweedejaars student <strong>Business IT Management</strong> aan Hogeschool Inholland Amsterdam, met een passie voor <strong>digitale innovatie en AI</strong>. In mijn studie richt ik me op <strong>Power BI</strong>, <strong>Power Apps</strong> en <strong>digitale transformatie</strong>.",
    "Ik werk graag op het snijvlak van technologie, psychologie en strategie: analytisch, kalm en ‘eerst denken, dan doen’. In de horeca zie ik elke dag dat technologie pas waarde heeft als mensen er echt mee werken. Daarom begin ik altijd bij de gebruiker.",
    "Ik zoek een <strong>stage in Amsterdam van februari tot en met juni</strong>, bij een organisatie die werkt aan digitale innovatie, data of het Power Platform."
  ],

  stats: [
    { n: 7, suffix: "", label: "projecten" },
    { n: 4, suffix: "", label: "talen" },
    { n: 4, suffix: "+", label: "jaar werkervaring" }
  ],

  interests: ["UX-strategie", "Productinnovatie", "Power Platform", "Digitale innovatie", "AI & agentic AI", "Internationale projecten", "Duurzaamheid", "Mensenrechten", "Voetbal", "Bodyweight-training", "Rijbewijs B"],

  experience: [
    { role: "Assistent-manager", org: "Bar Baggerbeest, Amsterdam · parttime", period: "aug 2026 – heden",
      text: "Ik ondersteun de leiding bij teamaansturing, verkoop en de dagelijkse operatie. In dienst sinds februari 2025, begonnen als bartender. Hier ontwikkelde ik ook een praktisch voorraadbeheersysteem." },
    { role: "Receptionist", org: "Parkview Hotel, Amsterdam · parttime", period: "mrt 2022 – jan 2026",
      text: "Aan de front desk verantwoordelijk voor reserveringen, gastontvangst en betalingen. Sprong bij waar nodig, zoals bij e-mail en fietsverhuur." },
    { role: "Chauffeur / pakketbezorger", org: "PostNL, Amsterdam", period: "mei 2024 – dec 2024",
      text: "Zelfstandig en op tijd pakketten bezorgen volgens een vaste route en planning." }
  ],

  education: [
    { title: "Business IT Management", org: "Hogeschool Inholland Amsterdam · verwachte afronding 2029", period: "feb 2025 – heden", tag: "HBO · BACHELOR" },
    { title: "Nederlandse taal B2", org: "Hogeschool van Amsterdam", period: "mei 2023 – feb 2024", tag: "TAAL" },
    { title: "Civiele techniek", org: "RTE Universiteit, Rize (Turkije)", period: "sep 2019 – okt 2021", tag: "UNIVERSITEIT" }
  ],

  certificates: [
    { title: "BIP Sustainable Technology", org: "VIVES Hogeschool", period: "jan 2026", tag: "CERTIFICAAT" },
    { title: "Communicatie-innovatie: AI Buddy", org: "Calidus", period: "sep 2025", tag: "CERTIFICAAT" },
    { title: "Vrijwilliger bij Kletsmaatjes", org: "Tijd maken voor een goed gesprek", period: "", tag: "VRIJWILLIGER" }
  ],

  // featured: true = ook tonen op de homepage
  // cats: filtergroepen op de projectenpagina (data, ai, ux)
  projects: [
    { icon: "🧭", featured: true, cats: ["ux"], title: "UX-strategieproject", context: "PicApp Sweden AB · Brugge · feb – apr 2026",
      text: "Erasmus+ stage in Brugge: met een internationaal team de onboarding en gebruikersactivatie verbeterd van een Zweedse ride-sharing-app.",
      tags: ["UX-strategie", "Onboarding", "Erasmus+"] },
    { icon: "📊", featured: true, cats: ["data"], title: "BI proof of concept & KPI-dashboard", context: "Inholland Bibliotheek · feb – jun 2026",
      text: "In teamverband een KPI-dashboard ontwikkeld met Power BI en Python, gebaseerd op Business Intelligence en Data Warehousing.",
      tags: ["Power BI", "Python", "Data Warehousing"] },
    { icon: "🤖", featured: true, cats: ["ai"], title: "AI-agent voor de assistent-manager", context: "Eigen project",
      text: "Een AI-agent die de rol van assistent-manager ondersteunt op het gebied van servicekwaliteit, teamwork en organisatie.",
      tags: ["Agentic AI", "Generative AI", "Horeca"] },
    { icon: "🌍", cats: ["ai"], title: "BIP “Fabricated 2.0”", context: "Internationaal project · België",
      text: "Samen met een internationaal team gewerkt aan duurzame technologie, AI, misinformatie en contentmoderatie.",
      tags: ["AI", "Duurzaamheid", "Internationaal"] },
    { icon: "📦", cats: ["data", "ux"], title: "Voorraadbeheersysteem in Excel", context: "Bar Baggerbeest",
      text: "Van een complex ontwerp met veel tabbladen naar een eenvoudig en praktisch systeem dat het personeel echt gebruikt.",
      tags: ["Excel", "Procesverbetering", "Gebruiksgemak"] },
    { icon: "🎪", cats: ["ux"], title: "Embrace Cultuurfestival", context: "Amsterdam · mei – jun 2026",
      text: "Met ons team een gratis cultuurfestival georganiseerd, gehouden op 20 juni 2026.",
      tags: ["Projectmanagement", "Organisatie", "Samenwerking"] },
    { icon: "⚛️", cats: ["ux"], title: "Interactief periodiek systeem", context: "React-component",
      text: "Een Nederlandstalig periodiek systeem als React-component, met zoeken, filteren en detailpanelen per element.",
      tags: ["React", "JavaScript", "UX"] }
  ],

  skills: [
    { group: "Data & BI", items: ["Power BI", "Python", "Datamodellering", "KPI-dashboards", "Data Warehousing", "Excel"] },
    { group: "Power Platform & AI", items: ["Power Apps", "Digitale transformatie", "AI-agents", "React"] },
    { group: "Business & processen", items: ["Bedrijfsanalyse", "Procesmodellering", "Informatiemanagement", "Projectmanagement", "UX-strategie"] }
  ],

  // percent = lengte van de balk
  languages: [
    { name: "Arabisch", label: "Moedertaal", percent: 100 },
    { name: "Engels", label: "Vloeiend", percent: 95 },
    { name: "Turks", label: "C1", percent: 85 },
    { name: "Nederlands", label: "B2", percent: 68 }
  ],

  contactText: "Heb je een stageplek, een interessant project of wil je gewoon kennismaken? Stuur me een e-mail of een bericht via LinkedIn. Ik reageer zo snel mogelijk.",

  /* Vaste teksten van de pagina's */
  ui: {
    meta: {
      home: ["Omar Hassan — Business IT Management", "Portfolio van Omar Hassan, student Business IT Management aan Hogeschool Inholland Amsterdam. Op zoek naar een stage in Amsterdam (februari – juni)."],
      over: ["Over mij — Omar Hassan", "Over Omar Hassan: profiel, werkervaring, opleiding en certificaten."],
      projecten: ["Projecten — Omar Hassan", "Projecten van Omar Hassan: BI-dashboards, AI-agents, UX-strategie en meer."],
      vaardigheden: ["Vaardigheden — Omar Hassan", "Vaardigheden en talen van Omar Hassan."],
      contact: ["Contact — Omar Hassan", "Neem contact op met Omar Hassan via e-mail of LinkedIn."]
    },
    nav: { home: "Home", over: "Over mij", projecten: "Projecten", vaardigheden: "Vaardigheden", contact: "Contact", cta: "Neem contact op" },
    common: {
      nextPage: "Volgende pagina", moreInfo: "Meer info", project: "PROJECT", copied: "✓ E-mailadres gekopieerd",
      photoAlt: "Portretfoto van", menu: "Menu", close: "Sluiten", email: "E-mail", language: "Taal kiezen",
      filters: { all: "Alles", data: "Data & BI", ai: "AI", ux: "UX & organisatie" }
    },
    home: {
      scroll: "SCROLL", drag: "↻ SLEEP OM TE DRAAIEN", ctaContact: "Neem contact op", ctaProjects: "Bekijk projecten",
      whoLabel: "Wie ik ben", moreAbout: "Meer over mij", featuredLabel: "Uitgelicht", featuredTitle: "Geselecteerd <em>werk</em>",
      allProjects: "Alle projecten", exploreLabel: "Ontdek", exploreTitle: "Verken de <em>site</em>",
      tileOver: "Profiel, werkervaring en opleiding", tileProjecten: "BI, AI, UX en organisatie",
      tileSkills: "Vaardigheden en talen in 3D", tileContact: "Laten we kennismaken"
    },
    over: {
      h1a: "Techniek die", h1b: "<em>mensen</em> helpt.",
      intro: "Analytisch, kalm en ‘eerst denken, dan doen’: op het snijvlak van technologie, psychologie en strategie.",
      chipStudy: "STUDIE", chipStudyText: "<b>Business IT</b> Management", chipBase: "BASIS", chipBaseText: "<b>Amsterdam</b> · NL",
      profileLabel: "Profiel", expLabel: "Werkervaring", expTitle: "Ervaring in de <em>praktijk</em>",
      expNote: "Naast mijn studie leer ik in de horeca en de hotellerie hoe je teams, gasten en processen soepel laat lopen.",
      eduLabel: "Opleiding", eduTitle: "Leren &amp; <em>groeien</em>", certs: "Certificaten &amp; vrijwilligerswerk"
    },
    projecten: {
      h1a: "Geselecteerd", h1b: "werk",
      intro: "Van KPI-dashboards en AI-agents tot UX-strategie en een cultuurfestival. Beweeg over een kaart om hem in 3D te kantelen; klik voor details."
    },
    vaardigheden: {
      h1a: "Wat ik", h1b: "<em>meebreng</em>",
      intro: "Data, het Power Platform en bedrijfsprocessen — plus vier talen.",
      drag: "Sleep de bol om te draaien", langs: "Talen"
    },
    contact: { h1a: "Laten we", h1b: "<em>praten</em>.", copy: "E-mail kopiëren" }
  }
};
