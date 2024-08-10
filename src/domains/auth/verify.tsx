import queryClient from '@vibepot/app/query-client.util';
import { Button, Input, Text, Title } from '@vibepot/design-system';
import { AuthError, confirmSignUp } from 'aws-amplify/auth';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from 'react-query';

function VerifyUser() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const router = useRouter();
  const params = useParams();

  const { mutate, isLoading } = useMutation({
    mutationKey: ['verifyUser'],
    mutationFn: confirmSignUp,
    onSuccess: (response) => {
      const nextStep = response.nextStep;
      const isSignUpComplete = response.isSignUpComplete;
      const isDone = nextStep.signUpStep === 'DONE';

      if (isSignUpComplete && isDone) {
        setIsRedirecting(true);
        router.push('/');
      }
    },
    onError: (error) => {
      if (error instanceof AuthError) {
        console.error(error.cause);
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['verifyUser'] }),
  });

  const isPending = isLoading || isRedirecting;

  return (
    <main className="px-16 py-40 overflow-hidden lg:max-w-screen-lg lg:my-0 lg:mx-auto flex gap-10 flex-col items-center">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const username = params.email as string;
          const confirmationCode = form.confirmationCode.value;

          mutate({
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
      </form>
    </main>
  );
}

export default VerifyUser;
