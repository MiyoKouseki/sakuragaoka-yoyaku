// YoyakuPage.tsx
import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import { Grid, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { format, addDays } from 'date-fns';
import { ja } from 'date-fns/locale';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fetchReservations } from '../services/fetchReservations';
import EventCalendar from '../components/calendarFeatures/EventCalendar';


const BuildingSelector = ({
    selectedBuilding,
    onSelectBuilding
}: {
    selectedBuilding: BuildingType;
    onSelectBuilding: (building: BuildingType) => void;
}) => {
    return (
        <Grid item xs={10}>
            {(['桜ヶ丘体育館', 'サンビレッジ', '建物C'] as BuildingType[]).map(building => (
                <Chip
                    key={building}
                    label={building}
                    style={chipStyle}
                    onClick={() => onSelectBuilding(building)}
                    color={selectedBuilding === building ? 'primary' : 'default'}
                />
            ))}
        </Grid>
    );
};

interface RoomSelectorProps {
    selectedBuilding: BuildingType;
    selectedRoom: string;
    onSelectRoom: (room: string) => void;
    rooms: { [key in BuildingType]: string[] }; // この行を追加
}

const RoomSelector: React.FC<RoomSelectorProps> = ({
    selectedBuilding,
    selectedRoom,
    onSelectRoom,
    rooms
}) => {
    return (
        <Grid item xs={10}>
            {rooms[selectedBuilding].map(room => (
                <Chip
                    key={room}
                    label={room}
                    onClick={() => onSelectRoom(room)}
                    style={chipStyle}
                    color={selectedRoom === room ? 'primary' : 'default'}
                />
            ))}
        </Grid>
    );
};

const DateSelector = ({
    dates,
    selectedDate,
    onSelectDate
}: {
    dates: { display: string; value: string }[];
    selectedDate: string | null;
    onSelectDate: (date: string) => void;
}) => {
    return (
        <Grid item xs={10}>
            {dates.map(({ display, value }) => (
                <Chip
                    key={display}
                    label={display}
                    onClick={() => onSelectDate(value)}
                    style={chipStyle}
                    color={selectedDate === value ? 'primary' : 'default'}
                />
            ))}
        </Grid>
    );
};

interface Event {
    organizationName: string;
    roomName: string;
    startTime: string;
    endTime: string;
    // 他の必要なフィールド
}

// 今日から7日間の日付と曜日を生成する関数（日本語）
const generateDates = () => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
        const date = addDays(today, i);
        return {
            display: format(date, 'M/d(E)', { locale: ja }), // 表示用: "11/26(日)"
            value: format(date, 'yyyy-MM-dd'), // 解析可能な形式: "2023-11-26"
        };
    });
};


const chipStyle = {
    size: 'medium' as const,
    margin: '3px',
};



type BuildingType = '桜ヶ丘体育館' | 'サンビレッジ' | '建物C';
const dates = generateDates();

const getNextHalfHourDate = () => {
    const now = new Date();
    const minutes = now.getMinutes();
    const nextHalfHour = minutes >= 30 ? new Date(now.setHours(now.getHours() + 1, 0, 0, 0)) : new Date(now.setMinutes(30, 0, 0));
    return nextHalfHour;
};

const YoyakuPage: React.FC = () => {
    const [selectedBuilding, setSelectedBuilding] = useState<BuildingType>('桜ヶ丘体育館');
    const [selectedRoom, setSelectedRoom] = useState<string>('体育室A面');
    const today = format(new Date(), 'yyyy-MM-dd', { locale: ja }); // 例: "2023-11-26"
    const [selectedDate, setSelectedDate] = useState<string | null>(today);
    const initialCalendarDate = today ? new Date(today) : new Date();
    const [calendarDate, setCalendarDate] = useState<Date>(initialCalendarDate);
    const [startTime, setStartTime] = useState<Date | null>(getNextHalfHourDate());
    const [selectedUsageTime, setSelectedUsageTime] = useState<number | null>(1);
    const [reservations, setReservations] = useState<Event[]>([]);

    useEffect(() => {
        const fetchAndSetReservations = async () => {
            if (selectedDate && startTime) {
                const startOfDay = new Date(selectedDate);
                startOfDay.setHours(0, 0, 0, 0); // 時、分、秒、ミリ秒を0に設定

                // その日の24時（翌日の0時、日の終わり）
                const endOfDay = new Date(selectedDate);
                endOfDay.setHours(24, 0, 0, 0); // 時を24に設定し、分、秒、ミリ秒を0に設定

                try {
                    const fetchedReservations = await fetchReservations(
                        selectedRoom,
                        startOfDay.toISOString(),
                        endOfDay.toISOString()
                    );


                    setReservations(fetchedReservations);
                } catch (error) {
                    console.error('Error fetching reservations:', error);
                }
            }
            else {
                console.log('!!!!', selectedDate, startTime)
            }
        };

        fetchAndSetReservations();
    }, [selectedDate, startTime, selectedUsageTime, selectedRoom]);

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
        const calendarDate = date ? new Date(date) : new Date();
        setCalendarDate(calendarDate);
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

    const transformedEvents = reservations.map((event: Event) => ({
        title: event.organizationName,
        start: new Date(event.startTime),
        end: new Date(event.endTime),
        roomName: event.roomName, // roomName を追加
        // 他の必要な変換
    }));


    return (
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <Typography variant="subtitle1">建物</Typography>
            </Grid>
            <BuildingSelector
                selectedBuilding={selectedBuilding}
                onSelectBuilding={handleBuildingClick}
            />
            <Grid item xs={2}>
                <Typography variant="subtitle1">部屋</Typography>
            </Grid>
            <RoomSelector
                selectedBuilding={selectedBuilding}
                selectedRoom={selectedRoom}
                onSelectRoom={handleRoomClick}
                rooms={rooms}
            />
            <Grid item xs={2}>
                <Typography variant="subtitle1">日にち</Typography>
            </Grid>
            <DateSelector
                dates={dates}
                selectedDate={selectedDate}
                onSelectDate={handleDateClick}
            />
            <Grid item xs={2}>
                <Typography variant="subtitle1">開始時刻</Typography>
            </Grid>
            <Grid item xs={10}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
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
            <Grid item xs={12}>
                <Typography variant="h6">予約情報:</Typography>
                {reservations.map((reservation, index) => (
                    <Typography key={index}>
                        {reservation.organizationName} - {reservation.roomName} - {reservation.startTime} - {reservation.endTime}
                    </Typography>
                ))}
            </Grid>
            <EventCalendar
                events={transformedEvents}
                eventColors={{}}
                date={calendarDate}
            />
        </Grid >
    );
};

export default YoyakuPage;
