import { useState } from 'react';
import intersectionWith from 'lodash.intersectionwith';
import unionWith from 'lodash.unionwith';

interface UseImagesConfig {
  max?: number;
  additive?: boolean;
}
export const useImages = (initialPaths: string[] = [], config: UseImagesConfig = {}) => {
  const [images, setImages] = useState<File[]>([]);
  const [imagePaths, setImagePaths] = useState(initialPaths);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { files } = e.target;

    const filesArray = Array.from(files || []);
    const comparator = (x: File, y: File) => x.name === y.name && x.size === y.size;
    const duplicates = intersectionWith(images, filesArray, comparator);
    const union = unionWith(images, filesArray, comparator);

    if (config.max && union.length > config.max) {
      const sliced = union.slice(0, config.max);
      const slicedFilePaths = sliced.map((file) => URL.createObjectURL(file));
      // Appends added files
      setImages(sliced);
      setImagePaths(slicedFilePaths);
      e.target.files = null;
      return;
    }

    if (config.additive) {
      // Appends added files

      const filePaths = union.map((file) => URL.createObjectURL(file));
      setImages(union);
      setImagePaths(filePaths);
      e.target.files = null;
      return;
    }

    // Replace images
    setImages(filesArray);
    if (files) {
      setImagePaths(filePaths);
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
    handleInput,
    getFormData,
    clearImages,
    deleteImage,
  };
};
