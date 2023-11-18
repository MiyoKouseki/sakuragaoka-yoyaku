import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import SimpleCalendar from './SimpleCalendar';

const Yoyaku: React.FC = () => {
  const [weekStart, setWeekStart] = useState(new Date()); // 2022年12月1日から開始

  const handleNextWeek = () => {
    setWeekStart(new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 7));
  };

  const handleLastWeek = () => {
    setWeekStart(new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() - 7));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Box display="flex" alignItems="center">
        <Button onClick={handleLastWeek}>先週</Button>
        <Typography variant="h4" style={{ margin: '20px 0' }}>部屋A</Typography>
        <Button onClick={handleNextWeek}>翌週</Button>
      </Box>
      <SimpleCalendar startDay={weekStart} />
    </Box>
  );
};

export default Yoyaku;
