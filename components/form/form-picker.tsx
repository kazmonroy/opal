"use client";

import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { defaultImages } from "@/constants/images";
import Link from "next/link";
import { FormErrors } from "./form-errors";

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
          collectionIds: ["317099"],
          count: 9,
        });

        if (result && result.response) {
          const fetchedImages = result.response as Array<Record<string, any>>;
          setImages(fetchedImages);
        } else {
          console.error("Failed to get images from Unsplash");
        }
      } catch (error) {
        console.error(error);
        setImages([defaultImages]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-slate-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((img: Record<string, any>) => (
          <div
            key={img.id}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-85 transition bg-muted rounded-sm overflow-hidden",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImgId(img.id);
            }}
          >
            <input
              readOnly
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImgId === img.id}
              disabled={pending}
              value={`${img.id}|${img.urls.thumb}|${img.urls.full}|${img.links.html}|${img.user.name}`}
            />
            <Image
              src={img.urls.thumb}
              alt={img.alt_description}
              fill
              sizes="100%"
              className="object-cover rounded-sm"
            />
            <Link
              href={img.links.html}
              target="_blank"
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full pl-1 text-[10px] truncate text-white hover:underline bg-black/50"
            >
              {img.user.name}
            </Link>
            {selectedImgId === img.id && (
              <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
      <FormErrors id={id} errors={errors} />
    </div>
  );
}

export default FormPicker;
