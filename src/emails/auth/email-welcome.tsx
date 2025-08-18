import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

type EmailWelcomeProps = {
  toName: string;
  loginUrl: string;
};

const EmailWelcome = ({ toName, loginUrl }: EmailWelcomeProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="font-sans m-8 text-center">
          <Container>
            <Section>
              <Text>Hi {toName}, welcome to BountyLane 🏆 !</Text>
            </Section>
            <Section>
              <Text>
                We&apos;re excited to have you on board. Let us know if you ever
                have questions!
              </Text>
            </Section>
            <Section>
              <Button
                href={loginUrl}
                className="bg-black rounded text-white p-2 m-2"
              >
                Get Started
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailWelcome.PreviewProps = {
  toName: 'John Doe',
  loginUrl: 'http://localhost:3000/sign-in',
};

export default EmailWelcome;
