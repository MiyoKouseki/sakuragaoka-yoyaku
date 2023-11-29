// YoyakuPage.tsx
import React, { useReducer, useEffect, useMemo } from 'react';
import { Grid, Typography } from '@mui/material';
import { format, addDays } from 'date-fns';
import { ja } from 'date-fns/locale';
import { fetchReservations } from '../services/fetchReservations';
import SimpleCalendar from '../components/calendarFeatures/SimpleCalendar';
import BuildingSelector from '../components/selectors/BuildingSelector';
import BuildingType from '../types/buildingTypes';
import RoomSelector from '../components/selectors/RoomSelector';
import DateSelector from '../components/selectors/DateSelector';
import { State } from '../types/reservationState';
import { reducer } from '../reducers/reservationReducer';

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
                <Typography variant="subtitle1" style={{ textAlign: 'right' }}>建物</Typography>
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
                <Typography variant="subtitle1" style={{ textAlign: 'right' }}>部屋</Typography>
            </Grid>
            <RoomSelector
                selectedBuilding={state.selectedBuilding}
                selectedRoom={state.selectedRoom}
                onSelectRoom={handleRoomClick}
                rooms={rooms}
            />
            <Grid item xs={2}>
                <Typography variant="subtitle1" style={{ textAlign: 'right' }}>日にち</Typography>
            </Grid>
            <Grid item xs={10}>
                <DateSelector
                    dates={dates}
                    selectedDate={state.selectedDate}
                    onSelectDate={handleDateClick}
                />
            </Grid>
            <Grid item xs={2}>
                <Typography variant="subtitle1" style={{ textAlign: 'right' }}>予約状況</Typography>
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
