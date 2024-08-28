import { CurrentUser } from '@/lib/auth';

export const checkAdmin = async () => {
  const user = await CurrentUser();
  if (!user || user.role !== 'ADMIN') {
    return { error: 401, message: 'Unauthorized' };
  }

  return { success: 202, message: 'Authorized' };
};

// Utility function to extract all image URLs from the content
export const extractImageUrlsFromContent = (content: string): string[] => {
  const urls: string[] = [];
  const regex =
    /https:\/\/d1zzrzjvdubpup\.cloudfront\.net\/blog_body_files\/[a-zA-Z0-9-]+-[\w\(\)]+?\.\w+\?Expires=\d+&Key-Pair-Id=[a-zA-Z0-9-]+&Signature=[a-zA-Z0-9~_\-.]+/g;

  let match;
  while ((match = regex.exec(content)) !== null) {
    urls.push(match[0]);
  }
  return urls;
};

// Utility function to extract the image name (key) from a URL
export const extractImageNameFromUrl = (url: string): string => {
  // Split the URL by '/' to get the last segment
  const parts = url.split('/');

  // The last segment contains the file name with possible query parameters
  const lastSegment = parts[parts.length - 1];

  // Remove any query parameters (everything after '?')
  const imageName = lastSegment.split('?')[0];

  return imageName;
};

// Utility function to check if a URL is expired
export const isUrlExpired = (url: string): boolean => {
  // Extract the Expires parameter from the URL
  const urlObj = new URL(url);
  const expires = urlObj.searchParams.get('Expires');

  if (!expires) {
    // If there's no Expires parameter, we assume the URL is expired
    return true;
  }

  // Convert the Expires parameter to a timestamp (in seconds)
  const expiresTimestamp = parseInt(expires, 10);

  // Get the current timestamp (in seconds)
  const currentTimestamp = Math.floor(Date.now() / 1000);

  // Check if the current time is past the expiration time
  return currentTimestamp > expiresTimestamp;
};
