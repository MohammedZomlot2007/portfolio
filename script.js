/* ============================================================
   MOHAMMED ZOMLOT — Portfolio Engine (vanilla JS, frontend-only)
   ============================================================ */
(function () {
'use strict';

var $ = function (s, c) { return (c || document).querySelector(s); };
var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var isFinePointer = window.matchMedia('(pointer: fine)').matches;
var isMobile = window.matchMedia('(max-width: 768px)').matches;

/* ---------- Toast ---------- */
var toastEl = $('#toast'), toastT = null;
function toast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(function () { toastEl.classList.remove('show'); }, 2400);
}

/* ---------- Loader ---------- */
var loader = $('#loader'), lp = $('#loader-progress'), lpct = $('#loader-pct');
var loadVal = 0;
var loadTimer = setInterval(function () {
  loadVal = Math.min(100, loadVal + Math.random() * 22 + 6);
  if (lp) lp.style.width = loadVal + '%';
  if (lpct) lpct.textContent = Math.floor(loadVal) + '%';
  if (loadVal >= 100) {
    clearInterval(loadTimer);
    setTimeout(function () { loader.classList.add('done'); document.body.classList.add('ready'); }, 250);
  }
}, 140);
setTimeout(function () { /* hard fallback: never trap user */
  clearInterval(loadTimer);
  loader.classList.add('done');
}, 3500);

/* ---------- Theme (localStorage + prefers-color-scheme) ---------- */
var root = document.documentElement;
function currentTheme() {
  var saved = null;
  try { saved = localStorage.getItem('mz-theme'); } catch (e) {}
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}
function applyTheme(t) {
  root.setAttribute('data-theme', t);
  var moon = $('#icon-moon'), sun = $('#icon-sun');
  if (moon && sun) { moon.style.display = t === 'dark' ? '' : 'none'; sun.style.display = t === 'dark' ? 'none' : ''; }
  document.querySelector('meta[name="theme-color"]').setAttribute('content', t === 'dark' ? '#06070A' : '#f4f6fb');
  try { localStorage.setItem('mz-theme', t); } catch (e) {}
}
applyTheme(currentTheme());
$('#theme-toggle').addEventListener('click', function () {
  var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  toast(next === 'dark' ? 'Dark mode' : 'Light mode · الوضع الفاتح');
});

/* ---------- i18n EN / AR (RTL) ---------- */
var I18N = {
en:{skip:'Skip to content',loaderSub:'FRONT-END DEVELOPER',brandSub:'Front-End Developer',navHome:'Home',navAbout:'About',navSkills:'Skills',navProjects:'Projects',navServices:'Services',navContact:'Contact',navCta:"Let's Talk",heroLabel:'FRONT-END WEB DEVELOPER',heroTag:'I BUILD MODERN WEB EXPERIENCES.',heroDesc:'Front-End Web Developer focused on creating modern, responsive, interactive, and user-friendly websites using HTML, CSS, and JavaScript.',heroBtn1:'View My Work',heroBtn2:"Let's Connect",heroMeta1:'Core specialization',heroMeta2:'Frontend case studies',heroMeta3:'Responsive & interactive',heroHint:'Move your cursor — the scene responds · Scroll for depth',aboutLabel:'ABOUT ME',aboutTitle:'Front-end focused. Detail obsessed.',aboutLead:"I'm Mohammed Zomlot, a Front-End Web Developer focused on building modern, responsive, and user-friendly websites using HTML, CSS, and JavaScript. I enjoy turning ideas into clean, functional web experiences and continuously improving through real-world projects.",aboutP1t:'UI-focused developer',aboutP1d:'Interfaces with clear hierarchy, spacing systems and readable typography.',aboutP2t:'Responsive by default',aboutP2d:'Desktop, tablet and mobile layouts designed intentionally — not compressed.',aboutP3t:'JavaScript interaction',aboutP3d:'DOM, LocalStorage, API integration, filters, dashboards and dynamic UI.',aboutCardStatus:'Available for projects',aboutCardRole:'Front-End Web Developer · HTML / CSS / JS',copyEmail:'Copy email',skillsLabel:'SKILLS',skillsTitle:'Categorized capability, no fake scores.',skillsSub:'Honest grouping of what I use to design and build real interfaces.',skillsC1:'CORE FRONT-END',skillsC2:'DESIGN',skillsC3:'DEVELOPMENT',lvlA:'Advanced',lvlA2:'Advanced',lvlB:'Intermediate–Advanced',lvlA3:'Advanced',expLabel:'FRONT-END EXPERTISE',expTitle:'What I build best.',exp1t:'Interactive Websites',exp1d:'Modern responsive interfaces with animations and polished interactions.',exp2t:'Business Dashboards',exp2d:'Professional dashboards for workflows, finance and data visualization.',exp3t:'Responsive Interfaces',exp3d:'Interfaces optimized for desktop, tablet and mobile.',exp4t:'UI Systems',exp4d:'Reusable components, spacing, typography and consistent visual language.',exp5t:'JavaScript Experiences',exp5d:'Filters, search, forms, CRUD interfaces and client-side functionality.',exp6t:'Premium Landing Pages',exp6d:'High-conversion landing pages with strong visual hierarchy.',projLabel:'FEATURED PROJECTS',projTitle:'10 frontend case studies.',projSub:'Portfolio concepts & personal projects — honest scope, real interfaces. No fake clients or metrics.',servLabel:'SERVICES',servTitle:'What I can build for you.',serv1t:'Responsive Websites',serv1d:'Modern websites that adapt across devices.',serv2t:'Landing Pages',serv2d:'Premium high-conversion landing pages.',serv3t:'Business Dashboards',serv3d:'Professional dashboards for business applications.',serv4t:'Interactive UI',serv4d:'Dynamic interfaces with JavaScript.',serv5t:'Website Redesign',serv5d:'Modernize outdated web interfaces.',serv6t:'Front-End Prototyping',serv6d:'Turn ideas into polished interactive prototypes.',procLabel:'HOW I BUILD',procTitle:'Design philosophy & process.',procSub:'Goal: clean code · clear UI · responsive design · smooth interaction · good usability.',proc1t:'Understand',proc1d:'Clarify goals, users and content first.',proc2t:'Plan',proc2d:'Structure pages, components and states.',proc3t:'Design',proc3d:'Spacing, type and color systems.',proc4t:'Build',proc4d:'Semantic HTML, clean CSS, vanilla JS.',proc5t:'Test',proc5d:'Devices, keyboard, contrast, motion.',proc6t:'Refine',proc6d:'Polish micro-interactions & performance.',stackLabel:'TECHNOLOGY STACK',stackTitle:'Frontend-only toolkit.',jourLabel:'JOURNEY',jourTitle:'A development journey, not fake employment.',jour1t:'Learning the fundamentals',jour1d:'HTML semantics, CSS layout, JavaScript basics and responsive thinking.',jour2t:'Building real projects',jour2d:'Dashboards, stores, landing pages and business interfaces as portfolio case studies.',jour3t:'Improving UI / UX',jour3d:'Hierarchy, spacing systems, accessibility and interaction polish.',jour4t:'Advanced front-end interfaces',jour4d:'3D touches, motion, filtering, modals, themes and client-side architecture.',jour5t:'Professional portfolio',jour5d:'This site — a cohesive identity for a serious front-end developer.',contactLabel:'CONTACT',contactTitle:"LET'S BUILD SOMETHING GREAT.",contactSub:"Have a project, idea, or website that needs a modern frontend experience? Let's talk.",formTitle:'Quick message draft',formHint:'Frontend-only demo — this composes an email, nothing is stored on a server.',formName:'Your name',formMsg:'Project idea',formSend:'Compose email'},
ar:{skip:'تخطَّ إلى المحتوى',loaderSub:'مطوّر واجهات أمامية',brandSub:'مطوّر واجهات أمامية',navHome:'الرئيسية',navAbout:'من أنا',navSkills:'المهارات',navProjects:'المشاريع',navServices:'الخدمات',navContact:'تواصل',navCta:'لنتحدث',heroLabel:'مطوّر واجهات أمامية — FRONT-END',heroTag:'أبني تجارب ويب عصرية.',heroDesc:'مطوّر واجهات أمامية متخصص في إنشاء مواقع عصرية ومتجاوبة وتفاعلية وسهلة الاستخدام باستخدام HTML وCSS وJavaScript.',heroBtn1:'شاهد أعمالي',heroBtn2:'لنتواصل',heroMeta1:'التخصص الأساسي',heroMeta2:'دراسات حالة',heroMeta3:'متجاوب وتفاعلي',heroHint:'حرّك المؤشر — المشهد يستجيب · مرّر للعمق',aboutLabel:'من أنا',aboutTitle:'تركيز على الواجهات. هوس بالتفاصيل.',aboutLead:'أنا محمد زملّوط، مطوّر واجهات أمامية متخصص في بناء مواقع عصرية ومتجاوبة وسهلة الاستخدام باستخدام HTML وCSS وJavaScript. أستمتع بتحويل الأفكار إلى تجارب ويب نظيفة وعملية وأطوّر مهاراتي باستمرار عبر مشاريع واقعية.',aboutP1t:'مطوّر يركز على الواجهات',aboutP1d:'واجهات بتسلسل واضح وأنظمة تباعد وخطوط مقروءة.',aboutP2t:'تجاوب افتراضي',aboutP2d:'تخطيطات مدروسة لسطح المكتب والتابلت والموبايل.',aboutP3t:'تفاعل بجافاسكربت',aboutP3d:'DOM وLocalStorage وربط APIs وفلاتر ولوحات تحكم وواجهات ديناميكية.',aboutCardStatus:'متاح للمشاريع',aboutCardRole:'مطوّر واجهات أمامية · HTML / CSS / JS',copyEmail:'نسخ البريد',skillsLabel:'المهارات',skillsTitle:'قدرات مصنّفة بدون أرقام وهمية.',skillsSub:'تجميع صادق لما أستخدمه لتصميم وبناء واجهات حقيقية.',skillsC1:'الأساس',skillsC2:'التصميم',skillsC3:'التطوير',lvlA:'متقدم',lvlA2:'متقدم',lvlB:'متوسط–متقدم',lvlA3:'متقدم',expLabel:'الخبرة',expTitle:'ما أبنيه بأفضل صورة.',exp1t:'مواقع تفاعلية',exp1d:'واجهات متجاوبة عصرية بحركات وتفاعلات مصقولة.',exp2t:'لوحات تحكم للأعمال',exp2d:'لوحات احترافية لسير العمل والمالية وعرض البيانات.',exp3t:'واجهات متجاوبة',exp3d:'واجهات محسّنة لسطح المكتب والتابلت والموبايل.',exp4t:'أنظمة واجهات',exp4d:'مكونات قابلة لإعادة الاستخدام وأنظمة تباعد وخطوط ولغة بصرية متسقة.',exp5t:'تجارب جافاسكربت',exp5d:'فلاتر وبحث ونماذج وواجهات CRUD ووظائف تعمل داخل المتصفح.',exp6t:'صفحات هبوط فاخرة',exp6d:'صفحات هبوط عالية التحويل بتسلسل بصري قوي.',projLabel:'مشاريع مختارة',projTitle:'10 دراسات حالة في الواجهات.',projSub:'مفاهيم ومشاريع شخصية — نطاق صادق وواجهات حقيقية. بدون عملاء أو أرقام وهمية.',servLabel:'الخدمات',servTitle:'ما يمكنني بناؤه لك.',serv1t:'مواقع متجاوبة',serv1d:'مواقع عصرية تتكيف مع كل الأجهزة.',serv2t:'صفحات هبوط',serv2d:'صفحات هبوط فاخرة عالية التحويل.',serv3t:'لوحات تحكم للأعمال',serv3d:'لوحات احترافية لتطبيقات الأعمال.',serv4t:'واجهات تفاعلية',serv4d:'واجهات ديناميكية بجافاسكربت.',serv5t:'إعادة تصميم المواقع',serv5d:'تحديث الواجهات القديمة بتصميم عصري.',serv6t:'نماذج أولية',serv6d:'تحويل الأفكار إلى نماذج تفاعلية مصقولة.',procLabel:'كيف أبني',procTitle:'فلسفة التصميم والعملية.',procSub:'الهدف: كود نظيف · واجهة واضحة · تصميم متجاوب · تفاعل سلس · سهولة استخدام.',proc1t:'الفهم',proc1d:'توضيح الأهداف والمستخدمين والمحتوى أولًا.',proc2t:'التخطيط',proc2d:'هيكلة الصفحات والمكونات والحالات.',proc3t:'التصميم',proc3d:'أنظمة التباعد والخطوط والألوان.',proc4t:'البناء',proc4d:'HTML دلالي وCSS نظيف وJS خام.',proc5t:'الاختبار',proc5d:'الأجهزة ولوحة المفاتيح والتباين والحركة.',proc6t:'التحسين',proc6d:'صقل التفاعلات الدقيقة والأداء.',stackLabel:'التقنيات',stackTitle:'أدوات الواجهات فقط.',jourLabel:'الرحلة',jourTitle:'رحلة تطوير وليست وظائف وهمية.',jour1t:'تعلم الأساسيات',jour1d:'دلالات HTML وتخطيط CSS وأساسيات جافاسكربت والتفكير المتجاوب.',jour2t:'بناء مشاريع حقيقية',jour2d:'لوحات تحكم ومتاجر وصفحات هبوط وواجهات أعمال كدراسات حالة.',jour3t:'تحسين UI / UX',jour3d:'التسلسل وأنظمة التباعد وإمكانية الوصول وصقل التفاعل.',jour4t:'واجهات أمامية متقدمة',jour4d:'لمسات ثلاثية الأبعاد وحركة وفلاتر ونوافذ وثيمات وهيكلة عميلة.',jour5t:'معرض أعمال احترافي',jour5d:'هذا الموقع — هوية متماسكة لمطوّر واجهات جاد.',contactLabel:'تواصل',contactTitle:'لنبنِ شيئًا عظيمًا.',contactSub:'هل لديك مشروع أو فكرة أو موقع يحتاج تجربة واجهات عصرية؟ لنتحدث.',formTitle:'مسودة رسالة سريعة',formHint:'عرض يعمل داخل المتصفح فقط — يُنشئ بريدًا ولا يُخزَّن شيء على خادم.',formName:'اسمك',formMsg:'فكرة المشروع',formSend:'إنشاء البريد'}
};
var lang = 'en';
try { lang = localStorage.getItem('mz-lang') || 'en'; } catch (e) {}
function applyLang(l) {
  lang = (l === 'ar') ? 'ar' : 'en';
  var d = I18N[lang];
  root.setAttribute('lang', lang);
  root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  $$('[data-i18n]').forEach(function (el) {
    var k = el.getAttribute('data-i18n');
    if (d[k]) el.textContent = d[k];
  });
  var lt = $('#lang-toggle');
  if (lt) lt.textContent = lang === 'ar' ? 'EN' : 'عربي';
  document.title = lang === 'ar' ? 'محمد زملّوط — مطوّر واجهات أمامية' : 'Mohammed Zomlot — Front-End Web Developer';
  try { localStorage.setItem('mz-lang', lang); } catch (e) {}
  renderProjects(); // re-render cards in active language
}
$('#lang-toggle').addEventListener('click', function () {
  applyLang(lang === 'ar' ? 'en' : 'ar');
  toast(lang === 'ar' ? 'تم التبديل إلى العربية' : 'Switched to English');
});

/* ---------- Mobile menu ---------- */
var menuBtn = $('#menu-btn'), mobileMenu = $('#mobile-menu');
menuBtn.addEventListener('click', function () {
  var open = mobileMenu.hasAttribute('hidden');
  if (open) { mobileMenu.removeAttribute('hidden'); menuBtn.setAttribute('aria-expanded', 'true'); }
  else { mobileMenu.setAttribute('hidden', ''); menuBtn.setAttribute('aria-expanded', 'false'); }
});
$$('#mobile-menu a').forEach(function (a) {
  a.addEventListener('click', function () { mobileMenu.setAttribute('hidden', ''); menuBtn.setAttribute('aria-expanded', 'false'); });
});

/* ---------- Navbar state + active section + to-top ---------- */
var navbar = $('#navbar'), toTop = $('#to-top');
var sections = ['home', 'about', 'skills', 'projects', 'services', 'contact'].map(function (id) { return document.getElementById(id); }).filter(Boolean);
function onScroll() {
  var y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 24);
  toTop.classList.toggle('show', y > 700);
  var current = 'home';
  sections.forEach(function (s) { if (y >= s.offsetTop - 200) current = s.id; });
  $$('.nav-link').forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + current); });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' }); });

