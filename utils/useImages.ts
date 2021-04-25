import { useState } from 'react';

export const useImages = (initialPaths: string[] = []) => {
  const [images, setImages] = useState<FileList | null>();
  const [imagePaths, setImagePaths] = useState(initialPaths);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { files } = e.target;
    setImages(files);
    if (files) {
      setImagePaths(Array.from(files).map((file) => URL.createObjectURL(file)));
    } else {
      setImagePaths([]);
    }
  };

  const getFormData = (inputs: { [key: string]: string | number }) => {
    const data = new FormData();

    // Append non image inputs to form
    Object.entries(inputs).forEach(([key, val]) => {
      data.append(key, String(val));
    });
    // Append images
    if (images) {
      Array.from(images).forEach((image) => {
        data.append(image.name, image);
      });
    }
    return data;
  };

  const clearImages = () => {
    setImagePaths([])
    setImages(null)
  }

  return { images, imagePaths, handleFileChange, getFormData , clearImages};
};
