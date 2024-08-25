import { Title } from '@vibepot/design-system';

type HeaderProps = {
  pageName: string;
};

const Header = ({ pageName }: HeaderProps) => {
  return (
    <div className="p-20 w-full flex items-center sticky text-center">
      <Title variant="h5" className="text-white w-full">
        {pageName}
      </Title>
    </div>
  );
};

export default Header;
export type { HeaderProps };
