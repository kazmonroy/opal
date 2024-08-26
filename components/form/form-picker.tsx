'use client';

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}
function FormPicker({ id, errors }: FormPickerProps) {
  return <div>Form picker!</div>;
}

export default FormPicker;
