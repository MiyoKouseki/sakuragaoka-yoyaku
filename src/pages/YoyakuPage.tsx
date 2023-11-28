// YoyakuPage.tsx
import React, { useReducer, useEffect, useMemo } from 'react';
import Chip from '@mui/material/Chip';
import { Grid, Typography } from '@mui/material';
import { format, addDays } from 'date-fns';
import { ja } from 'date-fns/locale';
import { fetchReservations } from '../services/fetchReservations';
import SimpleCalendar from '../components/calendarFeatures/SimpleCalendar';

type State = {
    selectedBuilding: BuildingType;
    selectedRoom: string;
    selectedDate: string | null;
    calendarDate: Date;
    startTime: Date | null;
    selectedUsageTime: number | null;
    reservations: Event[];
    errorMessage: string | null;
};

type Action =
    | { type: 'SET_BUILDING'; payload: BuildingType }
    | { type: 'SET_ROOM'; payload: string }
    | { type: 'SET_DATE'; payload: string | null }
    | { type: 'SET_ERROR_MESSAGE'; payload: string | null }
    | { type: 'SET_CALENDAR_DATE'; payload: Date }
    | { type: 'SET_START_TIME'; payload: Date | null }
    | { type: 'SET_USAGE_TIME'; payload: number | null }
    | { type: 'SET_RESERVATIONS'; payload: Event[] };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_BUILDING':
            return { ...state, selectedBuilding: action.payload };
        case 'SET_ROOM':
            return { ...state, selectedRoom: action.payload };
        case 'SET_DATE':
            return { ...state, selectedDate: action.payload };
        case 'SET_ERROR_MESSAGE':
            return { ...state, selectedDate: action.payload };
        case 'SET_CALENDAR_DATE':
            return { ...state, calendarDate: action.payload };
        case 'SET_START_TIME':
            return { ...state, startTime: action.payload };
        case 'SET_USAGE_TIME':
            return { ...state, selectedUsageTime: action.payload };
        case 'SET_RESERVATIONS':
            return { ...state, reservations: action.payload };
        default:
            return state;
    }
};


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
    size: 'small' as const,
    margin: '1px',
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
    const initialState: State = {
        selectedBuilding: '桜ヶ丘体育館',
        selectedRoom: '体育室A面',
        selectedDate: format(new Date(), 'yyyy-MM-dd', { locale: ja }),
        calendarDate: new Date(),
        startTime: getNextHalfHourDate(),
        selectedUsageTime: 1,
        reservations: [],
        errorMessage: null,
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const startOfDay = useMemo(() => {
        if (state.selectedDate) {
            const selectedDate = new Date(state.selectedDate);
            selectedDate.setHours(0, 0, 0, 0);
            return selectedDate;
        }
        return new Date();
    }, [state.selectedDate]); // ここで useMemo を使用

    const endOfDay = useMemo(() => {
        if (state.selectedDate) {
            const selectedDate = new Date(state.selectedDate);
            selectedDate.setHours(24, 0, 0, 0);
            return selectedDate;
        }
        return new Date();
    }, [state.selectedDate]); // ここで useMemo を使用

    useEffect(() => {
        const fetchAndSetReservations = async () => {
            if (state.selectedDate && state.startTime) {
                try {
                    const fetchedReservations = await fetchReservations(
                        state.selectedRoom,
                        startOfDay.toISOString(),
                        endOfDay.toISOString()
                    );

                    dispatch({ type: 'SET_RESERVATIONS', payload: fetchedReservations });
                } catch (error) {
                    console.error('Error fetching reservations:', error);
                    dispatch({ type: 'SET_ERROR_MESSAGE', payload: '予約情報の取得に失敗しました。' });
                }
            }
            else {
                console.log('!!!!', state.selectedDate, state.startTime)
            }
        };

        fetchAndSetReservations();
    }, [state.selectedDate, state.startTime, state.selectedUsageTime, state.selectedRoom, startOfDay, endOfDay]);


    const handleDateClick = (date: string) => {
        dispatch({ type: 'SET_DATE', payload: date });

        const calendarDate = date ? new Date(date) : new Date();
        dispatch({ type: 'SET_CALENDAR_DATE', payload: calendarDate });
    };

    const rooms: { [key in BuildingType]: string[] } = {
        '桜ヶ丘体育館': ['体育室A面', '体育室B面', '卓球室', '柔剣道室', '第1会議室', '第2会議室', 'A7'],
        'サンビレッジ': ['テニスコートA面', 'テニスコートB面', 'B3'],
        '建物C': ['C1', 'C2', 'C3']
    };

    const handleBuildingClick = (building: BuildingType) => {
        dispatch({ type: 'SET_BUILDING', payload: building });
        // 必要に応じて関連する状態も更新
    };

    const handleRoomClick = (room: string) => {
        dispatch({ type: 'SET_ROOM', payload: room });
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <Typography variant="subtitle1">建物</Typography>
                {state.errorMessage && (
                    <Grid item xs={12}>
                        <Typography color="error">{state.errorMessage}</Typography>
                    </Grid>
                )}
            </Grid>
            <BuildingSelector
                selectedBuilding={state.selectedBuilding}
                onSelectBuilding={handleBuildingClick}
            />
            <Grid item xs={2}>
                <Typography variant="subtitle1">部屋</Typography>
            </Grid>
            <RoomSelector
                selectedBuilding={state.selectedBuilding}
                selectedRoom={state.selectedRoom}
                onSelectRoom={handleRoomClick}
                rooms={rooms}
            />
            <Grid item xs={2}>
                <Typography variant="subtitle1">日にち</Typography>
            </Grid>
            <Grid item xs={10}>
                <DateSelector
                    dates={dates}
                    selectedDate={state.selectedDate}
                    onSelectDate={handleDateClick}
                />
            </Grid>
            <Grid item xs={2}>
                <Typography variant="subtitle1">予約状況</Typography>
            </Grid>
            <Grid item xs={10} container justifyContent="left">
                <Grid item xs={10}>
                    <SimpleCalendar
                        date={state.selectedDate ? new Date(state.selectedDate) : new Date()} // nullチェックを追加
                        reservations={state.reservations}
                    />
                </Grid>
            </Grid>
        </Grid >
    );
};

export default YoyakuPage;