/* ---------- Reveal on scroll ---------- */
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
$$('.reveal').forEach(function (el) { io.observe(el); });

/* ---------- Custom cursor (desktop, fine pointer only) ---------- */
if (isFinePointer && !('ontouchstart' in window)) {
  var dot = $('#cursor-dot'), ring = $('#cursor-ring');
  var mx = -100, my = -100, rx = -100, ry = -100;
  document.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; });
  (function loop() {
    rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
    dot.style.transform = 'translate(' + (mx - 3) + 'px,' + (my - 3) + 'px)';
    ring.style.transform = 'translate(' + (rx - 17) + 'px,' + (ry - 17) + 'px)';
    requestAnimationFrame(loop);
  })();
  document.addEventListener('mouseover', function (e) {
    if (e.target.closest('a,button,.proj-card,.filter,.stack-wall button')) ring.classList.add('hovering');
    else ring.classList.remove('hovering');
  });
}

/* ---------- Tilt on ID card ---------- */
var tilt = $('#tilt-card');
if (tilt && isFinePointer && !prefersReduced) {
  tilt.addEventListener('mousemove', function (e) {
    var r = tilt.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    tilt.style.transform = 'rotateY(' + (x * 10) + 'deg) rotateX(' + (-y * 10) + 'deg)';
  });
  tilt.addEventListener('mouseleave', function () { tilt.style.transform = ''; });
}

