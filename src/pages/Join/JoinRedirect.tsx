import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function JoinRedirect() {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    if (slug) {
      window.location.href = `https://glo-backend.vercel.app/api/membership?slug=${encodeURIComponent(slug)}`;
    }
  }, [slug]);

  return null;
}
