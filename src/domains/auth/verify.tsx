'use client';

import queryClient from '@vibepot/app/query-client.util';
import { Button, Input, Text, Title } from '@vibepot/design-system';
import { AuthError, autoSignIn, confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, ChangeEventHandler, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import Header from '../common/components/header/header';
import repeat from '../common/utils/repeat';

function VerifyUser() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<HTMLInputElement[]>([]);

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = event.target.value.replace(/[^0-9]/g, '');
    if (value.length === 1) {
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const isPending = isLoading || isRedirecting;

  return (
    <>
      <Header pageName="Sign up" />
      <main className="px-20 py-40 overflow-hidden lg:max-w-screen-lg lg:my-0 lg:mx-auto flex gap-10 flex-col items-center">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            const confirmationCode = repeat(6, (i) => {
              return form[`code-input-${i}`].value;
            }).join('');

            mutateAsync({
              username,
              confirmationCode,
            });
          }}
          className="gap-28 w-full flex flex-col items-stretch"
        >
          <div className="grid gap-8">
            <Title variant="h5">Verify your email address</Title>
            <Text variant="large">
              This help us keep your account secure. We just sent a a verification link to:
            </Text>
          </div>

          <div className="grid gap-12">
            <div className="grid gap-6">
              <Text variant="medium" weight="bold">
                Confirmation Code
              </Text>

              <div className="flex flex-no-wrap flex-row gap-8 justify-between">
                {repeat(6, (index) => (
                  <Input
                    key={`input-${index}`}
                    disabled={isPending}
                    className="max-w-[50px] h-[52px] text-center"
                    autoComplete="mobile tel-country-code webauthn"
                    id={`code-input-${index}`}
                    type="number"
                    ref={(el) => {
                      if (!el) return;
                      inputRefs.current[index] = el;
                    }}
                    maxLength={1}
                    onFocus={(e) => e.target.select()}
                    onChange={(event) => handleChange(event, index)}
                    max={9}
                    min={0}
                    required
                  />
                ))}
              </div>
            </div>
          </div>
          <Text variant="large" weight="bold">
            Didn’t receive your code?{' '}
            <Button
              onClick={() =>
                handleSend({
                  username,
                })
              }
              className="pl-0 text-secondary"
              variant="link"
            >
              Resend
            </Button>
          </Text>
          <Button disabled={isPending} variant="secondary" className="w-full" type="submit">
            {isPending ? 'Loading...' : 'Submit'}
          </Button>
          {error && <Text variant="large">{error}</Text>}
        </form>
      </main>
    </>
  );
}

export default VerifyUser;
