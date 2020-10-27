import * as React from 'react';

export const CodeElement = (props: any): JSX.Element => {
    return (
        <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
    )
};

export const ListElement = (props: any): JSX.Element => {
    return (
        <ul {...props.attributes}>
            <li>{props.children}</li>
        </ul>
    )
};

export const DefaultElement = (props: any) => {
    return <p>{props.children}</p>
};


export const Blockquote = (props: any) => {
    return (
        <blockquote style={{
            background:' #f9f9f9',
            borderLeft: '10px solid #ccc',
            margin: '1.5em 10px',
            padding: '0.5em 10px'
        }}><p style={{display: 'inline'}}>{props.children}</p></blockquote>
    );
};
