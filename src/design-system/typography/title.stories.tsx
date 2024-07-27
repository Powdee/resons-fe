import { Meta, StoryObj } from '@storybook/react';
import Title from './title';

const meta: Meta<typeof Title> = {
  title: 'design-system/typography/title',
  component: Title,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Title>;

export const H1: Story = {
  args: {
    variant: 'h1',
    children: 'Title 1',
  },
};

export const H2: Story = {
  args: {
    variant: 'h2',
    children: 'Title 2',
  },
};

export const H3: Story = {
  args: {
    variant: 'h3',
    children: 'Title 3',
  },
};

export const H4: Story = {
  args: {
    variant: 'h4',
    children: 'Title 4',
  },
};

export const H5: Story = {
  args: {
    variant: 'h5',
    children: 'Title 5',
  },
};

export const H6: Story = {
  args: {
    variant: 'h6',
    children: 'Title 6',
  },
};
