import { Meta, StoryObj } from '@storybook/react';
import Title from './title';

const meta: Meta<typeof Title> = {
  title: 'design-system/typography/title',
  component: Title,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Title>;

export const h1: Story = {
  args: {
    variant: 'h1',
    children: 'Title 1',
  },
};

export const h2: Story = {
  args: {
    variant: 'h2',
    children: 'Title 2',
  },
};

export const h3: Story = {
  args: {
    variant: 'h3',
    children: 'Title 3',
  },
};

export const h4: Story = {
  args: {
    variant: 'h4',
    children: 'Title 4',
  },
};

export const h5: Story = {
  args: {
    variant: 'h5',
    children: 'Title 5',
  },
};

export const h6: Story = {
  args: {
    variant: 'h6',
    children: 'Title 6',
  },
};
