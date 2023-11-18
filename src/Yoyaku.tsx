//Yoyaku.tsx

import React from 'react';
import { Box, Typography } from '@mui/material';
import SimpleCalendar from './SimpleCalendar'; // SimpleCalendar コンポーネントのパスを適切に指定

const Yoyaku: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Typography variant="h4" style={{ margin: '20px 0' }}>12月</Typography>
      <SimpleCalendar />
    </Box>
  );
};

export default Yoyaku;
