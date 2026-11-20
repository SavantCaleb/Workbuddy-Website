// Real, measured client results for the site. Names are hidden (Caleb 11/20: "Real results, names hidden").
// Every number is from WorkBuddy's own records or Google's, checked 2026-11-20. The SQL and lead ids behind each one are
// in the session's proof notes; in short:
//   teeth whitening (OR)  lead 9af4414c…  workbuddy_rank_scans, 25-point grid, "teeth whitening near me"
//   floor refinisher (PA) lead 57986180…  workbuddy_tracker_points reviews_total, workbuddy_review_customers
//   junk removal (CA)     lead 20569697…  gbp_audit_complete log (9) → business_pages cached reviews (32, 4.8)
//   well driller (MI)     lead 7ebbf782…  contact_submissions read one by one (7 real of 56)
//   laundromats           accounts 261af27b… / bb28bba2… / 2172f963…  interactions, inbound voice, spam excluded
// Don't use: the fence (NE) and pool table (CA) rank numbers (tracker matched competitors / bad scans), the old "1 → 13"
// teeth whitening figure, or anything in workbuddy_customer_stories (placeholders).
import { VOL_SOURCE } from './industries.mjs';

export const BOARD = {
  k: 'Google Maps · spots in the top 10, of 25',
  from: 6, big: 13, chip: '+7 spots', sub: 'May 13 → Jul 25, 2026',
  side: [{ k: 'Google reviews', v: '16', em: 'from 5' }, { k: 'Top-3 spots', v: '5', em: 'from 2' }],
  // Weekly average of our scans, week of May 11 to week of Jul 20 (no scans the week of May 18).
  series: [6.1, 7.8, 9.3, 10.5, 10.5, 13.0, 11.3, 10.8, 12.2, 12.5],
  labels: ['Week of May 11', 'Week of Jul 20'],
  note: 'A real client: a teeth whitening studio in Oregon, searched as “teeth whitening near me” from 25 points across 15 miles. The line is the weekly average of our scans. Name hidden.',
};

const GRID_BEFORE = [[null, null, null, null, null], [10, 3, 8, 13, null], [19, 4, 2, 7, null], [19, 17, 13, 12, null], [null, null, null, null, null]];
const GRID_AFTER = [[17, null, 12, 15, null], [5, 3, 2, 4, null], [10, 3, 2, 2, null], [8, 9, 5, 4, null], [11, 14, 12, 8, null]];

