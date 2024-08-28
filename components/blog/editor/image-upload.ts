import { createImageUpload } from 'novel/plugins';
import { toast } from 'sonner';

import { getSignedCloudfrontUrl, uploadFileToS3 } from '@/actions/aws';
import { readFileAsBase64 } from '@/lib/utils';

const S3FolderName = 'blog_body_files';

const uploadFile = async (file: File) => {
  try {
    const base64Image = await readFileAsBase64(file);
    const fileNameUrl = await uploadFileToS3(
      base64Image,
      file.name,
      file.type,
      S3FolderName
    );
    return fileNameUrl;
  } catch (error) {
    toast.error('Error uploading file to S3.');
    throw error;
  }
};

const resolveFileUrl = async (fileName: string) => {
  try {
    const url = await getSignedCloudfrontUrl(fileName, S3FolderName);
    return url;
  } catch (error) {
    toast.error('Error resolving file URL.');
    throw error;
  }
};

const onUpload = (file: File) => {
  return new Promise((resolve, reject) => {
    toast.promise(
      uploadFile(file).then(async (fileNameUrl) => {
        const url = await resolveFileUrl(fileNameUrl);
        const image = new Image();
        image.src = url;
        image.onload = () => {
          resolve(url);
        };
      }),
      {
        loading: 'Uploading image...',
        success: 'Image uploaded successfully.',
        error: (e) => {
          reject(e);
          return e.message;
        },
      }
    );
  });
};

export const uploadFn = createImageUpload({
  onUpload,
  validateFn: (file) => {
    if (!file.type.includes('image/')) {
      toast.error('File type not supported.');
      return false;
    }
    if (file.size / 1024 / 1024 > 5) {
      toast.error('File size too big (max 5MB).');
      return false;
    }
    return true;
  },
});
