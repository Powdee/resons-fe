import queryClient from '@vibepot/app/query-client.util';
import { Button, Caption, Input, Text, Title } from '@vibepot/design-system';
import { AuthError, signUp } from 'aws-amplify/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from 'react-query';

function SignUp() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  const { mutate, isLoading } = useMutation({
    mutationKey: ['signUp'],
    mutationFn: signUp,
    onSuccess: (response) => {
      const nextStep = response.nextStep;
      const isSignUpComplete = response.isSignUpComplete;
      const isConfirmed = nextStep.signUpStep === 'CONFIRM_SIGN_UP';

      if (isSignUpComplete && isConfirmed) {
        setIsRedirecting(true);
        router.push(`/verify?${new URLSearchParams({ email })}`);
      }
    },
    onError: (error) => {
      if (error instanceof AuthError) {
        console.error(error.cause);
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['signUp'] }),
  });

  const isPending = isLoading || isRedirecting;

  return (
    <main className="px-16 py-40 overflow-hidden lg:max-w-screen-lg lg:my-0 lg:mx-auto flex gap-10 flex-col items-center">
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

          setEmail(username);
          mutate({
            username,
            password,
            options: {
              userAttributes: {
                email: username,
              },
            },
          });
        }}
        className="gap-20 w-full flex flex-col items-stretch"
      >
        <Title variant="h2">Create your account</Title>
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
          <div className="grid gap-8">
            <Text variant="medium" htmlFor="confirmPassword">
              Confirm Password
            </Text>
            <Input disabled={isPending} id="confirmPassword" type="password" required />
          </div>
        </div>
        <div>
          <Button disabled={isPending} variant="default" className="w-full" type="submit">
            {isPending ? 'Loading...' : 'Create an account'}
          </Button>
        </div>
        <Button className="text-body-sm" size="sm" asChild variant="link">
          <Link href="/sign-in">Login</Link>
        </Button>
      </form>
      {error && <Text variant="large">{error}</Text>}
    </main>
  );
}

export default SignUp;
