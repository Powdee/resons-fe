import { Meta, StoryObj } from '@storybook/react';

import Input from './input';

const meta: Meta<typeof Input> = {
  title: 'design-system/input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Nice placeholder',
  },
};
