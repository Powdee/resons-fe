import queryClient from '@vibepot/app/query-client.util';
import { Button, Input, Text, Title } from '@vibepot/design-system';
import { AuthError, autoSignIn, signUp } from 'aws-amplify/auth';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from 'react-query';
import Header from '../common/components/header/header';

function SignUp() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ['signUp'],
    mutationFn: signUp,
    onSuccess: async (response) => {
      const isSignUpComplete = response.isSignUpComplete;

      if (isSignUpComplete) {
        setIsRedirecting(true);
        router.push(`/`);
        router.refresh();
      }
    },
    onError: (error) => {
      if (error instanceof AuthError) {
        // if (error.name === 'UsernameExistsException') {
        //   return;
        // }
        setError(error.message);
        console.error(error.cause);
      }
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['signUp'] });
    },
  });

  const isPending = isLoading || isRedirecting;

  return (
    <>
      <Header pageName="Sign up" />
      <main className="px-20 py-40 overflow-hidden lg:max-w-screen-lg lg:my-0 lg:mx-auto flex gap-10 flex-col items-center">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;

            const username = form.email.value;
            const password = form.password.value;

            const confirmPassword = form.confirmPassword.value;

            if (password !== confirmPassword) {
              setError('Passwords do not match.');
              return;
            }

            router.push(`/verify?${new URLSearchParams({ email: username })}`);
            await mutateAsync({
              username,
              password,
              options: {
                userAttributes: {
                  email: username,
                },
              },
            });
          }}
          className="gap-28 w-full flex flex-col items-stretch"
        >
          <Title variant="h5">{"Let's get started"}</Title>
          <div className="grid gap-12">
            <div className="grid gap-6">
              <Text variant="medium" weight="bold" htmlFor="email">
                Email
              </Text>
              <Input
                disabled={isPending}
                autoComplete="email"
                id="email"
                type="email"
                placeholder="E-mail"
                required
              />
            </div>
            <div className="grid gap-6">
              <Text variant="medium" weight="bold" htmlFor="password">
                Password
              </Text>
              <Input
                disabled={isPending}
                autoComplete="current-password"
                id="password"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="grid gap-6">
              <Text variant="medium" weight="bold" htmlFor="password">
                Confirm password
              </Text>
              <Input
                placeholder="Re-enter password"
                disabled={isPending}
                id="confirmPassword"
                type="password"
                required
              />
            </div>
            {error && <Text variant="large">{error}</Text>}
          </div>
          <div>
            <Button disabled={isPending} variant="secondary" className="w-full" type="submit">
              {isPending ? 'Loading...' : 'Create an account'}
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}

export default SignUp;
