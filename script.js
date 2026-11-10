'use strict';

// Customize your blog here: edit titles, dates, categories and article content.
const POSTS = [
  {
    "slug": "building-an-ai-interview-coach",
    "title": "Building an AI Interview Coach",
    "category": "Projects",
    "date": "NOV 2026",
    "read": "6 MIN READ",
    "art": "◈",
    "cover": 1,
    "excerpt": "A look at the architecture and features of my full-stack interview preparation project.",
    "sections": [
      [
        "A multi-service architecture",
        "AI Interview Coach brings together a React 19 frontend, a Spring Boot REST backend and a separate FastAPI AI microservice. The backend uses JWT authentication and PostgreSQL, and the platform exposes more than ten REST endpoints to support personalized mock interviews."
      ],
      [
        "Resume-aware AI features",
        "The project uses PyMuPDF, Sentence-Transformers, FAISS and Gemini 2.5 Flash in a retrieval-augmented generation pipeline. Its features include resume ATS scoring, company-specific chat and role-based interview questions."
      ],
      [
        "Measuring progress",
        "An answer evaluation engine returns structured JSON scores for technical and communication skills. A Recharts dashboard and session history in PostgreSQL help users review their progress."
      ]
    ],
    "quote": "Explore the source code to see how the components fit together."
  },
  {
    "slug": "rag-for-resume-aware-applications",
    "title": "RAG for Resume-Aware Applications",
    "category": "AI",
    "date": "OCT 2026",
    "read": "5 MIN READ",
    "art": "✳",
    "cover": 4,
    "excerpt": "How retrieval, embeddings and an LLM work together in my interview-coaching project.",
    "sections": [
      [
        "Why retrieval matters",
        "Retrieval-augmented generation (RAG) enriches language-model responses with relevant context from a source. In the AI Interview Coach project, that source includes resume content."
      ],
      [
        "The technology stack",
        "PyMuPDF handles PDF processing, Sentence-Transformers supports semantic embeddings, FAISS is used for similarity search, and Gemini 2.5 Flash supports AI-powered features."
      ],
      [
        "The application layer",
        "The RAG features are exposed through a FastAPI AI microservice that works alongside a Spring Boot backend and React frontend, keeping the architecture modular."
      ]
    ],
    "quote": "The goal is to make AI responses more grounded in relevant user information."
  },
  {
    "slug": "financial-dashboard-full-stack",
    "title": "A Full-Stack Financial Dashboard",
    "category": "Projects",
    "date": "OCT 2026",
    "read": "5 MIN READ",
    "art": "▥",
    "cover": 2,
    "excerpt": "Bringing payments, inventory and revenue into one dark-mode dashboard.",
    "sections": [
      [
        "One view for business operations",
        "The Financial Dashboard project was designed to provide small businesses with a consolidated view of payments, inventory and revenue."
      ],
      [
        "Backend structure",
        "The backend uses Node.js, Express.js, MongoDB and an MVC architecture. It includes seventeen REST endpoints across four API modules, and JWT cookie-based login."
      ],
      [
        "Automation and visualization",
        "Mongoose pre-save hooks automate payment statuses such as pending or overdue and stock statuses such as in stock, low stock or out of stock. Bootstrap and Chart.js power the responsive dark-mode interface and KPI charts."
      ]
    ],
    "quote": "A useful dashboard turns operational data into something easy to act on."
  },
  {
    "slug": "api-design-with-spring-boot",
    "title": "REST APIs and Spring Boot in Practice",
    "category": "Backend",
    "date": "SEP 2026",
    "read": "4 MIN READ",
    "art": "{ }",
    "cover": 6,
    "excerpt": "An overview of the API and authentication work behind AI Interview Coach.",
    "sections": [
      [
        "Connecting frontend and backend",
        "The AI Interview Coach frontend communicates with a Spring Boot REST backend that handles application data and authentication."
      ],
      [
        "Authentication and persistence",
        "JWT authentication and PostgreSQL provide a foundation for authenticated workflows and persistent session history."
      ],
      [
        "A separate AI service",
        "Using FastAPI as a dedicated AI microservice separates AI operations from other application endpoints, making responsibilities more explicit."
      ]
    ],
    "quote": "Clean API boundaries help full-stack applications stay understandable."
  },
  {
    "slug": "problem-solving-through-hackathons",
    "title": "Hackathons and Problem Solving",
    "category": "Learning",
    "date": "SEP 2026",
    "read": "4 MIN READ",
    "art": "✦",
    "cover": 5,
    "excerpt": "A snapshot of the team projects and problem-solving activities on my resume.",
    "sections": [
      [
        "Building under constraints",
        "I have participated in the Adobe Hackathon, the Myntra We For She Hackathon and multiple college hackathons, working on team solutions under tight deadlines."
      ],
      [
        "Algorithm practice",
        "My learning activities include active LeetCode practice and participation in Algo University camps focused on graphs and dynamic programming."
      ],
      [
        "Communication beyond coding",
        "Participation in VITBMUN and school Model United Nations events has also helped me practice public speaking, research and negotiation."
      ]
    ],
    "quote": "Engineering skills grow through both technical practice and teamwork."
  },
  {
    "slug": "learning-cloud-ai-and-testing",
    "title": "Learning Across Cloud, AI and Testing",
    "category": "Learning",
    "date": "AUG 2026",
    "read": "4 MIN READ",
    "art": "☁",
    "cover": 3,
    "excerpt": "Certifications and coursework that complement my software development projects.",
    "sections": [
      [
        "Cloud foundations",
        "My AWS Skill Builder coursework includes Cloud Practitioner Essentials, Technical Essentials and the CLF-C02 Practice Question Set."
      ],
      [
        "AI and software quality",
        "My ServiceNow learning includes Agentic AI and the Automated Test Framework (ATF), while NPTEL coursework includes Introduction to Machine Learning and Market Analytics."
      ],
      [
        "Networking fundamentals",
        "Coursera’s Bits and Bytes of Computer Networking complements core CS study in operating systems, DBMS, computer networks, object-oriented programming, data structures and algorithms."
      ]
    ],
    "quote": "Learning the fundamentals complements learning new frameworks."
  }
];

