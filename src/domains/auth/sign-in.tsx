import queryClient from '@vibepot/app/query-client.util';
import { Button, Caption, Input, Text, Title } from '@vibepot/design-system';
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
    <main className="px-16 py-40 overflow-hidden lg:max-w-screen-lg lg:my-0 lg:mx-auto flex gap-10 flex-col items-center">
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
        className="gap-20 w-full flex flex-col items-stretch"
      >
        <Title variant="h2">Login</Title>
        <Caption>Enter your email below to login to your account.</Caption>
        <div className="grid gap-4">
          <div className="grid gap-8">
            <Text variant="medium" htmlFor="email">
              Email
            </Text>
            <Input
              disabled={isPending}
              autoComplete="email"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-8">
            <Text variant="medium" htmlFor="password">
              Password
            </Text>
            <Input
              disabled={isPending}
              autoComplete="current-password"
              id="password"
              type="password"
              required
            />
          </div>
        </div>

        <Button disabled={isPending} variant="default" className="w-full" type="submit">
          {isPending ? 'Loading...' : 'Sign in'}
        </Button>
      </form>
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
        {isRedirecting ? 'Loading...' : 'Sign in with Google'}
      </Button>
      <Button className="text-body-sm" size="sm" asChild variant="link">
        <Link href="/sign-up">Create your account</Link>
      </Button>
      {error && <Text variant="large">{error}</Text>}
    </main>
  );
}

export default SignIn;
