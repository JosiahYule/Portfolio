/* =============================================================
   Portfolio JS: header state, current-section marker, contact form.
   Everything on the page is readable without this file.
   ============================================================= */

document.getElementById('year').textContent = new Date().getFullYear();

/* ===== Header border + current section in the nav ===== */
const header = document.querySelector('.site-header');
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sections = navLinks
  .map((a) => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

function updateNav() {
  header.classList.toggle('is-scrolled', window.scrollY > 8);

  // The current section is the last one whose top has passed a line
  // 35% down the viewport. Above the first section (the hero), none is.
  const line = window.innerHeight * 0.35;
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
  let current = null;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= line) current = section;
  }
  if (atBottom) current = sections[sections.length - 1];

  navLinks.forEach((a) => {
    if (current && a.getAttribute('href') === `#${current.id}`) a.setAttribute('aria-current', 'true');
    else a.removeAttribute('aria-current');
  });
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { updateNav(); ticking = false; });
}, { passive: true });
window.addEventListener('resize', updateNav, { passive: true });
updateNav();

/* ===== Contact form ===== */
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

const messages = {
  firstName: { valueMissing: 'Please add your first name.' },
  lastName:  { valueMissing: 'Please add your last name.' },
  email:     { valueMissing: 'Please add your email so I can reply.', typeMismatch: 'That email address looks incomplete.' },
  service:   { valueMissing: 'Please choose what you need.' },
  message:   { valueMissing: 'Please tell me a little about the project.', tooShort: 'A little more detail would help. Twenty characters or more.' },
};

function errorFor(field) {
  const v = field.validity;
  const m = messages[field.name] || messages[field.id] || {};
  if (v.valueMissing) return m.valueMissing || 'This field is required.';
  if (v.typeMismatch) return m.typeMismatch || 'Please check this field.';
  if (v.tooShort) return m.tooShort || 'Please add a little more.';
  return '';
}

function showError(field) {
  const wrap = field.closest('.field');
  const id = `${field.id}-error`;
  let el = document.getElementById(id);
  const text = errorFor(field);

  if (!text) {
    wrap.classList.remove('is-invalid');
    field.removeAttribute('aria-invalid');
    if (el) el.remove();
    const describedBy = (field.getAttribute('aria-describedby') || '').split(' ').filter((t) => t && t !== id);
    if (describedBy.length) field.setAttribute('aria-describedby', describedBy.join(' '));
    else field.removeAttribute('aria-describedby');
    return true;
  }

  wrap.classList.add('is-invalid');
  field.setAttribute('aria-invalid', 'true');
  if (!el) {
    el = document.createElement('p');
    el.className = 'field__error';
    el.id = id;
    wrap.appendChild(el);
    const describedBy = new Set((field.getAttribute('aria-describedby') || '').split(' ').filter(Boolean));
    describedBy.add(id);
    field.setAttribute('aria-describedby', [...describedBy].join(' '));
  }
  el.textContent = text;
  return false;
}

if (form) {
  const fields = [...form.querySelectorAll('input:not([name="_gotcha"]), select, textarea')];

  // Validate a field once the visitor leaves it, then live while they fix it.
  fields.forEach((field) => {
    field.addEventListener('blur', () => { if (field.value || field.closest('.is-invalid')) showError(field); });
    field.addEventListener('input', () => { if (field.closest('.is-invalid')) showError(field); });
    field.addEventListener('change', () => { if (field.closest('.is-invalid')) showError(field); });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    formStatus.textContent = '';

    const invalid = fields.filter((field) => !showError(field));
    if (invalid.length) {
      invalid[0].focus();
      return;
    }

    const label = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(`Form service returned ${res.status}`);

      const done = document.createElement('div');
      done.className = 'form-done';
      done.tabIndex = -1;
      done.innerHTML = `
        <h3 class="form-done__title">Message sent.</h3>
        <p>Thanks for reaching out. I&rsquo;ll get back to you within a couple of business days.</p>
      `;
      form.replaceWith(done);
      done.focus();
    } catch (_) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = label;
      formStatus.textContent = 'Your message didn’t send. Please try again, or message me on LinkedIn.';
    }
  });
}
