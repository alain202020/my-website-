/* ===================================================================
   JOUW GEGEVENS — pas hier alle teksten van de website aan.
   Alle pagina's halen hun inhoud uit dit bestand.
   =================================================================== */
window.PROFILE = {
  name: "Omar Hassan",
  firstName: "Omar",
  lastName: "Hassan",
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
  projects: [
    { icon: "🧭", featured: true, title: "UX-strategieproject", context: "PicApp Sweden AB · Brugge · feb – apr 2026",
      text: "Erasmus+ stage in Brugge: met een internationaal team de onboarding en gebruikersactivatie verbeterd van een Zweedse ride-sharing-app.",
      tags: ["UX-strategie", "Onboarding", "Erasmus+"] },
    { icon: "📊", featured: true, title: "BI proof of concept & KPI-dashboard", context: "Inholland Bibliotheek · feb – jun 2026",
      text: "In teamverband een KPI-dashboard ontwikkeld met Power BI en Python, gebaseerd op Business Intelligence en Data Warehousing.",
      tags: ["Power BI", "Python", "Data Warehousing"] },
    { icon: "🤖", featured: true, title: "AI-agent voor de assistent-manager", context: "Eigen project",
      text: "Een AI-agent die de rol van assistent-manager ondersteunt op het gebied van servicekwaliteit, teamwork en organisatie.",
      tags: ["Agentic AI", "Generative AI", "Horeca"] },
    { icon: "🌍", title: "BIP “Fabricated 2.0”", context: "Internationaal project · België",
      text: "Samen met een internationaal team gewerkt aan duurzame technologie, AI, misinformatie en contentmoderatie.",
      tags: ["AI", "Duurzaamheid", "Internationaal"] },
    { icon: "📦", title: "Voorraadbeheersysteem in Excel", context: "Bar Baggerbeest",
      text: "Van een complex ontwerp met veel tabbladen naar een eenvoudig en praktisch systeem dat het personeel echt gebruikt.",
      tags: ["Excel", "Procesverbetering", "Gebruiksgemak"] },
    { icon: "🎪", title: "Embrace Cultuurfestival", context: "Amsterdam · mei – jun 2026",
      text: "Met ons team een gratis cultuurfestival georganiseerd, gehouden op 20 juni 2026.",
      tags: ["Projectmanagement", "Organisatie", "Samenwerking"] },
    { icon: "⚛️", title: "Interactief periodiek systeem", context: "React-component",
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
    { name: "Engels", label: "C1", percent: 85 },
    { name: "Turks", label: "C1", percent: 85 },
    { name: "Nederlands", label: "B2", percent: 68 }
  ],

  contactText: "Heb je een stageplek, een interessant project of wil je gewoon kennismaken? Stuur me een e-mail of een bericht via LinkedIn. Ik reageer zo snel mogelijk."
};
