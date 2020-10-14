import { Editor, Text, Transforms } from 'slate';

// TODO: change to class component
export const CustomEditor = {
  isBoldMarkActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true
    });

    return !!match;
  },
  isItalicMarkActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.italic === true,
      universal: true
    });

    return !!match;
  },
  isUnderlinedMarkActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.underline === true,
      universal: true
    });

    return !!match;
  },
  isCodeBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === 'code'
    });

    return !!match;
  },
  isListBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === 'list'
    });

    return !!match;
  },
  // isQuoteBlockActive(editor: Editor) {
  //   const [match] = Editor.nodes(editor, {
  //     match: (n) => n.type === 'quote'
  //   });
  //
  //   return !!match;
  // },
  isHeadlineBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === 'h2'
    });

    return !!match;
  },
  isSubHeadlineBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === 'h3'
    });

    return !!match;
  },
  isParagraphBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === 'h3'
    });

    return !!match;
  },
  toggleBoldMark(editor: Editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },
  toggleItalicMark(editor: Editor) {
    const isActive = CustomEditor.isItalicMarkActive(editor);
    Transforms.setNodes(
      editor,
      { italic: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },
  toggleUnderlineMark(editor: Editor) {
    const isActive = CustomEditor.isUnderlinedMarkActive(editor);
    Transforms.setNodes(
      editor,
      { underline: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },
  toggleCodeBlock(editor: Editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
  toggleListBlock(editor: Editor) {
    const isActive = CustomEditor.isListBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'list' },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
  // toggleQuoteBlock(editor: Editor) {
  //   const isActive = CustomEditor.isQuoteBlockActive(editor);
  //   Transforms.setNodes(
  //       editor,
  //       { type: isActive ? null : 'quote' },
  //       { match: (n) => Editor.isBlock(editor, n) }
  //   );
  // },
  toggleHeadlineBlock(editor: Editor) {
    const isActive = CustomEditor.isHeadlineBlockActive(editor);
    Transforms.setNodes(
        editor,
        { type: isActive ? null : 'h2' },
        { match: (n) => Editor.isBlock(editor, n) }
    );
  },
  toggleSubHeadlineBlock(editor: Editor) {
    const isActive = CustomEditor.isSubHeadlineBlockActive(editor);
    Transforms.setNodes(
        editor,
        { type: isActive ? null : 'h3' },
        { match: (n) => Editor.isBlock(editor, n) }
    );
  },
  toggleSParagraphBlock(editor: Editor) {
    const isActive = CustomEditor.isParagraphBlockActive(editor);
    Transforms.setNodes(
        editor,
        { type: isActive ? null : 'p' },
        { match: (n) => Editor.isBlock(editor, n) }
    );
  }
};
