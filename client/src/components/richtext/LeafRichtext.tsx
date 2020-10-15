import {Attributes} from 'react';
import * as React from 'react';
import {Node} from 'slate';

export interface LeafProps {
    children: Node[];
    attributes: Attributes;
    leaf: any;
}

export const Leaf = (props: LeafProps) => {
    const {leaf} = props;
    return (
        <span
            {...props.attributes}
            style={{ fontWeight: leaf.bold ? 'bold' : 'normal',
                fontStyle: leaf.italic ? 'italic': 'unset',
                textDecoration: leaf.underline ? 'underline': 'unset'
            }}
        >
      {props.children}
    </span>
    )
};
