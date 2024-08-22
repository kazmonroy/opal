'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '../ui';
import { cn } from '@/lib/utils';

interface FormSubmitProps {
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | 'default'
    | 'primary'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
}

function FormSubmit({
  children,
  disabled,
  variant,
  className,
}: FormSubmitProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      size='sm'
      disabled={pending}
      type='submit'
      variant={variant}
      className={cn(className)}
    >
      {children}
    </Button>
  );
}

export default FormSubmit;
