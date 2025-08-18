import { EventSchemas, Inngest } from 'inngest';

import { PasswordResetFunctionArgs } from '@/features/password/events/event-password-reset';

type Events = {
  'app/password.password-reset': PasswordResetFunctionArgs;
};

export const inngest = new Inngest({
  id: 'bounty-lane',
  schemas: new EventSchemas().fromRecord<Events>(),
});
