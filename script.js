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
en:{skip:'Skip to content',loaderSub:'FRONT-END DEVELOPER',brandSub:'Front-End Developer',navHome:'Home',navAbout:'About',navSkills:'Skills',navProjects:'Projects',navServices:'Services',navContact:'Contact',navCta:"Let's Talk",heroLabel:'FRONT-END WEB DEVELOPER',heroTag:'I BUILD MODERN WEB EXPERIENCES.',heroDesc:'Front-End Web Developer focused on creating modern, responsive, interactive, and user-friendly websites using HTML, CSS, and JavaScript.',heroBtn1:'View My Work',heroBtn2:"Let's Connect",heroMeta1:'Core specialization',heroMeta2:'Frontend case studies',heroMeta3:'Responsive-first interfaces',heroHint:'Move your cursor — the scene responds · Scroll for depth',heroRotPre:'Specialized in',aboutLabel:'ABOUT ME',aboutTitle:'Front-end focused. Detail obsessed.',aboutLead:"I'm Mohammed Zomlot, a Front-End Web Developer focused on building modern, responsive, and user-friendly websites using HTML, CSS, and JavaScript. I enjoy turning ideas into clean, functional web experiences and continuously improving through real-world projects.",aboutP1t:'UI-focused developer',aboutP1d:'Interfaces with clear hierarchy, spacing systems and readable typography.',aboutP2t:'Responsive by default',aboutP2d:'Desktop, tablet and mobile layouts designed intentionally — not compressed.',aboutP3t:'JavaScript interaction',aboutP3d:'DOM, LocalStorage, API integration, filters, dashboards and dynamic UI.',aboutCardStatus:'Available for projects',aboutCardRole:'Front-End Web Developer · HTML / CSS / JS',copyEmail:'Copy email',skillsLabel:'SKILLS',skillsTitle:'Categorized capability, no fake scores.',skillsSub:'Honest grouping of what I use to design and build real interfaces.',skillsC1:'CORE FRONT-END',skillsC2:'DESIGN',skillsC3:'DEVELOPMENT',lvlA:'Advanced',lvlA2:'Advanced',lvlB:'Intermediate–Advanced',lvlA3:'Advanced',expLabel:'FRONT-END EXPERTISE',expTitle:'What I build best.',exp1t:'Interactive Websites',exp1d:'Modern responsive interfaces with animations and polished interactions.',exp2t:'Business Dashboards',exp2d:'Professional dashboards for workflows, finance and data visualization.',exp3t:'Responsive Interfaces',exp3d:'Interfaces optimized for desktop, tablet and mobile.',exp4t:'UI Systems',exp4d:'Reusable components, spacing, typography and consistent visual language.',exp5t:'JavaScript Experiences',exp5d:'Filters, search, forms, CRUD interfaces and client-side functionality.',exp6t:'Premium Landing Pages',exp6d:'High-conversion landing pages with strong visual hierarchy.',projLabel:'FEATURED PROJECTS',projTitle:'10 frontend case studies.',projSub:'Portfolio concepts & personal projects — honest scope, real interfaces. No fake clients or metrics.',servLabel:'SERVICES',servTitle:'What I can build for you.',serv1t:'Responsive Websites',serv1d:'Modern websites that adapt across devices.',serv2t:'Landing Pages',serv2d:'Premium high-conversion landing pages.',serv3t:'Business Dashboards',serv3d:'Professional dashboards for business applications.',serv4t:'Interactive UI',serv4d:'Dynamic interfaces with JavaScript.',serv5t:'Website Redesign',serv5d:'Modernize outdated web interfaces.',serv6t:'Front-End Prototyping',serv6d:'Turn ideas into polished interactive prototypes.',procLabel:'HOW I BUILD',procTitle:'Design philosophy & process.',procSub:'Goal: clean code · clear UI · responsive design · smooth interaction · good usability.',proc1t:'Understand',proc1d:'Clarify goals, users and content first.',proc2t:'Plan',proc2d:'Structure pages, components and states.',proc3t:'Design',proc3d:'Spacing, type and color systems.',proc4t:'Build',proc4d:'Semantic HTML, clean CSS, vanilla JS.',proc5t:'Test',proc5d:'Devices, keyboard, contrast, motion.',proc6t:'Refine',proc6d:'Polish micro-interactions & performance.',stackLabel:'TECHNOLOGY STACK',stackTitle:'Frontend-only toolkit.',jourLabel:'JOURNEY',jourTitle:'A development journey, not fake employment.',jour1t:'Learning the fundamentals',jour1d:'HTML semantics, CSS layout, JavaScript basics and responsive thinking.',jour2t:'Building real projects',jour2d:'Dashboards, stores, landing pages and business interfaces as portfolio case studies.',jour3t:'Improving UI / UX',jour3d:'Hierarchy, spacing systems, accessibility and interaction polish.',jour4t:'Advanced front-end interfaces',jour4d:'3D touches, motion, filtering, modals, themes and client-side architecture.',jour5t:'Professional portfolio',jour5d:'This site — a cohesive identity for a serious front-end developer.',contactLabel:'CONTACT',contactTitle:"LET'S BUILD SOMETHING GREAT.",contactSub:"Have a project, idea, or website that needs a modern frontend experience? Let's talk.",formTitle:'Project brief',formHint:'This form prepares an email in your mail app. No form data is stored on this site.',formName:'Your name',formMsg:'Project idea',formSend:'Compose email'},
ar:{skip:'تخطَّ إلى المحتوى',loaderSub:'مطوّر واجهات أمامية',brandSub:'مطوّر واجهات أمامية',navHome:'الرئيسية',navAbout:'من أنا',navSkills:'المهارات',navProjects:'المشاريع',navServices:'الخدمات',navContact:'تواصل',navCta:'لنتحدث',heroLabel:'مطوّر واجهات أمامية — FRONT-END',heroTag:'أبني تجارب ويب عصرية.',heroDesc:'مطوّر واجهات أمامية متخصص في إنشاء مواقع عصرية ومتجاوبة وتفاعلية وسهلة الاستخدام باستخدام HTML وCSS وJavaScript.',heroBtn1:'شاهد أعمالي',heroBtn2:'لنتواصل',heroMeta1:'التخصص الأساسي',heroMeta2:'دراسات حالة',heroMeta3:'متجاوب وتفاعلي',heroHint:'حرّك المؤشر — المشهد يستجيب · مرّر للعمق',heroRotPre:'متخصص في',aboutLabel:'من أنا',aboutTitle:'تركيز على الواجهات. هوس بالتفاصيل.',aboutLead:'أنا محمد زملّوط، مطوّر واجهات أمامية متخصص في بناء مواقع عصرية ومتجاوبة وسهلة الاستخدام باستخدام HTML وCSS وJavaScript. أستمتع بتحويل الأفكار إلى تجارب ويب نظيفة وعملية وأطوّر مهاراتي باستمرار عبر مشاريع واقعية.',aboutP1t:'مطوّر يركز على الواجهات',aboutP1d:'واجهات بتسلسل واضح وأنظمة تباعد وخطوط مقروءة.',aboutP2t:'تجاوب افتراضي',aboutP2d:'تخطيطات مدروسة لسطح المكتب والتابلت والموبايل.',aboutP3t:'تفاعل بجافاسكربت',aboutP3d:'DOM وLocalStorage وربط APIs وفلاتر ولوحات تحكم وواجهات ديناميكية.',aboutCardStatus:'متاح للمشاريع',aboutCardRole:'مطوّر واجهات أمامية · HTML / CSS / JS',copyEmail:'نسخ البريد',skillsLabel:'المهارات',skillsTitle:'قدرات مصنّفة بدون أرقام وهمية.',skillsSub:'تجميع صادق لما أستخدمه لتصميم وبناء واجهات حقيقية.',skillsC1:'الأساس',skillsC2:'التصميم',skillsC3:'التطوير',lvlA:'متقدم',lvlA2:'متقدم',lvlB:'متوسط–متقدم',lvlA3:'متقدم',expLabel:'الخبرة',expTitle:'ما أبنيه بأفضل صورة.',exp1t:'مواقع تفاعلية',exp1d:'واجهات متجاوبة عصرية بحركات وتفاعلات مصقولة.',exp2t:'لوحات تحكم للأعمال',exp2d:'لوحات احترافية لسير العمل والمالية وعرض البيانات.',exp3t:'واجهات متجاوبة',exp3d:'واجهات محسّنة لسطح المكتب والتابلت والموبايل.',exp4t:'أنظمة واجهات',exp4d:'مكونات قابلة لإعادة الاستخدام وأنظمة تباعد وخطوط ولغة بصرية متسقة.',exp5t:'تجارب جافاسكربت',exp5d:'فلاتر وبحث ونماذج وواجهات CRUD ووظائف تعمل داخل المتصفح.',exp6t:'صفحات هبوط فاخرة',exp6d:'صفحات هبوط عالية التحويل بتسلسل بصري قوي.',projLabel:'مشاريع مختارة',projTitle:'10 دراسات حالة في الواجهات.',projSub:'مفاهيم ومشاريع شخصية — نطاق صادق وواجهات حقيقية. بدون عملاء أو أرقام وهمية.',servLabel:'الخدمات',servTitle:'ما يمكنني بناؤه لك.',serv1t:'مواقع متجاوبة',serv1d:'مواقع عصرية تتكيف مع كل الأجهزة.',serv2t:'صفحات هبوط',serv2d:'صفحات هبوط فاخرة عالية التحويل.',serv3t:'لوحات تحكم للأعمال',serv3d:'لوحات احترافية لتطبيقات الأعمال.',serv4t:'واجهات تفاعلية',serv4d:'واجهات ديناميكية بجافاسكربت.',serv5t:'إعادة تصميم المواقع',serv5d:'تحديث الواجهات القديمة بتصميم عصري.',serv6t:'نماذج أولية',serv6d:'تحويل الأفكار إلى نماذج تفاعلية مصقولة.',procLabel:'كيف أبني',procTitle:'فلسفة التصميم والعملية.',procSub:'الهدف: كود نظيف · واجهة واضحة · تصميم متجاوب · تفاعل سلس · سهولة استخدام.',proc1t:'الفهم',proc1d:'توضيح الأهداف والمستخدمين والمحتوى أولًا.',proc2t:'التخطيط',proc2d:'هيكلة الصفحات والمكونات والحالات.',proc3t:'التصميم',proc3d:'أنظمة التباعد والخطوط والألوان.',proc4t:'البناء',proc4d:'HTML دلالي وCSS نظيف وJS خام.',proc5t:'الاختبار',proc5d:'الأجهزة ولوحة المفاتيح والتباين والحركة.',proc6t:'التحسين',proc6d:'صقل التفاعلات الدقيقة والأداء.',stackLabel:'التقنيات',stackTitle:'أدوات الواجهات فقط.',jourLabel:'الرحلة',jourTitle:'رحلة تطوير وليست وظائف وهمية.',jour1t:'تعلم الأساسيات',jour1d:'دلالات HTML وتخطيط CSS وأساسيات جافاسكربت والتفكير المتجاوب.',jour2t:'بناء مشاريع حقيقية',jour2d:'لوحات تحكم ومتاجر وصفحات هبوط وواجهات أعمال كدراسات حالة.',jour3t:'تحسين UI / UX',jour3d:'التسلسل وأنظمة التباعد وإمكانية الوصول وصقل التفاعل.',jour4t:'واجهات أمامية متقدمة',jour4d:'لمسات ثلاثية الأبعاد وحركة وفلاتر ونوافذ وثيمات وهيكلة عميلة.',jour5t:'معرض أعمال احترافي',jour5d:'هذا الموقع — هوية متماسكة لمطوّر واجهات جاد.',contactLabel:'تواصل',contactTitle:'لنبنِ شيئًا عظيمًا.',contactSub:'هل لديك مشروع أو فكرة أو موقع يحتاج تجربة واجهات عصرية؟ لنتحدث.',formTitle:'ملخص المشروع',formHint:'النموذج يجهز رسالة في تطبيق البريد لديك. لا يتم تخزين بياناته على هذا الموقع.',formName:'اسمك',formMsg:'فكرة المشروع',formSend:'إنشاء البريد'}
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
var sections = ['home', 'about', 'skills', 'projects', 'services', 'faq', 'contact'].map(function (id) { return document.getElementById(id); }).filter(Boolean);
function onScroll() {
  var y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 24);
  toTop.classList.toggle('show', y > 700);
  var prog = $('#progress');
  if (prog) {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
  }
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
  if (window.__mzEnhance3D) window.__mzEnhance3D();
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
    : '<a class="btn btn-ghost btn-sm" href="' + PROFILE_GH + '" target="_blank" rel="noopener">GitHub ↗</a>';
  modalContent.innerHTML =
    '<span class="pill">' + esc(p.num) + ' · ' + esc(p.badge) + '</span>' +
    '<h3 id="modal-title" style="font-family:var(--font-h);font-size:26px;margin:6px 0">' + esc(p.title) + '</h3>' +
    '<p style="color:var(--accent2);font-size:13px;font-weight:600">' + esc(p.cat) + '</p>' +
    '<div class="modal-visual pv-' + p.id + '"><div class="fv-grid"></div><div class="mock" style="position:relative;width:60%" aria-hidden="true"><div class="mock-bar"><i></i><i></i><i></i></div><div class="mock-lines"><i></i><i></i><i></i></div><div class="mock-row"><b></b><b></b><b></b></div></div></div>' +
    '<div class="case-grid">' +
      '<div class="case-stat"><strong>FRONTEND</strong><span>HTML · CSS · JS</span></div>' +
      '<div class="case-stat"><strong>STATUS</strong><span>' + esc(p.badge) + '</span></div>' +
      '<div class="case-stat"><strong>SCOPE</strong><span>Portfolio case study</span></div>' +
    '</div>' +
    '<div class="modal-sec"><h4>OVERVIEW</h4><p>' + esc((lang === 'ar' && p.descAr) ? p.descAr : p.desc) + '</p></div>' +
    '<div class="modal-sec"><h4>CHALLENGE</h4><p>' + esc(p.problem) + '</p></div>' +
    '<div class="modal-sec"><h4>APPROACH</h4><p>' + esc(p.solution) + '</p></div>' +
    '<div class="modal-sec"><h4>WHAT I BUILT</h4><ul>' + p.features.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul></div>' +
    '<div class="modal-sec"><h4>TECHNOLOGY</h4><div class="tags">' + p.tech.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div></div>' +
    '<div class="modal-note">This is a portfolio/personal project presentation. Live and repository links appear when a public URL is configured.</div>' +
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

