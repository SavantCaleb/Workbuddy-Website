import React, { Suspense } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getArticleBySlug, getRelatedArticles } from '../../content/articles';
import { ArticleLayout } from '../../components/Blog/ArticleLayout';

export const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const relatedArticles = getRelatedArticles(article.relatedSlugs);
  const ContentComponent = article.component;

  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <ArticleLayout article={article} relatedArticles={relatedArticles}>
        <ContentComponent />
      </ArticleLayout>
    </Suspense>
  );
};
