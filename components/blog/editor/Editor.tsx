'use client';

import React from 'react';
import { useTheme } from 'next-themes';

import { getSignedCloudfrontUrl, uploadFileToS3 } from '@/actions/aws';
import { readFileAsBase64 } from '@/lib/utils';
import { BlockNoteEditor } from '@blocknote/core';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/shadcn';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/shadcn/style.css';

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const S3FolderName = 'blog_body_files';

const Editor: React.FC<EditorProps> = ({
  onChange,
  initialContent,
  editable,
}) => {
  const { resolvedTheme } = useTheme();

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

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    uploadFile,
    resolveFileUrl,
  });

  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === 'light' ? 'light' : 'dark'}
      onChange={() => {
        onChange(JSON.stringify(editor.document, null, 2));
      }}
      editable={editable}
    />
  );
};

export default Editor;