export const STORIES = [
  {
    slug: 'teeth-whitening-studio-oregon', cat: 'health', icon: 'heart', products: ['Google Maps', 'Website'],
    who: 'Teeth whitening studio · Oregon', short: 'Teeth whitening studio', where: 'Oregon',
    n: '6 → 13', what: 'spots in the Google Maps top 10', window: 'May 13 → Jul 25, 2026 (10 weeks)',
    line: 'After we cleaned up her Google profile and built her a new website, she showed up in the top 10 across about twice as much of her area, and her reviews went from 5 to 16.',
    vis: 'grid', grid: { before: GRID_BEFORE, after: GRID_AFTER, beforeLabel: 'May 13', afterLabel: 'Jul 25' },
    start: 'In the top 10 on Google Maps at 6 of 25 points across her area, with 5 Google reviews.',
    move: 'We cleaned up her Google profile (including a confusing business name), built a new website and started weekly posts.',
    stats: [{ v: '6 → 13', k: 'top-10 spots on Google Maps, of 25' }, { v: '2 → 5', k: 'top-3 spots, of 25' }, { v: '5 → 16', k: 'Google reviews, 5.0 stars' }, { v: '10 weeks', k: 'from first scan to last' }],
    steps: ['Week one: a new website, and her Google profile connected and cleaned up, starting with the business name.', 'Weekly posts on her Google page, while we scanned 25 points across her area every few days.', 'Week by week, her average climbed from about 6 to 12.5 spots in the top 10, and single scans reached 15.'],
    caveat: 'Her account ended in late July, so the story stops there.',
    search: 'teeth whitening near me',
  },
  {
    slug: 'floor-refinisher-pennsylvania', cat: 'home', icon: 'home', products: ['Google Maps', 'Reviews'],
    who: 'Hardwood floor refinisher · rural central Pennsylvania', short: 'Floor refinisher', where: 'Central Pennsylvania',
    n: '0 → 8', what: 'Google reviews in 9 days, all 5 stars', window: 'Oct 21 → Oct 29, 2026',
    line: 'He had no Google reviews. The day after he joined, review requests went out to 10 of his past customers. Within a week he had 8 reviews, all 5 stars.',
    vis: 'bars', bars: { before: { label: 'Reviews, Oct 21', value: 0 }, after: { label: 'Reviews, Oct 29', value: 8 } },
    start: 'No Google reviews at all, and no reviews in the three months before.',
    move: 'He shared a list of past customers; we texted 10 of them a review request the next day.',
    stats: [{ v: '0 → 8', k: 'Google reviews' }, { v: '5.0', k: 'star rating' }, { v: '31 → 62', k: 'Google search views of his profile, 30 days before vs. after' }, { v: '9 days', k: 'from joining to 8 reviews' }],
    steps: ['He joined on Oct 20 and shared a list of past customers.', 'On Oct 22, review requests went out by text to 10 of them.', 'By Oct 29 he had 8 reviews, all 5 stars, and views of his profile from Google searches doubled over the month.'],
    caveat: 'Small numbers, and Google doesn’t tell us which text led to which review; he had none in the three months before.',
  },
  {
    slug: 'junk-removal-southern-california', cat: 'home', icon: 'home', products: ['Google Maps', 'Website', 'Reviews'],
    who: 'Junk removal company · inland Southern California', short: 'Junk removal company', where: 'Southern California',
    n: '9 → 32', what: 'Google reviews, at 4.8 stars', window: 'May 8 → Nov 17, 2026',
    line: 'We built his website, posted to his Google page 71 times and answered 28 of his reviews. Between our review requests and his own asks, his reviews more than tripled.',
    vis: 'bars', bars: { before: { label: 'Reviews, May 8', value: 9 }, after: { label: 'Reviews, Nov 17', value: 32 } },
    start: '9 Google reviews when he signed up.',
    move: 'A new website, weekly Google posts, replies to his reviews, and review requests to his past customers.',
    stats: [{ v: '9 → 32', k: 'Google reviews' }, { v: '4.8', k: 'star rating' }, { v: '71', k: 'posts on his Google page' }, { v: '28', k: 'review replies posted' }],
    steps: ['May: a new website and his Google page connected.', 'May to October: 71 Google posts and 28 replies to his reviews.', 'Review requests went out to past customers, and he sent his own link too.'],
    caveat: 'He asked customers for reviews himself as well, so the credit is shared. His map ranking didn’t move much, so we don’t claim it did.',
  },
  {
    slug: 'well-driller-michigan', cat: 'home', icon: 'drop', products: ['Website', 'Google Maps'],
    who: 'Well driller · West Michigan', short: 'Well driller', where: 'West Michigan',
    n: '7', what: 'real quote requests from the new website in its first two months', window: 'Aug 29 → Oct 9, 2026',
    line: 'We built his new website and put it on his domain in early August. Real requests for new wells and repairs started coming through the form within weeks.',
    vis: 'dots', dots: { days: ['Aug 29', 'Sep 1', 'Sep 9', 'Sep 14', 'Oct 1', 'Oct 1', 'Oct 9'], label: 'Each dot is a real quote request through the website form' },
    start: 'An older website that didn’t log quote requests, and at least 28 Google reviews.',
    move: 'A new website on his own domain, plus weekly Google posts and replies to every review.',
    stats: [{ v: '7', k: 'real quote requests through the website' }, { v: '58', k: 'posts on his Google page' }, { v: '34', k: 'review replies posted' }, { v: '41', k: 'Google reviews, 4.7 stars' }],
    steps: ['Early August: the new website went live on his domain.', 'Every form fill was read by hand: 7 were real customers asking about wells; the rest were spam.', 'Meanwhile, 58 Google posts and 34 review replies.'],
    caveat: 'His old site didn’t track requests, so there’s no before number. Most form fills on any site are spam; we only count the real ones.',
  },
  {
    slug: 'laundromat-group-san-diego', cat: 'more', icon: 'phone', products: ['Calls & leads'],
    who: 'Three-store laundromat group · San Diego area', short: 'Laundromat group', where: 'San Diego area',
    n: '4,867', what: 'calls answered by our AI receptionist', window: 'Feb 2 → Nov 20, 2026',
    line: 'Three stores, one phone assistant. It has answered 4,867 calls, about 500 a month, and handed 1,166 to staff when a person was needed.',
    vis: 'stats', statsVis: [{ v: '4,867', k: 'calls answered' }, { v: '1,166', k: 'handed to staff' }, { v: '99', k: 'hours on the phone' }],
    start: 'Three stores with phones staff couldn’t always get to.',
    move: 'Our AI receptionist on the store lines, answering questions and handing calls to staff when needed.',
    stats: [{ v: '4,867', k: 'calls answered' }, { v: '~500', k: 'calls a month' }, { v: '1,166', k: 'handed to staff' }, { v: '99', k: 'hours of phone time' }],
    steps: ['February: the assistant went live on the three store lines.', 'It answers hours, prices and service questions, and hands off when a person is needed.', 'Spam, abusive and wrong-number calls aren’t counted here.'],
    caveat: 'This is calls handled, not calls that would otherwise have been missed.',
  },
  {
    slug: 'laundromat-fort-worth', cat: 'more', icon: 'phone', products: ['Calls & leads'],
    who: 'Laundromat · Fort Worth, Texas', short: 'Laundromat', where: 'Fort Worth, TX',
    n: '2,279', what: 'calls answered by our AI receptionist', window: 'Jan 27 → Nov 20, 2026',
    line: 'One store, 2,279 calls answered, and 843 handed to staff when a person was needed.',
    vis: 'stats', statsVis: [{ v: '2,279', k: 'calls answered' }, { v: '843', k: 'handed to staff' }, { v: '67', k: 'hours on the phone' }],
    start: 'One store and a phone that rang while staff were busy.',
    move: 'Our AI receptionist on the store line.',
    stats: [{ v: '2,279', k: 'calls answered' }, { v: '843', k: 'handed to staff' }, { v: '67', k: 'hours of phone time' }, { v: '10', k: 'months running' }],
    steps: ['January: the assistant went live on the store line.', 'It answers the common questions and hands off when a person is needed.', 'Spam, abusive and wrong-number calls aren’t counted here.'],
    caveat: 'This is calls handled, not calls that would otherwise have been missed.',
  },
  {
    slug: 'laundromat-westchester-new-york', cat: 'more', icon: 'phone', products: ['Calls & leads'],
    who: 'Laundromat · Westchester County, New York', short: 'Laundromat', where: 'Westchester County, NY',
    n: '2,059', what: 'calls answered by our AI receptionist', window: 'Jan 23 → Nov 20, 2026',
    line: 'One store, 2,059 calls answered, and 723 handed to staff when a person was needed.',
    vis: 'stats', statsVis: [{ v: '2,059', k: 'calls answered' }, { v: '723', k: 'handed to staff' }, { v: '62', k: 'hours on the phone' }],
    start: 'One store and a phone that rang while staff were busy.',
    move: 'Our AI receptionist on the store line.',
    stats: [{ v: '2,059', k: 'calls answered' }, { v: '723', k: 'handed to staff' }, { v: '62', k: 'hours of phone time' }, { v: '10', k: 'months running' }],
    steps: ['January: the assistant went live on the store line.', 'It answers the common questions and hands off when a person is needed.', 'Spam, abusive and wrong-number calls aren’t counted here.'],
    caveat: 'This is calls handled, not calls that would otherwise have been missed.',
  },
];

