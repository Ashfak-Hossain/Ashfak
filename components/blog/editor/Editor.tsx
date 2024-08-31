'use client';

import { useEffect, useState } from 'react';
import hljs from 'highlight.js';
import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  type JSONContent,
} from 'novel';
import { handleCommandNavigation, ImageResizer } from 'novel/extensions';
import { handleImageDrop, handleImagePaste } from 'novel/plugins';
import { useDebouncedCallback } from 'use-debounce';

import { defaultExtensions } from '@/components/blog/editor/extensions';
import GenerativeMenuSwitch from '@/components/blog/editor/generative/generative-menu-switch';
import { uploadFn } from '@/components/blog/editor/image-upload';
import { ColorSelector } from '@/components/blog/editor/selectors/color-selector';
import { LinkSelector } from '@/components/blog/editor/selectors/link-selector';
import { MathSelector } from '@/components/blog/editor/selectors/math-selector';
import { NodeSelector } from '@/components/blog/editor/selectors/node-selector';
import { TextButtons } from '@/components/blog/editor/selectors/text-buttons';
import {
  slashCommand,
  suggestionItems,
} from '@/components/blog/editor/slash-command';
import { Separator } from '@/components/ui/separator';
import { setContent } from '@/redux/features/posts/postsSlice';
import { useAppDispatch } from '@/redux/hooks';

const extensions = [...defaultExtensions, slashCommand];

interface NovelEditorProps {
  initialContent?: string;
  editable?: boolean;
}

const NovelEditor = ({
  initialContent: propInitialContent,
  editable = true,
}: NovelEditorProps) => {
  const dispatch = useAppDispatch();
  const [initialContent, setInitialContent] = useState<JSONContent | undefined>(
    undefined
  );
  const [saveStatus, setSaveStatus] = useState('Saved');
  const [charsCount, setCharsCount] = useState();

  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openAI, setOpenAI] = useState(false);

  // Apply Codeblock Highlighting on the HTML from editor.getHTML()
  const highlightCodeblocks = (content: string) => {
    const doc = new DOMParser().parseFromString(content, 'text/html');
    doc.querySelectorAll('pre code').forEach((el) => {
      // https://highlightjs.readthedocs.io/en/latest/api.html?highlight=highlightElement#highlightelement
      hljs.highlightElement(el as HTMLElement);
    });
    return new XMLSerializer().serializeToString(doc);
  };

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();
      dispatch(setContent(JSON.stringify(json)));
      setCharsCount(editor.storage.characterCount.words());
      window.localStorage.setItem(
        'html-content',
        highlightCodeblocks(editor.getHTML())
      );
      window.localStorage.setItem('novel-content', JSON.stringify(json));
      // window.localStorage.setItem(
      //   'markdown',
      //   editor.storage.markdown.getMarkdown()
      // );
      setSaveStatus('Saved');
    },
    500
  );

  useEffect(() => {
    if (propInitialContent) {
      setInitialContent(JSON.parse(propInitialContent));
    } else {
      const content = window.localStorage.getItem('novel-content');
      if (content) setInitialContent(JSON.parse(content));
      else setInitialContent({ type: 'doc', content: [] });
    }
  }, [propInitialContent, setInitialContent]);

  if (!initialContent) return null;

  return (
    <div className="relative w-full max-w-screen-lg">
      {editable && (
        <div className="absolute right-5 top-5 z-10 mb-5 flex gap-2">
          <div className="rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">
            {saveStatus}
          </div>
          <div
            className={
              charsCount
                ? 'rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground'
                : 'hidden'
            }
          >
            {charsCount} Words
          </div>
        </div>
      )}

      <EditorRoot>
        <EditorContent
          editable={editable}
          initialContent={initialContent}
          extensions={extensions}
          className="relative min-h-[500px] w-full max-w-screen-lg sm:rounded-lg"
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            handlePaste: (view, event) =>
              handleImagePaste(view, event, uploadFn),
            handleDrop: (view, event, _slice, moved) =>
              handleImageDrop(view, event, moved, uploadFn),
            attributes: {
              class:
                'prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full',
            },
          }}
          onUpdate={({ editor }) => {
            debouncedUpdates(editor);
            setSaveStatus('Unsaved');
          }}
          slotAfter={<ImageResizer />}
        >
          <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-bg px-1 py-2 shadow-md transition-all dark:bg-darkBg">
            <EditorCommandEmpty className="px-2 text-muted-foreground">
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command && item.command(val)}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-main hover:text-black aria-selected:bg-main"
                  key={item.title}
                >
                  <div className="flex size-10 items-center justify-center rounded-md border border-muted bg-bg text-white dark:bg-darkBg">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs">{item.description}</p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>

          <GenerativeMenuSwitch open={openAI} onOpenChange={setOpenAI}>
            <Separator orientation="vertical" />
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <Separator orientation="vertical" />

            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <Separator orientation="vertical" />
            <MathSelector />
            <Separator orientation="vertical" />
            <TextButtons />
            <Separator orientation="vertical" />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </GenerativeMenuSwitch>
        </EditorContent>
      </EditorRoot>
    </div>
  );
};

export default NovelEditor;
