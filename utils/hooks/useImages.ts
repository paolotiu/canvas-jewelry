import { useCallback, useEffect, useState } from 'react';
import intersectionWith from 'lodash.intersectionwith';
import unionWith from 'lodash.unionwith';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

export const filesToImageObjects = (files: File[]) => {
  return files.reduce<ImageObject[]>(
    (prev, curr) => [...prev, { file: curr, path: URL.createObjectURL(curr) }],
    [],
  );
};

interface UseImagesConfig {
  max?: number;
  additive?: boolean;
  onError?: (error: string) => void;
}

interface ImageObject {
  file: File;
  path: string;
}
export const useImages = (initialPaths: string[] = [], config: UseImagesConfig = {}) => {
  const [images, setImages] = useState<ImageObject[]>([]);

  const [imagePaths, setImagePaths] = useState(initialPaths);

  const initializeImages = useCallback(async () => {
    const files = await Promise.all(
      initialPaths.map(async (url) => {
        const res = await axios.get(url, {
          responseType: 'blob',
        });
        return new File([res.data], uuid());
      }),
    );
    const imageObjects = filesToImageObjects(files);

    setImages(imageObjects);
  }, [initialPaths]);

  useEffect(() => {
    initializeImages();
  }, [initializeImages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const resetInput = () => {
      e.target.value = '';
    };

    // Get files from the input
    const { files } = e.target;

    // Turn the FileList into an array
    const filesArray = Array.from(files || []);

    // Reduce to a ImageType
    const imageObjects = filesToImageObjects(filesArray);

    // The fields on where if two files have the same value on these fields
    // it deems the file to be a duplicate
    const comparator = (x: ImageObject, y: ImageObject) =>
      x.file.name === y.file.name && x.file.size === y.file.size;

    // Get duplicates
    const duplicates = intersectionWith(images, imageObjects, comparator);

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
    const union = unionWith(images, imageObjects, comparator);

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
      const filePaths = union.map((image) => URL.createObjectURL(image.file));
      setImages(union);
      setImagePaths(filePaths);
      resetInput();
      return;
    }

    // Replace images
    setImages(imageObjects);
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
    images.forEach((image) => {
      data.append('file', image.file);
    });

    // Append image paths
    imagePaths.forEach((val) => {
      data.append('imagePaths', val);
    });

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