// Totals across all clients, through Nov 20, 2026.
export const TOTALS = [
  { v: '1,358', k: 'posts published on clients’ Google pages', meta: '32 businesses, since March' },
  { v: '401', k: 'replies posted to clients’ Google reviews', meta: '21 businesses, since April' },
  { v: '559', k: 'local articles written for clients’ websites', meta: '43 websites' },
  { v: '41,283', k: 'calls answered by our AI receptionist', meta: '108 locations, past year' },
  { v: '1,419', k: 'free audits built for local businesses', meta: 'since March' },
];

// Of the businesses we audited (owners who asked for a free report), Mar 11 → Nov 1, 2026.
export const AUDIT = {
  ai: { v: '83%', k: 'weren’t named by any AI assistant we asked for the best business in their trade and town', src: '1,168 of 1,404 businesses we audited' },
  reviews: { v: '96%', k: 'had a nearby competitor with more Google reviews', src: '385 of 400 businesses we audited' },
  median: { v: '12 vs 302', k: 'median Google reviews: the business vs. its most-reviewed nearby competitor', src: '400 businesses we audited' },
  under10: { v: '43%', k: 'had fewer than 10 Google reviews', src: '176 of 407 businesses we audited' },
  noSite: { v: '20%', k: 'had no website linked on their Google listing', src: 'Of 505 Google listings we audited' },
  gaps: { v: '35%', k: 'were missing hours, photos, a website, a phone number or categories on Google', src: 'Of 505 Google listings we audited' },
};

