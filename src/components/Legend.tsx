//Legend.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Legend: React.FC = () => {
    return (
        <Box display="flex" alignItems="center" marginTop={2}>
            <Box width={20} height={20} bgcolor="pink" marginRight={1} />
            <Typography variant="body2">予約済み</Typography>
            <Box width={20} height={20} bgcolor="lightgreen" marginLeft={2} marginRight={1} />
            <Typography variant="body2">予約可能</Typography>
        </Box>
    );
};


export default Legend;
