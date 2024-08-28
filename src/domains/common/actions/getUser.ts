import { runWithAmplifyServerContext } from '@vibepot/app/amplify-server.util';
import { fetchAuthSession, fetchUserAttributes } from 'aws-amplify/auth/server';
import { cookies } from 'next/headers';

const getUser = async () => {
  'use server';

  const session = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: (contextSpec) => fetchAuthSession(contextSpec),
  });

  if (!session.tokens?.accessToken) return null;

  try {
    const currentUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => fetchUserAttributes(contextSpec),
    });

    return currentUser;
  } catch (error) {
    //no-op
  }
};

export default getUser;
