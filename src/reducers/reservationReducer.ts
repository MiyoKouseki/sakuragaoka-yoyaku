//reservationReducer.ts
import { PayloadType } from '../types/reservationActions';
import { State } from '../types/reservationState';

export const reducer = (state: State, action: PayloadType): State => {
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
