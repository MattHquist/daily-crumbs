const slug=(location.pathname.split('/').filter(Boolean)[0]||'fergusfalls').toLowerCase();
const titleCase=s=>s.replace(/([a-z])([A-Z])/g,'$1 $2').replace(/[-_]/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
const cityName=slug==='fergusfalls'?'Fergus Falls':titleCase(slug);
document.getElementById('edition').textContent=`${cityName} Edition`;
document.getElementById('cityFooter').textContent=`• ${cityName}`;
const fmt=new Intl.DateTimeFormat('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'});
document.getElementById('today').textContent=fmt.format(new Date());
async function trackQrScan() {
  const params = new URLSearchParams(window.location.search);
  const qrSlug = params.get('loc');

  if (!qrSlug) return;

  const scanKey = `dailycrumbs-scan-${qrSlug}-${new Date().toISOString().slice(0, 10)}`;

  if (sessionStorage.getItem(scanKey)) return;

  try {
    const response = await fetch('/api/qr-scan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ qrSlug })
    });

    if (response.ok) {
      sessionStorage.setItem(scanKey, '1');
    }
  } catch (error) {
    console.error('QR scan tracking failed:', error);
  }
}

trackQrScan();
async function loadContent(){
 const d=new Date(); const key=[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');
 const c=await fetch(`/api/content?date=${key}`).then(r=>r.json());
 const nationalTodayLink = document.getElementById('nationalTodayLink');

if (nationalTodayLink) {
    const monthName = d.toLocaleString('en-US', { month: 'long' }).toLowerCase();
    const dayNumber = d.getDate();
    nationalTodayLink.href = `https://nationaldaycalendar.com/${monthName}/${dayNumber}/`;
}
const nationalWeeklyLink = document.getElementById('nationalWeeklyLink');
const nationalMonthlyLink = document.getElementById('nationalMonthlyLink');

if (nationalWeeklyLink) {
    const monthName = d
        .toLocaleString('en-US', { month: 'long' })
        .toLowerCase();

    nationalWeeklyLink.href =
        `https://nationaldaycalendar.com/${monthName}/days?view=calendar`;
}

if (nationalMonthlyLink) {
    nationalMonthlyLink.href =
        'https://nationaldaycalendar.com/month';
}
 jokeSetup.textContent=c.joke.setup; jokeAnswer.textContent=c.joke.punchline; verseText.textContent=`“${c.verse.text}”`; verseRef.textContent=c.verse.reference;devotionalLink.href = c.verse.url;
 devotionalLink.href = c.verse.url;

national.innerHTML = c.national && c.national.length
  ? c.national.map(x => `<li>${x}</li>`).join('')
  : '';
 famousBirthdays.innerHTML = c.famousBirthdays && c.famousBirthdays.length
  ? `<ul>${c.famousBirthdays.map(person => {
      const currentYear = new Date().getFullYear();
      const age = currentYear - person.year;

      return `<li><strong>${person.name}</strong> — ${age}</li>`;
    }).join('')}</ul>`
  : '<p>No notable birthdays found today.</p>';
  if (c.usHistory) {
  usHistory.innerHTML =
    `<strong>${c.usHistory.year}</strong> — ${c.usHistory.text}`;
} else {
  usHistory.textContent = 'No U.S. history item found for today.';
}
fact.textContent = c.fact || 'Here’s something interesting to think about today.';
icebreaker.textContent =
  c.icebreaker || 'What is something that made you smile today?';
  wyrQuestion.textContent = c.wyr.q;
wyrA.textContent = c.wyr.a;
wyrB.textContent = c.wyr.b;
topicName.textContent = c.topic.theme;
topicArticle.textContent = c.topic.text;
topicTeaser.textContent = c.topic.teaser;
dailyTip.textContent =
  c.tip || 'Keep learning one small useful thing every day.';
 document.getElementById('quizQ').textContent = c.quiz.q;
quizOptions.innerHTML = c.quiz.options
  .map((option, index) => {
    const letter = ['A', 'B', 'C', 'D'][index];

    return `
      <button
        data-choice="${letter.toLowerCase()}"
        data-answer="${option.replace(/"/g, '&quot;')}"
      >
        ${option}
      </button>
    `;
  })
  .join('');
quizOptions.querySelectorAll('button').forEach(button => {
  button.onclick = async () => {
    const selectedChoice = button.dataset.choice;
    const selectedAnswer = button.dataset.answer;

    const correctIndex = c.quiz.options.indexOf(c.quiz.a);
    const correctChoice = ['A', 'B', 'C', 'D'][correctIndex];

    const dateKey = key;
    const quizId = `${dateKey}::${c.quiz.q}`;
    const localVoteKey = `daily-crumbs-quiz-${quizId}`;

    if (localStorage.getItem(localVoteKey)) {
      quizResult.textContent =
        'You already answered today’s quiz.';
      return;
    }

    quizOptions
      .querySelectorAll('button')
      .forEach(btn => {
        btn.disabled = true;
      });

    try {
      const response = await fetch('/api/quiz-vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          quizId,
          choice: selectedChoice
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || 'Could not record quiz answer'
        );
      }

      localStorage.setItem(
        localVoteKey,
        selectedChoice
      );

      const total = result.total || 0;

      const pct = value =>
        total
          ? Math.round((value / total) * 100)
          : 0;

      quizResult.innerHTML = `
        <strong>
          You selected ${selectedChoice.toUpperCase()}.
          The correct answer is ${correctChoice}.
        </strong>
        <br><br>
        A — ${pct(result.a)}%<br>
        B — ${pct(result.b)}%<br>
        C — ${pct(result.c)}%<br>
        D — ${pct(result.d)}%
      `;

    } catch (error) {
      console.error(error);

      quizResult.textContent =
        'Sorry, your quiz answer could not be recorded.';

      quizOptions
        .querySelectorAll('button')
        .forEach(btn => {
          btn.disabled = false;
        });
    }
  };
});
{
  const correctIndex = c.quiz.options.indexOf(c.quiz.a);
  const correctChoice = ['A', 'B', 'C', 'D'][correctIndex];

  const quizId = `${key}::${c.quiz.q}`;
  const localVoteKey = `daily-crumbs-quiz-${quizId}`;
  const previousChoice = localStorage.getItem(localVoteKey);

  if (previousChoice) {
    quizOptions
      .querySelectorAll('button')
      .forEach(btn => {
        btn.disabled = true;
      });

    try {
      const response = await fetch(
        `/api/quiz-vote?quizId=${encodeURIComponent(quizId)}`
      );

      const result = await response.json();

      if (response.ok) {
        const total = result.total || 0;

        const pct = value =>
          total
            ? Math.round((value / total) * 100)
            : 0;

        quizResult.innerHTML = `
          <strong>
            You selected ${previousChoice.toUpperCase()}.
            The correct answer is ${correctChoice}.
          </strong>
          <br><br>
          A — ${pct(result.a)}%<br>
          B — ${pct(result.b)}%<br>
          C — ${pct(result.c)}%<br>
          D — ${pct(result.d)}%
        `;
      }
    } catch (error) {
      console.error(
        'Could not load quiz voting results:',
        error
      );
    }
  }
}
riddleQuestion.textContent = c.riddle.q;
riddleAnswer.textContent = c.riddle.a;
}
jokeBtn.onclick = () => {
  jokeAnswerBox.classList.remove('hidden');
  jokeBtn.style.display = 'none';

  jokeAnswerBox.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
};
riddleBtn.onclick = () => {
  riddleAnswerBox.classList.remove('hidden');
  riddleBtn.style.display = 'none';

  riddleAnswerBox.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
};
let activeAds=[]; let rotation=0;
function eligible(ad){const t=new Date(); t.setHours(0,0,0,0); const s=ad.startDate?new Date(ad.startDate+'T00:00:00'):null,e=ad.endDate?new Date(ad.endDate+'T23:59:59'):null; return ad.active!==false && (!s||t>=s)&&(!e||t<=e)}
function weighted(ads){return ads.flatMap(a=>Array.from({length:Math.max(1,Number(a.spots)||1)},()=>a))}
function adHtml(a){const clickable=a.url?`href="${a.url}" target="_blank" rel="noopener"`:'href="#" onclick="return false"';const img=a.image?`<img src="${a.image}" alt="${a.business}">`:''; return `<a class="ad-card size-${a.spots||1}" ${clickable}>${img}<div class="ad-placeholder">LOCAL SPONSOR</div><strong>${a.business}</strong><small>${a.headline||'Tap to learn more'}</small></a>`}
function filler() {
  return `
    <a
      class="ad-card"
      href="/contact?type=advertising"
      style="text-decoration:none;color:inherit;"
    >
      <div class="ad-placeholder">YOUR BUSINESS HERE</div>
      <strong>Advertise With Us</strong>
      <div>Only 24 advertisers per edition.</div>
    </a>
  `;
}
function renderAds() {
  const pool = weighted(activeAds);

  // 10 ads visible on the page at one time:
  // 9 advertiser positions + 1 permanent advertising CTA.
  const advertiserSlots = 9;
  const picked = [];

  if (pool.length) {
    for (let i = 0; i < advertiserSlots; i++) {
      picked.push(pool[(rotation + i * 3) % pool.length]);
    }

    rotation = (rotation + 1) % pool.length;
  }

  const html = [];

  for (let i = 0; i < advertiserSlots; i++) {
    html.push(
      picked[i]
        ? adHtml(picked[i])
        : filler()
    );
  }

  /*
    One permanent open/waitlist position.

    Put it in the middle of the page rotation instead of
    clustering it with other ads at the bottom.
  */
  html.splice(4, 0, filler());

  leftAds.innerHTML = html.slice(0, 3).join('');
  rightAds.innerHTML = html.slice(3, 6).join('');
  centerAds.innerHTML = html.slice(6, 10).join('');
}
function renderMobileAd() {
  const paidSlots = [
    document.getElementById('mobileAd'),
    document.getElementById('mobileAd2'),
    document.getElementById('mobileAd3'),
    document.getElementById('mobileAd4'),
    document.getElementById('mobileAd5'),
    document.getElementById('mobileAd6')
  ].filter(Boolean);

  const ctaSlot = document.getElementById('mobileAdCta');

  if (!paidSlots.length) return;

  // Build a weighted pool, but choose unique advertisers
  // for the six visible mobile positions.
  const weightedPool = weighted(activeAds);
  const selected = [];
  const usedIds = new Set();

  let attempts = 0;
  let cursor = rotation;

  while (
    selected.length < paidSlots.length &&
    attempts < weightedPool.length * 3
  ) {
    if (!weightedPool.length) break;

    const ad = weightedPool[cursor % weightedPool.length];

    if (ad && !usedIds.has(ad.id)) {
      selected.push(ad);
      usedIds.add(ad.id);
    }

    cursor++;
    attempts++;
  }

  // If there are fewer unique advertisers than slots,
  // reuse ads only after every advertiser has been used once.
  if (selected.length < paidSlots.length && weightedPool.length) {
    cursor = rotation;

    while (selected.length < paidSlots.length) {
      selected.push(
        weightedPool[cursor % weightedPool.length]
      );
      cursor++;
    }
  }

  paidSlots.forEach((slot, index) => {
    slot.innerHTML = selected[index]
      ? adHtml(selected[index])
      : filler();
  });

  if (ctaSlot) {
    ctaSlot.innerHTML = filler();
  }

  rotation = weightedPool.length
    ? (rotation + paidSlots.length) % weightedPool.length
    : 0;
}

