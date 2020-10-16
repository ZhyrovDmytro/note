import * as React from 'react';
import {Editor} from 'slate';
import {CustomEditor} from './Editor';
import Icon from 'react-icons-kit';
import {bold} from 'react-icons-kit/feather/bold';
import {code} from 'react-icons-kit/feather/code';
import {underline} from 'react-icons-kit/feather/underline';
import {italic} from 'react-icons-kit/feather/italic';
import {list} from 'react-icons-kit/feather/list';
import {feather} from 'react-icons-kit/feather/feather';
import {ic_title} from 'react-icons-kit/md/ic_title';
import {ic_text_fields} from 'react-icons-kit/md/ic_text_fields'
import {ic_format_clear} from 'react-icons-kit/md/ic_format_clear'
import {ic_clear} from 'react-icons-kit/md/ic_clear'

interface ToolbarRichtextProps {
    editor: Editor;
}

export function ToolbarRichtext(props: ToolbarRichtextProps): JSX.Element {
    const {editor} = props;
    return (
        <div>
            <button
                onClick={event => {
                    event.preventDefault();
                    CustomEditor.toggleBoldMark(editor)
                }}
            >
                <Icon icon={bold} />
            </button>
            <button
                onClick={event => {
                    event.preventDefault();
                    CustomEditor.toggleItalicMark(editor)
                }}
            >
                <Icon icon={italic} />
            </button>
            <button
                onClick={event => {
                    event.preventDefault();
                    CustomEditor.toggleUnderlineMark(editor)
                }}
            >
                <Icon icon={underline} />
            </button>
            <button
                style={{marginRight: '10px'}}
                onClick={event => {
                    event.preventDefault();
                    CustomEditor.resetStyles(editor);
                }}
            >
                <Icon icon={ic_format_clear} />
            </button>
            <button
                onClick={event => {
                    event.preventDefault();
                    CustomEditor.toggleListBlock(editor)
                }}
            >
                <Icon icon={list} />
            </button>
            <button
                onClick={event => {
                    event.preventDefault();
                    CustomEditor.toggleCodeBlock(editor)
                }}
            >
                <Icon icon={code} />
            </button>
            <button
                onMouseDown={event => {
                    event.preventDefault();
                    CustomEditor.toggleQuoteBlock(editor)
                }}
            >
                <Icon icon={feather} />
            </button>
            <button
                onClick={event => {
                    event.preventDefault();
                    CustomEditor.toggleHeadlineBlock(editor)
                }}
            >
                <Icon icon={ic_title} />
            </button>
            <button
                onClick={event => {
                    event.preventDefault();
                    CustomEditor.toggleSubHeadlineBlock(editor)
                }}
            >
                <Icon icon={ic_text_fields} />
            </button>
            <button
                onClick={event => {
                    event.preventDefault();
                    CustomEditor.toggleParagraphBlock(editor)
                }}
            >
                <Icon icon={ic_clear} />
            </button>
        </div>
    )
}
