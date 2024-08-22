'use client';

import { createBoard } from '@/actions';

import { useAction } from '@/hooks/use-action';
import { FormInput } from '@/components/form/form-input';
import FormSubmit from '@/components/form/form-submit';

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
        <FormInput label='Board Title' id='title' errors={fieldErrors} />
        <FormSubmit>Submit</FormSubmit>
      </form>
    </>
  );
}

export default Form;
