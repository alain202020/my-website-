// Jaar in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobiel menu
const toggle = document.querySelector('.nav-toggle');
const links = document.getElementById('nav-links');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

// Secties laten invliegen bij scrollen
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.timeline-item, .skill-card, .edu-card, .two-col > *, .project-card').forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

// Afsprakenformulier -> opent e-mailprogramma met ingevuld bericht
const EMAIL = 'omaralain2020@gmail.com';
const form = document.getElementById('appointment-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;
  ['name', 'email', 'message'].forEach((id) => {
    const field = form.elements[id];
    const ok = field.value.trim() !== '' && field.checkValidity();
    field.classList.toggle('invalid', !ok);
    if (!ok) valid = false;
  });
  if (!valid) {
    status.textContent = 'Vul je naam, een geldig e-mailadres en een bericht in.';
    return;
  }

  const { name, email, date, topic, message } = form.elements;
  const subject = `Afspraakverzoek: ${topic.value} — ${name.value.trim()}`;
  const body = [
    `Naam: ${name.value.trim()}`,
    `E-mail: ${email.value.trim()}`,
    `Voorkeursdatum: ${date.value || 'geen voorkeur'}`,
    `Onderwerp: ${topic.value}`,
    '',
    message.value.trim(),
  ].join('\n');

  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  status.textContent = 'Je e-mailprogramma wordt geopend. Klik daar op "Verzenden" om de aanvraag te versturen.';
  form.reset();
});