/* ---------- Marquee duplicate for seamless loop ---------- */
var mt = $('#marquee-track');
if (mt) mt.innerHTML += mt.innerHTML;

/* ============================================================
   PROJECTS — single source of truth, rendered dynamically
   ============================================================ */
var EMAIL = 'mhzomlot@gmail.com';
var PROFILE_GH = 'https://github.com/MohammedZomlot2007';

var projects = [
{ id:1, num:'01', title:'Accounting Pro Enterprise', cat:'Business Dashboard / Accounting Interface', tags:['dashboards','business'],
  desc:'A modern enterprise accounting interface with dashboards, financial workflows, invoices, customers, purchases and reports.',
  descAr:'واجهة محاسبية عصرية للشركات: لوحات تحكم وسير مالي وفواتير وعملاء ومشتريات وتقارير.',
  problem:'Small businesses need a clear, professional way to follow money, invoices and customers without cluttered tools.',
  solution:'A calm enterprise layout: KPI cards, charts, data tables, sidebar navigation and financial cards in one consistent system.',
  features:['KPI cards + revenue chart','Invoices & customers tables','Sidebar + responsive layout','Dark/light interface elements','Financial summary cards'],
  tech:['HTML','CSS','JavaScript'], liveUrl:'', githubUrl:'', badge:'Portfolio Project' },
{ id:2, num:'02', title:'Gold Jewelry POS & Accounting', cat:'Retail POS / Specialized Business UI', tags:['business'],
  desc:'Specialized interface concept for gold & jewelry retail: weight, karat, gram price, craftsmanship and sales flow.',
  descAr:'واجهة متخصصة لمحلات الذهب: الوزن والعيار وسعر الغرام والمصنعية والمبيعات والمشتريات.',
  problem:'Gold retail has unique inputs (weight, karat, gram price) that generic POS screens handle poorly.',
  solution:'A luxury-feel POS with gold inventory cards, live price calculator, sales/purchases and customer summaries.',
  features:['Gram-price calculator','Weight + karat inputs','Inventory & item cards','Sales / purchases views','Financial summaries'],
  tech:['HTML','CSS','JavaScript'], liveUrl:'', githubUrl:'', badge:'Concept UI' },
{ id:3, num:'03', title:'TRADEON', cat:'Business Platform / Social Business Interface', tags:['business','saas'],
  desc:'Modern business platform concept with professional profiles, company experiences and networking interfaces.',
  descAr:'منصة أعمال عصرية: ملفات مهنية وتجارب شركات وتواصل وواجهات محتوى متجاوبة.',
  problem:'Business networking UIs often feel dated and noisy; professionals need calm, credible profiles.',
  solution:'Clean cards, search, professional profiles, content feed patterns and responsive navigation.',
  features:['Business profiles','Content interface','Search + filters','Professional cards','Responsive layout'],
  tech:['HTML','CSS','JavaScript'], liveUrl:'', githubUrl:'', badge:'Portfolio Project' },
{ id:4, num:'04', title:'SupplierHub', cat:'Supplier Management Platform', tags:['business','saas'],
  desc:'Professional B2B interface for supplier discovery, profiles, categories, filters and dashboards.',
  descAr:'واجهة B2B احترافية لاكتشاف الموردين وإدارة ملفاتهم وتصنيفاتهم ولوحاتهم.',
  problem:'Procurement teams struggle to compare suppliers across scattered spreadsheets and chats.',
  solution:'A modern SaaS directory: supplier cards, categories, dashboard stats, filters and detail views.',
  features:['Supplier profiles','Category filters','Dashboard overview','Search + cards','Responsive B2B layout'],
  tech:['HTML','CSS','JavaScript'], liveUrl:'', githubUrl:'', badge:'Portfolio Project' },
{ id:5, num:'05', title:'SAWWER', cat:'AI / Transcription Platform UI', tags:['saas','productivity'],
  desc:'Modern frontend for an audio transcription concept: upload, file list, workspace, player and export.',
  descAr:'واجهة عصرية لمنصة تفريغ صوتي: رفع الملفات وقائمة الملفات ومساحة العمل والمشغل والتصدير.',
  problem:'Transcription tools need a focused workspace: audio + text + search side by side.',
  solution:'Productivity SaaS layout with upload zone, file list, transcription editor, audio player and history.',
  features:['Upload area','Transcription workspace','Audio player UI','Search in text','Export + history'],
  tech:['HTML','CSS','JavaScript'], liveUrl:'', githubUrl:'', badge:'Frontend Concept' },
{ id:6, num:'06', title:'E-Commerce Experience', cat:'E-Commerce Front-End', tags:['ecommerce'],
  desc:'Premium production-ready store: product grid, categories, search, cart, wishlist and filters.',
  descAr:'متجر فاخر جاهز: شبكة منتجات وتصنيفات وبحث وسلة ومفضلة وفلاتر وتصميم متجاوب.',
  problem:'Many demo stores look unfinished; shoppers need fast, trustworthy product browsing.',
  solution:'Polished catalog with filters, product details, cart + wishlist (LocalStorage) and smooth interactions.',
  features:['Product grid + details','Cart & wishlist','Search + filters','Categories','Responsive checkout UI'],
  tech:['HTML','CSS','JavaScript','LocalStorage'], liveUrl:'', githubUrl:'', badge:'Portfolio Project' },
{ id:7, num:'07', title:'Analytics Dashboard', cat:'Data Dashboard', tags:['dashboards'],
  desc:'Powerful analytics dashboard with KPI cards, charts, filters, date range and data tables.',
  descAr:'لوحة تحليلات قوية: مؤشرات ورسوم وفلاتر ونطاق زمني وجداول بيانات وشريط جانبي.',
  problem:'Raw data overwhelms; teams need clean visual summaries and flexible filtering.',
  solution:'KPI row, interactive charts, date-range + filters, performance overview and responsive sidebar.',
  features:['KPI cards','Charts','Date-range + filters','Data tables','Responsive sidebar'],
  tech:['HTML','CSS','JavaScript'], liveUrl:'', githubUrl:'', badge:'Portfolio Project' },
{ id:8, num:'08', title:'SaaS Landing Page', cat:'Modern SaaS Website', tags:['saas'],
  desc:'Premium conversion-oriented landing: hero, features, preview, pricing, FAQ, CTA and footer.',
  descAr:'صفحة هبوط SaaS فاخرة: بطل ومزايا ومعاينة وأسعار وأسئلة شائعة ودعوة لاتخاذ إجراء.',
  problem:'SaaS pages must explain value fast and guide visitors toward signup.',
  solution:'Strong hierarchy, animated sections, product preview, pricing tiers and FAQ accordions.',
  features:['Hero + product preview','Features grid','Pricing tiers','FAQ accordion','CTA + footer'],
  tech:['HTML','CSS','JavaScript'], liveUrl:'', githubUrl:'', badge:'Portfolio Project' },
{ id:9, num:'09', title:'Project Management Dashboard', cat:'Productivity / Management UI', tags:['dashboards','productivity'],
  desc:'Professional PM dashboard: projects, tasks, status, priorities, team UI, calendar and activity.',
  descAr:'لوحة إدارة مشاريع احترافية: مشاريع ومهام وحالات وأولويات وفريق وتقويم ونشاط.',
  problem:'Teams lose track of tasks across tools; they need one calm operational view.',
  solution:'Kanban-style tasks, progress bars, priorities, team avatars, calendar strip and activity feed.',
  features:['Projects + tasks','Status & priorities','Team UI','Calendar + activity','Progress tracking'],
  tech:['HTML','CSS','JavaScript','LocalStorage'], liveUrl:'', githubUrl:'', badge:'Portfolio Project' },
{ id:10, num:'10', title:'Creative Developer Showcase', cat:'Interactive Creative Front-End', tags:['creative'],
  desc:'The most experimental piece: advanced CSS, JS animation, 3D touches, magnetic buttons and scroll effects.',
  descAr:'القطعة الأكثر تجريبية: CSS متقدم وحركات JS ولمسات ثلاثية الأبعاد وأزرار مغناطيسية وتأثيرات تمرير.',
  problem:'Prove frontend creativity beyond dashboards — motion, depth and play without chaos.',
  solution:'Layered UI, hover physics, scroll-driven reveals, gradient scenes and custom interactions.',
  features:['Scroll effects','Magnetic buttons','3D / parallax layers','Hover physics','Creative transitions'],
  tech:['HTML','CSS','JavaScript'], liveUrl:'', githubUrl:'', badge:'Creative Concept' }
];

