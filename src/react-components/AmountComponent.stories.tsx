import type { Meta, StoryObj } from '@storybook/react';

import { AmountComponent } from './AmountComponent';

const meta = {
  component: AmountComponent,
  title: 'Components/AmoutComponent',
} satisfies Meta<typeof AmountComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: '#564781',
    label: 'Business',
    amount: 2345,
  },
};
