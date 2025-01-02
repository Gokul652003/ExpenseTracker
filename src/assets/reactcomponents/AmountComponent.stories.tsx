 import type { Meta, StoryObj } from '@storybook/react';

import AmountComponent from './AmountComponent';

const meta = {
  component: AmountComponent,
} satisfies Meta<typeof AmountComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};