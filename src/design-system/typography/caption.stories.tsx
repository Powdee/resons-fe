import { Meta, StoryObj } from '@storybook/react';
import Caption from './caption';

const meta: Meta<typeof Caption> = {
  title: 'design-system/typography/caption',
  component: Caption,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Caption>;

export const Default: Story = {
  args: {
    children: 'Caption',
  },
};
