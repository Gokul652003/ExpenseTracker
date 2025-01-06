import type { Meta, StoryObj } from '@storybook/react';
import userAvatarPlaceholder from './assets/userAvatar.jpeg';

import { UserComponent } from './UserComponent';

const meta = {
  component: UserComponent,
} satisfies Meta<typeof UserComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userAvatar: userAvatarPlaceholder,
    userName: 'Monica',
    emailId: 'monica@gmail.com',
    isDashboardOpen: true,
  },
};
export const Close: Story = {
  args: {
    userAvatar: userAvatarPlaceholder,
    userName: 'Monica',
    emailId: 'monica@gmail.com',
    isDashboardOpen: false,
  },
};
