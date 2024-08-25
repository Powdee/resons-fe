import { Meta, StoryObj } from '@storybook/react';
import EventCard from './event.card';

const meta: Meta<typeof EventCard> = {
  title: 'ui/events/card',
  component: EventCard,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof EventCard>;
export const Card: Story = {
  args: {
    attendees: {
      total: 213,
      people: [
        {
          url: '/person.png',
          name: 'John Doe1',
        },
        {
          url: '/person.png',
          name: 'John Doe2',
        },
        {
          url: '/person.png',
          name: 'John Doe3',
        },
        {
          url: '/person.png',
          name: 'John Doe4',
        },
        {
          url: '/person.png',
          name: 'John Doe5',
        },
      ],
    },
    bgUrl: '/fred.png',
    date: {
      day: '10',
      month: 'Aug',
    },
    name: 'Fred again',
    url: 'events/1',
  },
};
