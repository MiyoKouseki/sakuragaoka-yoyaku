// YoyakuPage.tsx
import React, { useReducer, useEffect, useMemo } from 'react';
import { Grid, Typography } from '@mui/material';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { fetchReservations } from '../services/fetchReservations';
import SimpleCalendar from '../components/calendarFeatures/SimpleCalendar';
import BuildingSelector from '../components/selectors/BuildingSelector';
import RoomSelector from '../components/selectors/RoomSelector';
import DateSelector from '../components/selectors/DateSelector';
import { State } from '../types/reservationState';
import { reducer } from '../reducers/reservationReducer';
import { generateDates, getNextHalfHourDate } from '../utils/dateUtils';
import { rooms } from '../data/buildingData';
import { getStartOfDay, getEndOfDay } from '../utils/dateUtils';
import { Action } from '../types/reservationActions';
type ActionType = Action['type'];

const dates = generateDates();

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
        return state.selectedDate ? getStartOfDay(state.selectedDate) : new Date();
    }, [state.selectedDate]);

    const endOfDay = useMemo(() => {
        return state.selectedDate ? getEndOfDay(state.selectedDate) : new Date();
    }, [state.selectedDate]);

    const fetchAndSetReservations = async (
        selectedRoom: string,
        start: string,
        end: string,
        dispatch: React.Dispatch<Action>
    ) => {
        try {
            const fetchedReservations = await fetchReservations(selectedRoom, start, end);
            dispatch({ type: 'SET_RESERVATIONS', payload: fetchedReservations });
        } catch (error) {
            console.error('Error fetching reservations:', error);
            dispatch({ type: 'SET_ERROR_MESSAGE', payload: '予約情報の取得に失敗しました。' });
        }
    };

    useEffect(() => {
        if (state.selectedDate && state.startTime) {
            fetchAndSetReservations(
                state.selectedRoom,
                startOfDay.toISOString(),
                endOfDay.toISOString(),
                dispatch
            );
        }
    }, [state.selectedDate, state.startTime, state.selectedRoom, startOfDay, endOfDay, dispatch]);

    const handleStateChange = (type: ActionType, payload: any) => {
        dispatch({ type, payload });
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
                onSelectBuilding={(building) => handleStateChange('SET_BUILDING', building)}
            />
            <Grid item xs={2}>
                <Typography variant="subtitle1" style={{ textAlign: 'right' }}>部屋</Typography>
            </Grid>
            <RoomSelector
                selectedBuilding={state.selectedBuilding}
                selectedRoom={state.selectedRoom}
                onSelectRoom={(room) => handleStateChange('SET_ROOM', room)}
                rooms={rooms}
            />
            <Grid item xs={2}>
                <Typography variant="subtitle1" style={{ textAlign: 'right' }}>日にち</Typography>
            </Grid>
            <Grid item xs={10}>
                <DateSelector
                    dates={dates}
                    selectedDate={state.selectedDate}
                    onSelectDate={(date) => handleStateChange('SET_DATE', date)}
                />
            </Grid>
            <Grid item xs={2}>
                <Typography variant="subtitle1" style={{ textAlign: 'right' }}>予約状況</Typography>
            </Grid>
            <Grid item xs={10} container justifyContent="left">
                <Grid item xs={10}>
                    <SimpleCalendar
                        date={state.selectedDate ? new Date(state.selectedDate) : new Date()}
                        reservations={state.reservations}
                    />
                </Grid>
            </Grid>
        </Grid >
    );
};

export default YoyakuPage;
