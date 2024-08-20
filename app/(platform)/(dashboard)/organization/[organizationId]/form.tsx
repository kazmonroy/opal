'use client';
import { Button } from '@/components/ui';
import { createBoard } from '@/actions';
import { useAction } from '@/hooks/use-action';
import Boards from './boards';
function Form() {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSucces: (data) => console.log('SUCCESS', data),
    onError: (err) => console.error(err),
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    execute({ title });
  };

  return (
    <>
      <form action={onSubmit}>
        <input type='text' name='title' id='Title' placeholder='Title' />
        {fieldErrors?.title && <p>{fieldErrors.title}</p>}
        <Button type='submit'>Create new board</Button>
      </form>
      <Boards />
    </>
  );
}

export default Form;
