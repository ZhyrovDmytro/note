import * as React from 'react';
import { createEditor, Node, Transforms, Editor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

const CodeElement = (props: any) => {
    return (
        <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
    )
};

const DefaultElement = (props: any) => {
    return <p {...props.attributes}>{props.children}</p>
};

export function MarkedInput(): JSX.Element {
    const editor = React.useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = React.useState<Node[]>([
        {
            type: 'paragraph',
            children: [{ text: 'A line of text in a paragraph.' }],
        },
    ]);

    const renderElement = React.useCallback(props => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />;
            default:
                return <DefaultElement {...props} />
        }
    }, []);

    return (
        <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}>
            <Editable renderElement={renderElement} onKeyDown={event => {
                if (event.key === '`' && event.ctrlKey) {
                    event.preventDefault();
                    // Determine whether any of the currently selected blocks are code blocks.
                    const [match] = Editor.nodes(editor, {
                        match: n => n.type === 'code',
                    });
                    // Toggle the block type depending on whether there's already a match.
                    Transforms.setNodes(
                        editor,
                        { type: match ? 'paragraph' : 'code' },
                        { match: n => Editor.isBlock(editor, n) }
                    )
                }
            }}/>
        </Slate>
    )
}
