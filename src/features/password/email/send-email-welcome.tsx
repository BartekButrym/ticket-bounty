import EmailWelcome from '@/emails/auth/email-welcome';
import { resend } from '@/lib/resend';

export const sendEmailWelcome = async (
  username: string,
  email: string,
  loginUrl: string
) => {
  return await resend.emails.send({
    from: 'no-reply@bounty-lane.com',
    to: email,
    subject: 'Welcome to BountyLane 🏆',
    react: <EmailWelcome toName={username} loginUrl={loginUrl} />,
  });
};
