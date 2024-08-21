'use client';
import { Button } from '@/components/ui';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

function FormDeleteButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} variant='destructive' size='sm'>
      {pending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
      {pending ? 'Please wait' : 'Delete'}
    </Button>
  );
}

export default FormDeleteButton;
