import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { SEO } from '../../components/SEO/SEO';
import { Navbar } from '../../components/Shared/Navbar';
import { Footer } from '../../components/Shared/Footer';
import { Container } from '../../components/Shared/Layout';

const NotFoundWrapper = styled.main`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 0 80px;
`;

const Content = styled.div`
  text-align: center;
  max-width: 500px;
`;

const Code = styled.div`
  font-size: 120px;
  font-weight: 800;
  font-family: ${theme.typography.fontFamily.heading};
  color: ${theme.colors.brand.azure}20;
  line-height: 1;
  margin-bottom: 8px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  font-family: ${theme.typography.fontFamily.heading};
  color: ${theme.colors.brand.slate};
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 17px;
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: 32px;
`;

const HomeLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 14px 28px;
  background: ${theme.colors.brand.azure};
  color: white;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const NotFound = () => {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Head back to the WorkBuddy homepage."
        noindex={true}
      />
      <Navbar />
      <NotFoundWrapper>
        <Container>
          <Content>
            <Code>404</Code>
            <Title>Page not found</Title>
            <Description>
              The page you're looking for doesn't exist or has been moved.
              Let's get you back on track.
            </Description>
            <HomeLink to="/">Back to Homepage</HomeLink>
          </Content>
        </Container>
      </NotFoundWrapper>
      <Footer />
    </>
  );
};
