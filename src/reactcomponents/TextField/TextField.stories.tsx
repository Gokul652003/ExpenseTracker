import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';

type Story = StoryObj<typeof TextField>;

const meta: Meta<typeof TextField> = {
  title: 'react/Components/TextField',
  component: TextField,
  decorators: [(Story) => <Story />],
  argTypes: {
    variant: {
      options: ['default', 'destructive'],
      control: { type: 'select' },
      type: 'string',
    },
    disabled: {
      control: { type: 'boolean' },
      type: 'boolean',
    },
    placeholder: {
      control: { type: 'text' },
      type: 'string',
    },
    leftIcon: {
      options: ['none', 'search'],
      control: { type: 'select' },
      mapping: {
        none: null,
      },
    },
    rightIcon: {
      options: ['none', 'search'],
      control: { type: 'select' },
      mapping: {
        none: null,
      },
    },
    label: {
      control: { type: 'text' },
      type: 'string',
    },
    required: {
      control: { type: 'boolean' },
      type: 'boolean',
    },
    description: {
      control: { type: 'text' },
      type: 'string',
    },
    value: { control: { type: 'text' } },
  },
  parameters: {
    docs: {
      description: {
        component: 'A text field component is used to collect user input.',
      },
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Label',
  },
};

export const WithLeftIcon: Story = {
  args: {
    leftIcon: 'search',
  },
};

export const WithRightIcon: Story = {
  args: {
    rightIcon: 'search',
  },
};

export const WithDescription: Story = {
  args: { description: 'Description' },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Placeholder text',
  },
};
