import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
  Tailwind,
  Hr,
} from "@react-email/components";
import * as React from "react";

interface VerifyEmailProps {
  url?: string;
}

export const VerifyEmail = ({ url }: VerifyEmailProps) => (
  <Html>
    <Head />
    <Preview>Verify your email address for your account</Preview>
    <Tailwind>
      <Body className="mx-auto my-auto bg-gray-50 font-sans">
        <Container className="mx-auto mt-8 mb-8 max-w-[600px] rounded-lg bg-white p-8 shadow-sm">
          <Img
            src={`https://www.alisamadii.com/_next/image?url=%2Fmy-image.png&w=256&q=75`}
            width="40"
            height="40"
            alt="Logo"
            className="mb-6 rounded-full"
          />
          <Heading className="mb-4 text-2xl font-bold text-gray-800">
            Verify your email address
          </Heading>
          <Text className="mb-6 text-gray-600">
            Thanks for signing up! Please verify your email address by clicking
            the button below.
          </Text>
          <Link
            href={url}
            target="_blank"
            className="mb-6 inline-block rounded-md bg-black px-6 py-3 font-medium text-white no-underline hover:bg-blue-700"
          >
            Verify Email Address
          </Link>
          <Text className="mb-2 text-gray-600">
            If the button doesn't work, copy and paste this link in your
            browser:
          </Text>
          <code className="mb-8 block rounded-md bg-gray-100 p-3 text-sm break-all text-gray-800">
            {url}
          </code>
          <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
          <Text className="text-sm text-gray-500">
            <Link
              href="https://alisamadii.com"
              target="_blank"
              className="text-primary no-underline hover:underline"
            >
              alisamadii.com
            </Link>{" "}
            — your complete solution for modern web applications
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

VerifyEmail.PreviewProps = {
  url: "https://alisamadii.com",
} as VerifyEmailProps;

export default VerifyEmail;
