import * as React from 'react';
import {createEditor, Node} from 'slate';
import {Editable, Slate, withReact} from 'slate-react';
import {AuthContext} from '../context/AuthContext';
import {useHTTP} from '../hooks/useHTTP';
import {useToast} from '../hooks/useToast';
import {LeafProps} from './MarkedInput';

export interface NoteItemProps {
    header: string;
    text: string;
    _id: string;
    removeNote(id: string): void
}

const style = {
    display: 'flex',
    alignItems: 'center'
};

const initialValue =
    [{type:"paragraph",children:[{text:"A line oasdf text in a paragraph."}]}]
;

export const deserialize = (string: any) => {
    // Return a value array of children derived by splitting the string.
    return string.split('\n').map((line: any) => {
        return {
            children: [{ text: line }],
        }
    })
};

export function NoteItem(props: NoteItemProps): JSX.Element {
    const {req} = useHTTP();
    const auth = React.useContext(AuthContext);
    const toast = useToast();
    const editor = React.useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = React.useState<Node[]>(initialValue);

    const handleDelete = React.useCallback(async () => {
        try {
            const data = await req(`/api/note/${props._id}`, 'DELETE', null, {
                Authorization: `Bearer ${auth.token}`
            });
            props.removeNote(props._id);
            toast(data.message);
        } catch (e) {
            console.error(e);
        }
    }, []);

    React.useEffect(() => {
        setValue(deserialize(props.text));
    }, []);

    const renderLeaf = React.useCallback(props => {
        return <Leaf {...props} />
    }, []);

    //TODO: unify richtext for edit and for read
    // TODO: still don't show edited text

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


    return (
        <div style={style}>
            <div style={{marginRight: '20px'}}>
                <h2>
                    {props.header}
                </h2>
                <div>
                    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
                        <Editable readOnly placeholder="Enter some plain text..." renderLeaf={renderLeaf} />
                    </Slate>
                </div>
            </div>
            <div>
                <button onClick={handleDelete}>X</button>
            </div>
        </div>
    )
}