var activeFilter = 'all', searchTerm = '';
var grid = $('#projects-grid'), feat = $('#featured'), count = $('#proj-count');

function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;'); }
function mockVisual(p) {
  return '<div class="proj-visual pv-' + p.id + '"><span class="proj-num">' + p.num + '</span>' +
    '<span class="proj-type">' + esc(p.badge) + '</span>' +
    '<div class="pv-inner"><div class="mock" aria-hidden="true"><div class="mock-bar"><i></i><i></i><i></i></div>' +
    '<div class="mock-lines"><i></i><i></i><i></i></div><div class="mock-row"><b></b><b></b><b></b></div></div></div></div>';
}
function cardHTML(p) {
  var d = (lang === 'ar' && p.descAr) ? p.descAr : p.desc;
  return '<article class="proj-card" data-id="' + p.id + '" tabindex="0" role="button" aria-label="Open case study: ' + esc(p.title) + '">' +
    mockVisual(p) +
    '<div class="proj-body"><span class="proj-cat">' + esc(p.cat) + '</span><h3>' + esc(p.title) + '</h3><p>' + esc(d) + '</p>' +
    '<div class="tags">' + p.tech.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' +
    '<div class="proj-foot"><span class="link-more">' + (lang === 'ar' ? 'دراسة الحالة ←' : 'View Case Study →') + '</span></div></div></article>';
}
function filtered() {
  return projects.filter(function (p) {
    var okF = activeFilter === 'all' || p.tags.indexOf(activeFilter) !== -1;
    var q = searchTerm.trim().toLowerCase();
    var okS = !q || (p.title + ' ' + p.cat + ' ' + p.tech.join(' ') + ' ' + p.desc).toLowerCase().indexOf(q) !== -1;
    return okF && okS;
  });
}
function renderProjects() {
  if (!grid) return;
  var list = filtered();
  /* Featured = project 01 always (skip when filtering/searching only if excluded) */
  var f = projects[0];
  var fd = (lang === 'ar' && f.descAr) ? f.descAr : f.desc;
  feat.innerHTML =
    '<div class="featured-visual"><div class="fv-grid"></div>' +
    '<div style="position:relative;width:100%"><div class="fv-chart" aria-hidden="true"><i style="height:55%"></i><i style="height:80%"></i><i style="height:62%"></i><i style="height:92%"></i><i style="height:70%"></i><i style="height:85%"></i><i style="height:60%"></i></div>' +
    '<div class="fv-kpis"><div><small>Revenue</small><strong>$128k</strong></div><div><small>Invoices</small><strong>1,240</strong></div><div><small>Clients</small><strong>312</strong></div></div></div></div>' +
    '<div class="featured-body"><span class="pill">★ ' + (lang === 'ar' ? 'مشروع مميز · دراسة حالة' : 'Featured · Frontend Case Study') + '</span>' +
    '<h3>' + esc(f.num) + ' — ' + esc(f.title) + '</h3><p>' + esc(fd) + '</p>' +
    '<div class="tags">' + f.tech.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' +
    '<div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-primary btn-sm" data-open="' + f.id + '">' + (lang === 'ar' ? 'عرض دراسة الحالة' : 'Open Case Study') + '</button></div></div>';
  grid.innerHTML = list.map(cardHTML).join('') ||
    '<p style="color:var(--muted);grid-column:1/-1">' + (lang === 'ar' ? 'لا توجد مشاريع مطابقة — جرّب بحثًا آخر.' : 'No projects match — try a different search or filter.') + '</p>';
  count.textContent = (lang === 'ar' ? 'عرض ' + list.length + ' من 10 مشاريع' : 'Showing ' + list.length + ' of 10 projects');
  bindCards();
}

