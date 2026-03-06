import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'mxme2hr3',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_WRITE_TOKEN, // Ensure this token is set in your environment
  useCdn: false
});

const tiers = [
  {
    _type: 'pricingTier',
    serviceCategory: 'marketing',
    tierName: 'Performance Marketing',
    description: 'Full-Funnel Meta Ads, A/B Creative Testing, Cross-Platform Strategy',
    prices: { US: '$1,800', IN: '₹40,000', GCC: '$1,000', EUR: '€1,200' },
    period: '/ mo',
    features: ['Full-Funnel Meta Ads', 'A/B Creative Testing', 'Cross-Platform Strategy'],
    isPopular: false,
    orderRank: 1
  },
  {
    _type: 'pricingTier',
    serviceCategory: 'marketing',
    tierName: 'Social Media & Content Marketing',
    description: 'Content Strategy, Social Audits, Community Management, Calendar Creation',
    prices: { US: '$1,200', IN: '₹35,000', GCC: '$800', EUR: '€1,000' },
    period: '/ mo',
    features: ['Content Strategy', 'Social Audits', 'Community Management', 'Calendar Creation'],
    isPopular: false,
    orderRank: 2
  },
  {
    _type: 'pricingTier',
    serviceCategory: 'marketing',
    tierName: 'Analytics & Marketing Automation',
    description: 'Custom Reporting Dashboards, Lead Scoring Pixel, CRM Integration',
    prices: { US: '$1,000', IN: '₹25,000', GCC: '$500', EUR: '€800' },
    period: '/ mo',
    features: ['Custom Reporting Dashboards', 'Lead Scoring Pixel', 'CRM Integration'],
    isPopular: false,
    orderRank: 3
  },
  {
    _type: 'pricingTier',
    serviceCategory: 'marketing',
    tierName: 'The "Revenue Acceleration" Package',
    description: 'Pillars 1, 2, and 3 Bundled Together (Saves the client ~20%)',
    prices: { US: '$2,450', IN: '₹70,000', GCC: '$1,450', EUR: '€1,950' },
    period: '/ mo',
    features: ['Performance Marketing', 'Social Media & Content', 'Analytics & Automation'],
    isPopular: true,
    orderRank: 4
  },
  {
    _type: 'pricingTier',
    serviceCategory: 'marketing',
    tierName: 'Add-On: SEO (Organic Dominance)',
    description: 'Tech Audits, Link Building, Keyword Intent Strategy, On-Page SEO',
    prices: { US: '+ $1,200', IN: '+ ₹30,000', GCC: '+ $700', EUR: '+ €900' },
    period: '/ mo',
    features: ['Tech Audits', 'Link Building', 'Keyword Intent Strategy', 'On-Page SEO'],
    isPopular: false,
    orderRank: 5
  }
];

async function migrateData() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("Please export SANITY_API_WRITE_TOKEN in your terminal before running this script.");
    process.exit(1);
  }

  console.log("Starting Sanity Migration for Marketing Tiers...");

  // Optional: Clean up existing marketing tiers first
  // const existing = await client.fetch('*[_type == "pricingTier" && serviceCategory == "marketing"]');
  // for (const doc of existing) {
  //   await client.delete(doc._id);
  //   console.log(`Deleted existing tier: ${doc.tierName}`);
  // }

  // Insert the new tiers
  for (const tier of tiers) {
    const doc = {
      _type: tier._type,
      serviceCategory: tier.serviceCategory,
      tierName: tier.tierName,
      description: tier.description,
      priceUSD: tier.prices.US,
      priceINR: tier.prices.IN,
      priceGCC: tier.prices.GCC,
      priceEUR: tier.prices.EUR,
      period: tier.period,
      features: tier.features,
      isPopular: tier.isPopular,
      orderRank: tier.orderRank
    };
    
    try {
      const dbDoc = await client.create(doc);
      console.log(`Created new tier: ${dbDoc.tierName}`);
    } catch (e) {
      console.error(`Error adding ${tier.tierName}:`, e.message);
    }
  }

  console.log("Done!");
}

migrateData();
