# Tidbits Daily — Working MVP

A no-dependency Node.js prototype for a daily restaurant-friendly entertainment publication supported by local advertising.

## Run it
1. Install Node.js 18+.
2. Open a terminal in this folder.
3. Run: `npm start`
4. Visit `http://localhost:3000/fergusfalls`
5. Admin: `http://localhost:3000/admin`

## What works now
- City-specific public URLs such as `/fergusfalls` and `/fargo`.
- Same daily editorial content across cities; advertisers are filtered by city.
- Daily content changes by calendar date and the page automatically reloads at 12:00:01 AM.
- Dad joke, Bible verse, national-day style section, random fact, table-talk question, weekly-theme micro article, and quiz.
- No politics/current-news feed.
- Advertiser manager: add, edit, delete, pause, city, headline, destination URL, start date, end date, image upload, and 1/2/4/8 spot weighting.
- Ads automatically appear only inside their active date range.
- Ads rotate every 12 seconds and are clickable when a URL is supplied.
- Weighted rotation gives larger packages proportionally more opportunities while placement changes automatically.
- Responsive layout for phones.

## Important production upgrades before selling ads
This prototype stores ads in one JSON file and images as base64. For a real business deployment, move advertiser data to PostgreSQL/Supabase, images to object storage, protect `/admin` with authentication, add impression/click analytics, use a CDN, and deploy a scheduled AI content-generation job with moderation/approval rules. The current deterministic content library is intentionally safe for demonstration and offline use.

## Recommended business model
Sell packages by weighted share-of-voice rather than promising a permanent physical position. Example: Standard = 1 share, Plus = 2, Feature = 4, Premier = 8. Report monthly impressions/clicks by advertiser. This makes inventory expandable across restaurants and cities while avoiding arguments about who got “the best spot.”