/* Filters + search */
$$('#filters .filter').forEach(function (b) {
  b.addEventListener('click', function () {
    $$('#filters .filter').forEach(function (x) { x.classList.remove('active'); });
    b.classList.add('active');
    activeFilter = b.getAttribute('data-filter');
    renderProjects();
  });
});
$('#project-search').addEventListener('input', function (e) { searchTerm = e.target.value; renderProjects(); });

/* ---------- Modal ---------- */
var backdrop = $('#modal-backdrop'), modalContent = $('#modal-content'), lastFocus = null;
function openModal(id) {
  var p = projects.filter(function (x) { return x.id === id; })[0];
  if (!p) return;
  lastFocus = document.activeElement;
  var liveBtn = p.liveUrl
    ? '<a class="btn btn-primary btn-sm" href="' + p.liveUrl + '" target="_blank" rel="noopener">Live Demo ↗</a>'
    : '<span class="btn btn-primary btn-sm btn-disabled" title="Demo available on request">Concept Preview</span>';
  var ghBtn = p.githubUrl
    ? '<a class="btn btn-ghost btn-sm" href="' + p.githubUrl + '" target="_blank" rel="noopener">GitHub ↗</a>'
    : '<a class="btn btn-ghost btn-sm" href="' + PROFILE_GH + '" target="_blank" rel="noopener">GitHub Profile ↗</a>';
  modalContent.innerHTML =
    '<span class="pill">' + esc(p.num) + ' · ' + esc(p.badge) + '</span>' +
    '<h3 id="modal-title" style="font-family:var(--font-h);font-size:26px;margin:6px 0">' + esc(p.title) + '</h3>' +
    '<p style="color:var(--accent2);font-size:13px;font-weight:600">' + esc(p.cat) + '</p>' +
    '<div class="modal-visual pv-' + p.id + '"><div class="fv-grid"></div><div class="mock" style="position:relative;width:60%" aria-hidden="true"><div class="mock-bar"><i></i><i></i><i></i></div><div class="mock-lines"><i></i><i></i><i></i></div><div class="mock-row"><b></b><b></b><b></b></div></div></div>' +
    '<div class="modal-sec"><h4>OVERVIEW</h4><p>' + esc((lang === 'ar' && p.descAr) ? p.descAr : p.desc) + '</p></div>' +
    '<div class="modal-sec"><h4>CHALLENGE</h4><p>' + esc(p.problem) + '</p></div>' +
    '<div class="modal-sec"><h4>APPROACH</h4><p>' + esc(p.solution) + '</p></div>' +
    '<div class="modal-sec"><h4>MAIN FEATURES</h4><ul>' + p.features.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul></div>' +
    '<div class="modal-sec"><h4>TECHNOLOGY</h4><div class="tags">' + p.tech.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div></div>' +
    '<div class="modal-cta">' + liveBtn + ghBtn + '</div>';
  backdrop.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  $('#modal-close').focus();
}
function closeModal() {
  backdrop.setAttribute('hidden', '');
  document.body.style.overflow = '';
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}
function bindCards() {
  $$('.proj-card').forEach(function (c) {
    c.addEventListener('click', function () { openModal(+c.getAttribute('data-id')); });
    c.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(+c.getAttribute('data-id')); }
    });
  });
  $$('[data-open]').forEach(function (b) {
    b.addEventListener('click', function (e) { e.stopPropagation(); openModal(+b.getAttribute('data-open')); });
  });
}
$('#modal-close').addEventListener('click', closeModal);
backdrop.addEventListener('click', function (e) { if (e.target === backdrop) closeModal(); });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !backdrop.hasAttribute('hidden')) closeModal(); });

