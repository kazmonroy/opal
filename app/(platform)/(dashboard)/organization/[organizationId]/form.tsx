'use client';

import { createBoard } from '@/actions';
import FormInput from './form-input';
import FormButton from './form-button';
import { useAction } from '@/hooks/use-action';

function Form() {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, 'WORKSSS');
    },
    onError: (error) => {
      console.log(error, 'ERROR');
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    execute({ title });
  };
  return (
    <>
      <form action={onSubmit} className='flex gap-2'>
        <FormInput errors={fieldErrors} />
        <FormButton>Submit</FormButton>
      </form>
      <div className='text-red-500'>
        {fieldErrors?.title && <p>{fieldErrors.title}</p>}
      </div>
    </>
  );
}

export default Form;
