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
    return <p {...props.attributes}>{props.children}</p>
};