/* ---------- Copy email ---------- */
function copyEmail() {
  function done() { toast(lang === 'ar' ? 'تم نسخ البريد ✓' : 'Email copied ✓'); var n = $('#copy-note'); if (n) n.textContent = EMAIL; }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(EMAIL).then(done, function () { fallback(); });
  } else fallback();
  function fallback() {
    var ta = document.createElement('textarea');
    ta.value = EMAIL; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { toast(EMAIL); }
    document.body.removeChild(ta);
  }
}
$('#copy-email').addEventListener('click', copyEmail);
var ce2 = $('#copy-email-2');
if (ce2) ce2.addEventListener('click', copyEmail);

/* ---------- Contact form → mailto draft (no backend) ---------- */
$('#contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var nameEl = this.querySelector('[name="name"]'), msgEl = this.querySelector('[name="message"]');
  var name = nameEl.value.trim(), msg = msgEl.value.trim();
  var err = $('#form-error');
  if (!name || !msg) {
    err.textContent = lang === 'ar' ? 'فضلًا أدخل الاسم وفكرة المشروع.' : 'Please enter your name and project idea.';
    err.hidden = false; return;
  }
  err.hidden = true;
  var subject = encodeURIComponent('Portfolio inquiry from ' + name);
  var body = encodeURIComponent('Hi Mohammed,\n\n' + msg + '\n\n— ' + name);
  window.location.href = 'mailto:' + EMAIL + '?subject=' + subject + '&body=' + body;
  toast(lang === 'ar' ? 'يتم فتح بريدك الآن…' : 'Opening your email app…');
});