const grid = document.getElementById('blogGrid');
const search = document.getElementById('postSearch');
const loadMore = document.getElementById('loadMore');
const homePage = document.getElementById('homePage');
const articlePage = document.getElementById('articlePage');
const articleContent = document.getElementById('articleContent');
const filters = [...document.querySelectorAll('.filter')];
let activeCategory = 'All';
let visibleCount = 3;
let toastTimeout;

function toast(message) {
  const element = document.getElementById('toast');
  element.textContent = message;
  element.classList.add('visible');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => element.classList.remove('visible'), 2600);
}
function filteredPosts() {
  const term = search.value.trim().toLowerCase();
  return POSTS.filter(post => (activeCategory === 'All' || post.category === activeCategory) &&
    `${post.title} ${post.category} ${post.excerpt}`.toLowerCase().includes(term));
}
function getSavedPosts() {
  try { return JSON.parse(localStorage.getItem('akshita_saved_posts') || '[]'); }
  catch { return []; }
}
function toggleSaved(slug) {
  let list = getSavedPosts();
  const saved = list.includes(slug);
  list = saved ? list.filter(item => item !== slug) : [...list, slug];
  try { localStorage.setItem('akshita_saved_posts', JSON.stringify(list)); }
  catch { /* Reading still works if storage is unavailable. */ }
  renderPosts();
  toast(saved ? 'Removed from saved stories' : 'Story saved on this device');
}
function renderPosts() {
  const results = filteredPosts();
  grid.innerHTML = results.slice(0, visibleCount).map(post => {
    const saved = getSavedPosts().includes(post.slug);
    return `<article class="blog-card"><a class="blog-cover cover-${post.cover}" href="#/blog/${post.slug}" aria-label="Read ${post.title}"><span class="cover-caption">${post.category.toUpperCase()}</span><span class="cover-symbol" aria-hidden="true">${post.art}</span></a><div class="blog-card-body"><div class="blog-meta"><span>${post.date}</span><span>•</span><span>${post.read}</span></div><h3>${post.title}</h3><p>${post.excerpt}</p><div class="blog-bottom"><a href="#/blog/${post.slug}">READ STORY ↗</a><button type="button" data-save="${post.slug}" class="${saved ? 'saved' : ''}" aria-label="${saved ? 'Unsave' : 'Save'} ${post.title}" aria-pressed="${saved}">${saved ? '♥' : '♡'}</button></div></div></article>`;
  }).join('');
  document.getElementById('emptyState').hidden = results.length !== 0;
  loadMore.hidden = results.length <= visibleCount;
  grid.querySelectorAll('[data-save]').forEach(button => button.addEventListener('click', () => toggleSaved(button.dataset.save)));
}
filters.forEach(button => button.addEventListener('click', () => {
  activeCategory = button.dataset.category;
  visibleCount = 3;
  filters.forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
  renderPosts();
}));
search.addEventListener('input', () => { visibleCount = 3; renderPosts(); });
loadMore.addEventListener('click', () => { visibleCount += 3; renderPosts(); });
document.getElementById('resetFilters').addEventListener('click', () => {
  search.value = ''; document.querySelector('[data-category="All"]').click();
});

