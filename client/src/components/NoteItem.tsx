import * as React from 'react';

export interface NoteItemProps {
    header: string;
    text: string;
}

export function NoteItem(props: NoteItemProps): JSX.Element {
    return (
        <div>
            <h2>
                {props.header}
            </h2>
            <p>{props.text}</p>
        </div>
    )
}
