require('dotenv').config();
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const DATA = path.join(ROOT, 'data.json');

function readData(){ try { return JSON.parse(fs.readFileSync(DATA,'utf8')); } catch { return {ads:[]}; } }
function writeData(data){ fs.writeFileSync(DATA, JSON.stringify(data,null,2)); }
function send(res,status,body,type='application/json'){ res.writeHead(status,{'Content-Type':type,'Cache-Control':'no-store'}); res.end(type.includes('json')?JSON.stringify(body):body); }
function body(req){ return new Promise((resolve,reject)=>{ let d=''; req.on('data',c=>{d+=c; if(d.length>8e6) reject(new Error('too large'));}); req.on('end',()=>{ try{resolve(d?JSON.parse(d):{});}catch(e){reject(e);} }); }); }
function safeFile(p){ const full=path.normalize(path.join(ROOT,p)); return full.startsWith(ROOT)?full:null; }

const jokes = [
  ['Why did the scarecrow win an award?','Because he was outstanding in his field.'],
  ['What do you call cheese that is not yours?','Nacho cheese.'],
  ['Why don’t eggs tell jokes?','They might crack each other up.'],
  ['What did one wall say to the other?','I’ll meet you at the corner.'],
  ['Why was the math book sad?','It had too many problems.'],
  ['What do you call a bear with no teeth?','A gummy bear.'],
  ['Why did the golfer bring two pairs of pants?','In case he got a hole in one.']
];
const verses = [
  [
    'Galatians 5:13',
    'Serve one another humbly in love.',
    'https://www.pastorrick.com/'
  ]
];
const facts = [
  'Octopuses have three hearts.',
  'Bananas are berries, botanically speaking, but strawberries are not.',
  'A group of flamingos is called a flamboyance.',
  'Honey can remain edible for an extremely long time when sealed properly.',
  'The Eiffel Tower can grow slightly taller in hot weather as the metal expands.',
  'Sea otters often hold hands while resting so they do not drift apart.',
  'A day on Venus is longer than a year on Venus.'
];
const questions = [
  'If you could instantly master one hobby, what would it be?',
  'What is the best meal you have ever had on a road trip?',
  'Which song can always improve your mood?',
  'If you could revisit one age for a day, which would you choose?',
  'What is a small thing that made you smile this week?',
  'Would you rather have a cabin by a lake or a condo by the ocean?',
  'What is one local place you think everyone should try once?'
];
const wouldYouRather = [
  {
    q: 'Would you rather give up pizza for a year or desserts for a year?',
    a: 'Pizza',
    b: 'Desserts'
  },
  {
    q: 'Would you rather always be 10 minutes early or 20 minutes late?',
    a: '10 minutes early',
    b: '20 minutes late'
  },
  {
    q: 'Would you rather have unlimited tacos or unlimited ice cream?',
    a: 'Tacos',
    b: 'Ice cream'
  },
  {
    q: 'Would you rather be able to pause time or rewind it?',
    a: 'Pause time',
    b: 'Rewind time'
  },
  {
    q: 'Would you rather eat breakfast for dinner or dinner for breakfast?',
    a: 'Breakfast for dinner',
    b: 'Dinner for breakfast'
  },
  {
    q: 'Would you rather explore space or the deepest part of the ocean?',
    a: 'Space',
    b: 'Deep ocean'
  },
  {
    q: 'Would you rather never wait in line again or never sit in traffic again?',
    a: 'No more lines',
    b: 'No more traffic'
  }
];
const riddles = [
  {
    q: 'What has keys but cannot open locks?',
    a: 'A piano.'
  },
  {
    q: 'What gets wetter the more it dries?',
    a: 'A towel.'
  },
  {
    q: 'What has a face and two hands but no arms or legs?',
    a: 'A clock.'
  },
  {
    q: 'What has many teeth but cannot bite?',
    a: 'A comb.'
  },
  {
    q: 'What can travel around the world while staying in one corner?',
    a: 'A stamp.'
  },
  {
    q: 'What has one eye but cannot see?',
    a: 'A needle.'
  },
  {
    q: 'What goes up but never comes back down?',
    a: 'Your age.'
  }
];
const dailyTips = [
  'When meeting someone new, use their name once during the conversation. You are much more likely to remember it later.',
  'Take a photo of where you parked before walking away in an unfamiliar parking lot.',
  'If you need to remember to bring something with you tomorrow, put it directly in front of the door you will leave through.',
  'When reheating leftovers in the microwave, arrange the food in a ring around the edge of the plate for more even heating.',
  'Before buying something online, leave it in your cart for a day. You may discover you did not really want it.',
  'If you cannot find your phone at home, ask your smart speaker or another device to call it.',
  'Take a photo of your luggage before a flight. It can make describing a lost bag much easier.',
  'If a zipper keeps sliding down, loop a small key ring through the zipper pull and around the button.',
  'When someone gives you directions or instructions, repeat the important part back to them. It catches misunderstandings immediately.',
  'Store important emergency contacts in your phone under both their name and relationship, such as "Jane - Sister."',
  'If you are struggling to start a task, commit to doing it for just five minutes. Starting is often the hardest part.',
  'Before leaving a hotel room, check the outlets. Phone chargers are among the easiest things to leave behind.',
  'Keep a permanent marker near your freezer and write the date on leftovers before freezing them.',
  'When you think of something you need to do later, either do it immediately if it takes less than two minutes or write it down.',
  'If you lend something to someone, take a quick photo of them holding it. You will remember exactly who has it.',
  'Put your keys in the same place every time you come home. Small routines eliminate a surprising amount of searching.',
  'When taking a picture of important paperwork, make sure all four corners are visible before putting the original away.',
  'If you are trying to cool a drink quickly, wrap it in a wet paper towel before putting it in the freezer for a few minutes.',
  'Before a road trip, download your route or map area for offline use in case you lose cell service.',
  'If you are unsure whether you locked the door, say "I locked the door" out loud when you do it. The unusual action makes the memory easier to recall.'
];
const quizzes = [
  {q:'Which planet is known as the Red Planet?', a:'Mars', options:['Venus','Mars','Jupiter','Mercury']},
  {q:'How many sides does a dodecagon have?', a:'12', options:['8','10','12','14']},
  {q:'Which animal is the largest mammal on Earth?', a:'Blue whale', options:['Elephant','Blue whale','Giraffe','Hippo']},
  {q:'What is the capital of Canada?', a:'Ottawa', options:['Toronto','Vancouver','Ottawa','Montreal']},
  {q:'Which instrument has 88 keys on a standard version?', a:'Piano', options:['Organ','Piano','Accordion','Harpsichord']},
  {q:'What gas do plants absorb from the atmosphere?', a:'Carbon dioxide', options:['Oxygen','Nitrogen','Carbon dioxide','Hydrogen']},
  {q:'Which ocean is the largest?', a:'Pacific Ocean', options:['Atlantic Ocean','Indian Ocean','Arctic Ocean','Pacific Ocean']}
];
const curiosityWeeks = [
  {
    theme: 'Everyday Science',
    days: [
      {
        text: 'Popcorn pops because a tiny amount of water is trapped inside each kernel. When heated, the water turns to steam until the pressure finally bursts the shell.',
        teaser: 'Tomorrow: Why does cutting an onion make you cry?'
      },
      {
        text: 'Cutting an onion breaks open its cells and releases chemicals into the air. When they reach your eyes, they create a mild irritant that causes your eyes to make tears.',
        teaser: 'Tomorrow: Why does ice float instead of sink?'
      },
      {
        text: 'Most substances become denser when they freeze, but water is unusual. Frozen water expands into a structure that is less dense than liquid water — which is why ice floats.',
        teaser: 'Tomorrow: Why can a smell instantly bring back an old memory?'
      },
      {
        text: 'Your sense of smell has unusually direct connections to parts of the brain involved with memory and emotion. That is why one familiar scent can suddenly transport you years into the past.',
        teaser: 'Tomorrow: Why do your fingers wrinkle in water?'
      },
      {
        text: 'Wrinkled fingers are not simply skin soaking up water. Your nervous system actually causes blood vessels in your fingertips to constrict, creating wrinkles that may help you grip wet objects.',
        teaser: 'Tomorrow: Why do we get brain freeze?'
      },
      {
        text: 'Brain freeze happens when something very cold quickly cools the roof of your mouth. Nearby blood vessels rapidly change size, triggering nerves that your brain interprets as pain in your forehead.',
        teaser: 'Tomorrow: Why is the sky blue?'
      },
      {
        text: 'Sunlight contains many colors, but Earth’s atmosphere scatters shorter blue wavelengths more strongly than most other visible colors. That scattered blue light reaches our eyes from all across the sky.',
        teaser: 'Tomorrow: A completely new curiosity begins!'
      }
    ]
  },

  {
    theme: 'Hidden History',
    days: [
      {
        text: 'Bubble wrap was originally invented in 1957 as textured wallpaper. The decorating idea failed, but the inventors later discovered it made excellent protective packaging.',
        teaser: 'Tomorrow: The surprising original purpose of Play-Doh.'
      },
      {
        text: 'Before it became a children’s toy, the material that became Play-Doh was sold as a cleaner for removing soot from wallpaper.',
        teaser: 'Tomorrow: How an accidental discovery changed breakfast.'
      },
      {
        text: 'Corn flakes grew from experiments by the Kellogg brothers while searching for simple foods for patients at a sanitarium in Michigan.',
        teaser: 'Tomorrow: Why pencils are often painted yellow.'
      },
      {
        text: 'Yellow pencils became popular in the late 1800s when manufacturers used the color to suggest that their pencils contained high-quality graphite associated with China.',
        teaser: 'Tomorrow: The invention inspired by burrs stuck to clothing.'
      },
      {
        text: 'Velcro was inspired when Swiss engineer George de Mestral examined burrs that kept sticking to his clothes and his dog’s fur and noticed their tiny natural hooks.',
        teaser: 'Tomorrow: How a melted candy bar helped inspire an invention.'
      },
      {
        text: 'Engineer Percy Spencer noticed a candy bar melting in his pocket while working near microwave-producing equipment. His experiments helped lead to the microwave oven.',
        teaser: 'Tomorrow: The accidental invention found inside a laboratory.'
      },
      {
        text: 'Many everyday inventions began as accidents, failed ideas, or solutions to completely different problems — a reminder that a mistake can sometimes become the beginning of something useful.',
        teaser: 'Tomorrow: A completely new curiosity begins!'
      }
    ]
  }
];
const nationalDays = {
  '2026-08-23': [
    'Find Your Inner Nerd Day',
    'National Cuban Sandwich Day',
    'National Sponge Cake Day',
    'National Ride The Wind Day'
  ],

  '2026-08-24': [
    'National Waffle Day',
    'National Peach Pie Day',
    'National Maryland Day',
    'National Selfirst Day'
  ],

  '2026-08-25': [
    'National Banana Split Day',
    'National Kiss And Make Up Day',
    'National Park Service Founders Day',
    'National Secondhand Wardrobe Day',
    'National Whiskey Sour Day'
  ],

  '2026-08-26': [
    'National Dog Day',
    'National Women’s Equality Day',
    'National Webmistress Day',
    'National Got Checked Day',
    'National Cherry Popsicle Day'
  ],

  '2026-08-27': [
    'National Just Because Day',
    'National Peach Day',
    'National Pots De Creme Day'
  ],

  '2026-08-28': [
    'National Thoughtful Day',
    'Rainbow Bridge Remembrance Day',
    'National Red Wine Day',
    'National Power Rangers Day',
    'National Bow Tie Day',
    'National Cherry Turnover Day'
  ],

  '2026-08-29': [
    'National Lemon Juice Day',
    'National Chop Suey Day',
    'According To Hoyle Day',
    'National Sport Sampling Day'
  ],

  '2026-08-30': [
    'National Grief Awareness Day',
    'National Beach Day',
    'National Toasted Marshmallow Day'
  ]
};

