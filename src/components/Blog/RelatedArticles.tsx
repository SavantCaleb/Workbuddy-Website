import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import type { ArticleMetadata } from '../../content/types';

const Section = styled.div`
  margin-top: 64px;
  padding-top: 48px;
  border-top: 1px solid ${theme.colors.brand.slate}12;
`;

const SectionTitle = styled.h3`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: 24px;
  font-weight: 600;
  color: ${theme.colors.brand.slate};
  margin-bottom: 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled(Link)`
  background: ${theme.colors.surface.primary};
  border-radius: 12px;
  padding: 24px;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid ${theme.colors.brand.slate}08;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(50, 74, 95, 0.08);
  }
`;

const CardCategory = styled.span`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${theme.colors.brand.azure};
  margin-bottom: 8px;
  display: block;
`;

const CardTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.brand.slate};
  line-height: 1.4;
  margin-bottom: 8px;
`;

const CardMeta = styled.span`
  font-size: 13px;
  color: ${theme.colors.text.tertiary};
`;

interface RelatedArticlesProps {
  articles: ArticleMetadata[];
}

export const RelatedArticles = ({ articles }: RelatedArticlesProps) => {
  if (articles.length === 0) return null;

  return (
    <Section>
      <SectionTitle>Related Articles</SectionTitle>
      <Grid>
        {articles.slice(0, 3).map((article) => (
          <Card key={article.slug} to={`/blog/${article.slug}`}>
            <CardCategory>{article.category}</CardCategory>
            <CardTitle>{article.title}</CardTitle>
            <CardMeta>{article.readTime} min read</CardMeta>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};
