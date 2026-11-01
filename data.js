/* ==========================================================
   Your words and pictures. Edit this file; nothing else needs to change.
   ========================================================== */
window.ME = {
  name: 'Anwar Albeity',
  location: 'Kenya',
  roles: 'Designer, developer and auditor.',
  tagline: 'Numbers, systems and things that move', // under your name, top left
  email: 'anwar@kampo.co.ke',
  whatsapp: '254718235532',                        // international format, digits only
  socials: [
    // { label: 'LinkedIn', url: 'https://linkedin.com/in/yourname' },
    // { label: 'Instagram', url: 'https://instagram.com/yourname' },
  ],
  cv: 'anwar-albeity-cv.pdf',                  // the CV the Info and Record pages offer for download
  studio: { name: 'Kampo Co.', url: 'https://kampo.co.ke' },

  // the flipbook of you: a burst of photos played like footage inside the two bubbles
  portrait: { frames: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => `me-${n}.webp`), fps: 10 },

  // What each bubble on the front page plays. No picture appears in two bubbles at once.
  islands: {
    info: [1, 2, 3, 4, 5, 6].map((n) => `me-${n}.webp`),
    contact: [7, 8, 9, 10, 11, 12].map((n) => `me-${n}.webp`),
    work: ['rb-perfumes-hero.webp', 'erp-hero.webp', 'crm-hero.webp', 'poster-hero.webp'],
    // the small project bubbles (wide screens), in the same order as `work` below
    projects: [
      ['rb-perfumes-cover.webp', 'rb-perfumes-1.webp', 'rb-perfumes-2.webp'],
      ['erp-cover.webp'],
      ['crm-cover.webp'],
      ['poster-cover.webp', 'poster-1.webp', 'poster-2.webp'],
    ],
  },

  lede: 'Designer and developer by craft, auditor by profession. Anwar builds brands and the systems behind them, and checks the numbers twice.',
  story: [
    'Anwar grew up in Kenya between two ways of seeing the world: the order of <em>numbers</em> and the freedom to <em>make things.</em>',
    'Accounting taught him to look closer. Computer science taught him to think in <em>systems.</em> Design taught him that useful things can be <em>beautiful.</em>',
    'By day he works in audit. After that he runs <em>Kampo Co.,</em> building brands, websites and systems for people with something to put into the world.',
  ],
  // the short drawn films at the foot of the Info and Contact pages, like the ones on each project
  films: {
    info: { src: 'info.mp4', poster: 'info.jpg', length: '0:11', title: 'Anwar', cap: 'Numbers, systems and things that move, in a few drawings.' },
    contact: { src: 'contact.mp4', poster: 'contact.jpg', length: '0:11', title: 'Say hello', cap: 'Hello, Jambo, Salaam. Write, or send a note.' },
  },
  pullquote: 'The work changes but the instinct stays the same.',
  signoff: 'Kenya. Still in the making',

  // Selected work. While a project is being read, the bubbles play its pictures instead of you.
  // Each project also gets its own page (#p-<slug>). Its chapters each show one picture in the bubble:
  // frames[0] at the top, frames[1] for "What it does", frames[2] for "Before and after", frames[3] at the end.
  // film: the short drawn film at the bottom of the project page (made with render.js in the source folder).
  // Draft wording: check every line against what really happened before you publish.
  work: [
    { slug: 'rb-perfumes', film: { src: 'rb-perfumes.mp4', poster: 'rb-perfumes.jpg', length: '0:11' }, title: 'RB Perfumes', year: 2026, kind: 'Brand website & e-commerce', role: 'Design, development', line: 'Fragrance, without the noise.',
      client: 'RB Perfumes, Kenya', status: 'Live', scope: ['Brand website', 'Product catalogue', 'WhatsApp ordering'],
      frames: ['rb-perfumes-cover.webp', 'rb-perfumes-1.webp', 'rb-perfumes-2.webp', 'rb-perfumes-hero.webp'], link: 'https://rayanbayusuf.pages.dev/',
      about: 'RB Perfumes sells fragrances in Kenya. The brand needed a home online that feels as considered as the bottles, and a way to buy that takes no account and no checkout.',
      does: [
        ['Shows the range', 'Every fragrance in one calm catalogue, with the product always first and the words kept short.'],
        ['Takes orders on WhatsApp', 'Tap order and a WhatsApp message naming the product opens, ready to send to the shop.'],
        ['Carries the brand', 'Quiet type and a lot of white space, so the site feels like the shop it stands for.'],
        ['Works on any phone', 'Built light so it loads quickly on mobile data, where most customers find it.'],
      ],
      before: 'Customers found the shop through word of mouth and Instagram, then asked about prices and stock one message at a time.',
      after: 'One link to share. Customers browse the whole range and order in a single message.' },
    { slug: 'contingent-haulage', film: { src: 'contingent-haulage.mp4', poster: 'contingent-haulage.jpg', length: '0:11' }, title: 'Contingent Haulage', year: '2025–26', kind: 'Tailored ERP for logistics', role: 'Product design, development', line: 'Every truck, every invoice, one screen.',
      client: 'Contingent Haulage Africa Limited', status: 'Internal system', scope: ['Shipments', 'Dispatch', 'Fleet & drivers', 'Invoicing', 'Reporting'],
      frames: ['erp-cover.webp', 'erp-1.webp', 'erp-2.webp', 'erp-hero.webp'],
      about: 'A regional haulage business moving containers by road. Anwar kept its accounts by day and saw where the paper slowed everyone down, so he designed and built the company its own ERP.',
      does: [
        ['Shipments', 'Every container booked, tracked and closed in one list.'],
        ['Dispatch board', 'Drag a load from Booked to Delivered and everyone sees it.'],
        ['Fleet and drivers', 'Trucks, drivers, documents and service dates in one place.'],
        ['Invoicing', 'Invoices raised from the shipment itself, not retyped.'],
        ['Reporting', 'Daily and monthly numbers without building a spreadsheet.'],
      ],
      before: 'Shipments lived in Excel sheets and WhatsApp groups. Invoices were typed up by hand at the end of each trip, and finding out where a truck was meant a phone call.',
      after: 'One screen for every truck and every invoice. The office sees what the road sees, and month-end reports come straight out of the system.' },
    { slug: 'ledger-crm', film: { src: 'ledger-crm.mp4', poster: 'ledger-crm.jpg', length: '0:11' }, title: 'Ledger CRM', year: 2025, kind: 'CRM system', role: 'Product design, development', line: 'No lead goes cold.',
      client: 'Private client (under NDA)', status: 'Delivered', scope: ['Pipeline', 'Contacts', 'Follow-ups', 'Lead capture'],
      frames: ['crm-cover.webp', 'crm-1.webp', 'crm-2.webp', 'crm-hero.webp'],
      about: 'A sales team whose leads came in from everywhere and lived nowhere. Ledger is a focused CRM that catches every lead in one place and nudges the team when it is time to follow up.',
      does: [
        ['Lead capture', 'Website and WhatsApp enquiries land in the CRM automatically.'],
        ['Pipeline', 'Every deal on a board, from first hello to signed.'],
        ['Contacts', 'One record per client with every call, note and file.'],
        ['Follow-ups', 'Reminders, so nobody is left waiting for a reply.'],
      ],
      before: 'Leads arrived by phone, WhatsApp and email and were written down wherever was closest. Follow-ups depended on memory, so warm leads went cold.',
      after: 'Every lead in one pipeline and every follow-up on time. The team knows exactly who to call today.' },
    { slug: 'make-it-loud', film: { src: 'make-it-loud.mp4', poster: 'make-it-loud.jpg', length: '0:10' }, title: 'Make it Loud', year: 2025, kind: 'Poster series', role: 'Art direction, graphic design', line: 'One colour. No photos. Impossible to walk past.',
      client: 'Kampo Co. (self-initiated)', status: 'Studio identity series', scope: ['Art direction', 'Typography', 'Print'],
      frames: ['poster-cover.webp', 'poster-1.webp', 'poster-2.webp', 'poster-hero.webp'],
      about: 'A poster series that sets out what the studio believes, using one colour, big type and no photographs. Each poster has to work from across the street.',
      does: [
        ['Says the agenda', 'Most brands whisper. We would rather be heard.'],
        ['Sets the rules', 'One colour, one typeface family, no photos: limits that make every poster unmistakably the same voice.'],
        ['Works in print and on screen', 'Built for paper first, then cut down for social posts and the website.'],
      ],
      before: 'A new studio with work to show and no voice of its own yet.',
      after: 'A set of posters that reads as one voice, and a visual language the studio now uses everywhere.' },
  ],

  crafts: [
    ['Designer', 'Art direction and brand identity, UI, UX and interaction design, motion design, editorial typography and print'],
    ['Developer', 'Front-end (HTML, CSS, JavaScript), ERP and CRM system design, Oracle Cloud Infrastructure, Cisco networking and C++'],
    ['Auditor', 'Audit and assurance, internal controls testing, financial statements and reporting, reconciliations and the general ledger'],
  ],
  experience: [
    ['2025–now', 'Founder, creative director and developer, Kampo Co.'],
    ['Aug 2026–now', 'Associate auditor, Innovus'],
    ['Oct 2025–May 2026', 'Accounts assistant, Contingent Haulage Africa Ltd'],
  ],
  education: [
    ['2023–2024', 'Diploma in Computer Science, Riara University'],
    ['2022–now', 'CPA, Intermediate level (Section IV) completed, KASNEB'],
  ],
  certificates: ['Oracle Cloud Infrastructure', 'Cisco Networking', 'C++ Programming'],
};