/* ---------- Contact form → direct send via FormSubmit AJAX (no popups) ---------- */
$('#contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var form = e.currentTarget;
  var data = new FormData(form);
  var name = String(data.get('name') || '').trim();
  var email = String(data.get('email') || '').trim();
  var projectType = String(data.get('projectType') || '').trim();
  var budget = String(data.get('budget') || '').trim();
  var message = String(data.get('message') || '').trim();
  var err = $('#form-error'), ok = $('#form-success');
  err.hidden = true;
  ok.hidden = true;
  if (!name || !email || !projectType || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    err.textContent = lang === 'ar' ? 'فضلًا أكمل الاسم والبريد ونوع المشروع وفكرة المشروع ببريد صحيح.' : 'Please complete your name, email, project type, and a valid project brief.';
    err.hidden = false;
    return;
  }
  if (String(data.get('_honey') || '').trim() !== '') { ok.textContent = lang === 'ar' ? 'تم الإرسال بنجاح ✓' : 'Sent successfully ✓'; ok.hidden = false; return; }
  var btn = form.querySelector('[type="submit"]');
  if (btn) { btn.disabled = true; btn.style.opacity = '.6'; }
  ok.textContent = lang === 'ar' ? 'جارٍ الإرسال مباشرة…' : 'Sending directly…';
  ok.hidden = false;
  fetch('https://formsubmit.co/ajax/mhzomlot@gmail.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      name: name,
      email: email,
      'project type': projectType,
      budget: budget || 'Not specified',
      message: message,
      _subject: 'Frontend Project Inquiry - ' + name,
      _template: 'table',
      _captcha: 'false'
    })
  }).then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }).catch(function () { return { ok: r.ok }; }); })
  .then(function (res) {
    if (btn) { btn.disabled = false; btn.style.opacity = ''; }
    if (!res.ok) throw new Error('send-failed');
    ok.textContent = lang === 'ar' ? 'تم الإرسال بنجاح ✓ سأرد عليك قريبًا.' : 'Sent successfully ✓ I will reply soon.';
    form.reset();
  })
  .catch(function () {
    if (btn) { btn.disabled = false; btn.style.opacity = ''; }
    ok.hidden = true;
    err.innerHTML = (lang === 'ar'
      ? 'تعذر الإرسال المباشر (تحقق من الإنترنت). راسلني مباشرة: <a href="mailto:mhzomlot@gmail.com">mhzomlot@gmail.com</a>'
      : 'Direct send failed (check connection). Email me directly: <a href="mailto:mhzomlot@gmail.com">mhzomlot@gmail.com</a>');
    err.hidden = false;
  });
});

