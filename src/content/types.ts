import type { ComponentType } from 'react';

export type ArticleTier = 0 | 1 | 2 | 3 | 4;

export type ArticleCategory =
  | 'AI & Automation'
  | 'Operations'
  | 'Business'
  | 'Marketing'
  | 'Technology';

export type CTAType = 'demo' | 'pricing' | 'contact';

export interface ArticleMetadata {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  keywords: string[];
  tier: ArticleTier;
  category: ArticleCategory;
  publishDate: string;
  modifiedDate: string;
  readTime: number;
  relatedSlugs: string[];
  ctaType: CTAType;
}

export interface ArticleEntry extends ArticleMetadata {
  component: ComponentType;
}
