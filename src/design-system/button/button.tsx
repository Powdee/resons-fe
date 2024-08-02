import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@vibepot/domains/lib';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-l font-bold ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grey-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-grey-900 text-white hover:bg-grey-800',
        secondary: 'bg-secondary text-primary hover:bg-green-300',
        link: 'text-white underline-offset-4 decoration-white hover:underline',
      },
      size: {
        default: 'px-14 py-12',
        sm: 'rounded-s px-12 py-6',
        lg: 'rounded-l px-20 py-16',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export default Button;
export { buttonVariants };
