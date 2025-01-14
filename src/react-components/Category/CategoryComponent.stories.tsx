import type { Meta, StoryObj } from '@storybook/react';

import { CategoryComponent } from './CategoryComponent';

const meta = {
  component: CategoryComponent,
} satisfies Meta<typeof CategoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: '#8631E1',
    label: 'Personal',
  },
};