const tileOf = (s) => ({ t: `${s.n} ${s.what}.`, who: s.short, meta: s.where, icon: s.icon });
export const WALL = {
  eyebrow: 'Real outcomes',
  h: 'Counted, <span class="ac">not claimed.</span>',
  lede: 'Every number here comes from our own records or from Google itself. Client names are left out.',
  tiles: [
    ...STORIES.map(tileOf),
    ...TOTALS.map((x) => ({ t: `${x.v} ${x.k}.`, who: 'All clients', meta: x.meta, icon: 'chart' })),
  ],
};

export const WEEK = {
  lede: 'Here’s what a normal week of work looks like on one account, and what it adds up to across all of them.',
  account: 'an example week', note: 'The feed shows a typical week. The totals are real, from our records through Nov 20, 2026.',
  lanes: [{ k: 'Google Maps', v: '2 posts, 3 review replies' }, { k: 'Search & AI', v: '1 new article' }, { k: 'Website', v: '1 page added' }, { k: 'Calls & leads', v: '4 leads texted back' }],
  rows: [
    { icon: 'pin', t: 'Posted a project photo to your Google page', s: 'Google Maps · service area tagged', time: 'Mon 9:12' },
    { icon: 'reply', tone: 'y', t: 'Replied to a new 5-star review', s: 'Google Maps · within the hour', time: 'Mon 2:40' },
    { icon: 'chat', tone: 'g', t: 'Texted back a quote request in 5 seconds', s: 'Calls & leads · from your website', time: 'Tue 7:55' },
    { icon: 'doc', t: 'Published “What a water heater costs in your town”', s: 'Search & AI · this week’s article', time: 'Wed 10:03' },
    { icon: 'star', tone: 'y', t: 'Sent review requests after Thursday’s jobs', s: 'Reviews · 3 customers', time: 'Thu 6:30' },
    { icon: 'site', t: 'Added a page for emergency service', s: 'Website · new service page', time: 'Fri 11:18' },
  ],
  stats: [{ v: '1,358', k: 'Google posts published' }, { v: '401', k: 'review replies posted' }, { v: '559', k: 'articles written' }, { v: '41,283', k: 'calls answered' }],
};

