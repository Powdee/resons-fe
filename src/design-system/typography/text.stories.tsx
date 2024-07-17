import { Meta, StoryObj } from '@storybook/react';
import Text from './text';

const meta: Meta<typeof Text> = {
  title: 'design-system/typography/text',
  component: Text,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Text>;

export const LargeBold: Story = {
  args: {
    variant: 'large',
    weight: 'bold',
    children: 'Text LG Bold',
  },
};

export const LargeRegular: Story = {
  args: {
    variant: 'large',
    weight: 'regular',
    children: 'Text LG Regular',
  },
};

export const MediumBold: Story = {
  args: {
    variant: 'medium',
    weight: 'bold',
    children: 'Text MD Bold',
  },
};

export const MediumRegular: Story = {
  args: {
    variant: 'medium',
    weight: 'regular',
    children: 'Text MD Regular',
  },
};

export const SmallBold: Story = {
  args: {
    variant: 'small',
    weight: 'bold',
    children: 'Text SM Bold',
  },
};

export const SmallRegular: Story = {
  args: {
    variant: 'small',
    weight: 'regular',
    children: 'Text SM Regular',
  },
};