/* ---------- Stack wall micro-interaction ---------- */
$$('#stack-wall button').forEach(function (b) {
  b.addEventListener('click', function () { toast(b.textContent + ' — core frontend toolkit'); });
});

/* ============================================================
   HERO 3D — pure CSS-3D scene driven by lightweight parallax.
   No WebGL dependency: renders identically on every device.
   ============================================================ */
function initHero3D() {
  var wrap = $('#scene-wrap'), stage = $('#ps-stage'), canvas = $('#hero-particles'), glCanvas = $('#hero-webgl');
  if (!wrap || !stage) return;

  var reduced = prefersReduced;
  var ctx = canvas ? canvas.getContext('2d') : null;
  var gl = null;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var particles = [];
  var width = 0, height = 0;
  var pointer = { tx: 0, ty: 0, x: 0, y: 0, vx: 0, vy: 0 };
  var scrollTarget = 0, scrollCurrent = 0;
  var raf = 0, particleRaf = 0, glRaf = 0;
  var glScene = null;

  function resizeCanvas() {
    var r = wrap.getBoundingClientRect();
    width = Math.max(1, Math.floor(r.width));
    height = Math.max(1, Math.floor(r.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas && ctx) {
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    }
    if (gl && glCanvas) {
      glCanvas.width = Math.floor(width * dpr);
      glCanvas.height = Math.floor(height * dpr);
      gl.viewport(0, 0, glCanvas.width, glCanvas.height);
    }
  }

  function buildParticles() {
    if (!ctx || reduced) return;
    var count = Math.max(28, Math.min(72, Math.floor((width * height) / 5200)));
    particles = Array.from({ length: count }, function (_, i) {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random(),
        r: 0.6 + Math.random() * 1.4,
        a: 0.18 + Math.random() * 0.58,
        speed: 0.12 + Math.random() * 0.28,
        drift: (Math.random() - 0.5) * 0.35,
        hue: i % 3
      };
    });
  }

  function drawParticles() {
    if (!ctx || reduced) return;
    ctx.clearRect(0, 0, width, height);
    var px = pointer.x || width * .5;
    var py = pointer.y || height * .5;
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.y -= p.speed * (0.65 + p.z);
      p.x += p.drift + pointer.x * 0.0012 * (0.4 + p.z);
      if (p.y < -10) p.y = height + 10;
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
      var dx = px - p.x, dy = py - p.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var repel = Math.max(0, 1 - dist / 130);
      var drawX = p.x - dx * repel * 0.028;
      var drawY = p.y - dy * repel * 0.028;
      var alpha = p.a * (0.55 + p.z * 0.65);
      var color = p.hue === 0 ? '34,211,238' : p.hue === 1 ? '47,123,255' : '167,139,250';
      ctx.beginPath();
      ctx.fillStyle = 'rgba(' + color + ',' + alpha + ')';
      ctx.shadowBlur = 10 * p.z;
      ctx.shadowColor = 'rgba(' + color + ',' + (alpha * .65) + ')';
      ctx.arc(drawX, drawY, p.r * (0.65 + p.z), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    particleRaf = requestAnimationFrame(drawParticles);
  }

  function mat4Perspective(out, fovy, aspect, near, far) {
    var f = 1 / Math.tan(fovy / 2), nf = 1 / (near - far);
    out[0] = f / aspect; out[1] = 0; out[2] = 0; out[3] = 0;
    out[4] = 0; out[5] = f; out[6] = 0; out[7] = 0;
    out[8] = 0; out[9] = 0; out[10] = (far + near) * nf; out[11] = -1;
    out[12] = 0; out[13] = 0; out[14] = (2 * far * near) * nf; out[15] = 0;
    return out;
  }

  function mat4Identity(out) {
    out[0]=1;out[1]=0;out[2]=0;out[3]=0;out[4]=0;out[5]=1;out[6]=0;out[7]=0;out[8]=0;out[9]=0;out[10]=1;out[11]=0;out[12]=0;out[13]=0;out[14]=0;out[15]=1;
    return out;
  }

  function mat4Multiply(out, a, b) {
    var a00=a[0],a01=a[1],a02=a[2],a03=a[3],a10=a[4],a11=a[5],a12=a[6],a13=a[7],a20=a[8],a21=a[9],a22=a[10],a23=a[11],a30=a[12],a31=a[13],a32=a[14],a33=a[15];
    var b00=b[0],b01=b[1],b02=b[2],b03=b[3],b10=b[4],b11=b[5],b12=b[6],b13=b[7],b20=b[8],b21=b[9],b22=b[10],b23=b[11],b30=b[12],b31=b[13],b32=b[14],b33=b[15];
    out[0]=a00*b00+a10*b01+a20*b02+a30*b03;out[1]=a01*b00+a11*b01+a21*b02+a31*b03;out[2]=a02*b00+a12*b01+a22*b02+a32*b03;out[3]=a03*b00+a13*b01+a23*b02+a33*b03;
    out[4]=a00*b10+a10*b11+a20*b12+a30*b13;out[5]=a01*b10+a11*b11+a21*b12+a31*b13;out[6]=a02*b10+a12*b11+a22*b12+a32*b13;out[7]=a03*b10+a13*b11+a23*b12+a33*b13;
    out[8]=a00*b20+a10*b21+a20*b22+a30*b23;out[9]=a01*b20+a11*b21+a21*b22+a31*b23;out[10]=a02*b20+a12*b21+a22*b22+a32*b23;out[11]=a03*b20+a13*b21+a23*b22+a33*b23;
    out[12]=a00*b30+a10*b31+a20*b32+a30*b33;out[13]=a01*b30+a11*b31+a21*b32+a31*b33;out[14]=a02*b30+a12*b31+a22*b32+a32*b33;out[15]=a03*b30+a13*b31+a23*b32+a33*b33;
    return out;
  }

  function mat4Translate(out, a, x, y, z) {
    var t = new Float32Array(16); mat4Identity(t); t[12]=x;t[13]=y;t[14]=z; return mat4Multiply(out,a,t);
  }

  function mat4RotateX(out, a, rad) {
    var c=Math.cos(rad),s=Math.sin(rad),r=new Float32Array([1,0,0,0,0,c,s,0,0,-s,c,0,0,0,0,1]); return mat4Multiply(out,a,r);
  }

  function mat4RotateY(out, a, rad) {
    var c=Math.cos(rad),s=Math.sin(rad),r=new Float32Array([c,0,-s,0,0,1,0,0,s,0,c,0,0,0,0,1]); return mat4Multiply(out,a,r);
  }

  function compileShader(glCtx, type, source) {
    var shader=glCtx.createShader(type); glCtx.shaderSource(shader,source); glCtx.compileShader(shader);
    if(!glCtx.getShaderParameter(shader,glCtx.COMPILE_STATUS)){ glCtx.deleteShader(shader); return null; }
    return shader;
  }

  function makeProgram(glCtx, vsSource, fsSource) {
    var vs=compileShader(glCtx,glCtx.VERTEX_SHADER,vsSource), fs=compileShader(glCtx,glCtx.FRAGMENT_SHADER,fsSource);
    if(!vs||!fs) return null;
    var program=glCtx.createProgram(); glCtx.attachShader(program,vs); glCtx.attachShader(program,fs); glCtx.linkProgram(program);
    glCtx.deleteShader(vs); glCtx.deleteShader(fs);
    if(!glCtx.getProgramParameter(program,glCtx.LINK_STATUS)){glCtx.deleteProgram(program);return null;}
    return program;
  }

  function makeGlData() {
    if (!glCanvas || reduced) return null;
    gl = glCanvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: true, powerPreference: 'high-performance' });
    if (!gl) return null;

    var pointVS = `attribute vec3 aPos; attribute float aSize; attribute float aSeed; uniform mat4 uVP; uniform float uTime; uniform vec2 uPointer; uniform float uScroll; varying float vDepth; varying float vSeed; void main(){ vec3 p=aPos; float t=uTime*0.55+aSeed*6.2831; p.x += sin(t+p.z*2.4)*0.055; p.y += cos(t*0.73+p.x*2.8)*0.045; p.z += sin(t*0.46+p.y*3.1)*0.06; float pull=max(0.0,1.0-length(uPointer))*0.08; p.xy += uPointer*(0.11 + pull) * (0.45 + p.z*0.2); float yaw=uTime*0.12 + uScroll*0.85 + uPointer.x*0.18; float cy=cos(yaw), sy=sin(yaw); p=vec3(cy*p.x+sy*p.z,p.y,-sy*p.x+cy*p.z); float camZ=4.2; vec4 mv=vec4(p.x,p.y,p.z-camZ,1.0); gl_Position=uVP*mv; float depth=clamp(1.0-(p.z+1.7)/3.4,0.0,1.0); vDepth=depth; vSeed=aSeed; gl_PointSize=aSize*(1.25+depth*2.6)*(uPointer.y*0.08+1.0); }`;
    var pointFS = `precision mediump float; varying float vDepth; varying float vSeed; uniform vec2 uPointer; uniform float uTime; void main(){ vec2 uv=gl_PointCoord-0.5; float d=length(uv); if(d>0.5) discard; float core=pow(max(0.0,1.0-d*2.0),2.6); float glow=pow(max(0.0,1.0-d*2.0),0.9); float phase=0.5+0.5*sin(uTime*1.2+vSeed*15.0); vec3 cyan=vec3(0.13,0.83,1.0); vec3 violet=vec3(0.55,0.35,1.0); vec3 base=mix(cyan,violet,phase*0.72); float aberr=clamp((uv.x+0.5)*0.12,0.0,1.0); base.r += aberr*0.12; base.b += (1.0-aberr)*0.10; float fog=mix(0.32,1.0,1.0-vDepth); gl_FragColor=vec4(base*(0.58+core*0.78),glow*0.34*fog+core*0.46*fog); }`;
    var lineVS = `attribute vec3 aPos; uniform mat4 uVP; uniform float uTime; uniform vec2 uPointer; uniform float uScroll; varying float vDepth; void main(){ vec3 p=aPos; float yaw=uTime*0.12+uScroll*0.85+uPointer.x*0.12; float cy=cos(yaw),sy=sin(yaw); p=vec3(cy*p.x+sy*p.z,p.y,-sy*p.x+cy*p.z); float pitch=0.16+uPointer.y*0.16; float cp=cos(pitch),sp=sin(pitch); p=vec3(p.x,cp*p.y-sp*p.z,sp*p.y+cp*p.z); vec4 mv=vec4(p.x,p.y,p.z-4.2,1.0); gl_Position=uVP*mv; vDepth=clamp(1.0-(p.z+1.8)/3.6,0.0,1.0); }`;
    var lineFS = `precision mediump float; varying float vDepth; uniform float uTime; uniform vec3 uColor; void main(){ float pulse=0.78+0.22*sin(uTime*1.5); float fog=mix(0.06,1.0,1.0-vDepth); gl_FragColor=vec4(uColor*(0.45+0.5*pulse),0.18*fog); }`;

    var pointProgram=makeProgram(gl,pointVS,pointFS), lineProgram=makeProgram(gl,lineVS,lineFS);
    if(!pointProgram||!lineProgram) return null;

    var pointPos=[], pointSize=[], pointSeed=[];
    var golden=Math.PI*(3-Math.sqrt(5));
    var pointCount=720;
    for(var i=0;i<pointCount;i++){
      var y=1-(i/(pointCount-1))*2; var r=Math.sqrt(Math.max(0,1-y*y)); var theta=golden*i;
      var rr=1.18 + (Math.random()-0.5)*0.12; pointPos.push(Math.cos(theta)*r*rr, y*rr, Math.sin(theta)*r*rr);
      pointSize.push(1.1+Math.random()*2.0); pointSeed.push(Math.random());
    }

    var linePos=[];
    var seg=44;
    for(var lat=-5;lat<=5;lat++){
      var phi=(lat/6)*Math.PI*0.5;
      var r=Math.cos(phi)*1.22, y=Math.sin(phi)*1.22;
      for(var j=0;j<seg;j++){
        var a1=(j/seg)*Math.PI*2, a2=((j+1)/seg)*Math.PI*2;
        linePos.push(Math.cos(a1)*r,y,Math.sin(a1)*r, Math.cos(a2)*r,y,Math.sin(a2)*r);
      }
    }
    for(var lon=0;lon<12;lon++){
      var a=(lon/12)*Math.PI*2;
      for(var k=0;k<seg;k++){
        var p1=-Math.PI*0.5+(k/seg)*Math.PI, p2=-Math.PI*0.5+((k+1)/seg)*Math.PI;
        linePos.push(Math.cos(a)*Math.cos(p1)*1.22,Math.sin(p1)*1.22,Math.sin(a)*Math.cos(p1)*1.22, Math.cos(a)*Math.cos(p2)*1.22,Math.sin(p2)*1.22,Math.sin(a)*Math.cos(p2)*1.22);
      }
    }

    var pBuf=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,pBuf); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(pointPos),gl.STATIC_DRAW);
    var sBuf=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,sBuf); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(pointSize),gl.STATIC_DRAW);
    var seedBuf=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,seedBuf); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(pointSeed),gl.STATIC_DRAW);
    var lBuf=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,lBuf); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(linePos),gl.STATIC_DRAW);

    var vp=new Float32Array(16), model=new Float32Array(16), temp=new Float32Array(16);
    return {
      pointProgram, lineProgram, pBuf, sBuf, seedBuf, lBuf,
      pointCount, lineCount: linePos.length/3, vp, model, temp,
      pLoc:{pos:gl.getAttribLocation(pointProgram,'aPos'),size:gl.getAttribLocation(pointProgram,'aSize'),seed:gl.getAttribLocation(pointProgram,'aSeed'),vp:gl.getUniformLocation(pointProgram,'uVP'),time:gl.getUniformLocation(pointProgram,'uTime'),pointer:gl.getUniformLocation(pointProgram,'uPointer'),scroll:gl.getUniformLocation(pointProgram,'uScroll')},
      lLoc:{pos:gl.getAttribLocation(lineProgram,'aPos'),vp:gl.getUniformLocation(lineProgram,'uVP'),time:gl.getUniformLocation(lineProgram,'uTime'),pointer:gl.getUniformLocation(lineProgram,'uPointer'),scroll:gl.getUniformLocation(lineProgram,'uScroll'),color:gl.getUniformLocation(lineProgram,'uColor')}
    };
  }

  function renderWebGL(timeMs) {
    if (!gl || !glScene || reduced) return;
    var t=timeMs*0.001;
    var vp=glScene.vp;
    mat4Perspective(vp, Math.PI/3, Math.max(0.5,width/Math.max(1,height)), 0.1, 20);
    gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA,gl.ONE); gl.disable(gl.DEPTH_TEST);
    var px=width?(pointer.x/width-0.5)*2:0, py=height?(pointer.y/height-0.5)*2:0;

    gl.useProgram(glScene.lineProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER,glScene.lBuf); gl.enableVertexAttribArray(glScene.lLoc.pos); gl.vertexAttribPointer(glScene.lLoc.pos,3,gl.FLOAT,false,0,0);
    gl.uniformMatrix4fv(glScene.lLoc.vp,false,vp); gl.uniform1f(glScene.lLoc.time,t); gl.uniform2f(glScene.lLoc.pointer,px,py); gl.uniform1f(glScene.lLoc.scroll,scrollCurrent); gl.uniform3f(glScene.lLoc.color,0.16,0.76,1.0);
    gl.drawArrays(gl.LINES,0,glScene.lineCount);

    gl.useProgram(glScene.pointProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER,glScene.pBuf); gl.enableVertexAttribArray(glScene.pLoc.pos); gl.vertexAttribPointer(glScene.pLoc.pos,3,gl.FLOAT,false,0,0);
    gl.bindBuffer(gl.ARRAY_BUFFER,glScene.sBuf); gl.enableVertexAttribArray(glScene.pLoc.size); gl.vertexAttribPointer(glScene.pLoc.size,1,gl.FLOAT,false,0,0);
    gl.bindBuffer(gl.ARRAY_BUFFER,glScene.seedBuf); gl.enableVertexAttribArray(glScene.pLoc.seed); gl.vertexAttribPointer(glScene.pLoc.seed,1,gl.FLOAT,false,0,0);
    gl.uniformMatrix4fv(glScene.pLoc.vp,false,vp); gl.uniform1f(glScene.pLoc.time,t); gl.uniform2f(glScene.pLoc.pointer,px,py); gl.uniform1f(glScene.pLoc.scroll,scrollCurrent);
    gl.drawArrays(gl.POINTS,0,glScene.pointCount);
    glRaf=requestAnimationFrame(renderWebGL);
  }

  function setHover(on) { wrap.classList.toggle('is-hovered', on); }
  function kick() { if (!raf) raf = requestAnimationFrame(frame); }

  function frame() {
    pointer.x += (pointer.tx - pointer.x) * 0.12;
    pointer.y += (pointer.ty - pointer.y) * 0.12;
    pointer.vx += ((pointer.tx - pointer.x) - pointer.vx) * 0.18;
    pointer.vy += ((pointer.ty - pointer.y) - pointer.vy) * 0.18;
    scrollCurrent += (scrollTarget - scrollCurrent) * 0.08;

    var nx = width ? (pointer.x / width - .5) * 2 : pointer.tx;
    var ny = height ? (pointer.y / height - .5) * 2 : pointer.ty;
    var momentumX = Math.max(-1, Math.min(1, pointer.vx * 6));
    var momentumY = Math.max(-1, Math.min(1, pointer.vy * 6));
    stage.style.setProperty('--ry', (nx * 15 + momentumX * 2.8).toFixed(2) + 'deg');
    stage.style.setProperty('--rx', (-ny * 11 - momentumY * 2.1).toFixed(2) + 'deg');
    stage.style.setProperty('--scroll-ry', (scrollCurrent * 4.5).toFixed(2) + 'deg');
    stage.style.setProperty('--scroll-rx', (scrollCurrent * 2.2).toFixed(2) + 'deg');
    wrap.style.setProperty('--mx', nx.toFixed(4));
    wrap.style.setProperty('--my', ny.toFixed(4));
    wrap.style.setProperty('--scroll-angle', (scrollCurrent * 24).toFixed(2) + 'deg');
    var rings = $$('.ps-ring');
    rings.forEach(function (ring) {
      var depth = parseFloat(ring.getAttribute('data-depth') || '1');
      ring.style.transform = 'translate3d(' + (nx * depth * 5).toFixed(1) + 'px,' + (ny * depth * 5).toFixed(1) + 'px,' + (-depth * 18).toFixed(1) + 'px) rotateX(' + (68 + ny * 3).toFixed(2) + 'deg) rotateZ(' + (depth * 9 + scrollCurrent * 24).toFixed(2) + 'deg)';
    });
    if (Math.abs(pointer.tx - pointer.x) > .001 || Math.abs(pointer.ty - pointer.y) > .001 || Math.abs(pointer.vx) > .001 || Math.abs(pointer.vy) > .001 || Math.abs(scrollTarget - scrollCurrent) > .001) raf = requestAnimationFrame(frame); else raf = null;
  }

  function updateScroll() {
    var r = wrap.getBoundingClientRect();
    var center = r.top + r.height * .5;
    var viewport = window.innerHeight || 800;
    scrollTarget = Math.max(-1, Math.min(1, (viewport * .5 - center) / Math.max(viewport, r.height)));
    kick();
  }

  wrap.addEventListener('pointerenter', function () { setHover(true); });
  wrap.addEventListener('pointerleave', function () { setHover(false); pointer.tx = width * .5; pointer.ty = height * .5; kick(); });
  wrap.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') return;
    var r = wrap.getBoundingClientRect();
    pointer.tx = e.clientX - r.left;
    pointer.ty = e.clientY - r.top;
    kick();
  });

  window.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('resize', function () { resizeCanvas(); updateScroll(); kick(); }, { passive: true });
  resizeCanvas();
  updateScroll();

  glScene = makeGlData();
  if (glScene && !reduced) {
    resizeCanvas();
    cancelAnimationFrame(glRaf);
    glRaf = requestAnimationFrame(renderWebGL);
  } else if (glCanvas) {
    glCanvas.style.display = 'none';
  }

  if (!reduced && ctx) {
    cancelAnimationFrame(particleRaf);
    particleRaf = requestAnimationFrame(drawParticles);
  }

  if (window.DeviceOrientationEvent && isMobile && !reduced) {
    window.addEventListener('deviceorientation', function (e) {
      if (e.gamma == null) return;
      pointer.tx = width * (.5 + Math.max(-1, Math.min(1, e.gamma / 32)) * .42);
      pointer.ty = height * (.5 + Math.max(-1, Math.min(1, (e.beta - 45) / 34)) * .42);
      kick();
    });
  }
}



