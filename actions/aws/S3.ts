'use server';

import { v4 as uuidv4 } from 'uuid';

import { s3Client } from '@/actions/aws';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';

/**
 *
 * @param base64File The base64 encoded file
 * @param originalName The original name of the file
 * @param contentType The content type of the file
 * @param path The path where the file is to be uploaded
 * @returns The name of the file that was uploaded to S3
 * @description This function uploads a file to the S3 bucket. It also resizes the image to 1070x420 pixels.
 * The file name is prefixed with a unique id to avoid conflicts.
 *
 */
export const uploadFileToS3 = async (
  base64File: string,
  originalName: string,
  contentType: string,
  path?: string
) => {
  const uniqueId = uuidv4();
  const buffer = Buffer.from(base64File, 'base64');

  const asciiName = originalName
    .replace(/[^\x20-\x7E]/g, '')
    .replace(/\s+/g, '_');

  const fileName = `${uniqueId}-${asciiName}`;

  // buffer = await sharp(buffer)
  //   .resize({ width: 1070, height: 420, fit: 'cover' })
  //   .toBuffer();

  const params: PutObjectCommandInput = {
    Bucket: process.env.EAWS_S3_BUCKET as string,
    Key: path ? `${path}/${fileName}` : fileName,
    Body: buffer,
    ContentType: contentType,
  };
  const command = new PutObjectCommand(params);

  await s3Client.send(command);

  return fileName;
};

/**
 *
 * @param fileName  The name of the file to be replaced
 * @param base64File The base64 encoded file
 * @param contentType The content type of the file
 * @param path The path where the file is to be replaced
 * @returns The name of the file that was replaced
 * @description This function replaces a file in the S3 bucket with a new file.
 */
export const replaceFileToS3 = async (
  fileName: string,
  base64File: string,
  contentType: string,
  path?: string
) => {
  const buffer = Buffer.from(base64File, 'base64');

  const params: PutObjectCommandInput = {
    Bucket: process.env.EAWS_S3_BUCKET as string,
    Key: path ? `${path}/${fileName}` : fileName,
    Body: buffer,
    ContentType: contentType,
  };
  const command = new PutObjectCommand(params);

  await s3Client.send(command);

  return fileName;
};

/**
 *
 * @param fileName The name of the file to be deleted
 * @param path The path where the file is located
 * @returns A success message
 * @description This function deletes a file from the S3 bucket.
 * If the file is located in a folder, path should be provided(eg. '/folderName').
 */
export const deleteFileFromS3 = async (fileName: string, path?: string) => {
  const params = {
    Bucket: process.env.EAWS_S3_BUCKET as string,
    Key: path ? `${path}/${fileName}` : fileName,
  };

  const command = new DeleteObjectCommand(params);

  await s3Client.send(command);

  return { success: true };
};
