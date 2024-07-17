type CaptionProps = {
  className?: string;
  children: React.ReactNode;
};

const Caption = ({ children, className = "" }: CaptionProps) => {
  return <p className={`font-bold text-caption ${className}`}>{children}</p>;
};

export default Caption;
