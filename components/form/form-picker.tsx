'use client';

import { unsplash } from '@/lib/unsplash';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}
function FormPicker({ id, errors }: FormPickerProps) {
  const [images, setImages] = useState<Record<string, any>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ['317099'],
          count: 9,
        });

        if (result && result.response) {
          const fetchedImages = result.response as Array<Record<string, any>>;
          setImages(fetchedImages);
        } else {
          console.error('Failed to get images from Unsplash');
        }
      } catch (error) {
        console.error(error);
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className='p-6 flex items-center justify-center'>
        <Loader2 className='h-6 w-6 text-slate-500 animate-spin' />
      </div>
    );
  }
  return <div>Form picker!</div>;
}

export default FormPicker;