async function loadAds(){
  const ads = await fetch(`/api/ads?city=${slug}`).then(r=>r.json());
  activeAds = ads.filter(eligible);
  renderAds();
  renderMobileAd();
}
const wyrA = document.getElementById('wyrA');
const wyrB = document.getElementById('wyrB');
const wyrResult = document.getElementById('wyrResult');

async function showWyrResult(choice) {
  wyrA.disabled = true;
  wyrB.disabled = true;
  wyrResult.textContent = 'Recording vote...';
  const today = new Date();

const dateKey = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, '0'),
  String(today.getDate()).padStart(2, '0')
].join('-');

const questionKey = wyrQuestion.textContent.trim();

const voteId = `${dateKey}::${questionKey}`;
const voteKey = `daily-crumbs-wyr-${voteId}`;

  try {
    const response = await fetch('/api/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
  date: voteId,
  choice
})
    });

    const result = await response.json();
if (response.ok) {
  localStorage.setItem(voteKey, choice);
}
    if (!response.ok) {
      throw new Error(result.error || 'Vote failed');
    }

    const aPct = result.total
      ? Math.round((result.a / result.total) * 100)
      : 0;

    const bPct = result.total
      ? 100 - aPct
      : 0;

    const picked = choice === 'a'
      ? wyrA.textContent
      : wyrB.textContent;

    wyrResult.innerHTML =
      `You picked <strong>${picked}</strong>.<br>` +
      `${aPct}% ${wyrA.textContent} • ${bPct}% ${wyrB.textContent}<br>` +
      `<span class="vote-count">${result.total.toLocaleString()} Tidbits reader${result.total === 1 ? '' : 's'} voted today.</span>`;

  } catch (error) {
    wyrResult.textContent = 'Sorry, your vote could not be recorded.';
    wyrA.disabled = false;
    wyrB.disabled = false;
  }
}

