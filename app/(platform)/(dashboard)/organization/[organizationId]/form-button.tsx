import { Button } from '@/components/ui';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

interface FormButtonProps {
  children: React.ReactNode;
  variant?:
    | 'primary'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
}

function FormButton({ children, variant }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' disabled={pending} variant={variant}>
      {pending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
      {pending ? 'Please wait' : children}
    </Button>
  );
}

export default FormButton;
