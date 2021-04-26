import { useState } from 'react';
import intersectionWith from 'lodash.intersectionwith';
import unionWith from 'lodash.unionwith';

interface UseImagesConfig {
  max?: number;
  additive?: boolean;
  onError?: (error: string) => void;
}
export const useImages = (initialPaths: string[] = [], config: UseImagesConfig = {}) => {
  const [images, setImages] = useState<File[]>([]);
  const [imagePaths, setImagePaths] = useState(initialPaths);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const resetInput = () => {
      e.target.value = '';
    };

    // Get files from the input
    const { files } = e.target;

    // Turn the FileList into an array
    const filesArray = Array.from(files || []);

    // The fields on where if two files have the same value on these fields
    // it deems the file to be a duplicate
    const comparator = (x: File, y: File) => x.name === y.name && x.size === y.size;

    // Get duplicates
    const duplicates = intersectionWith(images, filesArray, comparator);

    // Show toast
    if (duplicates.length && config.onError) {
      config.onError(`Duplicate images are not allowed (${duplicates.length})`);
    }

    // No new image
    if (duplicates.length === filesArray.length) {
      // Prevent re-render
      return;
    }

    // Get union of previous and current files/images
    const union = unionWith(images, filesArray, comparator);

    // No. of images received is greater than the max
    if (config.max && union.length > config.max) {
      // Get sliced arrays to enfore max
      const sliced = union.slice(0, config.max);
      const slicedFilePaths = sliced.map((file) => URL.createObjectURL(file));
      // Appends added files
      setImages(sliced);
      setImagePaths(slicedFilePaths);
      resetInput();
      return;
    }

    if (config.additive) {
      // Appends added files
      const filePaths = union.map((file) => URL.createObjectURL(file));
      setImages(union);
      setImagePaths(filePaths);
      resetInput();
      return;
    }

    // Replace images
    setImages(filesArray);
    if (files) {
      setImagePaths(filesArray.map((file) => URL.createObjectURL(file)));
    } else {
      setImagePaths([]);
    }
    resetInput();
  };

  const getFormData = (inputs: { [key: string]: string | number }) => {
    const data = new FormData();

    // Append non image inputs to form
    Object.entries(inputs).forEach(([key, val]) => {
      data.append(key, String(val));
    });
    // Append images
    if (images) {
      images.forEach((image) => {
        data.append(image.name, image);
      });
    }
    return data;
  };

  const clearImages = () => {
    setImagePaths([]);
    setImages([]);
  };

  const deleteImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    const tempPaths = Array.from(imagePaths);
    const tempImages = Array.from(images);
    tempPaths.splice(index, 1);
    tempImages.splice(index, 1);
    setImagePaths(tempPaths);
    setImages(tempImages);
  };

  return {
    images,
    imagePaths,
    handleFileChange,
    getFormData,
    clearImages,
    deleteImage,
  };
};
