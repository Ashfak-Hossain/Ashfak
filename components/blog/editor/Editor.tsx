'use client';

import React, { useEffect } from 'react';
import { useTheme } from 'next-themes';

import {
  getSignedCloudfrontUrl,
  uploadFileToS3,
} from '@/actions/awsS3/uploadToS3';
import { readFileAsBase64 } from '@/lib/utils';
import { EditorProps } from '@/types/blog';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/shadcn';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/shadcn/style.css';

const S3FolderName = 'blog_body_files';

const uploadFile = async (file: File) => {
  const base64Image = await readFileAsBase64(file);
  const fileNameUrl = await uploadFileToS3(
    base64Image,
    file.name,
    file.type,
    S3FolderName
  );
  return fileNameUrl;
};

const resolveFileUrl = async (fileName: string) => {
  const url = await getSignedCloudfrontUrl(fileName, S3FolderName);
  return url;
};

const Editor: React.FC<EditorProps> = ({
  onChange,
  initialContent,
  editable = true,
}) => {
  const { resolvedTheme } = useTheme();

  const editor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    uploadFile,
    resolveFileUrl,
  });

  useEffect(() => {
    const handleChange = () => {
      onChange(JSON.stringify(editor.document, null, 2));
    };

    editor.onChange(handleChange);
  }, [editor, onChange]);

  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === 'light' ? 'light' : 'dark'}
      editable={editable}
    />
  );
};

export default Editor;
