import * as React from 'react';
import {Editor} from 'slate';
import {CustomEditor} from './Editor';
import Icon from 'react-icons-kit';
import {bold} from 'react-icons-kit/feather/bold';
import {code} from 'react-icons-kit/feather/code';
import {underline} from 'react-icons-kit/feather/underline';
import {italic} from 'react-icons-kit/feather/italic';
import {list} from 'react-icons-kit/feather/list';

interface ToolbarRichtextProps {
    editor: Editor;
}

export function ToolbarRichtext(props: ToolbarRichtextProps): JSX.Element {
    const {editor} = props;
    return (
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
                    CustomEditor.toggleListBlock(editor)
                }}
            >
                <Icon icon={list} />
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
    )
}