const nationalFallback = [
  'Something worth celebrating today!'
];
async function getNationalDays(date) {
  return nationalDays[date] || nationalFallback;
}

   
function idx(date,salt,len){ const h=crypto.createHash('sha256').update(date+salt).digest(); return h.readUInt32BE(0)%len; }
async function getDailyDevotional(date, fallbackVerse) {
  const d = new Date(date + 'T12:00:00');
  const day = d.getDay();
  // Monday-Friday: Pastor Rick
  if (day >= 1 && day <= 5) {
    try {
      const listingUrl = 'https://www.pastorrick.com/current-teaching/devotionals';

const response = await fetch(listingUrl);


const html = await response.text();

      // Find the first current devotional URL on the page.
      const linkMatch = html.match(/href="([^"]*\/current-teaching\/devotional\/[^"]+)"/i);

      if (linkMatch) {
        const url = new URL(linkMatch[1], 'https://www.pastorrick.com').href;
        const page = await fetch(url);
        const pageHtml = await page.text();

        // Look for a quoted Bible verse followed by a reference.
        const plainText = pageHtml
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&quot;/g, '"')
  .replace(/&#34;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&amp;/g, '&')
  .replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const verseMatch = plainText.match(
  /[“"]([^”"]+)[”"]\s*([1-3]?\s?[A-Za-z]+\s+\d+:\d+(?:-\d+)?)\s*(?:\(([A-Z]+)\))?/i
);

        if (verseMatch) {
          return {
            text: verseMatch[1].trim(),
            reference: verseMatch[2].trim(),
            url
          };
        }
      }
    } catch (e) {
  console.log('Daily Hope fetch failed:', e.message);
}
  }

  // Saturday-Sunday: Our Daily Bread
if (day === 0 || day === 6) {
  try {
    const listingUrl = 'https://www.odbm.org/en-GB/devotional';
    const response = await fetch(listingUrl);
    const html = await response.text();
const d = new Date(date + 'T12:00:00');
const dayNumber = String(d.getDate()).padStart(2, '0');
const monthName = d.toLocaleString('en-GB', { month: 'short' });
const year = d.getFullYear();

const dateLabel = `${dayNumber} ${monthName} ${year}`;
const datePos = html.indexOf(dateLabel);

if (datePos >= 0) {
  const section = html.slice(datePos, datePos + 4000);

  const descriptionMatch = section.match(
    /"description":"((?:\\.|[^"\\])*)"/
  );

  const urlMatch = section.match(
    /"url":"([^"]*\/devotional\/[^"]+)"/
  );

  if (descriptionMatch && urlMatch) {
    let description = descriptionMatch[1]
      .replace(/\\u0027/g, "'")
      .replace(/\\u0026/g, '&')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\')
      .trim();

    const verseParts = description.match(
      /^(.*?)\s+([1-3]?\s?[A-Za-z]+(?:\s+[A-Za-z]+)*\s+\d+:\d+(?:-\d+)?)$/
    );

    if (verseParts) {
      return {
        text: verseParts[1].trim(),
        reference: verseParts[2].trim(),
        url: new URL(urlMatch[1], 'https://www.odbm.org').href
      };
    }
  }
}
  } catch (e) {
    console.log('Our Daily Bread fetch failed:', e.message);
  }
}

  return {
    reference: fallbackVerse[0],
    text: fallbackVerse[1],
    url: fallbackVerse[2]
  };
}
async function getFamousBirthdays(date) {
  try {
    const d = new Date(date + 'T12:00:00');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    const url =
      `https://en.wikipedia.org/api/rest_v1/feed/onthisday/births/${month}/${day}`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'DailyCrumbs/1.0 (getdailycrumbs.com)'
      }
    });

    if (!response.ok) return [];

    const data = await response.json();
    const currentYear = new Date().getFullYear();

    const preferredWords = [
      'actor', 'actress', 'singer', 'musician', 'rapper', 'comedian',
      'athlete', 'football', 'basketball', 'baseball', 'hockey',
      'golfer', 'tennis', 'writer', 'author', 'director', 'producer',
      'artist', 'scientist', 'inventor', 'astronaut', 'television',
      'radio', 'model', 'chef', 'dancer'
    ];

    const people = (data.births || [])
      .filter(person => {
        const age = currentYear - person.year;
        const text = (person.text || '').toLowerCase();

        return (
          person.year >= 1900 &&
          age >= 18 &&
          person.text &&
          !text.includes('politician') &&
          !text.includes('royal')
        );
      })
      .map(person => {
        const text = (person.text || '').toLowerCase();
        const page = person.pages?.[0];

        let score = 0;

        if (page?.extract) score += Math.min(page.extract.length / 20, 15);

        preferredWords.forEach(word => {
          if (text.includes(word)) score += 3;
        });

        if (person.year >= 1940 && person.year <= 1995) score += 4;
        if (person.year >= 1960 && person.year <= 1990) score += 3;

        return {
          name: page?.titles?.normalized || '',
          year: person.year,
          description: person.text,
          score
        };
      })
      .filter(person => person.name)
      .sort((a, b) => b.score - a.score);

    const strong = people.filter(person => person.score >= 7);

    const chosen =
      strong.length >= 3
        ? strong.slice(0, Math.min(5, strong.length))
        : people.slice(0, 4);

    return chosen.map(({ name, year, description }) => ({
      name,
      year,
      description
    }));

  } catch (e) {
    console.log('Wikipedia birthdays failed:', e.message);
    return [];
  }
}
async function getUSHistory(date) {
  try {
    const d = new Date(date + 'T12:00:00');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    const url =
      `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'DailyCrumbs/1.0 (getdailycrumbs.com)'
      }
    });

    if (!response.ok) return null;

    const data = await response.json();

    const usTerms = [
      'United States',
      'American',
      'U.S.',
      'US ',
      'Washington, D.C.',
      'President',
      'Congress',
      'Supreme Court',
      'New York',
      'California',
      'Texas',
      'Florida',
      'Minnesota'
    ];

    const events = (data.events || [])
      .filter(event => {
        const text = event.text || '';
        return usTerms.some(term =>
          text.toLowerCase().includes(term.toLowerCase())
        );
      })
      .map(event => ({
        year: event.year,
        text: event.text
      }));

    return events.length ? events[0] : null;

  } catch (e) {
    console.log('US history fetch failed:', e.message);
    return null;
  }
}
async function daily(date){
  const joke = jokes[idx(date,'j',jokes.length)];
  const verse = verses[idx(date,'v',verses.length)];
  const devotionalVerse = await getDailyDevotional(date, verse);
  const national = await getNationalDays(date);
  const famousBirthdays = await getFamousBirthdays(date);
  const usHistory = await getUSHistory(date);
  const quiz = quizzes[idx(date,'q',quizzes.length)];
  const dayNumber = Math.floor(
  new Date(date + 'T12:00:00').getTime() / 86400000
);

const wyr = wouldYouRather[
  dayNumber % wouldYouRather.length
];
  const riddle = riddles[idx(date,'r',riddles.length)];
const tip = dailyTips[idx(date,'tip',dailyTips.length)];
  const d = new Date(date + 'T12:00:00');
const jsDay = d.getDay();
const dayOfWeek = jsDay === 0 ? 6 : jsDay - 1;

const epochDay = Math.floor(d.getTime() / 86400000);
const weekNumber = Math.floor(epochDay / 7);

const curiosityWeek =
  curiosityWeeks[weekNumber % curiosityWeeks.length];

const curiosityDay = curiosityWeek.days[dayOfWeek];

const topic = {
  theme: curiosityWeek.theme,
  text: curiosityDay.text,
  teaser: curiosityDay.teaser
};
  return {
    date,
    joke: {
      setup: joke[0],
      punchline: joke[1]
    },
   verse: devotionalVerse,
fact: facts[idx(date,'f',facts.length)],
icebreaker: questions[idx(date,'i',questions.length)],
topic,
national,
famousBirthdays,
usHistory,
quiz,
wyr,
riddle,
tip
  };
}

const server=http.createServer(async(req,res)=>{
  const u=new URL(req.url,`http://${req.headers.host}`);
  console.log('REQUEST:', req.method, u.pathname);
  // Default homepage
if (u.pathname === '/') {
  res.writeHead(302, {
    Location: '/fergusfalls'
  });
  res.end();
  return;
}
  // Track restaurant-specific QR scans
if (
  req.method === 'POST' &&
  u.pathname === '/api/qr-scan'
) {
  try {
    const scan = await body(req);
    const qrSlug = (scan.qrSlug || '').trim();

    if (!qrSlug) {
      return send(res, 400, {
        success: false,
        error: 'QR location is required'
      });
    }

    const secretKey = process.env.SUPABASE_SECRET_KEY;
const supabaseUrl = process.env.SUPABASE_URL;

// Look up the participating location using the REST API.
// The new sb_secret_ key is sent only as an API key.
const locationResponse = await fetch(
  `${supabaseUrl}/rest/v1/locations` +
  `?select=id,edition_id,qr_slug,active` +
  `&qr_slug=eq.${encodeURIComponent(qrSlug)}` +
  `&active=eq.true` +
  `&limit=1`,
  {
    headers: {
      apikey: secretKey
    }
  }
);

if (!locationResponse.ok) {
  const errorText = await locationResponse.text();

  console.error(
    'QR location lookup failed:',
    locationResponse.status,
    errorText
  );

  return send(res, 500, {
    success: false,
    error: 'Could not record scan'
  });
}

const locations = await locationResponse.json();
const location = locations[0];

if (!location) {
  return send(res, 404, {
    success: false,
    error: 'Participating location not found'
  });
}

// Record the scan.
const scanResponse = await fetch(
  `${supabaseUrl}/rest/v1/qr_scans`,
  {
    method: 'POST',
    headers: {
      apikey: secretKey,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal'
    },
    body: JSON.stringify({
      location_id: location.id,
      edition_id: location.edition_id,
      qr_slug: location.qr_slug
    })
  }
);

if (!scanResponse.ok) {
  const errorText = await scanResponse.text();

  console.error(
    'QR scan insert failed:',
    scanResponse.status,
    errorText
  );

  return send(res, 500, {
    success: false,
    error: 'Could not record scan'
  });
}

    return send(res, 201, {
      success: true
    });

  } catch (error) {
    console.error('QR scan failed:', error);

    return send(res, 400, {
      success: false,
      error: 'Invalid QR scan'
    });
  }
}
  if (u.pathname === '/login') {
  const file = safeFile('login.html');

  if (!file) {
    return send(res, 404, 'Not found', 'text/plain');
  }

  res.writeHead(200, {
    'Content-Type': 'text/html'
  });

  res.end(fs.readFileSync(file));
  return;
}
  if (u.pathname === '/api/locations' && req.method === 'GET') {
  const { data, error } = await supabase
    .from('locations')
    .select(`
  id,
  business_name,
  address,
  website_url,
  contact_name,
  contact_info,
  qr_placement,
  notes,
  date_joined,
  last_checked,
  active,
  editions (
    name
  )
`)
    .order('business_name', { ascending: true });

  if (error) {
    console.error('Supabase locations load failed:', error.message);
    return send(res, 500, {
      success: false,
      error: 'Could not load participating locations'
    });
  }

  const locations = (data || []).map(location => ({
  id: location.id,
  name: location.business_name,
  edition: location.editions?.name || '',
  address: location.address || '',
  url: location.website_url || '',
  contact: location.contact_name || '',
  contactInfo: location.contact_info || '',
  qrPlacement: location.qr_placement || '',
  notes: location.notes || '',
  dateJoined: location.date_joined || '',
  lastChecked: location.last_checked || '',
  active: location.active
}));

  return send(res, 200, locations);
}
if (
  u.pathname.startsWith('/api/locations/') &&
  u.pathname.endsWith('/checked') &&
  req.method === 'POST'
) {
  const parts = u.pathname.split('/');
  const id = parts[3];

  const today = new Date().toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from('locations')
    .update({
      last_checked: today,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Supabase location check-in failed:', error.message);

    return send(res, 500, {
      success: false,
      error: 'Could not update location'
    });
  }

  return send(res, 200, {
    success: true,
    location: {
      id: data.id,
      lastChecked: data.last_checked
    }
  });
}

 if (u.pathname === '/api/locations' && req.method === 'POST') {
  try {
    const location = await body(req);

    if (!location.name || !location.name.trim()) {
      return send(res, 400, {
        success: false,
        error: 'Business name is required'
      });
    }
const qrSlug = location.name
  .trim()
  .toLowerCase()
  .replace(/['’]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');
    // Find the edition by its name or slug.
    const editionValue = (location.edition || 'Fergus Falls').trim();

    const { data: editions, error: editionError } = await supabase
      .from('editions')
      .select('id, name, slug');

    if (editionError) {
      console.error('Edition lookup failed:', editionError.message);
      return send(res, 500, {
        success: false,
        error: 'Could not find edition'
      });
    }

    const edition = (editions || []).find(e =>
      e.name.toLowerCase() === editionValue.toLowerCase() ||
      e.slug.toLowerCase() === editionValue.toLowerCase().replace(/\s+/g, '')
    );

    if (!edition) {
      return send(res, 400, {
        success: false,
        error: 'Edition not found'
      });
    }

    const { data, error } = await supabase
      .from('locations')
      .insert({
        edition_id: edition.id,
        business_name: location.name.trim(),
        qr_slug: qrSlug,
        address: location.address || null,
        website_url: location.url || null,
        contact_name: location.contact || null,
        contact_info: location.contactInfo || null,
        qr_placement: location.qrPlacement || null,
        notes: location.notes || null,
        active: location.active !== false,
        date_joined: new Date().toISOString().slice(0, 10)
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase location insert failed:', error.message);
      return send(res, 500, {
        success: false,
        error: 'Could not add participating location'
      });
    }

    return send(res, 201, {
      success: true,
      location: {
        id: data.id,
        name: data.business_name
      }
    });

  } catch (error) {
    console.error('Location creation failed:', error);

    return send(res, 400, {
      success: false,
      error: 'Invalid location information'
    });
  }
}
 if (u.pathname === '/contact') {
  const file = safeFile('contact.html');

  if (!file) {
    return send(res, 404, 'Not found', 'text/plain');
  }

  res.writeHead(200, {
    'Content-Type': 'text/html'
  });

  res.end(fs.readFileSync(file));
  return;
}
  if(u.pathname==='/api/content'){ const date=u.searchParams.get('date')||new Date().toISOString().slice(0,10); return send(res,200,await daily(date)); }
  if (u.pathname === '/api/vote' && req.method === 'GET') {
  const d = readData();
  const date = u.searchParams.get('date');

  const totals = (d.votes && d.votes[date])
    ? d.votes[date]
    : { a: 0, b: 0 };

  return send(res, 200, {
    a: totals.a,
    b: totals.b,
    total: totals.a + totals.b
  });
}
  if (u.pathname === '/api/vote' && req.method === 'POST') {
  try {
    const p = await body(req);
    const d = readData();

    if (!d.votes) d.votes = {};

    const key = p.date;
    if (!key || !['a', 'b'].includes(p.choice)) {
      return send(res, 400, { error: 'Invalid vote' });
    }

    if (!d.votes[key]) {
      d.votes[key] = { a: 0, b: 0 };
    }

    d.votes[key][p.choice] += 1;
    writeData(d);

    const totals = d.votes[key];
    const total = totals.a + totals.b;

    return send(res, 200, {
      a: totals.a,
      b: totals.b,
      total
    });
  } catch (e) {
    return send(res, 500, { error: 'Vote failed' });
  }
}
if (
  u.pathname.startsWith('/api/leads/') &&
  req.method === 'PUT'
) {
  try {
    const parts = u.pathname.split('/');
    const id = parts[3];

    const update = await body(req);

    if (!['new', 'contacted', 'closed'].includes(update.status)) {
      return send(res, 400, {
        success: false,
        error: 'Invalid lead status'
      });
    }

    const { data, error } = await supabase
      .from('leads')
      .update({
        status: update.status
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Lead status update failed:', error.message);

      return send(res, 500, {
        success: false,
        error: 'Could not update lead'
      });
    }

    return send(res, 200, {
      success: true,
      lead: data
    });

  } catch (error) {
    console.error('Lead status update failed:', error);

    return send(res, 400, {
      success: false,
      error: 'Invalid request'
    });
  }
}
if (u.pathname === '/api/leads' && req.method === 'GET') {
  const { data, error } = await supabase
    .from('leads')
    .select(`
      id,
      lead_type,
      business_name,
      contact_name,
      email,
      phone,
      area,
      website_url,
      message,
      status,
      created_at
    `)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Lead fetch failed:', error.message);

    return send(res, 500, {
      success: false,
      error: 'Could not load leads'
    });
  }

  return send(res, 200, data || []);
}
  if(u.pathname==='/api/ads' && req.method==='GET'){ const city=(u.searchParams.get('city')||'fergusfalls').toLowerCase(); const d=readData(); return send(res,200,d.ads.filter(a=>a.city===city)); }
  if(u.pathname==='/api/ads' && req.method==='POST'){ try{ const p=await body(req); const d=readData(); const ad={id:crypto.randomUUID(),city:(p.city||'fergusfalls').toLowerCase(),business:p.business||'Advertiser',headline:p.headline||'',url:p.url||'',startDate:p.startDate||'',endDate:p.endDate||'',spots:Number(p.spots)||1,active:p.active!==false,image:p.image||''}; d.ads.push(ad); writeData(d); return send(res,201,ad);}catch(e){return send(res,400,{error:e.message});} }
  const m=u.pathname.match(/^\/api\/ads\/([^/]+)$/);
  if(m && req.method==='PUT'){ try{ const p=await body(req); const d=readData(); const i=d.ads.findIndex(a=>a.id===m[1]); if(i<0)return send(res,404,{error:'Not found'}); d.ads[i]={...d.ads[i],...p,id:d.ads[i].id,spots:Number(p.spots||d.ads[i].spots)}; writeData(d); return send(res,200,d.ads[i]); }catch(e){return send(res,400,{error:e.message});} }
  if(m && req.method==='DELETE'){ const d=readData(); const before=d.ads.length; d.ads=d.ads.filter(a=>a.id!==m[1]); writeData(d); return send(res,before===d.ads.length?404:200,{ok:true}); }
if (u.pathname === '/api/leads' && req.method === 'POST') {
  try {
    const lead = await body(req);

    if (
      !lead.leadType ||
      !lead.businessName ||
      !lead.contactName ||
      !lead.email
    ) {
      return send(res, 400, {
        success: false,
        error: 'Please complete all required fields'
      });
    }

    const { data, error } = await supabase
      .from('leads')
      .insert({
        lead_type: lead.leadType,
        business_name: lead.businessName.trim(),
        contact_name: lead.contactName.trim(),
        email: lead.email.trim(),
        phone: lead.phone?.trim() || null,
        area: lead.area?.trim() || null,
        website_url: lead.website?.trim() || null,
        message: lead.message?.trim() || null
      })
      .select()
      .single();

    if (error) {
      console.error('Lead insert failed:', error.message);

      return send(res, 500, {
        success: false,
        error: 'Could not submit request'
      });
    }

    console.log('LEAD SAVED:', data.id);

    return send(res, 201, {
      success: true,
      leadId: data.id
    });

  } catch (error) {
    console.error('Lead submission failed:', error);

    return send(res, 400, {
      success: false,
      error: 'Invalid request'
    });
  }
}
  let file = u.pathname==='/admin' ? 'admin.html' : (u.pathname.startsWith('/assets/') ? u.pathname.slice(1) : ['.css','.js','.png','.jpg','.svg','.ico'].some(ext=>u.pathname.endsWith(ext)) ? u.pathname.slice(1) : 'index.html');
  const full=safeFile(file); if(!full||!fs.existsSync(full)) return send(res,404,'Not found','text/plain');
  const ext=path.extname(full); const type={'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg'}[ext]||'application/octet-stream';
  res.writeHead(200,{'Content-Type':type}); fs.createReadStream(full).pipe(res);
});
server.listen(PORT,()=>console.log(`Tidbits Daily running at http://localhost:${PORT}/fergusfalls`));
