import {Attributes, KeyboardEventHandler} from 'react';
import * as React from 'react';
import { createEditor, Node, Transforms, Editor, Text } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import Icon from 'react-icons-kit';
import {bold} from 'react-icons-kit/feather/bold'
import {code} from 'react-icons-kit/feather/code'
import {underline} from 'react-icons-kit/feather/underline'
import {italic} from 'react-icons-kit/feather/italic'

const CodeElement = (props: any) => {
    return (
        <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
    )
};

interface LeafProps {
    children: Node[];
    attributes: Attributes;
    leaf: any;
}

const CustomEditor = {
    isBoldMarkActive(editor: Editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.bold === true,
            universal: true,
        });

        return !!match
    },
    isItalicMarkActive(editor: Editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.italic === true,
            universal: true,
        });

        return !!match
    },
    isUnderlinedMarkActive(editor: Editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.underline === true,
            universal: true,
        });

        return !!match
    },
    isCodeBlockActive(editor: Editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.type === 'code',
        });

        return !!match
    },
    toggleBoldMark(editor: Editor) {
        const isActive = CustomEditor.isBoldMarkActive(editor);
        Transforms.setNodes(
            editor,
            { bold: isActive ? null : true },
            { match: n => Text.isText(n), split: true }
        )
    },
    toggleItalicMark(editor: Editor) {
        const isActive = CustomEditor.isItalicMarkActive(editor);
        Transforms.setNodes(
            editor,
            { italic: isActive ? null : true },
            { match: n => Text.isText(n), split: true }
        )
    },
    toggleUnderlineMark(editor: Editor) {
        const isActive = CustomEditor.isUnderlinedMarkActive(editor);
        Transforms.setNodes(
            editor,
            { underline: isActive ? null : true },
            { match: n => Text.isText(n), split: true }
        )
    },
    toggleCodeBlock(editor: Editor) {
        const isActive = CustomEditor.isCodeBlockActive(editor);
        Transforms.setNodes(
            editor,
            { type: isActive ? null : 'code' },
            { match: n => Editor.isBlock(editor, n) }
        )
    },
};


const DefaultElement = (props: any) => {
    return <p {...props.attributes}>{props.children}</p>
};

const Leaf = (props: LeafProps) => {
    return (
        <span
            {...props.attributes}
            style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal',
                     fontStyle: props.leaf.italic ? 'italic': 'unset',
                     textDecoration: props.leaf.underline ? 'underline': 'unset'
            }}
        >
      {props.children}
    </span>
    )
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

    const renderLeaf = React.useCallback(props => {
        return <Leaf {...props} />
    }, []);

    const handleKeyPress = (e: KeyboardEvent): void => {
        if (!e.ctrlKey) {
            return
        }

        switch (e.key) {
            case '`': {
                e.preventDefault();
                CustomEditor.toggleCodeBlock(editor);
                break
            }

            case 'b': {
                e.preventDefault();
               CustomEditor.toggleBoldMark(editor);
                break
            }

            case 'i': {
                e.preventDefault();
                CustomEditor.toggleItalicMark(editor);
                break
            }

            case 'u': {
                e.preventDefault();
                CustomEditor.toggleUnderlineMark(editor);
                break
            }
        }
    };

    return (
        <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}>
            <div>
                <button
                    onMouseDown={event => {
                        event.preventDefault();
                        CustomEditor.toggleBoldMark(editor)
                    }}
                >
                    <Icon icon={bold} />
                </button>
                <button
                    onMouseDown={event => {
                        event.preventDefault();
                        CustomEditor.toggleItalicMark(editor)
                    }}
                >
                    <Icon icon={italic} />
                </button>
                <button
                    onMouseDown={event => {
                        event.preventDefault();
                        CustomEditor.toggleUnderlineMark(editor)
                    }}
                >
                    <Icon icon={underline} />
                </button>
                <button
                    onMouseDown={event => {
                        event.preventDefault();
                        CustomEditor.toggleCodeBlock(editor)
                    }}
                >
                    <Icon icon={code} />
                </button>
            </div>
            <Editable renderElement={renderElement} renderLeaf={renderLeaf} onKeyDown={(event: KeyboardEvent) => handleKeyPress(event)}/>
        </Slate>
    )
}