/* ============================================================
   SITE-WIDE 3D — depth, tilt, spotlight and magnetic motion
   ============================================================ */
function initSite3D(){
  if (prefersReduced) return;

  var cards = $$('.skill-card, .exp-card, .serv-card, .process-grid li, .contact-form, .featured, .proj-card, .timeline li');
  cards.forEach(function(el){
    if (el.classList.contains('mz-3d')) return;
    el.classList.add('mz-3d');
    var move=function(e){
      if (!isFinePointer) return;
      var r=el.getBoundingClientRect();
      var x=(e.clientX-r.left)/Math.max(1,r.width)-.5;
      var y=(e.clientY-r.top)/Math.max(1,r.height)-.5;
      var ry=Math.max(-7,Math.min(7,x*10));
      var rx=Math.max(-6,Math.min(6,-y*8));
      var px=((x+.5)*100).toFixed(1)+'%';
      var py=((y+.5)*100).toFixed(1)+'%';
      var lift=el.classList.contains('proj-card')? -2 : -1.5;
      el.style.transform='perspective(1200px) rotateX('+rx.toFixed(2)+'deg) rotateY('+ry.toFixed(2)+'deg) translate3d(0,'+lift+'px,0)';
      el.style.setProperty('--mz-glow-x',px);
      el.style.setProperty('--mz-glow-y',py);
      el.classList.add('is-3d-active');
    };
    var leave=function(){ el.style.transform=''; el.style.setProperty('--mz-glow-x','50%'); el.style.setProperty('--mz-glow-y','50%'); el.classList.remove('is-3d-active'); };
    el.addEventListener('pointermove',move,{passive:true});
    el.addEventListener('pointerleave',leave,{passive:true});
  });

  $$('#tilt-card').forEach(function(el){
    if (el.classList.contains('mz-3d-enhanced')) return;
    el.classList.add('mz-3d','mz-3d-enhanced');
  });

  $$('#stack-wall button').forEach(function(el){
    if (el.classList.contains('mz-3d-chip')) return;
    el.classList.add('mz-3d-chip');
    el.addEventListener('pointermove',function(e){
      if(!isFinePointer) return;
      var r=el.getBoundingClientRect();
      var x=(e.clientX-r.left)/Math.max(1,r.width)-.5;
      var y=(e.clientY-r.top)/Math.max(1,r.height)-.5;
      el.style.transform='perspective(700px) rotateX('+(-y*10).toFixed(2)+'deg) rotateY('+(x*12).toFixed(2)+'deg) translateZ(8px)';
    },{passive:true});
    el.addEventListener('pointerleave',function(){el.style.transform='';},{passive:true});
  });

  var zones=$$('.section[data-3d-zone]');
  if(zones.length){
    var ticking=false;
    var update=function(){
      if(ticking) return;
      ticking=true;
      requestAnimationFrame(function(){
        var vh=window.innerHeight||800;
        zones.forEach(function(z){
          var r=z.getBoundingClientRect();
          var center=r.top+r.height*.5;
          var p=(vh*.5-center)/Math.max(vh,r.height);
          z.style.setProperty('--zone-rotate',(p*26).toFixed(2)+'deg');
        });
        ticking=false;
      });
    };
    window.addEventListener('scroll',update,{passive:true});
    update();
  }
}
window.__mzEnhance3D=initSite3D;

