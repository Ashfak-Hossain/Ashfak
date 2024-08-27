import { JSONContent } from 'novel';

export const saveContentToLocalStorage = (
  key: string,
  content: JSONContent
) => {
  window.localStorage.setItem(key, JSON.stringify(content));
};

export const loadContentFromLocalStorage = (
  key: string
): JSONContent | null => {
  const content = window.localStorage.getItem(key);
  return content ? JSON.parse(content) : null;
};

export const clearContentFromLocalStorage = (key: string) => {
  window.localStorage.removeItem(key);
};
