'use client';

import React, { useEffect } from 'react';
import { useTheme } from 'next-themes';

import { EditorProps } from '@/types/blog';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/shadcn';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/shadcn/style.css';

const Editor: React.FC<EditorProps> = ({
  onChange,
  initialContent,
  editable = true,
}) => {
  const { resolvedTheme } = useTheme();

  // const handleUpload = async (file: File) => {};

  const editor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    // uploadFile: handleUpload,
  });

  useEffect(() => {
    const handleChange = () => {
      onChange(JSON.stringify(editor.document));
    };

    editor.onChange(handleChange);
  }, [editor, onChange]);

  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === 'light' ? 'light' : 'dark'}
      editable={editable}
      onChange={() => {
        JSON.stringify(editor.document, null, 2);
      }}
    />
  );
};

export default Editor;