/* ---------- Add-on i18n keys (FAQ + CV) ---------- */
I18N.en.navFaq = 'FAQ';
I18N.en.cvBtn = 'Download CV';
I18N.en.faqLabel = 'FAQ';
I18N.en.faqTitle = 'Questions, answered upfront.';
I18N.en.faqSub = 'Quick answers before you send a project brief.';
I18N.en.faq1q = 'What services do you offer?';
I18N.en.faq1a = 'Responsive websites, premium landing pages, business dashboards, e-commerce front-ends, website redesigns and interactive JavaScript interfaces.';
I18N.en.faq2q = 'Which technologies do you use?';
I18N.en.faq2a = 'HTML, CSS and JavaScript with DOM, LocalStorage, REST API integration and Git/GitHub — responsive-first on every project.';
I18N.en.faq3q = 'Will my website work on mobile?';
I18N.en.faq3a = 'Yes. Every layout is designed responsive by default — desktop, tablet and mobile are planned intentionally, not compressed afterwards.';
I18N.en.faq4q = 'Can you redesign my existing website?';
I18N.en.faq4a = 'Yes. I modernize outdated interfaces with cleaner hierarchy, spacing systems, readable typography and smooth interactions.';
I18N.en.faq5q = 'How do we start a project?';
I18N.en.faq5a = 'Send a brief through the contact form below — type, goals and budget range. You will get an email reply to discuss scope and next steps.';
I18N.ar.navFaq = 'الأسئلة الشائعة';
I18N.ar.cvBtn = 'تحميل السيرة الذاتية';
I18N.ar.faqLabel = 'الأسئلة الشائعة';
I18N.ar.faqTitle = 'أسئلة وأجوبة مقدمًا.';
I18N.ar.faqSub = 'إجابات سريعة قبل إرسال تفاصيل مشروعك.';
I18N.ar.faq1q = 'ما الخدمات التي تقدمها؟';
I18N.ar.faq1a = 'مواقع متجاوبة، صفحات هبوط فاخرة، لوحات تحكم للأعمال، واجهات متاجر إلكترونية، إعادة تصميم المواقع، وواجهات جافاسكربت تفاعلية.';
I18N.ar.faq2q = 'ما التقنيات التي تستخدمها؟';
I18N.ar.faq2a = 'HTML وCSS وجافاسكربت مع DOM وLocalStorage وربط REST APIs وGit/GitHub — والتجاوب أولوية في كل مشروع.';
I18N.ar.faq3q = 'هل سيعمل موقعي على الجوال؟';
I18N.ar.faq3a = 'نعم. كل تخطيط مصمم متجاوبًا افتراضيًا — سطح المكتب والتابلت والجوال مخططة عمدًا وليست مضغوطة لاحقًا.';
I18N.ar.faq4q = 'هل يمكنك إعادة تصميم موقعي الحالي؟';
I18N.ar.faq4a = 'نعم. أحدّث الواجهات القديمة بتسلسل أوضح وأنظمة تباعد وخطوط مقروءة وتفاعلات سلسة.';
I18N.ar.faq5q = 'كيف نبدأ المشروع؟';
I18N.ar.faq5a = 'أرسل التفاصيل عبر نموذج التواصل بالأسفل — النوع والأهداف والميزانية. ستصلك رسالة بريد لمناقشة النطاق والخطوات التالية.';
I18N.en.formSend = 'Send message';
I18N.en.formHint = 'Your message is sent directly — no mail app needed. I reply by email.';
I18N.ar.formSend = 'إرسال الرسالة';
I18N.ar.formHint = 'تُرسل رسالتك مباشرة — بدون تطبيق بريد. أرد عليك بالبريد الإلكتروني.';

