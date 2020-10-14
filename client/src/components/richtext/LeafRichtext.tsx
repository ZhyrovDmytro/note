import {Attributes} from 'react';
import * as React from 'react';
import {Node} from 'slate';

export interface LeafProps {
    children: Node[];
    attributes: Attributes;
    leaf: any;
}

export const Leaf = (props: LeafProps) => {
    const {children, attributes} = props;
    switch (props.leaf) {
        case 'bold': {
            return <strong>{children}</strong>
        }
        case 'italic': {
            return <em>{children}</em>
        }
        case 'underline': {
            return <u>{children}</u>
        }
        default: {
            return <span {...attributes}>{children}</span>
        }
    }
};
