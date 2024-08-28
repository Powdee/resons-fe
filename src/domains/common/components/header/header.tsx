import { Button, Text } from '@vibepot/design-system';
import Link from 'next/link';
import { FetchUserAttributesOutput } from 'aws-amplify/auth';

type HeaderProps = {
  user?: FetchUserAttributesOutput | null | undefined;
};

const Header = async ({ user }: HeaderProps) => {
  return (
    <div className="p-20 w-full flex items-center sticky text-center">
      {user?.email ? (
        <>
          <Text variant="medium">Logged in user: {user.email} </Text>
          <Button variant="link" asChild size="sm">
            <Link href="/sign-out">Sign out</Link>
          </Button>
        </>
      ) : (
        <Button variant="link" asChild size="sm">
          <Link href="/sign-in">Sign in</Link>
        </Button>
      )}
    </div>
  );
};

export default Header;
export type { HeaderProps };
