// YoyakuPage.tsx
import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import { Grid, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { format, addDays } from 'date-fns';
import { ja } from 'date-fns/locale';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

// 今日から7日間の日付と曜日を生成する関数（日本語）
const generateDates = () => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
        const date = addDays(today, i);
        return format(date, 'M/d(E)', { locale: ja }); // 例: "11/26(日)"
    });
};

const chipStyle = {
    size: 'medium' as const,
    margin: '3px',
};



type BuildingType = '桜ヶ丘体育館' | 'サンビレッジ' | '建物C';
const dates = generateDates();

const formatTime = (date: Date | null) => {
    if (date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? '午後' : '午前';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${ampm} ${formattedHours}:${formattedMinutes}`;
    }
    return '';
};

const BuildingSelector: React.FC = () => {
    const [selectedBuilding, setSelectedBuilding] = useState<BuildingType>('桜ヶ丘体育館');
    const [selectedRoom, setSelectedRoom] = useState<string>('体育室A面');
    const today = format(new Date(), 'M/d(E)', { locale: ja });
    const [selectedDate, setSelectedDate] = useState<string | null>(today);
    const [startTime, setStartTime] = useState<Date | null>();
    const [selectedUsageTime, setSelectedUsageTime] = useState<number | null>(1);

    const usageTimeOptions = [
        { label: '1時間', value: 1 },
        { label: '1時間30分', value: 1.5 },
        { label: '2時間', value: 2 },
        { label: '2時間30分', value: 2.5 },
        { label: '3時間', value: 3 },
        { label: '3時間30分', value: 3.5 },
        { label: '4時間', value: 4 },
        { label: '4時間30分', value: 4.5 },
        { label: '5時間', value: 5 },
        { label: '5時間30分', value: 5.5 },
        { label: '6時間', value: 6 },
    ];

    //const handleUsageTimeChange = (event: React.SyntheticEvent) => {
    //    const value = parseFloat((event.target as HTMLInputElement).value);
    //    setSelectedUsageTime(value);
    //};

    const handleUsageTimeChange = (event: SelectChangeEvent<number | null>) => {
        const newValue = event.target.value;
        setSelectedUsageTime(newValue === null ? null : parseFloat(newValue.toString()));
    };
    

    const handleDateClick = (date: string) => {
        setSelectedDate(date);
    };

    const rooms: { [key in BuildingType]: string[] } = {
        '桜ヶ丘体育館': ['体育室A面', '体育室B面', '卓球室', '柔剣道室', '第1会議室', '第2会議室', 'A7'],
        'サンビレッジ': ['テニスコートA面', 'テニスコートB面', 'B3'],
        '建物C': ['C1', 'C2', 'C3']
    };

    const handleBuildingClick = (building: BuildingType) => {
        setSelectedBuilding(building);
        setSelectedRoom(rooms[building][0]); // 選択された建物の最初の部屋を選択
    };

    const handleRoomClick = (room: string) => {
        setSelectedRoom(room);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <Typography variant="subtitle1">建物</Typography>
            </Grid>
            <Grid item xs={10}>
                {(['桜ヶ丘体育館', 'サンビレッジ', '建物C'] as BuildingType[]).map(building => (
                    <Chip
                        key={building}
                        label={building}
                        style={chipStyle}
                        onClick={() => handleBuildingClick(building)}
                        color={selectedBuilding === building ? 'primary' : 'default'}
                    />
                ))}
            </Grid>
            <Grid item xs={2}>
                <Typography variant="subtitle1">部屋</Typography>
            </Grid>
            <Grid item xs={10}>
                {rooms[selectedBuilding].map(room => (
                    <Chip
                        key={room}
                        label={room}
                        onClick={() => handleRoomClick(room)}
                        style={chipStyle}
                        color={selectedRoom === room ? 'primary' : 'default'}
                    />
                ))}
            </Grid>
            <Grid item xs={2}>
                <Typography variant="subtitle1">日にち</Typography>
            </Grid>
            <Grid item xs={10}>
                {dates.map(date => (
                    <Chip
                        key={date}
                        label={date}
                        onClick={() => handleDateClick(date)} // クリックイベントハンドラを追加
                        style={chipStyle}
                        color={selectedDate === date ? 'primary' : 'default'} // 選択状態を反映
                    />
                ))}
            </Grid>
            <Grid item xs={2}>
                <Typography variant="subtitle1">開始時刻</Typography>
            </Grid>
            <Grid item xs={10}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                        label="開始時刻"
                        value={startTime}
                        onChange={(newTime) => setStartTime(newTime)}
                        minutesStep={30}
                        ampm={false}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="subtitle1">利用時間</Typography>
            </Grid>
            <Grid item xs={10}>
                <FormControl>
                    <InputLabel id="usage-time-label">利用時間</InputLabel>
                    <Select
                        labelId="usage-time-label"
                        value={selectedUsageTime}
                        onChange={handleUsageTimeChange}
                    >
                        {usageTimeOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid >
            <Grid item xs={12}>
                {
                    selectedBuilding && (
                        <Typography variant="subtitle1">
                            {selectedBuilding},{selectedRoom}, {selectedDate}, {startTime?.toISOString()}, {selectedUsageTime}
                        </Typography>
                    )
                }
            </Grid>
        </Grid >
    );
};

export default BuildingSelector;
