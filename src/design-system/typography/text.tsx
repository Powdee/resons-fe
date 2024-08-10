type TextProps = {
  variant: 'large' | 'medium' | 'small' | 'button';
  weight?: 'regular' | 'bold';
  className?: string;
  children: React.ReactNode;
  component?: 'p' | 'span' | 'div';
  htmlFor?: string;
};

const Text = ({
  component = 'span',
  variant,
  weight = 'regular',
  children,
  className = '',
  htmlFor,
}: TextProps) => {
  const tags = {
    p: 'p',
    span: 'span',
    div: 'div',
    label: 'label',
  };

  const Tag = component as keyof typeof tags;

  const variantClasses = {
    large: 'text-body-lg',
    medium: 'text-body-md',
    small: 'text-body-sm',
    button: 'text-button',
  };

  return (
    <Tag
      className={`font-pangram font-${weight} ${variantClasses[variant]} ${className}`}
      htmlFor={htmlFor}
    >
      {children}
    </Tag>
  );
};

export default Text;
