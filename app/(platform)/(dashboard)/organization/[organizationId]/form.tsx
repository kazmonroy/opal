'use client';

import { createBoard } from '@/actions';
import { Button } from '@/components/ui';

import { useFormState } from 'react-dom';
import FormInput from './form-input';
import FormButton from './form-button';

function Form() {
  const [formState, action] = useFormState(createBoard, { errors: {} });
  return (
    <>
      <form action={action} className='flex gap-2'>
        <FormInput errors={formState?.errors} />
        <FormButton>Submit</FormButton>
      </form>
      <div className='text-red-500'>
        {formState?.errors?.title && <p>{formState.errors.title.join(',')}</p>}
      </div>
    </>
  );
}

export default Form;
