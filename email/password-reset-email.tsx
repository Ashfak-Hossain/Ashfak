import * as React from 'react';

import { ResetPasswordEmailProps } from '@/types/portfolio/data';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

export const ResetPasswordEmail = ({
  resetLink,
  name,
}: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>change your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Heading as="h1" style={heading}>
              Ashfak's Notebook
            </Heading>

            <Text style={text}>Hi {name ? ` ${name}` : ''},</Text>
            <Text style={text}>
              Someone recently requested a password change for your Ashfak's
              blog account. If this was you, you can set a new password here:
            </Text>
            <Button style={button} href={resetLink}>
              Reset password
            </Button>
            <Text style={text}>
              If you don&apos;t want to change your password or didn&apos;t
              request this, just ignore and delete this message.
            </Text>
            <Text style={text}>Happy Learning!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f6f9fc',
  padding: '10px 0',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #f0f0f0',
  padding: '45px',
};

const text = {
  fontSize: '16px',
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: '300',
  color: '#404040',
  lineHeight: '26px',
};

const button = {
  backgroundColor: '#007ee6',
  borderRadius: '4px',
  color: '#fff',
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: '15px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '210px',
  padding: '14px 7px',
};

const heading = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#007ee6',
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  marginBottom: '20px',
};
