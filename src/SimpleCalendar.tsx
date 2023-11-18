import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

const getWeekDay = (day: number) => {
    const date = new Date(2022, 11, day); // 12月は0から始まるため11
    return weekDays[date.getDay()];
};

const SimpleCalendar: React.FC = () => {
    const [selectedCells, setSelectedCells] = useState<{ [key: string]: boolean }>({});

    const rows = 14;
    const days = Array.from({ length: rows }, (_, i) => i + 1); // 1日から14日まで
    const hours = Array.from({ length: 15 }, (_, i) => 8 + i); // 8時から22時まで

    const handleCellClick = (day: number, hour: number) => {
        const key = `${day}-${hour}`;
        setSelectedCells(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const isCellSelected = (day: number, hour: number) => {
        return selectedCells[`${day}-${hour}`];
    };

    return (
        <Box display="flex" flexDirection="column" maxWidth={1600}>
            <Box display="flex">
                <Box width={70} m={0.2} /> {/* 左側の日付のためのスペース */}
                {hours.map(hour => (
                    <Box key={hour} width={40} m={0.2} display="flex" justifyContent="center" alignItems="center">
                        <Typography>{hour}時</Typography>
                    </Box>
                ))}
            </Box>
            {days.map(day => (
                <Box key={day} display="flex">
                    <Box width={70} m={0.2} display="flex" justifyContent="space-between" alignItems="center">
                        <Typography style={{ textAlign: 'right', width: '50%' }}>{`${day}日`}</Typography>
                        <Typography style={{ textAlign: 'center', width: '50%' }}>{`(${getWeekDay(day)})`}</Typography>
                    </Box>
                    {hours.map(hour => (
                        <Box
                            key={`${day}-${hour}`}
                            width={40}
                            height={30}
                            bgcolor={isCellSelected(day, hour) ? 'lightgreen' : 'grey.300'}
                            m={0.2}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            onClick={() => handleCellClick(day, hour)}
                            style={{ cursor: 'pointer' }}
                        />
                    ))}
                </Box>
            ))}
        </Box>
    );
};

export default SimpleCalendar;
