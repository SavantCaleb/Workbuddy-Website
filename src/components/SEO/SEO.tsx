import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: 'website' | 'article';
  image?: string;
  noindex?: boolean;
  keywords?: string;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: object | object[];
}

const BASE_URL = 'https://getworkbuddy.com';
const DEFAULT_TITLE = 'WorkBuddy - AI That Books Appointments For You';
const DEFAULT_DESCRIPTION = 'WorkBuddy is an AI-powered receptionist that follows up with leads by phone, text, and email until they book or say no. Never miss a lead again.';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

export const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  type = 'website',
  image = DEFAULT_IMAGE,
  noindex = false,
  keywords,
  publishedTime,
  modifiedTime,
  structuredData
}: SEOProps) => {
  const fullTitle = title ? `${title} | WorkBuddy` : DEFAULT_TITLE;
  const fullCanonical = canonical ? `${BASE_URL}${canonical}` : BASE_URL;

  const structuredDataArray = structuredData
    ? Array.isArray(structuredData) ? structuredData : [structuredData]
    : [];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="WorkBuddy" />

      {/* Article dates (for blog posts) */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonical} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Structured Data */}
      {structuredDataArray.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};
