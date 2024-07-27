import { cn } from '@vibepot/domains/lib';
import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex w-full rounded-l bg-grey-800 px-16 py-12 text-body file:border-0 file:bg-transparent file:text-sm file:font-regular placeholder:text-grey-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 text-white',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export default Input;
