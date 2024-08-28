import { cookiesClient } from '@vibepot/app/amplify-server.util';

const getEvents = async () => {
  'use server';

  try {
    const events = await cookiesClient.models.Event.list({
      authMode: 'userPool',
    });

    return events;
  } catch (error) {
    console.error(error);
    //no-op
  }
};

export default getEvents;
