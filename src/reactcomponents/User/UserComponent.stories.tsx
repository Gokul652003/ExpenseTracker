import type { Meta, StoryObj } from '@storybook/react';
import useravatar from './assets/useravatar.jpeg';

import { UserComponent } from './UserComponent';

const meta = {
  component: UserComponent,
} satisfies Meta<typeof UserComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    useravatar: useravatar,
    username: 'Monica',
    emailid: 'monica@gmail.com',
    showname: true,
  },
};