const ex = (rows) => rows.map(([time, type, t, tag]) => ({ time, type, t, tag }));
const W = (rows, stats) => ({ lede: 'A typical week on one account, and the real totals across all of them.', account: 'an example week', note: 'The activity is a typical week. The totals are real, from our records through Nov 20, 2026.', rows: ex(rows), stats });
export const WORK = {
  'google-maps': W([['Mon 9:12', 'Post', 'Project photo posted with your service area', 'Live'], ['Mon 2:40', 'Review', 'Replied to a new 5-star review', 'Answered'], ['Wed 8:05', 'Profile', 'Added two services and holiday hours', 'Updated'], ['Thu 6:30', 'Reviews', 'Review requests sent after today’s jobs', '3 sent']],
    [{ v: '1,358', k: 'Google posts published for clients' }, { v: '401', k: 'review replies posted' }, { v: '32', k: 'businesses we post for' }, { v: '0 → 8', k: 'reviews in 9 days for one new client' }]),
  seo: W([['Mon 10:03', 'Article', 'Published this week’s local article', 'New'], ['Tue 9:30', 'Page', 'Added a page for a service you offer', 'New'], ['Wed 1:15', 'AI search', 'Updated directory listings AI tools read', 'Fixed'], ['Fri 4:00', 'Rankings', 'Checked where you rank across your area', 'Tracked']],
    [{ v: '559', k: 'local articles on client websites' }, { v: '43', k: 'client websites we write for' }, { v: '6 → 13', k: 'Maps top-10 spots for one client in 10 weeks' }, { v: '1,419', k: 'free audits built' }]),
  website: W([['Mon 11:18', 'Page', 'Added a page for emergency service', 'New'], ['Tue 3:02', 'Edit', 'Swapped in new project photos you texted us', 'Done'], ['Wed 10:03', 'Article', 'Published this week’s local article', 'New'], ['Thu 7:55', 'Lead', 'Quote form lead texted back in 5 seconds', 'Replied']],
    [{ v: '43', k: 'client websites we write for' }, { v: '559', k: 'articles published on them' }, { v: '7', k: 'real quote requests in two months for one well driller' }, { v: 'Day one', k: 'the website is yours' }]),
  leads: W([['Tue 7:55', 'Lead', 'Quote request texted back in 5 seconds', 'Replied'], ['Tue 9:47 PM', 'Missed call', 'Answered, took name, number and what they need', 'Passed on'], ['Wed 12:10', 'Lead', 'Website form lead texted back', 'Replied'], ['Thu 6:30', 'Reviews', 'Review requests sent after today’s jobs', '3 sent']],
    [{ v: '41,283', k: 'calls answered by our AI receptionist' }, { v: '6,256', k: 'handed to a person on staff' }, { v: '108', k: 'locations answered for' }, { v: '889', k: 'hours on the phone' }]),
};

export const RESULTS = {
  'google-maps': { eyebrow: 'What good looks like', h: 'Real Google results, from real clients.', stats: [{ v: '0 → 8', k: 'Google reviews in 9 days · floor refinisher, PA' }, { v: '9 → 32', k: 'Google reviews · junk removal, CA' }, { v: '6 → 13', k: 'Maps top-10 spots in 10 weeks · teeth whitening, OR' }, { v: '401', k: 'review replies posted for clients' }], note: 'Names hidden. Measured from Google and our own records.' },
  seo: { eyebrow: 'What good looks like', h: 'Real ranking results, from real clients.', stats: [{ v: '6 → 13', k: 'Maps top-10 spots in 10 weeks · teeth whitening, OR' }, { v: '2 → 5', k: 'top-3 spots, same client' }, { v: '31 → 62', k: 'Google search views in 30 days · floor refinisher, PA' }, { v: '559', k: 'local articles written for clients' }], note: 'Names hidden. Measured from Google and our own scans.' },
  website: { eyebrow: 'What good looks like', h: 'Websites that bring in real work.', stats: [{ v: '7', k: 'real quote requests in two months · well driller, MI' }, { v: '43', k: 'client websites we write for' }, { v: '559', k: 'articles published on them' }, { v: 'Day one', k: 'when the website becomes yours' }], note: 'We read every form fill and count only real customers.' },
  leads: { eyebrow: 'What good looks like', h: 'Calls answered, for real businesses.', stats: [{ v: '4,867', k: 'calls answered · 3-store laundromat, San Diego area' }, { v: '2,279', k: 'calls answered · laundromat, Fort Worth' }, { v: '2,059', k: 'calls answered · laundromat, Westchester County' }, { v: '6,256', k: 'calls handed to staff, all clients, past year' }], note: 'Spam, abusive and wrong-number calls excluded.' },
};

export const COST = {
  'google-maps': [AUDIT.reviews, AUDIT.median, AUDIT.gaps],
  seo: [AUDIT.ai, { v: '1,000,000', k: 'searches a month for “plumber near me” alone', src: VOL_SOURCE }, AUDIT.noSite],
  website: [AUDIT.noSite, AUDIT.ai, { v: '$41', k: 'what advertisers pay for one click on “plumber near me”', src: VOL_SOURCE }],
  leads: [{ v: '$41', k: 'what advertisers pay for one click on “plumber near me”', src: VOL_SOURCE }, { v: '$60', k: 'for one click on “foundation repair near me”', src: VOL_SOURCE }, { v: '6,256', k: 'calls our assistant handed to a person on staff in the past year', src: 'WorkBuddy records, all clients' }],
};
