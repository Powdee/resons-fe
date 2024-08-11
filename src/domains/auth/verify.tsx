'use client';

import queryClient from '@vibepot/app/query-client.util';
import { Button, Input, Text, Title } from '@vibepot/design-system';
import { AuthError, autoSignIn, confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from 'react-query';

function VerifyUser() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const search = useSearchParams();
  const username = search.get('email') as string;

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ['verifyUser'],
    mutationFn: confirmSignUp,
    onSuccess: async (response) => {
      const nextStep = response.nextStep;
      const isAutoSignIn = nextStep.signUpStep === 'COMPLETE_AUTO_SIGN_IN';
      setIsRedirecting(true);
      if (isAutoSignIn) {
        // does not work as expected - bug on amplify side
        await handleAutoSignIn();
        router.push(`/`);
        router.refresh();
      } else if (nextStep?.signUpStep === 'DONE') {
        router.push(`/sign-in`);
        router.refresh();
      }
    },
    onError: (error) => {
      if (error instanceof AuthError) {
        setError(error.message);
        console.error(error.cause);
      }
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['verifyUser'] });
    },
  });

  const { mutateAsync: handleSend } = useMutation({
    mutationKey: ['sendVerificationCode'],
    mutationFn: resendSignUpCode,
    onError: (error) => {
      if (error instanceof AuthError) {
        setError(error.message);
        console.error(error.cause);
      }
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['sendVerificationCode'] });
    },
  });

  const { mutateAsync: handleAutoSignIn } = useMutation({
    mutationKey: ['autoSignIn'],
    mutationFn: autoSignIn,
    onError: (error) => {
      if (error instanceof AuthError) {
        setError(error.message);
        console.error(error.cause);
      }
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['autoSignIn'] });
    },
  });

  const isPending = isLoading || isRedirecting;

  return (
    <main className="px-16 py-40 overflow-hidden lg:max-w-screen-lg lg:my-0 lg:mx-auto flex gap-10 flex-col items-center">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const confirmationCode = form.confirmationCode.value;

          mutateAsync({
            username,
            confirmationCode,
          });
        }}
        className="gap-20 w-full flex flex-col items-stretch"
      >
        <Title variant="h2">Verify your account</Title>
        <div className="grid gap-4">
          <div className="grid gap-8">
            <Text variant="medium" htmlFor="confirmationCode">
              Confirmation Code
            </Text>
            <Input
              disabled={isPending}
              autoComplete="mobile tel"
              id="confirmationCode"
              type="number"
              required
            />
          </div>
        </div>
        <div>
          <Button disabled={isPending} variant="default" className="w-full" type="submit">
            {isPending ? 'Loading...' : 'Submit'}
          </Button>
        </div>
        {error && <Text variant="large">{error}</Text>}
      </form>
      <Text variant="medium">
        Did not get verification code?{' '}
        <Button
          onClick={() =>
            handleSend({
              username,
            })
          }
          className="pl-0"
          variant="link"
        >
          Send again
        </Button>
      </Text>
    </main>
  );
}

export default VerifyUser;
