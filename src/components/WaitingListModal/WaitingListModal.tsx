import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Button } from '../Button/Button';

interface WaitingListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(${theme.blur.md});
  -webkit-backdrop-filter: blur(${theme.blur.md});
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.l};
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all ${theme.transitions.normal};
`;

const ModalContent = styled.div<{ isOpen: boolean }>`
  background: ${theme.colors.surface.primary};
  border-radius: ${theme.borderRadius.xxxl};
  padding: ${theme.spacing.xxxxl} ${theme.spacing.xxxl};
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${theme.shadows.xl};
  position: relative;
  transform: ${props => props.isOpen ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.95)'};
  transition: all ${theme.transitions.normal};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xxxl} ${theme.spacing.l};
    margin: ${theme.spacing.l};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing.l};
  right: ${theme.spacing.l};
  background: none;
  border: none;
  font-size: 24px;
  color: ${theme.colors.neutral.tertiary};
  cursor: pointer;
  padding: ${theme.spacing.s};
  border-radius: 50%;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    background: ${theme.colors.surface.secondary};
    color: ${theme.colors.neutral.label};
  }
`;

const ModalTitle = styled.h2`
  font-size: ${theme.typography.sizes.title2.desktop};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.neutral.label};
  text-align: center;
  margin-bottom: ${theme.spacing.m};
  letter-spacing: -0.020em;
`;

const ModalSubtitle = styled.p`
  font-size: ${theme.typography.sizes.body.desktop};
  color: ${theme.colors.neutral.secondary};
  text-align: center;
  margin-bottom: ${theme.spacing.xxxl};
  line-height: ${theme.typography.lineHeight.relaxed};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.l};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.s};
`;

const Label = styled.label`
  font-size: ${theme.typography.sizes.subhead.desktop};
  font-weight: ${theme.typography.weights.medium};
  color: ${theme.colors.neutral.label};
`;

const Input = styled.input`
  font-family: ${theme.typography.fontFamily};
  font-size: ${theme.typography.sizes.body.desktop};
  padding: ${theme.spacing.m} ${theme.spacing.l};
  border: 1px solid ${theme.colors.neutral.gray300};
  border-radius: ${theme.borderRadius.l};
  background: ${theme.colors.surface.primary};
  color: ${theme.colors.neutral.label};
  transition: all ${theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.blue};
    box-shadow: 0 0 0 3px ${theme.colors.primary.blue}20;
  }
  
  &::placeholder {
    color: ${theme.colors.neutral.tertiary};
  }
`;

const Select = styled.select`
  font-family: ${theme.typography.fontFamily};
  font-size: ${theme.typography.sizes.body.desktop};
  padding: ${theme.spacing.m} ${theme.spacing.l};
  border: 1px solid ${theme.colors.neutral.gray300};
  border-radius: ${theme.borderRadius.l};
  background: ${theme.colors.surface.primary};
  color: ${theme.colors.neutral.label};
  transition: all ${theme.transitions.fast};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.blue};
    box-shadow: 0 0 0 3px ${theme.colors.primary.blue}20;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.m};
  margin-top: ${theme.spacing.l};
`;

const Checkbox = styled.input`
  margin-top: 4px;
  accent-color: ${theme.colors.primary.blue};
`;

const CheckboxLabel = styled.label`
  font-size: ${theme.typography.sizes.footnote.desktop};
  color: ${theme.colors.neutral.secondary};
  line-height: ${theme.typography.lineHeight.relaxed};
  cursor: pointer;
  
  a {
    color: ${theme.colors.primary.blue};
    text-decoration: none;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;

const SubmitButton = styled(Button)`
  margin-top: ${theme.spacing.l};
  width: 100%;
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxxl} 0;
  
  h3 {
    font-size: ${theme.typography.sizes.title3.desktop};
    font-weight: ${theme.typography.weights.semibold};
    color: ${theme.colors.accent.green};
    margin-bottom: ${theme.spacing.m};
  }
  
  p {
    font-size: ${theme.typography.sizes.body.desktop};
    color: ${theme.colors.neutral.secondary};
    line-height: ${theme.typography.lineHeight.relaxed};
  }
`;

const businessTypes = [
  'Select your business type',
  'Restaurant/Food Service',
  'Retail Store',
  'Professional Services',
  'Healthcare/Medical',
  'Automotive',
  'Home Services',
  'Legal Services',
  'Real Estate',
  'Salon/Beauty',
  'Other'
];

export const WaitingListModal: React.FC<WaitingListModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    currentChallenges: ''
  });
  const [smsConsent, setSmsConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Waiting list submission:', { ...formData, smsConsent });
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success
    setTimeout(() => {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        businessName: '',
        businessType: '',
        currentChallenges: ''
      });
      setSmsConsent(false);
      setIsSubmitted(false);
      onClose();
    }, 3000);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (isSubmitted) {
    return (
      <ModalOverlay isOpen={isOpen} onClick={handleOverlayClick}>
        <ModalContent isOpen={isOpen}>
          <CloseButton onClick={onClose}>×</CloseButton>
          <SuccessMessage>
            <h3>You're on the list! 🎉</h3>
            <p>
              We'll notify you as soon as Work Buddy is ready. 
              You'll be among the first to never miss another customer.
            </p>
          </SuccessMessage>
        </ModalContent>
      </ModalOverlay>
    );
  }

  return (
    <ModalOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContent isOpen={isOpen}>
        <CloseButton onClick={onClose}>×</CloseButton>
        
        <ModalTitle>Join the Waiting List</ModalTitle>
        <ModalSubtitle>
          Be among the first to never miss another customer. 
          We'll notify you when Work Buddy is ready.
        </ModalSubtitle>

        <Form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: theme.spacing.l }}>
            <FormGroup>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                placeholder="John"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                placeholder="Smith"
              />
            </FormGroup>
          </div>

          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="john@yourbusiness.com"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="(203) 555-0123"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              required
              placeholder="Smith's Auto Repair"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="businessType">Business Type</Label>
            <Select
              id="businessType"
              name="businessType"
              value={formData.businessType}
              onChange={handleInputChange}
              required
            >
              {businessTypes.map((type, index) => (
                <option key={index} value={index === 0 ? '' : type} disabled={index === 0}>
                  {type}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="currentChallenges">Current Phone/Customer Challenges (Optional)</Label>
            <Input
              type="text"
              id="currentChallenges"
              name="currentChallenges"
              value={formData.currentChallenges}
              onChange={handleInputChange}
              placeholder="Missing calls after hours, can't answer during busy times..."
            />
          </FormGroup>

          <CheckboxGroup>
            <Checkbox
              type="checkbox"
              id="smsConsent"
              checked={smsConsent}
              onChange={(e) => setSmsConsent(e.target.checked)}
              required
            />
            <CheckboxLabel htmlFor="smsConsent">
              By providing your phone number, you consent to receive SMS messages from Work Buddy about product updates and launch notifications. 
              Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. 
              View our <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms of Service</a>.
            </CheckboxLabel>
          </CheckboxGroup>

          <SubmitButton 
            type="submit" 
            size="large" 
            disabled={isSubmitting || !smsConsent}
          >
            {isSubmitting ? 'Joining...' : 'Join Waiting List'}
          </SubmitButton>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};