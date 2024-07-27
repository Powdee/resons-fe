type TextProps = {
  variant: 'large' | 'medium' | 'small';
  weight?: 'regular' | 'bold';
  className?: string;
  children: React.ReactNode;
  component?: 'p' | 'span' | 'div';
};

const Text = ({
  component = 'span',
  variant,
  weight = 'regular',
  children,
  className = '',
}: TextProps) => {
  const tags = {
    p: 'p',
    span: 'span',
    div: 'div',
  };

  const Tag = component as keyof typeof tags;

  const variantClasses = {
    large: 'text-body-lg',
    medium: 'text-body-md',
    small: 'text-body-sm',
  };

  return (
    <Tag className={`font-pangram font-${weight} ${variantClasses[variant]} ${className}`}>
      {children}
    </Tag>
  );
};

export default Text;
