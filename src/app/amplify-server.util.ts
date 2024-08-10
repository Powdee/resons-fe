import { cookies } from 'next/headers';
import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/api';
import { getCurrentUser } from 'aws-amplify/auth/server';
import outputs from '@vibepot/amplify_outputs.json';
import { Schema } from '@vibepot/data/resource';

export const { runWithAmplifyServerContext } = createServerRunner({
  config: outputs,
});

// example: const { data: todos } = await cookiesClient.models.Todo.list();
export const cookiesClient = generateServerClientUsingCookies<Schema>({
  config: outputs,
  cookies,
});

export async function AuthGetCurrentUserServer() {
  try {
    const currentUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });
    return currentUser;
  } catch (error) {
    // no - op console.error(error);
  }
}
