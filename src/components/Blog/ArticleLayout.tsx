import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { SEO } from '../SEO/SEO';
import { Navbar } from '../Shared/Navbar';
import { Footer } from '../Shared/Footer';
import { Container } from '../Shared/Layout';
import { CTABanner } from './CTABanner';
import { RelatedArticles } from './RelatedArticles';
import type { ArticleMetadata } from '../../content/types';

const ArticleWrapper = styled.div`
  padding-top: 100px;
  padding-bottom: 80px;
`;

const Breadcrumbs = styled.nav`
  font-size: 14px;
  color: ${theme.colors.text.tertiary};
  margin-bottom: 32px;

  a {
    color: ${theme.colors.text.tertiary};
    text-decoration: none;
    &:hover { color: ${theme.colors.brand.azure}; }
  }

  span { margin: 0 8px; }
`;

const ArticleHeader = styled.header`
  max-width: 720px;
  margin: 0 auto 48px;
`;

const Category = styled.span`
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${theme.colors.brand.azure};
  margin-bottom: 16px;
  display: inline-block;
`;

const Title = styled.h1`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: clamp(32px, 4vw, 44px);
  font-weight: 600;
  color: ${theme.colors.brand.slate};
  line-height: 1.2;
  margin-bottom: 20px;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  color: ${theme.colors.text.tertiary};
  flex-wrap: wrap;
`;

const MetaDot = styled.span`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: ${theme.colors.text.tertiary};
`;

const ArticleContent = styled.article`
  max-width: 720px;
  margin: 0 auto;

  h2 {
    font-family: ${theme.typography.fontFamily.heading};
    font-size: 28px;
    font-weight: 600;
    color: ${theme.colors.brand.slate};
    margin: 48px 0 20px;
    line-height: 1.3;
  }

  h3 {
    font-family: ${theme.typography.fontFamily.heading};
    font-size: 22px;
    font-weight: 600;
    color: ${theme.colors.brand.slate};
    margin: 36px 0 16px;
    line-height: 1.3;
  }

  p {
    font-size: 17px;
    line-height: 1.8;
    color: ${theme.colors.text.secondary};
    margin-bottom: 20px;
  }

  ul, ol {
    margin: 16px 0 24px 24px;
    color: ${theme.colors.text.secondary};
    line-height: 1.8;
    font-size: 17px;

    li {
      margin-bottom: 8px;
    }
  }

  blockquote {
    border-left: 4px solid ${theme.colors.brand.azure};
    padding: 16px 24px;
    margin: 32px 0;
    background: ${theme.colors.brand.azure}08;
    border-radius: 0 8px 8px 0;

    p {
      color: ${theme.colors.brand.slate};
      font-style: italic;
      margin-bottom: 0;
    }
  }

  strong {
    color: ${theme.colors.brand.slate};
    font-weight: 600;
  }

  a {
    color: ${theme.colors.brand.azure};
    text-decoration: underline;
    text-underline-offset: 2px;
    &:hover { opacity: 0.8; }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 24px 0;
    font-size: 15px;

    th, td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid ${theme.colors.brand.slate}12;
    }

    th {
      font-weight: 600;
      color: ${theme.colors.brand.slate};
      background: ${theme.colors.surface.primary};
    }

    td {
      color: ${theme.colors.text.secondary};
    }
  }
`;

const AuthorSection = styled.div`
  max-width: 720px;
  margin: 48px auto 0;
  padding: 32px;
  background: ${theme.colors.surface.primary};
  border-radius: 16px;
  display: flex;
  gap: 20px;
  align-items: center;

  @media (max-width: 640px) {
    flex-direction: column;
    text-align: center;
  }
`;

const AuthorAvatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${theme.colors.brand.azure}20;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-weight: 700;
  color: ${theme.colors.brand.azure};
  font-size: 20px;
`;

const AuthorInfo = styled.div`
  h4 {
    font-size: 16px;
    font-weight: 600;
    color: ${theme.colors.brand.slate};
    margin-bottom: 4px;
  }

  p {
    font-size: 14px;
    color: ${theme.colors.text.secondary};
    line-height: 1.5;
  }
`;

interface ArticleLayoutProps {
  article: ArticleMetadata;
  relatedArticles: ArticleMetadata[];
  children: React.ReactNode;
}

export const ArticleLayout = ({ article, relatedArticles, children }: ArticleLayoutProps) => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://getworkbuddy.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://getworkbuddy.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `https://getworkbuddy.com/blog/${article.slug}`
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "author": {
      "@type": "Person",
      "name": "Caleb Benedict"
    },
    "publisher": {
      "@type": "Organization",
      "name": "WorkBuddy",
      "logo": {
        "@type": "ImageObject",
        "url": "https://getworkbuddy.com/favicon.png"
      }
    },
    "datePublished": article.publishDate,
    "dateModified": article.modifiedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://getworkbuddy.com/blog/${article.slug}`
    }
  };

  const formattedDate = new Date(article.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <SEO
        title={article.seoTitle}
        description={article.description}
        canonical={`/blog/${article.slug}`}
        type="article"
        keywords={article.keywords.join(', ')}
        publishedTime={article.publishDate}
        modifiedTime={article.modifiedDate}
        structuredData={[articleSchema, breadcrumbSchema]}
      />
      <Navbar />

      <ArticleWrapper>
        <Container>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <Breadcrumbs>
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/blog">Blog</Link>
              <span>/</span>
              {article.title}
            </Breadcrumbs>
          </div>

          <ArticleHeader>
            <Category>{article.category}</Category>
            <Title>{article.title}</Title>
            <Meta>
              <span>By Caleb Benedict</span>
              <MetaDot />
              <span>{formattedDate}</span>
              <MetaDot />
              <span>{article.readTime} min read</span>
            </Meta>
          </ArticleHeader>

          <ArticleContent>
            {children}
          </ArticleContent>

          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <CTABanner type={article.ctaType} />
          </div>

          <AuthorSection>
            <AuthorAvatar>CB</AuthorAvatar>
            <AuthorInfo>
              <h4>Caleb Benedict</h4>
              <p>Founder of WorkBuddy. Built AI phone systems for 100+ laundromat locations. Passionate about helping small businesses leverage AI to compete with the big guys.</p>
            </AuthorInfo>
          </AuthorSection>

          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <RelatedArticles articles={relatedArticles} />
          </div>
        </Container>
      </ArticleWrapper>

      <Footer />
    </>
  );
};
