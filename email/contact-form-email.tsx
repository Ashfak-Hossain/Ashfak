import React from 'react';

import { ContactFormEmailProps } from '@/types/data';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

const ContactFormEmail = ({
  name,
  message,
  senderEmail,
}: ContactFormEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New message from your portfolio site</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black">
          <Container>
            <Section className="my-10 rounded-md bg-white px-10 py-4">
              <Heading className="leading-tight">
                You received the message from the contact form
              </Heading>
              <Text>{message}</Text>
              <Hr />
              <Text>The sender's name :{name}</Text>
              <Text>The sender's email is :{senderEmail}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactFormEmail;
