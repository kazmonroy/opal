'use client';

import { useFormStatus } from 'react-dom';

interface FormInputProps {
  errors?: {
    title?: string[];
    _form?: string[];
  };
}

function FormInput({ errors }: FormInputProps) {
  const { title } = errors || {};
  const { pending } = useFormStatus();
  return (
    <div>
      <input
        disabled={pending}
        type='text'
        id='title'
        name='title'
        required
        placeholder='Title'
        className='border rounded-md border-slate-300  px-4 py-2'
      />
      <div className='text-red-500'>{title && <p>{title.join(',')}</p>}</div>
    </div>
  );
}

export default FormInput;
