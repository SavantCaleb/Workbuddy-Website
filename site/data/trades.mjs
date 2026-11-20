// The 87 kinds of local business on the client map (homepage 11/18), grouped for the Industries tabs.
export const GROUPS = [
  { key: 'home', name: 'Home services', icon: 'home', blurb: 'Roofers, plumbers, well drillers, fence builders and every trade that keeps a house running.',
    trades: ['Roofing', 'Plumbing', 'HVAC', 'Electrical', 'General contracting', 'Remodeling', 'Concrete', 'Fencing', 'Landscaping', 'Tree service', 'Pressure washing', 'Painting', 'Handyman', 'Junk removal', 'Garage door repair', 'Pool service', 'Well drilling', 'Water damage restoration', 'Flooring', 'Floor refinishing', 'Foundation repair', 'Masonry', 'Drywall', 'Epoxy coatings', 'Windows', 'Window cleaning', 'Window treatments', 'House cleaning', 'Cleaning services', 'Janitorial', 'Air duct cleaning', 'Appliance repair', 'Chimney sweeping', 'Docks and lifts', 'Hydroseeding', 'Landscape design', 'Sprinkler systems', 'RV plumbing repair', 'Recycling and salvage', 'Waste management'] },
  { key: 'auto', name: 'Auto & transport', icon: 'car', blurb: 'Shops, mobile mechanics, towing, movers and couriers.',
    trades: ['Auto repair', 'Mobile auto repair', 'Auto body repair', 'Auto detailing', 'Towing', 'Moving', 'Trailer repair', 'Courier service', 'Shipping and mailing', 'Taxi service', 'Bike rentals'] },
  { key: 'health', name: 'Health & beauty', icon: 'heart', blurb: 'Chiropractors, counselors, salons, trainers and wellness studios.',
    trades: ['Chiropractic', 'Mental health counseling', 'Massage therapy', 'Hypnotherapy', 'Wellness centers', 'Personal training', 'Hair salons', 'Salon suites', 'Nails', 'Teeth whitening'] },
  { key: 'pro', name: 'Money & real estate', icon: 'brief', blurb: 'Insurance agents, lenders, realtors, appraisers and consultants.',
    trades: ['Insurance', 'Life insurance', 'Mortgage lending', 'Real estate', 'Real estate appraisal', 'Apartment communities', 'Credit repair', 'Consulting', 'Process serving', 'Barter exchange', 'Review management'] },
  { key: 'more', name: 'Events, pets & more', icon: 'calendar', blurb: 'Venues, DJs, caterers, dog trainers, campgrounds and laundromats.',
    trades: ['Event venues', 'Wedding venues', 'Catering', 'DJs', 'Wedding bands', 'Music lessons', 'Drum and bugle corps', 'Dog training', 'Cat breeding', 'Family campgrounds', 'Hunting lodging', 'Billiards and pool tables', 'Air filters', 'Psychic readings', 'Laundromats'] },
];
export const TRADE_COUNT = GROUPS.reduce((n, g) => n + g.trades.length, 0);
if (TRADE_COUNT !== 87) throw new Error('trades: expected 87, got ' + TRADE_COUNT);
