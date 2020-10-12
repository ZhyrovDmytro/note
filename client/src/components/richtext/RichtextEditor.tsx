import * as React from 'react';
import { createEditor, Node} from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import {CustomEditor} from './Editor';
import {Leaf} from './LeafRichtext';
import {CodeElement, ListElement} from './richtext-elements';
import {ToolbarRichtext} from './ToolbarRichtext';

interface RichTextEditorProps {
    value?: Node[];
    handleNoteValue?(note: string, id: string): void;
}

export function RichtextEditor(props: RichTextEditorProps): JSX.Element {
    const editor = React.useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = React.useState<Node[]>([
        {
            type: 'paragraph',
            children: [{ text: 'Write note here...' }],
        },
    ]);
    const readOnly = Boolean(props.value);

    const DefaultElement = (props: any) => {
        return <p {...props.attributes}>{props.children}</p>
    };

    React.useEffect(() => {
        if(readOnly) {
            setValue(props.value);
        }
    },[]);

    const renderElement = React.useCallback(props => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />;
            case 'list':
                return <ListElement {...props} />;
            default:
                return <DefaultElement {...props} />
        }
    }, []);

    const renderLeaf = React.useCallback(props => {
        return <Leaf {...props} />
    }, []);

    function handleChange(newValue: Node[]): void {
        setValue(newValue);
        props.handleNoteValue(JSON.stringify(newValue), 'note');
    }

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
        <Slate editor={editor} value={value} onChange={newValue => handleChange(newValue)}>
            {!readOnly && (<ToolbarRichtext editor={editor}/>)}
            <Editable readOnly={readOnly} renderElement={renderElement} renderLeaf={renderLeaf} onKeyDown={(event: KeyboardEvent) => handleKeyPress(event)}/>
        </Slate>
    )
}
