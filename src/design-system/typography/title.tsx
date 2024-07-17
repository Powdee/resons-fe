type TitleProps = {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  children: React.ReactNode;
};

const Title = ({ variant, children, className = "" }: TitleProps) => {
  const variantClasses = {
    h1: "text-h1",
    h2: "text-h2",
    h3: "text-h3",
    h4: "text-h4",
    h5: "text-h5",
    h6: "text-h6",
  };

  const TitleTag = variant as keyof typeof variantClasses;

  return (
    <TitleTag
      className={`font-pangram font-bold ${variantClasses[variant]} ${className}`}
    >
      {children}
    </TitleTag>
  );
};

export default Title;
