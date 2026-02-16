import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { SEO } from '../../components/SEO/SEO';
import { Navbar } from '../../components/Shared/Navbar';
import { Footer } from '../../components/Shared/Footer';
import { Section, Container, Badge } from '../../components/Shared/Layout';
import { articles } from '../../content/articles';
import type { ArticleCategory } from '../../content/types';

const blogStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "WorkBuddy Blog",
    "description": "Guides and insights on laundromat AI, automation, operations, and business growth.",
    "url": "https://getworkbuddy.com/blog"
  },
  {
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
      }
    ]
  }
];

const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 48px;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  padding: 8px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.$active ? theme.colors.brand.azure : theme.colors.brand.slate + '08'};
  color: ${props => props.$active ? 'white' : theme.colors.text.secondary};

  &:hover {
    background: ${props => props.$active ? theme.colors.brand.azure : theme.colors.brand.slate + '15'};
  }
`;

const ArticleGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ArticleCard = styled(Link)`
  background: white;
  border-radius: 16px;
  padding: 28px;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid ${theme.colors.brand.slate}08;
  box-shadow: 0 2px 12px rgba(50, 74, 95, 0.04);
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(50, 74, 95, 0.1);
  }
`;

const CardCategory = styled.span`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${theme.colors.brand.azure};
  margin-bottom: 12px;
`;

const CardTitle = styled.h3`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.brand.slate};
  line-height: 1.4;
  margin-bottom: 12px;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: 16px;
  flex: 1;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: ${theme.colors.text.tertiary};
`;

const MetaDot = styled.span`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: ${theme.colors.text.tertiary};
`;

const categories: (ArticleCategory | 'All')[] = ['All', 'AI & Automation', 'Operations', 'Business', 'Marketing', 'Technology'];

export const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | 'All'>('All');

  const filteredArticles = activeCategory === 'All'
    ? articles
    : articles.filter(a => a.category === activeCategory);

  return (
    <>
      <SEO
        title="Laundromat AI & Automation Guides"
        description="Expert guides on laundromat AI, phone automation, operations, marketing, and business growth. Written by operators, for operators."
        canonical="/blog"
        keywords="laundromat technology, laundromat automation, laundromat business guide, AI receptionist guide"
        structuredData={blogStructuredData}
      />
      <Navbar />

      <Section style={{ paddingTop: 120 }}>
        <Container style={{ textAlign: 'center' }}>
          <Badge>Resources</Badge>
          <h1 style={{ fontSize: 'clamp(40px, 5vw, 56px)', fontWeight: 500, color: theme.colors.brand.slate, fontFamily: theme.typography.fontFamily.heading, marginBottom: 24 }}>
            The WorkBuddy Blog
          </h1>
          <p style={{ fontSize: 20, color: theme.colors.text.secondary, maxWidth: 600, margin: '0 auto 40px' }}>
            Guides and insights on running, automating, and growing your laundromat business.
          </p>

          <FilterContainer>
            {categories.map(cat => (
              <FilterButton
                key={cat}
                $active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </FilterButton>
            ))}
          </FilterContainer>
        </Container>
      </Section>

      <Section style={{ paddingTop: 0, paddingBottom: 120 }}>
        <Container>
          <ArticleGrid>
            {filteredArticles.map(article => (
              <ArticleCard key={article.slug} to={`/blog/${article.slug}`}>
                <CardCategory>{article.category}</CardCategory>
                <CardTitle>{article.title}</CardTitle>
                <CardDescription>{article.description}</CardDescription>
                <CardMeta>
                  <span>{article.readTime} min read</span>
                  <MetaDot />
                  <span>{new Date(article.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </CardMeta>
              </ArticleCard>
            ))}
          </ArticleGrid>
        </Container>
      </Section>

      <Footer />
    </>
  );
};
