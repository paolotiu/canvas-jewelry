import { ImageInterface } from '@models/Item';
import { v2 as cloudinary, UploadApiResponse, UploadApiOptions } from 'cloudinary';
import formidable from 'formidable';

export interface IncomingImage {
  file: formidable.File;
  url: string;
}

export const uploadAsync = (path: string, options: UploadApiOptions) => {
  return new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader.upload(path, options, (err, result) => {
      if (err) reject(err);
      if (!result) reject(result);
      resolve(result as UploadApiResponse);
    });
  });
};

export const uploadImages = async (files: formidable.File[]) => {
  const images: { url: string; public_id: string }[] = [];
  return (
    await Promise.all(
      files.map((file) =>
        uploadAsync(file.path, {
          folder: 'canvas',
        }),
      ),
    )
  ).reduce((prev, curr) => [...prev, { url: curr.secure_url, public_id: curr.public_id }], images);
};

export const deleteImages = (publicIds: string[]) => {
  return new Promise((resolve, reject) => {
    cloudinary.api.delete_resources(publicIds, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

export const uploadNewImages = (
  images: IncomingImage[] | undefined,
  existingImages: ImageInterface[],
) => {
  if (!images) {
    return [];
  }
  return Promise.all(
    images.map(async (img) => {
      // Existing image
      const existingImage = existingImages.find((image) => image.url === img.url);
      if (existingImage) return existingImage;

      // Fallback to uploading
      // New image
      const res = await uploadAsync(img.file.path, {
        folder: 'canvas',
      });

      return { url: res.secure_url, public_id: res.public_id };
    }),
  );
};
