'use client';

import { forwardRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Input, Label } from '@/components/ui';
import { cn } from '@/lib/utils';
import { FormErrors } from './form-errors';

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      type,
      placeholder,
      disabled,
      required,
      errors,
      className,
      defaultValue = '',
      onBlur,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className='space-y-2'>
        <div className='space-y-1'>
          {label && (
            <Label
              htmlFor={id}
              className='text-sm font-semibold text-slate-700'
            >
              {label}
            </Label>
          )}
          <Input
            id={id}
            onBlur={onBlur}
            defaultValue={defaultValue}
            ref={ref}
            required={required}
            name={id}
            placeholder={placeholder}
            type={type}
            disabled={pending || disabled}
            className={cn('text-sm px-2 py-1 h-7', className)}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