/* ---------- Stack wall micro-interaction ---------- */
$$('#stack-wall button').forEach(function (b) {
  b.addEventListener('click', function () { toast(b.textContent + ' — core frontend toolkit'); });
});

/* ============================================================
   HERO 3D — Three.js scene with graceful fallback
   ============================================================ */
function makeTextSprite(text, color) {
  var c = document.createElement('canvas'); c.width = 256; c.height = 128;
  var g = c.getContext('2d');
  g.fillStyle = 'rgba(13,18,28,.92)';
  g.beginPath(); g.roundRect ? g.roundRect(8, 8, 240, 112, 22) : g.rect(8, 8, 240, 112);
  g.fill();
  g.strokeStyle = color; g.lineWidth = 4; g.stroke();
  g.fillStyle = color; g.font = 'bold 44px Arial'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(text, 128, 66);
  var tex = new THREE.CanvasTexture(c);
  var mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
  return new THREE.Mesh(new THREE.PlaneGeometry(1.7, 0.85), mat);
}

function initHero3D() {
  var canvas = $('#hero-3d'), wrap = $('#scene-wrap'), fallback = $('#scene-fallback');
  function showFallback() { if (fallback) fallback.classList.add('show'); if (canvas) canvas.style.display = 'none'; }
  if (prefersReduced && isMobile) { showFallback(); return; }
  if (typeof THREE === 'undefined') { showFallback(); return; }
  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: !isMobile });
  } catch (e) { showFallback(); return; }

  var W = wrap.clientWidth, H = wrap.clientHeight;
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));

  var scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x06070a, 0.055);
  var camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
  camera.position.set(0, 0.4, 7);

  scene.add(new THREE.AmbientLight(0x8899bb, 0.9));
  var key = new THREE.PointLight(0x2f7bff, 60, 30); key.position.set(-4, 3, 4); scene.add(key);
  var cyan = new THREE.PointLight(0x22d3ee, 40, 30); cyan.position.set(4, -1, 3); scene.add(cyan);
  var purp = new THREE.PointLight(0x7c3aed, 35, 30); purp.position.set(0, 4, -3); scene.add(purp);

  var grid = new THREE.GridHelper(24, 30, 0x2f7bff, 0x1a2334);
  grid.position.y = -2.4; grid.material.transparent = true; grid.material.opacity = 0.35;
  scene.add(grid);

  /* Floating glass browser panel */
  var rig = new THREE.Group(); scene.add(rig);
  var glassMat = new THREE.MeshPhysicalMaterial({ color: 0x111a2c, transparent: true, opacity: 0.82, roughness: 0.25, metalness: 0.35 });
  var browser = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.1, 0.12), glassMat);
  rig.add(browser);
  var bar = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.32, 0.13), new THREE.MeshStandardMaterial({ color: 0x1a2440, roughness: 0.4 }));
  bar.position.y = 0.89; rig.add(bar);
  var dotCols = [0xff5f57, 0xfebc2e, 0x28c840];
  dotCols.forEach(function (col, i) {
    var d = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 16), new THREE.MeshBasicMaterial({ color: col }));
    d.position.set(-1.4 + i * 0.22, 0.89, 0.09); rig.add(d);
  });
  /* code lines inside browser */
  for (var i = 0; i < 4; i++) {
    var w = 2.2 - i * 0.3;
    var line = new THREE.Mesh(new THREE.BoxGeometry(w, 0.07, 0.02),
      new THREE.MeshBasicMaterial({ color: i === 0 ? 0x2f7bff : 0x22d3ee, transparent: true, opacity: 0.85 }));
    line.position.set(-0.3, 0.45 - i * 0.28, 0.08); rig.add(line);
  }
  /* floating tech chips */
  var chips = [
    { t: '<HTML>', c: '#ff7a93', p: [-2.4, 1.2, 0.4] },
    { t: 'CSS', c: '#22d3ee', p: [2.5, 0.6, -0.3] },
    { t: '{ JS }', c: '#facc15', p: [-2.2, -1.2, -0.4] }
  ].map(function (cfg) {
    var s = makeTextSprite(cfg.t, cfg.c);
    s.position.set(cfg.p[0], cfg.p[1], cfg.p[2]);
    scene.add(s);
    return { mesh: s, baseY: cfg.p[1], seed: Math.random() * 10 };
  });
  /* torus + icosahedron accents */
  var torus = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.07, 16, 60),
    new THREE.MeshStandardMaterial({ color: 0x2f7bff, roughness: 0.3, metalness: 0.7 }));
  torus.position.set(2.2, -1.3, -0.6); scene.add(torus);
  var ico = new THREE.Mesh(new THREE.IcosahedronGeometry(0.42, 0),
    new THREE.MeshStandardMaterial({ color: 0x7c3aed, roughness: 0.35, metalness: 0.6, wireframe: true }));
  ico.position.set(-2.4, -0.4, -1); scene.add(ico);

  /* particles */
  var pCount = isMobile ? 120 : 320;
  var pos = new Float32Array(pCount * 3);
  for (var j = 0; j < pCount; j++) {
    pos[j * 3] = (Math.random() - 0.5) * 14;
    pos[j * 3 + 1] = (Math.random() - 0.5) * 8;
    pos[j * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
  }
  var pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  var points = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x5ea0ff, size: 0.035, transparent: true, opacity: 0.8 }));
  scene.add(points);

  /* interaction state */
  var tMX = 0, tMY = 0, cMX = 0, cMY = 0, scrollD = 0;
  if (!prefersReduced) {
    wrap.addEventListener('mousemove', function (e) {
      var r = wrap.getBoundingClientRect();
      tMX = ((e.clientX - r.left) / r.width - 0.5) * 2;
      tMY = ((e.clientY - r.top) / r.height - 0.5) * 2;
    });
    wrap.addEventListener('mouseleave', function () { tMX = 0; tMY = 0; });
    window.addEventListener('scroll', function () {
      var r = wrap.getBoundingClientRect();
      scrollD = Math.max(0, Math.min(1, 1 - r.bottom / (window.innerHeight + r.height)));
    }, { passive: true });
    if (window.DeviceOrientationEvent && isMobile) {
      window.addEventListener('deviceorientation', function (e) {
        if (e.gamma == null) return;
        tMX = Math.max(-1, Math.min(1, e.gamma / 30));
        tMY = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
      });
    }
  }

  var clock = new THREE.Clock();
  var running = true;
  document.addEventListener('visibilitychange', function () { running = !document.hidden; if (running) tick(); });
  function tick() {
    if (!running) return;
    requestAnimationFrame(tick);
    var t = clock.getElapsedTime();
    cMX += (tMX - cMX) * 0.05; cMY += (tMY - cMY) * 0.05;
    var motionScale = prefersReduced ? 0.15 : 1;
    rig.position.y = Math.sin(t * 0.9) * 0.16 * motionScale;
    rig.rotation.y = Math.sin(t * 0.4) * 0.14 * motionScale + cMX * 0.28;
    rig.rotation.x = -cMY * 0.2 + scrollD * 0.35;
    torus.rotation.x = t * 0.6; torus.rotation.y = t * 0.4;
    ico.rotation.y = t * 0.5; ico.rotation.x = t * 0.25;
    chips.forEach(function (ch, i) {
      ch.mesh.position.y = ch.baseY + Math.sin(t * 1.1 + ch.seed) * 0.18 * motionScale;
      ch.mesh.lookAt(camera.position);
    });
    points.rotation.y = t * 0.02 * motionScale + cMX * 0.1;
    grid.position.z = (t * 0.15) % 0.8;
    camera.position.x = cMX * 0.5;
    camera.position.y = 0.4 - cMY * 0.35;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  tick();

  window.addEventListener('resize', function () {
    var w = wrap.clientWidth, h = wrap.clientHeight;
    camera.aspect = w / h; camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
  /* WebGL context loss → fallback */
  canvas.addEventListener('webglcontextlost', function (e) { e.preventDefault(); showFallback(); });
}

/* ---------- Boot ---------- */
applyLang(lang);
renderProjects();
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(initHero3D, 50);
} else {
  window.addEventListener('DOMContentLoaded', function () { setTimeout(initHero3D, 50); });
}

})();
