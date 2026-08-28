require('dotenv').config();
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');
const dailyContent = require('./content/daily-content');
const {
  jokes,
  facts,
  questions,
  riddles,
  dailyTips,
  quizzes,
  curiosityWeeks,
  wouldYouRather
} = dailyContent;
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

const verses = [
  [
    'Galatians 5:13',
    'Serve one another humbly in love.',
    'https://www.pastorrick.com/'
  ]
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
  const d = new Date(date + 'T12:00:00');

const startOfYear = new Date(d.getFullYear(), 0, 0);

const dayOfYear = Math.floor(
  (d - startOfYear) / 86400000
);

const dailyIndex = (dayOfYear - 1) % 365;
  const joke = jokes[dailyIndex];
  const verse = verses[idx(date,'v',verses.length)];
  const devotionalVerse = await getDailyDevotional(date, verse);
  const national = await getNationalDays(date);
  const famousBirthdays = await getFamousBirthdays(date);
  const usHistory = await getUSHistory(date);
  const quiz = quizzes[dailyIndex];
  const wyr = wouldYouRather[dailyIndex];
const riddle = riddles[dailyIndex];
const tip = dailyTips[dailyIndex];

const curiosityWeekIndex =
  Math.floor(dailyIndex / 7) % curiosityWeeks.length;

const curiosityDayIndex = dailyIndex % 7;

const curiosityWeek =
  curiosityWeeks[curiosityWeekIndex];

const curiosityDay =
  curiosityWeek.days[curiosityDayIndex];

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
fact: facts[dailyIndex],
icebreaker: questions[dailyIndex],
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
  try {
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
        logo_url,
        notes,
        date_joined,
        last_checked,
        active,
        editions(name)
      `)
      .order('business_name', { ascending: true });

    if (error) throw error;

    const locations = (data || []).map(location => ({
      id: location.id,
      name: location.business_name,
      edition: location.editions?.name || '',
      address: location.address || '',
      url: location.website_url || '',
      contact: location.contact_name || '',
      contactInfo: location.contact_info || '',
      qrPlacement: location.qr_placement || '',
      logo: location.logo_url || '',
      notes: location.notes || '',
      dateJoined: location.date_joined || '',
      lastChecked: location.last_checked || '',
      active: location.active
    }));

    return send(res, 200, locations);

  } catch (error) {
    console.error('Locations load failed:', error);

    return send(res, 500, {
      success: false,
      error: 'Could not load participating locations'
    });
  }
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
if (
  u.pathname === '/api/edition-managers' &&
  req.method === 'GET'
) {
  try {
    const authHeader = req.headers.authorization || '';

if (!authHeader.startsWith('Bearer ')) {
  return send(res, 401, {
    success: false,
    error: 'Authentication required'
  });
}

const accessToken = authHeader.slice(7);

const secretKey = process.env.SUPABASE_SECRET_KEY;
const supabaseUrl = process.env.SUPABASE_URL;

const userResponse = await fetch(
  `${supabaseUrl}/auth/v1/user`,
  {
    headers: {
      apikey: secretKey,
      Authorization: `Bearer ${accessToken}`
    }
  }
);

if (!userResponse.ok) {
  return send(res, 401, {
    success: false,
    error: 'Invalid login'
  });
}

const user = await userResponse.json();

const profileResponse = await fetch(
  `${supabaseUrl}/rest/v1/profiles` +
  `?id=eq.${encodeURIComponent(user.id)}` +
  `&select=id,role,active`,
  {
    headers: {
      apikey: secretKey,
      Authorization: `Bearer ${secretKey}`
    }
  }
);

if (!profileResponse.ok) {
  return send(res, 403, {
    success: false,
    error: 'Could not verify account access'
  });
}

const profileRows = await profileResponse.json();
const profile = profileRows[0];

if (
  !profile ||
  profile.active === false ||
  profile.role !== 'owner'
) {
  return send(res, 403, {
    success: false,
    error: 'Owner access required'
  });
}

    const profilesResponse = await fetch(
      `${supabaseUrl}/rest/v1/profiles` +
      `?select=id,full_name,role,active` +
      `&role=eq.edition_admin`,
      {
        headers: {
          apikey: secretKey,
          Authorization: `Bearer ${secretKey}`
        }
      }
    );

    if (!profilesResponse.ok) {
      const errorText = await profilesResponse.text();

      console.error(
        'Edition manager profiles load failed:',
        profilesResponse.status,
        errorText
      );

      return send(res, 500, {
        success: false,
        error: 'Could not load Edition Managers'
      });
    }

    const profiles = await profilesResponse.json();
const authUsersResponse = await fetch(
  `${supabaseUrl}/auth/v1/admin/users`,
  {
    headers: {
      apikey: secretKey,
      Authorization: `Bearer ${secretKey}`
    }
  }
);

if (!authUsersResponse.ok) {
  const errorText = await authUsersResponse.text();

  console.error(
    'Edition manager auth users load failed:',
    authUsersResponse.status,
    errorText
  );

  return send(res, 500, {
    success: false,
    error: 'Could not load Edition Manager emails'
  });
}

const authUsersData = await authUsersResponse.json();

const emailByUserId = new Map(
  (authUsersData.users || []).map(user => [
    user.id,
    user.email || ''
  ])
);
    const assignmentsResponse = await fetch(
      `${supabaseUrl}/rest/v1/user_editions` +
      `?select=user_id,edition_id`,
      {
        headers: {
          apikey: secretKey,
          Authorization: `Bearer ${secretKey}`
        }
      }
    );

    if (!assignmentsResponse.ok) {
      const errorText = await assignmentsResponse.text();

      console.error(
        'Edition manager assignments load failed:',
        assignmentsResponse.status,
        errorText
      );

      return send(res, 500, {
        success: false,
        error: 'Could not load Edition assignments'
      });
    }

    const assignments = await assignmentsResponse.json();

    const editionsResponse = await fetch(
      `${supabaseUrl}/rest/v1/editions` +
      `?select=id,name`,
      {
        headers: {
          apikey: secretKey,
          Authorization: `Bearer ${secretKey}`
        }
      }
    );

    if (!editionsResponse.ok) {
      const errorText = await editionsResponse.text();

      console.error(
        'Edition names load failed:',
        editionsResponse.status,
        errorText
      );

      return send(res, 500, {
        success: false,
        error: 'Could not load Edition names'
      });
    }

    const editions = await editionsResponse.json();

    const editionById = new Map(
      editions.map(edition => [edition.id, edition.name])
    );

    const managers = profiles.flatMap(profile => {
      const userAssignments = assignments.filter(
        assignment => assignment.user_id === profile.id
      );

      if (!userAssignments.length) {
        return [{
          id: profile.id,
          full_name: profile.full_name,
          email: emailByUserId.get(profile.id) || '',
          edition_name: '',
          active: profile.active
        }];
      }

      return userAssignments.map(assignment => ({
        id: profile.id,
        full_name: profile.full_name,
        email: emailByUserId.get(profile.id) || '',
        edition_name:
          editionById.get(assignment.edition_id) || '',
        active: profile.active
      }));
    });

    return send(res, 200, managers);

  } catch (error) {
    console.error('Edition manager load failed:', error);

    return send(res, 500, {
      success: false,
      error: 'Could not load Edition Managers'
    });
  }
}
if (
  u.pathname === '/api/edition-managers' &&
  req.method === 'POST'
) {
  try {
    const authHeader = req.headers.authorization || '';

    if (!authHeader.startsWith('Bearer ')) {
      return send(res, 401, {
        success: false,
        error: 'Authentication required'
      });
    }

    const accessToken = authHeader.slice(7);

    const secretKey = process.env.SUPABASE_SECRET_KEY;
    const supabaseUrl = process.env.SUPABASE_URL;

    const userResponse = await fetch(
      `${supabaseUrl}/auth/v1/user`,
      {
        headers: {
          apikey: secretKey,
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    if (!userResponse.ok) {
      return send(res, 401, {
        success: false,
        error: 'Invalid login'
      });
    }

    const ownerUser = await userResponse.json();

    const ownerProfileResponse = await fetch(
      `${supabaseUrl}/rest/v1/profiles` +
      `?id=eq.${encodeURIComponent(ownerUser.id)}` +
      `&select=id,role,active`,
      {
        headers: {
          apikey: secretKey,
          Authorization: `Bearer ${secretKey}`
        }
      }
    );

    const ownerProfiles = await ownerProfileResponse.json();
    const ownerProfile = ownerProfiles[0];

    if (
      !ownerProfile ||
      ownerProfile.active === false ||
      ownerProfile.role !== 'owner'
    ) {
      return send(res, 403, {
        success: false,
        error: 'Owner access required'
      });
    }

    const payload = await body(req);

    const name = payload.name?.trim();
    const email = payload.email?.trim().toLowerCase();
    const editionSlug = payload.editionSlug?.trim();
    const active = payload.active !== false;

    if (!name || !email || !editionSlug) {
      return send(res, 400, {
        success: false,
        error: 'Name, email, and Edition are required'
      });
    }

    const editionResponse = await fetch(
      `${supabaseUrl}/rest/v1/editions` +
      `?slug=eq.${encodeURIComponent(editionSlug)}` +
      `&select=id,name`,
      {
        headers: {
          apikey: secretKey,
          Authorization: `Bearer ${secretKey}`
        }
      }
    );

    const editionRows = await editionResponse.json();
    const edition = editionRows[0];

    if (!edition) {
      return send(res, 404, {
        success: false,
        error: 'Edition not found'
      });
    }

    const createUserResponse = await fetch(
      `${supabaseUrl}/auth/v1/admin/users`,
      {
        method: 'POST',
        headers: {
          apikey: secretKey,
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          email_confirm: true,
          user_metadata: {
            full_name: name
          }
        })
      }
    );

    const createdUser = await createUserResponse.json();

    if (!createUserResponse.ok) {
      return send(res, createUserResponse.status, {
        success: false,
        error:
          createdUser.msg ||
          createdUser.message ||
          'Could not create manager login'
      });
    }

    const profileResponse = await fetch(
      `${supabaseUrl}/rest/v1/profiles`,
      {
        method: 'POST',
        headers: {
          apikey: secretKey,
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation'
        },
        body: JSON.stringify({
          id: createdUser.id,
          full_name: name,
          role: 'edition_admin',
          active
        })
      }
    );

    if (!profileResponse.ok) {
      const errorText = await profileResponse.text();

      console.error(
        'Edition manager profile create failed:',
        errorText
      );
await fetch(
  `${supabaseUrl}/auth/v1/admin/users/${createdUser.id}`,
  {
    method: 'DELETE',
    headers: {
      apikey: secretKey,
      Authorization: `Bearer ${secretKey}`
    }
  }
);
      return send(res, 500, {
        success: false,
        error: 'Manager login was created, but profile setup failed'
      });
    }

    const assignmentResponse = await fetch(
      `${supabaseUrl}/rest/v1/user_editions`,
      {
        method: 'POST',
        headers: {
          apikey: secretKey,
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation'
        },
        body: JSON.stringify({
          user_id: createdUser.id,
          edition_id: edition.id
        })
      }
    );

    if (!assignmentResponse.ok) {
      const errorText = await assignmentResponse.text();

      console.error(
        'Edition manager assignment create failed:',
        errorText
      );
await fetch(
  `${supabaseUrl}/auth/v1/admin/users/${createdUser.id}`,
  {
    method: 'DELETE',
    headers: {
      apikey: secretKey,
      Authorization: `Bearer ${secretKey}`
    }
  }
);
      return send(res, 500, {
        success: false,
        error:
          'Manager was created, but Edition assignment failed'
      });
    }

    return send(res, 201, {
      success: true,
      manager: {
        id: createdUser.id,
        full_name: name,
        email,
        edition_name: edition.name,
        active
      }
    });

  } catch (error) {
    console.error('Edition manager create failed:', error);

    return send(res, 500, {
      success: false,
      error: 'Could not add Edition Manager'
    });
  }
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
        logo_url: location.logo || null,
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
if (
  u.pathname.startsWith('/api/locations/') &&
  req.method === 'PUT'
) {
  try {
    const parts = u.pathname.split('/');
    const id = parts[3];

    const update = await body(req);

    if (!id) {
      return send(res, 400, {
        success: false,
        error: 'Location id is required'
      });
    }

    const secretKey = process.env.SUPABASE_SECRET_KEY;
    const supabaseUrl = process.env.SUPABASE_URL;

    const payload = {
      business_name: update.name?.trim() || '',
      address: update.address || null,
      website_url: update.url || null,
      contact_name: update.contact || null,
      contact_info: update.contactInfo || null,
      qr_placement: update.qrPlacement || null,
      notes: update.notes || null,
      active: update.active !== false
    };

    // Only replace the logo when a new one was actually uploaded.
    if (update.logo) {
      payload.logo_url = update.logo;
    }

    const response = await fetch(
      `${supabaseUrl}/rest/v1/locations?id=eq.${encodeURIComponent(id)}`,
      {
        method: 'PATCH',
        headers: {
          apikey: secretKey,
          'Content-Type': 'application/json',
          Prefer: 'return=representation'
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        'Location update failed:',
        response.status,
        errorText
      );

      return send(res, 500, {
        success: false,
        error: 'Could not update location'
      });
    }

    const updated = await response.json();

    return send(res, 200, {
      success: true,
      location: updated[0] || null
    });

  } catch (error) {
    console.error('Location update failed:', error);

    return send(res, 500, {
      success: false,
      error: 'Could not update location'
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
  try {
    const contentId = u.searchParams.get('date');

    if (!contentId) {
      return send(res, 400, { error: 'Missing vote ID' });
    }

    const { data, error } = await supabase
      .from('content_votes')
      .select('choice')
      .eq('vote_type', 'wyr')
      .eq('content_id', contentId);

    if (error) throw error;

    let a = 0;
    let b = 0;

    for (const vote of data || []) {
      if (vote.choice === 'a') a++;
      if (vote.choice === 'b') b++;
    }

    return send(res, 200, {
      a,
      b,
      total: a + b
    });

  } catch (error) {
    console.error('Would You Rather vote lookup failed:', error);

    return send(res, 500, {
      error: 'Could not load voting results'
    });
  }
}
 if (u.pathname === '/api/vote' && req.method === 'POST') {
  try {
    const p = await body(req);

    const contentId = p.date;
    const choice = p.choice;

    if (!contentId || !['a', 'b'].includes(choice)) {
      return send(res, 400, {
        error: 'Invalid vote'
      });
    }

    const { error: insertError } = await supabase
      .from('content_votes')
      .insert({
        vote_type: 'wyr',
        content_id: contentId,
        choice
      });

    if (insertError) throw insertError;

    const { data, error: selectError } = await supabase
      .from('content_votes')
      .select('choice')
      .eq('vote_type', 'wyr')
      .eq('content_id', contentId);

    if (selectError) throw selectError;

    let a = 0;
    let b = 0;

    for (const vote of data || []) {
      if (vote.choice === 'a') a++;
      if (vote.choice === 'b') b++;
    }

    return send(res, 200, {
      a,
      b,
      total: a + b
    });

  } catch (error) {
    console.error('Would You Rather vote failed:', error);

    return send(res, 500, {
      error: 'Could not record vote'
    });
  }
}
// Get voting results for a 60-Second Table Quiz question
if (u.pathname === '/api/quiz-vote' && req.method === 'GET') {
  try {
    const quizId = u.searchParams.get('quizId');

    if (!quizId) {
      return send(res, 400, {
        error: 'Missing quiz ID'
      });
    }

    const { data, error } = await supabase
      .from('content_votes')
      .select('choice')
      .eq('vote_type', 'quiz')
      .eq('content_id', quizId);

    if (error) throw error;

    let a = 0;
    let b = 0;
    let c = 0;
    let d = 0;

    for (const vote of data || []) {
      if (vote.choice === 'a') a++;
      if (vote.choice === 'b') b++;
      if (vote.choice === 'c') c++;
      if (vote.choice === 'd') d++;
    }

    return send(res, 200, {
      a,
      b,
      c,
      d,
      total: a + b + c + d
    });

  } catch (error) {
    console.error('Quiz vote lookup failed:', error);

    return send(res, 500, {
      error: 'Could not load quiz results'
    });
  }
}
// Record a vote for a 60-Second Table Quiz question
if (u.pathname === '/api/quiz-vote' && req.method === 'POST') {
  try {
    const p = await body(req);

    const quizId = p.quizId;
    const choice = p.choice;

    if (
      !quizId ||
      !['a', 'b', 'c', 'd'].includes(choice)
    ) {
      return send(res, 400, {
        error: 'Invalid quiz vote'
      });
    }

    const { error: insertError } = await supabase
      .from('content_votes')
      .insert({
        vote_type: 'quiz',
        content_id: quizId,
        choice
      });

    if (insertError) throw insertError;

    const { data, error: selectError } = await supabase
      .from('content_votes')
      .select('choice')
      .eq('vote_type', 'quiz')
      .eq('content_id', quizId);

    if (selectError) throw selectError;

    let a = 0;
    let b = 0;
    let c = 0;
    let d = 0;

    for (const vote of data || []) {
      if (vote.choice === 'a') a++;
      if (vote.choice === 'b') b++;
      if (vote.choice === 'c') c++;
      if (vote.choice === 'd') d++;
    }

    return send(res, 200, {
      a,
      b,
      c,
      d,
      total: a + b + c + d
    });

  } catch (error) {
    console.error('Quiz vote failed:', error);

    return send(res, 500, {
      error: 'Could not record quiz vote'
    });
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
  
if (u.pathname === '/api/ads' && req.method === 'GET') {
  try {
    const city = (u.searchParams.get('city') || 'fergusfalls').toLowerCase();

    const { data, error } = await supabase
      .from('ads')
      .select('*')
      .eq('city', city)
      .order('created_at', { ascending: true });

    if (error) throw error;

    const ads = (data || []).map(ad => ({
  id: ad.id,
  city: ad.city,
  business: ad.business,
  headline: ad.headline || '',
  url: ad.url || '',
  startDate: ad.start_date || '',
  endDate: ad.end_date || '',
  spots: ad.spots || 1,
  active: ad.active !== false,
  image: ad.image || '',
  creativePlan: ad.creative_plan || 'standard'
}));

return send(res, 200, ads);
  } catch (error) {
    console.error('Ads load failed:', error);
    return send(res, 500, { error: 'Could not load ads' });
  }
}

if (u.pathname === '/api/ads' && req.method === 'POST') {
  try {
    const p = await body(req);

    const ad = {
      id: crypto.randomUUID(),
      city: (p.city || 'fergusfalls').toLowerCase(),
      business: p.business || 'Advertiser',
      headline: p.headline || '',
      url: p.url || '',
      start_date: p.startDate || null,
      end_date: p.endDate || null,
      spots: Number(p.spots) || 1,
      active: p.active !== false,
      image: p.image || '',
      creative_plan: p.creativePlan || null
    };

    const { data, error } = await supabase
      .from('ads')
      .insert(ad)
      .select()
      .single();

    if (error) throw error;

    return send(res, 201, data);
  } catch (error) {
    console.error('Ad creation failed:', error);
    return send(res, 400, { error: error.message || 'Could not create ad' });
  }
}

const adMatch = u.pathname.match(/^\/api\/ads\/([^/]+)$/);

if (adMatch && req.method === 'PUT') {
  try {
    const p = await body(req);
    const id = adMatch[1];

    const updates = {
      city: (p.city || 'fergusfalls').toLowerCase(),
      business: p.business || 'Advertiser',
      headline: p.headline || '',
      url: p.url || '',
      start_date: p.startDate || null,
      end_date: p.endDate || null,
      spots: Number(p.spots) || 1,
      active: p.active !== false,
      image: p.image || '',
      creative_plan: p.creativePlan || null,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('ads')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return send(res, 200, data);
  } catch (error) {
    console.error('Ad update failed:', error);
    return send(res, 400, { error: error.message || 'Could not update ad' });
  }
}

if (adMatch && req.method === 'DELETE') {
  try {
    const id = adMatch[1];

    const { error } = await supabase
      .from('ads')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return send(res, 200, { ok: true });
  } catch (error) {
    console.error('Ad delete failed:', error);
    return send(res, 400, { error: error.message || 'Could not delete ad' });
  }
}
if (
  u.pathname.startsWith('/api/editions/') &&
  req.method === 'GET'
) {
  try {
    const slug = u.pathname.split('/')[3];

    if (!slug) {
      return send(res, 400, {
        success: false,
        error: 'Edition slug is required'
      });
    }

    const { data, error } = await supabase
      .from('editions')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return send(res, 404, {
        success: false,
        error: 'Edition not found'
      });
    }

    return send(res, 200, data);

  } catch (error) {
    console.error('Edition lookup failed:', error);

    return send(res, 500, {
      success: false,
      error: 'Could not load Edition settings'
    });
  }
}
if (
  u.pathname === '/api/editions' &&
  req.method === 'GET'
) {
  try {
    const secretKey = process.env.SUPABASE_SECRET_KEY;
    const supabaseUrl = process.env.SUPABASE_URL;

    const response = await fetch(
      `${supabaseUrl}/rest/v1/editions` +
      `?select=id,name,slug,active` +
      `&order=name.asc`,
      {
        headers: {
          apikey: secretKey
        }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        'Edition list load failed:',
        response.status,
        errorText
      );

      return send(res, 500, {
        success: false,
        error: 'Could not load Editions'
      });
    }

    const editions = await response.json();

    return send(res, 200, editions);

  } catch (error) {
    console.error('Edition list load failed:', error);

    return send(res, 500, {
      success: false,
      error: 'Could not load Editions'
    });
  }
}
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
