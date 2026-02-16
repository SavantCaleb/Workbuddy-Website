import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import { LPSection, LPInner, LPHeadline, LPSubtext } from './primitives';

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;

  @media (min-width: 640px) {
    margin-bottom: 48px;
  }
`;

const TableScroll = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 16px;

  @media (min-width: 640px) {
    border-radius: 20px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(50, 74, 95, 0.06);

  @media (min-width: 640px) {
    border-radius: 20px;
  }

  thead tr {
    background: ${theme.colors.brand.slate};
    color: white;
  }

  th, td {
    padding: 18px 20px;
    text-align: center;
    font-size: 15px;
  }

  th:first-child, td:first-child {
    text-align: left;
    font-weight: 500;
  }

  tbody tr {
    border-bottom: 1px solid ${theme.colors.neutral.gray200};
  }

  tbody tr:last-child {
    border-bottom: none;
  }
`;

const WBHeader = styled.th`
  background: ${theme.colors.brand.azure} !important;
`;

const WBCell = styled.td`
  background: rgba(103, 183, 209, 0.06);
  color: ${theme.colors.brand.azure};
  font-weight: 600;
`;

const CheckSvg = ({ color = theme.colors.brand.azure }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const XSvg = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.colors.neutral.gray300} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const LightCheck = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.colors.neutral.gray400} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const Muted = styled.span`
  opacity: 0.5;
  font-size: 14px;
`;

export const ComparisonSection = () => (
  <LPSection>
    <LPInner>
      <Header>
        <LPHeadline>WorkBuddy vs. The Alternatives</LPHeadline>
        <LPSubtext>What you're really comparing against</LPSubtext>
      </Header>

      <TableScroll>
        <Table>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Feature</th>
              <WBHeader>WorkBuddy</WBHeader>
              <th>Answering Service</th>
              <th>Voicemail</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>24/7 Availability</td>
              <WBCell><CheckSvg /></WBCell>
              <td><LightCheck /></td>
              <td><LightCheck /></td>
            </tr>
            <tr>
              <td>Laundromat Expertise</td>
              <WBCell><CheckSvg /></WBCell>
              <td><XSvg /></td>
              <td><XSvg /></td>
            </tr>
            <tr>
              <td>Flat Monthly Rate</td>
              <WBCell><CheckSvg /></WBCell>
              <td><XSvg /></td>
              <td><LightCheck /></td>
            </tr>
            <tr>
              <td>Takes WDF Orders</td>
              <WBCell><CheckSvg /></WBCell>
              <td><XSvg /></td>
              <td><XSvg /></td>
            </tr>
            <tr>
              <td>Handles Refund Requests</td>
              <WBCell><CheckSvg /></WBCell>
              <td><Muted>Basic</Muted></td>
              <td><XSvg /></td>
            </tr>
            <tr>
              <td>POS Integration</td>
              <WBCell><CheckSvg /></WBCell>
              <td><XSvg /></td>
              <td><XSvg /></td>
            </tr>
            <tr>
              <td>Multilingual</td>
              <WBCell><CheckSvg /></WBCell>
              <td><Muted>Extra cost</Muted></td>
              <td><XSvg /></td>
            </tr>
          </tbody>
        </Table>
      </TableScroll>
    </LPInner>
  </LPSection>
);
