import { Meta, StoryObj } from '@storybook/react';
import Attendees from './attendees';

const meta: Meta<typeof Attendees> = {
  title: 'ui/events/attendees',
  component: Attendees,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Attendees>;
export const Default: Story = {
  args: {
    attendees: [
      {
        url: '/fred.png',
        name: 'John Doe1',
      },
      {
        url: '/fred.png',
        name: 'John Doe2',
      },
      {
        url: '/fred.png',
        name: 'John Doe3',
      },
      {
        url: '/fred.png',
        name: 'John Doe4',
      },
      {
        url: '/fred.png',
        name: 'John Doe5',
      },
    ],
    total: 233,
  },
};

export const With10Attendees: Story = {
  args: {
    attendees: [
      {
        url: '/fred.png',
        name: 'John Doe1',
      },
      {
        url: '/fred.png',
        name: 'John Doe2',
      },
      {
        url: '/fred.png',
        name: 'John Doe3',
      },
      {
        url: '/fred.png',
        name: 'John Doe4',
      },
      {
        url: '/fred.png',
        name: 'John Doe5',
      },
      {
        url: '/fred.png',
        name: 'John Doe1',
      },
      {
        url: '/fred.png',
        name: 'John Doe2',
      },
      {
        url: '/fred.png',
        name: 'John Doe3',
      },
      {
        url: '/fred.png',
        name: 'John Doe4',
      },
      {
        url: '/fred.png',
        name: 'John Doe5',
      },
      {
        url: '/fred.png',
        name: 'John Doe1',
      },
      {
        url: '/fred.png',
        name: 'John Doe2',
      },
      {
        url: '/fred.png',
        name: 'John Doe3',
      },
      {
        url: '/fred.png',
        name: 'John Doe4',
      },
      {
        url: '/fred.png',
        name: 'John Doe5',
      },
    ],
    total: 233,
    cutAt: 10,
  },
};
