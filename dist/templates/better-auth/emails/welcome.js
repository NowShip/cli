import { Body, Container, Head, Heading, Html, Img, Link, Preview, Text, Tailwind, Hr, } from "@react-email/components";
import * as React from "react";
export const WelcomeEmail = ({ name = "there" }) => (<Html>
    <Head />
    <Preview>Welcome to our platform! We're excited to have you</Preview>
    <Tailwind>
      <Body className="mx-auto my-auto bg-gray-50 font-sans">
        <Container className="mx-auto mt-8 mb-8 max-w-[600px] rounded-lg bg-white p-8 shadow-sm">
          <Img src={`https://www.alisamadii.com/_next/image?url=%2Fmy-image.png&w=256&q=75`} width="48" height="48" alt="Logo" className="mb-8 rounded-full"/>
          <Heading className="mb-6 text-3xl font-bold text-gray-800">
            Welcome aboard, {name}! 🎉
          </Heading>
          <Text className="mb-4 text-lg text-gray-600">
            We're thrilled to have you join our community. Get ready to explore
            all the amazing features we have to offer.
          </Text>
          <Text className="mb-6 text-gray-600">
            Here are a few things you can do to get started:
          </Text>
          <ul className="mb-6 list-disc pl-6 text-gray-600">
            <li className="mb-2">Complete your profile</li>
            <li className="mb-2">Explore our documentation</li>
            <li className="mb-2">Join our community</li>
          </ul>
          <Link href="https://alisamadii.com/dashboard" target="_blank" className="mb-8 inline-block rounded-md bg-black px-8 py-4 font-medium text-white no-underline hover:bg-blue-700">
            Get Started
          </Link>
          <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]"/>
          <Text className="text-sm text-gray-500">
            Need help? Just reply to this email - we're always here to help!
          </Text>
          <Text className="text-sm text-gray-500">
            <Link href="https://alisamadii.com" target="_blank" className="text-primary no-underline hover:underline">
              alisamadii.com
            </Link>{" "}
            — your complete solution for modern web applications
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>);
WelcomeEmail.PreviewProps = {
    name: "John Doe",
};
export default WelcomeEmail;
