import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
}

export const ContactFormEmail = ({
  name,
  email,
  message,
}: ContactFormEmailProps) => (
  <Html>
    <Head />
    <Preview>New Contact Form Submission</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={title}>New Contact Form Submission</Text>
        <Text style={paragraph}>
          A user has submitted a message through the contact form. Below are the
          details:
        </Text>
        <Section style={detailsContainer}>
          <Text style={details}>
            <strong>Name:</strong> {name || "Not provided"}
          </Text>
          <Text style={details}>
            <strong>Email:</strong> {email || "Not provided"}
          </Text>
          <Text style={details}>
            <strong>Message:</strong>
          </Text>
          <Text style={messageStyle}>{message || "No message provided."}</Text>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>
          Please respond to the user at the provided email address. This message
          was submitted via the contact form.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ContactFormEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 24px",
  maxWidth: "600px",
  border: `1px solid #eeeeee`,
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
};

const title = {
  fontSize: "20px",
  color: "#31B44C",
  fontWeight: "bold" as const,
  marginBottom: "16px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#333333",
  marginBottom: "24px",
};

const detailsContainer = {
  backgroundColor: "#f9f9f9",
  padding: "16px",
  borderRadius: "8px",
};

const details = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#555555",
  marginBottom: "8px",
};

const messageStyle = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#333333",
  marginTop: "8px",
  whiteSpace: "pre-wrap" as const, // Ensures line breaks are preserved
};

const hr = {
  borderColor: "#eeeeee",
  margin: "16px 0",
};

const footer = {
  fontSize: "12px",
  lineHeight: "18px",
  color: "#888888",
  textAlign: "center" as const,
};
