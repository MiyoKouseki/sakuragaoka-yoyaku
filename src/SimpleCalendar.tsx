import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

const getWeekDay = (date: Date) => {
    return weekDays[date.getDay()];
};

interface SimpleCalendarProps {
    startDay: Date;
}

const SimpleCalendar: React.FC<SimpleCalendarProps> = ({ startDay }) => {
    const [selectedCells, setSelectedCells] = useState<{ [key: string]: boolean }>({});

    const rows = 14;
    const days = Array.from({ length: rows }, (_, i) => {
        return new Date(startDay.getFullYear(), startDay.getMonth(), startDay.getDate() + i);
    });
    const hours = Array.from({ length: 15 }, (_, i) => 8 + i); // 8時から22時まで

    const handleCellClick = (day: Date, hour: number) => {
        const key = `${day.getDate()}-${hour}`;
        setSelectedCells(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const isCellSelected = (day: Date, hour: number) => {
        return selectedCells[`${day.getDate()}-${hour}`];
    };

    return (
        <Box display="flex" flexDirection="column" maxWidth={1600}>
            <Box display="flex">
                <Box width={150} m={0.2} /> {/* 左側の日付のためのスペース */}
                {hours.map(hour => (
                    <Box key={hour} width={40} m={0.2} display="flex" justifyContent="center" alignItems="center">
                        <Typography>{hour}時</Typography>
                    </Box>
                ))}
            </Box>
            {days.map(day => (
                <Box key={day.getDate()} display="flex">
                    <Box
                        key={day.getDate()}
                        display="flex"
                        width={150}
                        m={0.2}
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <Typography style={{ marginRight: '8px', width: '30%', textAlign: 'right' }}>
                            {day.getDate() === 1 || day === days[0] ? `${day.getMonth() + 1}月` : ''}
                        </Typography>
                        <Typography style={{ width: '30%', textAlign: 'right' }}>{`${day.getDate()}日`}</Typography>
                        <Typography style={{ width: '40%', textAlign: 'center' }}>{`(${getWeekDay(day)})`}</Typography>
                    </Box>
                    {hours.map(hour => (
                        <Box
                            key={`${day.getDate()}-${hour}`}
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
