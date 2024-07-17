import { Meta, StoryObj } from '@storybook/react';
import HashTagPill from './hashtag.pill';

const meta: Meta<typeof HashTagPill> = {
  title: 'ui/hashtags/pill',
  component: HashTagPill,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof HashTagPill>;
export const Pill: Story = {
  args: {
    name: 'Eminem',
  },
};

export const MultiplePills: Story = {
  render: () => (
    <div className="flex flex-row gap-2">
      {[{ name: 'Eminem' }, { name: 'Fred again' }].map((pill) => (
        <HashTagPill name={pill.name} />
      ))}
    </div>
  ),
};
