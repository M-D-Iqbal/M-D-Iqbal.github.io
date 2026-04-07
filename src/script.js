import Swup from 'https://unpkg.com/swup@4?module';

async function loadProfile() {
    const res = await fetch('src/profile.json');
    const data = await res.json();
    renderSidebar(data);
    renderPage(data);
}

function renderSidebar(data) {
    const left = document.querySelector('.left');
    if (!left) return;

    const contacts = data['personal-info'].entries
        .filter(e => e.enabled && e.name !== 'Phone' && e.name !== 'Birthday')
        .map(e => `
            <div class="item">
                <i class="${e.icon}" aria-hidden="true"></i>
                ${e.url ? `<a href="${e.url}">${e.text}</a>` : e.text}
            </div>`).join('');

    const socials = data.socials.entries
        .filter(e => e.enabled)
        .map(e => `
            <div class="item">
                <a href="${e.url}">
                    <i class="${e.icon}" aria-hidden="true"></i>
                </a>
            </div>`).join('');

    left.innerHTML = `
        <div class="person">
            <img class="profilePic" src="src/${data['profile-pic']}" alt="${data['first-name']} ${data['last-name']}">
            <div class="bio">
                <div class="name">${data['first-name']} ${data['last-name']}</div>
                <div class="label">${data.label}</div>
            </div>
            <div class="contact">${contacts}</div>
            <div class="Social">${socials}</div>
            <div class="cv-head">
                <a href="src/Danish-Iqbal.pdf" download="Danish-Iqbal.pdf">Resume</a>
            </div>
        </div>`;
}

function getCurrentPage() {
    const path = window.location.pathname;
    return path.split('/').pop() || 'index.html';
}

function setActiveNav() {
    const page = getCurrentPage();
    document.querySelectorAll('.navmenu a').forEach(a => {
        const href = a.getAttribute('href');
        a.classList.toggle('active', href === page || (page === '' && href === 'index.html'));
    });
}

function renderPage(data) {
    const right = document.querySelector('.right');
    if (!right) return;
    setActiveNav();

    const page = getCurrentPage();
    if (page === 'index.html' || page === '') {
        renderAbout(right, data);
    } else if (page === 'experience.html') {
        renderWork(right, data);
    } else if (page === 'education.html') {
        renderEducation(right, data);
    } else if (page === 'skills.html') {
        renderSkills(right, data);
    } else if (page === 'publications.html') {
        renderPublications(right, data);
    }
}

function renderAbout(container, data) {
    const s = data.summary;
    container.innerHTML = `
        <section class="about">
            <h1>${s.heading}</h1>
            <h3><div class="pro">${s.entries[0]}</div></h3>
        </section>`;
}

function renderWork(container, data) {
    const w = data.work;
    const entries = w.entries.map(e => `
        <h2>${e.title}${e.org ? ' | ' + e.org : ''}</h2>
        <h3><i>${e.date}</i></h3>
        <ul class="section-list">
            ${e.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>`).join('');

    container.innerHTML = `
        <section class="work">
            <h1>${w.heading}</h1>
            ${entries}
        </section>`;
}

function renderEducation(container, data) {
    const ed = data.education;
    const entries = ed.entries.map(e => `
        <h2>${e.title} | ${e.org}</h2>
        <h3><i>${e.date}</i></h3>
        <ul class="section-list">
            ${e.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>`).join('');

    container.innerHTML = `
        <section class="education">
            <h1>${ed.heading}</h1>
            ${entries}
        </section>`;
}

function renderSkills(container, data) {
    const exp  = data.expertise;
    const tech = data['tech-skills'];
    const lang = data.languages;

    const expertiseItems = exp.entries.map(e => `<li>${e}</li>`).join('');

    const techItems = tech.entries
        .flatMap(g => g.highlights)
        .map(h => `<li>${h}</li>`).join('');

    const langItems = lang.entries.map(e => `<li>${e}</li>`).join('');

    container.innerHTML = `
        <section class="skill">
            <h1>${exp.heading}</h1>
            <ul class="expertise">${expertiseItems}</ul>
            <h1>${tech.heading}</h1>
            <ul class="tech-flat">${techItems}</ul>
            <h1>${lang.heading}</h1>
            <ul class="languages">${langItems}</ul>
        </section>`;
}

function renderPublications(container, data) {
    const pub = data.publications;
    const entries = pub.entries
        .map(e => e.trim().startsWith('<h') ? e : `<p>${e}</p>`)
        .join('');

    container.innerHTML = `
        <section class="publications">
            <h1>${pub.heading}</h1>
            ${entries}
        </section>`;
}

loadProfile();

const swup = new Swup({ containers: ['#swup'] });
swup.hooks.on('page:view', loadProfile);
