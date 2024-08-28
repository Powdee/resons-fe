import { Button, Title } from '@vibepot/design-system';
import Link from 'next/link';
import { FetchUserAttributesOutput } from 'aws-amplify/auth';

type AuthHeaderProps = {
  pageName?: string;
  goBack?: boolean;
  user?: FetchUserAttributesOutput | null | undefined;
};

const AuthHeader = ({ pageName, goBack }: AuthHeaderProps) => {
  return (
    <div className="p-20 w-full flex items-center sticky text-center">
      <Button variant="link" asChild>
        {goBack ? <Link href="/">go back</Link> : null}
      </Button>
      {pageName ? (
        <Title variant="h5" className="text-white w-full">
          {pageName}
        </Title>
      ) : null}
    </div>
  );
};

export default AuthHeader;
export type { AuthHeaderProps };
