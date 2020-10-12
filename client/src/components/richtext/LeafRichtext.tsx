import {Attributes} from 'react';
import * as React from 'react';
import {Node} from 'slate';

export interface LeafProps {
    children: Node[];
    attributes: Attributes;
    leaf: any;
}

export const Leaf = (props: LeafProps) => {
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
