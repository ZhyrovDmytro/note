import {Box, Typography} from '@material-ui/core';
import * as React from 'react';

interface HeadlineProps {
    text: string;
}

export function Headline(props: HeadlineProps): JSX.Element {
    const {text} = props;

    return (
        <Box css={{marginBottom: '20px'}}>
            <Typography variant="h2" component="h1">{text}</Typography>
        </Box>
    )
}
