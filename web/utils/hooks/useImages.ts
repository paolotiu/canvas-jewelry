import { useCallback, useEffect, useRef, useState } from 'react';
import intersectionWith from 'lodash.intersectionwith';
import unionWith from 'lodash.unionwith';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { ImageInterface } from '@models/Item';

function areImages(maybeImages: unknown[]): maybeImages is ImageInterface[] {
  return !!(maybeImages as ImageInterface[])[0]?.url;
}

export const filesToImageObjects = (files: File[], existingPaths?: string[]) => {
  return files.reduce<ImageObject[]>(
    (prev, file, i) => [...prev, { file, path: existingPaths?.[i] || URL.createObjectURL(file) }],
    [],
  );
};

interface UseImagesConfig {
  max?: number;
  additive?: boolean;
  onError?: (error: string) => void;
  duplicates?: boolean;
}

interface ImageObject {
  file: File;
  path: string;
}

export const useImages = (
  initialImages: ImageInterface[] | string[] = [],
  config: UseImagesConfig = {},
) => {
  // Put the initalPaths in a ref to prevent infinite loops
  const initialPathsRef = useRef<string[]>([]);

  const [willInitialize, setWillInitialize] = useState(false);
  const [images, setImages] = useState<ImageObject[]>([]);

  // Function to initialize images from urls
  const initializeImages = useCallback(async () => {
    const files = await Promise.all(
      initialPathsRef.current.map(async (url) => {
        const res = await axios.get(url, {
          responseType: 'blob',
        });
        return new File([res.data], uuid());
      }),
    );
    const imageObjects = filesToImageObjects(files, initialPathsRef.current);

    setImages(imageObjects);
  }, []);

  useEffect(() => {
    // Initialize the images
    const initialPaths = areImages(initialImages)
      ? initialImages.map((image) => image.url)
      : initialImages;
    initialPathsRef.current = initialPaths;
    initializeImages();
  }, [initialImages, initializeImages]);

  // Onchange of file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    // Resets input to allow uploads of the same images
    const resetInput = () => {
      e.target.value = '';
    };

    // Get files from the input
    const { files } = e.target;

    // Turn the FileList into an array
    const filesArray = Array.from(files || []);

    // Reduce to a ImageType
    let incomingImageObjects = filesToImageObjects(filesArray);

    // Uploaded files are greater than max
    if (config.max && incomingImageObjects.length + images.length > config.max) {
      // Cut the array
      const sliced = incomingImageObjects.slice(0, config.max - images.length);
      incomingImageObjects = sliced;

      // Emit error
      if (config.onError) {
        config.onError(`A maximum of ${config.max} images are allowed.`);
      }
    }

    // Add duplicates
    if (config.additive && config.duplicates) {
      setImages((prev) => [...prev, ...incomingImageObjects]);
      resetInput();
      return;
    }

    // The fields on where if two files have the same value on these fields
    // it deems the file to be a duplicate
    const comparator = (current: ImageObject, incoming: ImageObject) =>
      current.file.name === incoming.file.name && current.file.size === incoming.file.size;

    // Get duplicates
    const duplicates = intersectionWith(images, incomingImageObjects, comparator);

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
    const union = unionWith(images, incomingImageObjects, comparator);

    if (config.additive) {
      // Appends added files
      setImages(union);
      resetInput();
      return;
    }

    // Replace images
    setImages(incomingImageObjects);
    resetInput();
  };

  const setImage = (index: number, file: File) => {
    setImages((prev) => {
      // Cone array
      const copy = [...prev];
      // Replace object of the same index
      copy[index] = { file, path: URL.createObjectURL(file) };
      return copy;
    });
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
      data.append('imagePaths', image.path);
    });

    return data;
  };

  const clearImages = () => {
    setImages([]);
  };

  const deleteImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    const tempImages = Array.from(images);
    tempImages.splice(index, 1);
    setImages(tempImages);
  };

  const getImagePaths = () => {
    return images.map((image) => image.path);
  };

  const reinitializeImages = () => {
    setWillInitialize(!willInitialize);
  };

  return {
    images,
    handleFileChange,
    getFormData,
    clearImages,
    deleteImage,
    getImagePaths,
    reinitializeImages,
    setImage,
  };
};
