import queryClient from '@vibepot/app/query-client.util';
import { Button, Caption, GoogleIcon, Input, Text, Title } from '@vibepot/design-system';
import {
  AuthError,
  signIn,
  resendSignUpCode,
  signInWithRedirect,
  SignInInput,
} from 'aws-amplify/auth';
import 'aws-amplify/auth/enable-oauth-listener';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from 'react-query';
import AuthHeader from '../common/components/auth/header';

function SignIn() {
  const router = useRouter();

  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { mutate, isLoading } = useMutation({
    mutationKey: ['signIn'],
    mutationFn: async (input: SignInInput) => {
      const output = await signIn(input);
      return {
        ...output,
        ...input,
      };
    },
    onSuccess: (response) => {
      const nextStep = response.nextStep;
      const isSignedIn = response.isSignedIn;
      const isDone = nextStep.signInStep === 'DONE';
      const confirmSignUpStep = nextStep.signInStep === 'CONFIRM_SIGN_UP';

      if (confirmSignUpStep) {
        router.push(`/verify?${new URLSearchParams({ email: response?.username })}`);
        resendSignUpCode({ username: response?.username });
      }

      if (isDone && isSignedIn) {
        setIsRedirecting(true);
        router.push('/');
        router.refresh();
      }
    },
    onError: (error) => {
      if (error instanceof AuthError) {
        if (error.name === 'NotAuthorizedException') {
          setError(error.message);
          return;
        }
      }
      console.error(error);
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['signIn'] });
    },
  });

  const { mutate: googleSignIn } = useMutation({
    mutationKey: ['googleSignIn'],
    mutationFn: signInWithRedirect,
  });

  const isPending = isLoading || isRedirecting;

  return (
    <>
      <AuthHeader pageName="Sign in" />
      <main className="px-20 py-40 overflow-hidden lg:max-w-screen-lg lg:my-0 lg:mx-auto flex gap-10 flex-col items-center">
        <form
          onChange={() => {
            setError(null);
          }}
          onSubmit={async (event) => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;

            const username = form.email.value;
            const password = form.password.value;

            mutate({ username, password });
          }}
          className="gap-28 w-full flex flex-col items-stretch"
        >
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
              <Text variant="medium" weight="bold" htmlFor="email">
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
          </div>

          <Button disabled={isPending} variant="secondary" className="w-full" type="submit">
            {isPending ? 'Loading...' : 'Sign in'}
          </Button>
          <Caption className="text-center text-grey-300">OR</Caption>
          <Button
            disabled={isRedirecting}
            onClick={() => {
              setIsRedirecting(true);
              googleSignIn({ provider: 'Google' });
            }}
            variant="default"
            className="w-full"
            type="submit"
          >
            {isRedirecting ? (
              'Loading...'
            ) : (
              <div className="flex items-center gap-12">
                <GoogleIcon /> Sign in with Google
              </div>
            )}
          </Button>
          {error && <Text variant="large">{error}</Text>}
        </form>
        <div className="absolute bottom-32 flex flex-col gap-8 items-center justify-center">
          <Caption className="text-grey-400">Don’t have an account?</Caption>
          <Button asChild variant="link" className="text-secondary p-0">
            <Link href="/sign-up">Create an account</Link>
          </Button>
        </div>
      </main>
    </>
  );
}

export default SignIn;
