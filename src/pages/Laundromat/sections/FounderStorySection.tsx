import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import { LPSection, LPInner, LPHeadline, LPGrid } from './primitives';

const VideoWrapper = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(50, 74, 95, 0.12);

  @media (min-width: 640px) {
    border-radius: 20px;
  }

  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const VideoCaption = styled.p`
  margin-top: 12px;
  font-size: 13px;
  color: ${theme.colors.text.tertiary};
  text-align: center;

  a {
    color: ${theme.colors.brand.azure};
    text-decoration: none;
  }
`;

const Paragraph = styled.p`
  font-size: 17px;
  line-height: 1.7;
  color: ${theme.colors.text.secondary};
  margin-bottom: 20px;
`;

const Blockquote = styled.blockquote`
  border-left: 4px solid ${theme.colors.brand.azure};
  padding-left: 24px;
  margin: 28px 0 0;
  font-style: italic;
  font-size: 17px;
  color: ${theme.colors.brand.slate};
  line-height: 1.6;
`;

export const FounderStorySection = () => (
  <LPSection $alt>
    <LPInner>
      <LPGrid style={{ alignItems: 'center' }}>
        <div>
          <LPHeadline>Built by Someone Who's Done This Before</LPHeadline>
          <Paragraph>
            WorkBuddy was created by <strong style={{ color: theme.colors.brand.slate }}>Caleb Benedict</strong>, who previously built "Bella"—an AI receptionist that handled <strong style={{ color: theme.colors.brand.slate }}>over 75,000 calls</strong> across <strong style={{ color: theme.colors.brand.slate }}>100+ laundromat locations</strong> nationwide over 3+ years.
          </Paragraph>
          <Paragraph>
            Caleb spent years learning what laundromat customers actually call about. The refund requests. The "is my laundry ready?" calls at 9pm. The emergencies at 2am. He built Bella to solve these problems. Now he's taking everything he learned and making it available to you.
          </Paragraph>
          <Blockquote>
            "Most laundromat owners don't need more calls answered—they need fewer problems reaching them."
          </Blockquote>
        </div>
        <div>
          <VideoWrapper>
            <iframe
              src="https://www.youtube.com/embed/PmPujFIuZzo"
              title="Interview with Caleb Benedict - Clean Show 2025"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </VideoWrapper>
          <VideoCaption>
            Interview with Caleb Benedict at Clean Show 2025 — via{' '}
            <a
              href="https://www.youtube.com/watch?v=PmPujFIuZzo"
              target="_blank"
              rel="noopener noreferrer"
            >
              Splash Em' Out Laundry
            </a>
          </VideoCaption>
        </div>
      </LPGrid>
    </LPInner>
  </LPSection>
);