/* ---------- Boot ---------- */
applyLang(lang);
renderProjects();
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(initHero3D, 50);
} else {
  window.addEventListener('DOMContentLoaded', function () { setTimeout(initHero3D, 50); });
}

initSite3D();

})();

/* ============================================================
   ULTRA 3D ENGINE — tilt + magnetic + scroll-depth everywhere
   (additive: never touches existing logic)
   ============================================================ */
(function () {
'use strict';
var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var fine = window.matchMedia('(pointer: fine)').matches;
if (reduced) return;

/* 1) Universal 3D tilt for all cards */
function addTilt(selector, max) {
  var els = Array.prototype.slice.call(document.querySelectorAll(selector));
  els.forEach(function (el) {
    if (el.__ultra3d) return; el.__ultra3d = true;
    el.classList.add('js-tilt');
    if (!fine) return;
    el.addEventListener('mousemove', function (e) {
      var r = el.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = 'perspective(950px) rotateY(' + (x * max).toFixed(2) + 'deg) rotateX(' + (-y * max).toFixed(2) + 'deg) translateZ(8px)';
    });
    el.addEventListener('mouseleave', function () { el.style.transform = ''; });
  });
}
function applyAllTilt() {
  addTilt('.skill-card', 9); addTilt('.exp-card', 8); addTilt('.serv-card', 8);
  addTilt('.proj-card', 7); addTilt('.process-grid li', 7); addTilt('.case-stat', 8);
  addTilt('.about-points li', 5); addTilt('.featured', 3); addTilt('.faq-item', 5);
}
applyAllTilt();
// re-apply only when the dynamic projects grid changes (debounced, auto-stops)
(function () {
  var grid = document.getElementById('projects-grid');
  if (!grid || typeof MutationObserver === 'undefined') return;
  var t = null;
  var _mo = new MutationObserver(function () {
    clearTimeout(t);
    t = setTimeout(function () { applyAllTilt(); refreshScrollCards(); }, 350);
  });
  _mo.observe(grid, { childList: true });
  setTimeout(function () { _mo.disconnect(); }, 8000);
})();

/* 2) Magnetic buttons */
if (fine) {
  Array.prototype.forEach.call(document.querySelectorAll('.btn'), function (b) {
    b.addEventListener('mousemove', function (e) {
      var r = b.getBoundingClientRect();
      var x = (e.clientX - r.left - r.width / 2) / r.width;
      var y = (e.clientY - r.top - r.height / 2) / r.height;
      b.style.transform = 'translate(' + (x * 7).toFixed(1) + 'px,' + (y * 5).toFixed(1) + 'px) scale(1.02)';
    });
    b.addEventListener('mouseleave', function () { b.style.transform = ''; });
  });
}

/* 3) Scroll depth: sections lean in 3D + hero parallax (cached lists, zero per-frame queries) */
var ticking = false;
var scrollCards = [];
var fsEl = null;
function refreshScrollCards() {
  scrollCards = Array.prototype.slice.call(document.querySelectorAll('.skill-card,.exp-card,.proj-card,.serv-card'));
  if (!fsEl) fsEl = document.querySelector('.float-shapes');
}
refreshScrollCards();
window.addEventListener('resize', refreshScrollCards);
function onScroll3D() {
  if (ticking || document.hidden) return; ticking = true;
  requestAnimationFrame(function () {
    var vh = window.innerHeight;
    for (var i = 0; i < scrollCards.length; i++) {
      var el = scrollCards[i];
      if (!el.isConnected) continue;
      var r = el.getBoundingClientRect();
      if (r.top > vh || r.bottom < 0) continue;
      var center = r.top + r.height * 0.5;
      var p = (vh * 0.5 - center) / vh; // -0.5..0.5
      if (!el.matches(':hover')) el.style.translate = '0 ' + (-p * 14).toFixed(1) + 'px';
    }
    // float-shapes drift with scroll
    if (fsEl) fsEl.style.transform = 'translateY(' + (window.scrollY * 0.06).toFixed(1) + 'px)';
    ticking = false;
  });
}
window.addEventListener('scroll', onScroll3D, { passive: true });
onScroll3D();

/* 4) Custom cursor glow boost on 3D cards */
document.addEventListener('mouseover', function (e) {
  var ring = document.getElementById('cursor-ring');
  if (!ring) return;
  if (e.target.closest && e.target.closest('.skill-card,.exp-card,.proj-card,.serv-card,.stack-wall button,.hero-photo')) ring.classList.add('hovering');
});
})();

