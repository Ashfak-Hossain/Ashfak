'use server';

import { v4 as uuidv4 } from 'uuid';

import { s3Client } from '@/actions/awsS3';
import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/cloudfront-signer';

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

  const params: PutObjectCommandInput = {
    Bucket: process.env.AWS_S3_BUCKET as string,
    Key: path ? `${path}/${fileName}` : fileName,
    Body: buffer,
    ContentType: contentType,
  };
  const command = new PutObjectCommand(params);

  await s3Client.send(command);

  return fileName;
};

export const getSignedCloudfrontUrl = async (
  imageName: string,
  path?: string
) => {
  const url = getSignedUrl({
    url: path
      ? `https://${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/${path}/${imageName}`
      : `https://${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/${imageName}`,
    dateLessThan: new Date(Date.now() + 1000 * 60 * 60).toISOString(), // 1 hour
    privateKey: process.env.AWS_CLOUDFRONT_PRIVATE_KEY as string,
    keyPairId: process.env.AWS_CLOUDFRONT_KEY_PAIR_ID as string,
  });

  return url;
};
