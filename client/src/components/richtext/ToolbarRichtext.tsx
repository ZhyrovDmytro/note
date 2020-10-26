import {IconButton} from '@material-ui/core';
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
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => {
                CustomEditor.toggleBoldMark(editor)
            }}>
                <Icon icon={bold} style={{height: '16px', display: 'flex'}} />
            </IconButton>
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => {
                CustomEditor.toggleItalicMark(editor)
            }}>
                <Icon icon={italic} style={{height: '16px', display: 'flex'}} />
            </IconButton>
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => {
                CustomEditor.toggleUnderlineMark(editor)
            }}>
                <Icon icon={underline} style={{height: '16px', display: 'flex'}}/>
            </IconButton>
            <IconButton color="primary" aria-label="upload picture" component="span"  onClick={() => {
                CustomEditor.resetStyles(editor);
            }}>
                <Icon icon={ic_format_clear} style={{height: '16px', display: 'flex'}} />

            </IconButton>
            <IconButton color="primary" aria-label="upload picture" component="span"   onClick={() => {
                CustomEditor.toggleListBlock(editor)
            }}>
                <Icon icon={list} style={{height: '16px', display: 'flex'}} />

            </IconButton>
            <IconButton color="primary" aria-label="upload picture" component="span"    onClick={() => {
                CustomEditor.toggleCodeBlock(editor)
            }}>
                <Icon icon={code} style={{height: '16px', display: 'flex'}}/>

            </IconButton>
            <IconButton color="primary" aria-label="upload picture" component="span"  onClick={() => {
                CustomEditor.toggleQuoteBlock(editor)
            }}>
                <Icon icon={feather} style={{height: '16px', display: 'flex'}}/>
            </IconButton>
            <IconButton color="primary" aria-label="upload picture" component="span"  onClick={() => {
                CustomEditor.toggleHeadlineBlock(editor)
            }}>
                <Icon icon={ic_title} style={{height: '16px', display: 'flex'}}/>
            </IconButton>
            <IconButton color="primary" aria-label="upload picture" component="span"   onClick={() => {
                CustomEditor.toggleSubHeadlineBlock(editor)
            }}>
                <Icon icon={ic_text_fields} style={{height: '16px', display: 'flex'}}/>
            </IconButton>
            <IconButton color="primary" aria-label="upload picture" component="span"    onClick={() => {
                CustomEditor.toggleParagraphBlock(editor)
            }}>
                <Icon icon={ic_clear} style={{height: '16px', display: 'flex'}}/>
            </IconButton>
        </div>
    )
}
