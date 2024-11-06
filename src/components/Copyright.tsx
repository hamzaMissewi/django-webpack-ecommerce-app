import Typography from '@mui/material/Typography';
import {Link} from '@mui/material';
import React from 'react';

export function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://b2b-alive.com/" target="_blank">
                b2b-alive
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