/* HERO PHOTO tilt — photo leans toward cursor, background stays visible */
(function () {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(pointer: fine)').matches) return;
  var hero = document.getElementById('hero-photo');
  if (!hero) return;
  var frame = hero.querySelector('.hp-frame');
  hero.addEventListener('mousemove', function (e) {
    var r = hero.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width - 0.5;
    var y = (e.clientY - r.top) / r.height - 0.5;
    if (frame) frame.style.transform = 'rotateY(' + (x * 16).toFixed(2) + 'deg) rotateX(' + (-y * 16).toFixed(2) + 'deg)';
    hero.style.setProperty('--mx', x.toFixed(3));
  });
  hero.addEventListener('mouseleave', function () { if (frame) frame.style.transform = ''; });
})();

/* ADD-ONS engine — FAQ accordion + floating mail copy + PWA register */
(function () {
'use strict';
var EMAIL = 'mhzomlot@gmail.com';
function toastLocal(msg) {
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t.__h);
  t.__h = setTimeout(function () { t.classList.remove('show'); }, 2400);
}
/* FAQ: single-open accordion */
Array.prototype.forEach.call(document.querySelectorAll('.faq-item'), function (item) {
  var btn = item.querySelector('.faq-q'), panel = item.querySelector('.faq-a');
  if (!btn || !panel) return;
  btn.addEventListener('click', function () {
    var open = item.classList.contains('open');
    Array.prototype.forEach.call(document.querySelectorAll('.faq-item.open'), function (o) {
      o.classList.remove('open');
      o.querySelector('.faq-a').style.maxHeight = '';
      o.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });
    if (!open) {
      item.classList.add('open');
      panel.style.maxHeight = panel.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});
/* floating mail: copy email */
var mc = document.getElementById('mail-copy');
if (mc) mc.addEventListener('click', function () {
  var lang = document.documentElement.getAttribute('lang') === 'ar' ? 'ar' : 'en';
  function done() { toastLocal(lang === 'ar' ? 'تم نسخ البريد ✓' : 'Email copied ✓'); }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(EMAIL).then(done, function () { fallback(); });
  } else fallback();
  function fallback() {
    var ta = document.createElement('textarea');
    ta.value = EMAIL; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { toastLocal(EMAIL); }
    document.body.removeChild(ta);
  }
});
/* PWA service worker (http(s) only — ignored on file://) */
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js').catch(function () {});
  });
}
})();
