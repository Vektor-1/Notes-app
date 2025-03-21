import { Extension } from '@tiptap/core';
import { Markdown } from 'tiptap-markdown';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';

export const MarkdownExtension = Extension.create({
  name: 'markdownExtension',

  addExtensions() {
    return [
      Markdown.configure({
        transformPastedText: true,
        transformCopiedText: true,
        html: true,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ];
  },
});