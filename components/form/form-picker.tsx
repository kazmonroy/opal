'use client';

import { unsplash } from '@/lib/unsplash';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}
function FormPicker({ id, errors }: FormPickerProps) {
  const { pending } = useFormStatus();
  const [images, setImages] = useState<Record<string, any>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImgId, setSelectedImgId] = useState(null);

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
  return (
    <div className='relative'>
      <div className='grid grid-cols-3 gap-2 mb-2'>
        {images.map((img: Record<string, any>) => (
          <div
            key={img.id}
            className={cn(
              'cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted rounded-sm',
              pending && 'opacity-50 hover:opacity-50 cursor-auto'
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImgId(img.id);
            }}
          >
            <Image
              src={img.urls.thumb}
              alt={img.description}
              fill
              className='object-cover rounded-sm'
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormPicker;