if (wyrA && wyrB && wyrResult) {
  const dateKey = [
  new Date().getFullYear(),
  String(new Date().getMonth() + 1).padStart(2, '0'),
  String(new Date().getDate()).padStart(2, '0')
].join('-');
  const questionKey = wyrQuestion.textContent.trim();
const voteId = `${dateKey}::${questionKey}`;
const todayKey = `daily-crumbs-wyr-${voteId}`;
  const previousVote = localStorage.getItem(todayKey);

  if (previousVote) {
    wyrA.disabled = true;
    wyrB.disabled = true;

    fetch(`/api/vote?date=${encodeURIComponent(voteId)}`)
      .then(r => r.json())
      .then(result => {
        const aPct = result.total
          ? Math.round((result.a / result.total) * 100)
          : 0;

        const bPct = result.total
          ? 100 - aPct
          : 0;

        const picked = previousVote === 'a'
          ? wyrA.textContent
          : wyrB.textContent;

        wyrResult.innerHTML =
          `You picked <strong>${picked}</strong>.<br>` +
          `${aPct}% ${wyrA.textContent} • ${bPct}% ${wyrB.textContent}<br>` +
          `<span class="vote-count">${result.total.toLocaleString()} Tidbits reader${result.total === 1 ? '' : 's'} voted today.</span>`;
      })
      .catch(() => {
        wyrResult.textContent = 'You already voted on today’s question.';
      });

  } else {
    wyrA.onclick = () => showWyrResult('a');
    wyrB.onclick = () => showWyrResult('b');
  }
}
async function loadParticipatingLocations() {
  const track = document.getElementById('participatingLocationsTrack');
  if (!track) return;

  try {
    const response = await fetch('/api/locations');
    const locations = await response.json();

    const activeLocations = (locations || []).filter(location => location.active);

    const locationCards = activeLocations.map(location => `
      <a
        class="participating-location-card"
        href="${location.url || '#'}"
        ${location.url ? 'target="_blank" rel="noopener"' : ''}
      >
        ${
          location.logo
            ? `<img src="${location.logo}" alt="${location.name}">`
            : `<strong>${location.name}</strong>`
        }
      </a>
    `);

    locationCards.push(`
      <a
        class="participating-location-card participant-cta"
        href="/contact?type=participant"
      >
        <strong>Want to be a Participating Location?</strong>
        <span>Join Daily Crumbs</span>
      </a>
    `);

    const cardsHtml = locationCards.join('');

track.innerHTML = `
  <div class="locations-group">${cardsHtml}</div>
  <div class="locations-group">${cardsHtml}</div>
  <div class="locations-group">${cardsHtml}</div>
  <div class="locations-group">${cardsHtml}</div>
`;

startLocationsMarquee();
  } catch (error) {
    console.error('Could not load participating locations:', error);
  }
}
function startLocationsMarquee() {
  const marquee = document.querySelector('.locations-marquee');
  const track = document.getElementById('participatingLocationsTrack');
  const firstGroup = track?.querySelector('.locations-group');

  if (!marquee || !track || !firstGroup) return;

  let paused = false;

  marquee.addEventListener('mouseenter', () => {
    paused = true;
  });

  marquee.addEventListener('mouseleave', () => {
    paused = false;
  });

  let position = 0;

function scroll() {
    if (!paused) {
        position += 0.75;

        const groupWidth = firstGroup.offsetWidth;

        if (position >= groupWidth) {
            position -= groupWidth;
        }

        track.style.transform = `translateX(-${position}px)`;
    }

    requestAnimationFrame(scroll);
}

  requestAnimationFrame(scroll);
}
loadContent();
loadAds();
loadParticipatingLocations();
setInterval(() => {
  renderAds();
  renderMobileAd();
}, 12000);
// Refresh shortly after midnight without requiring a reload.
function scheduleMidnight(){const n=new Date(), next=new Date(n); next.setHours(24,0,1,0); setTimeout(()=>{location.reload()},next-n)} scheduleMidnight();