function showArticle(post) {
  const content = post.sections.map(([heading, ...paragraphs]) => `<section><h2>${heading}</h2>${paragraphs.map(p => `<p>${p}</p>`).join('')}</section>`).join('');
  articleContent.innerHTML = `<header class="article-head"><div class="blog-meta"><span>${post.category.toUpperCase()}</span><span>•</span><span>${post.date}</span><span>•</span><span>${post.read}</span></div><h1>${post.title}</h1><p class="article-deck">${post.excerpt}</p></header><div class="article-hero cover-${post.cover}"><span class="cover-symbol" aria-hidden="true">${post.art}</span></div><div class="article-body">${content}<blockquote>“${post.quote}”</blockquote><p>Thanks for reading. If this resonated with you, feel free to reach out and share your thoughts. I'd love to hear them.</p></div>`;
  homePage.hidden = true;
  articlePage.hidden = false;
  document.title = `${post.title} | Akshita Katyal`;
  window.scrollTo({top:0,behavior:'instant'});
}
function handleRoute() {
  const hash = decodeURIComponent(location.hash || '#home');
  if (hash.startsWith('#/blog/')) {
    const post = POSTS.find(item => item.slug === hash.slice(7));
    if (post) return showArticle(post);
    toast('Story not found. Showing the journal instead.');
    location.hash = '#journal';
    return;
  }
  homePage.hidden = false;
  articlePage.hidden = true;
  document.title = 'Akshita Katyal — Software Developer & CS Student';
  document.querySelectorAll('.nav-link').forEach(link => link.classList.toggle('active', link.getAttribute('href') === hash));
  requestAnimationFrame(() => {
    const target = document.getElementById(hash.slice(1));
    if (target) target.scrollIntoView({behavior:'smooth',block:'start'});
  });
}
window.addEventListener('hashchange', handleRoute);
renderPosts();
handleRoute();

document.getElementById('copyArticleLink').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(location.href); toast('Article link copied!'); }
  catch {
    const field = document.createElement('textarea'); field.value = location.href;
    document.body.append(field); field.select();
    const copied = document.execCommand('copy'); field.remove();
    toast(copied ? 'Article link copied!' : 'Copy the URL from your address bar.');
  }
});

const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false');
}));

document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const name = form.elements.namedItem('name').value.trim();
  const sender = form.elements.namedItem('email').value.trim();
  const message = form.elements.namedItem('message').value.trim();
  const subject = encodeURIComponent(`Message from ${name} via Akshita's website`);
  const body = encodeURIComponent(`From: ${name}\nEmail: ${sender}\n\n${message}`);
  window.location.href = `mailto:akkatyal05@gmail.com?subject=${subject}&body=${body}`;
  document.getElementById('formStatus').textContent = 'Your email app should open with your message ready to send.';
});

document.getElementById('footerYear').textContent = String(new Date().getFullYear());
window.addEventListener('scroll', () => {
  const articleOpen = !articlePage.hidden;
  const progress = document.getElementById('readingProgress');
  if (!articleOpen) { progress.style.width = '0%'; return; }
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? Math.min(100,(scrollY/max)*100) : 0}%`;
}, {passive:true});

// Small, reduced-motion-aware heading rotation.
const roles = ['DEVELOPER', 'PROBLEM SOLVER', 'CS STUDENT'];
let roleIndex = 0;
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setInterval(() => { roleIndex = (roleIndex + 1) % roles.length; document.getElementById('typedRole').textContent = roles[roleIndex]; }, 3500);
}
