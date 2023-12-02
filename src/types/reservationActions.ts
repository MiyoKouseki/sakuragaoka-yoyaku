import BuildingType from "./buildingTypes";

// fixme!!!
interface Event {
    organizationName: string;
    roomName: string;
    startTime: string;
    endTime: string;
    // 他の必要なフィールド
}


export type State = {
    selectedBuilding: BuildingType;
    selectedRoom: string;
    selectedDate: Date|null;
    calendarDate: Date;
    startTime: Date | null;
    selectedUsageTime: number | null;
    reservations: Event[];
    errorMessage: string | null;
};

export type PayloadType =
    | { type: 'SET_BUILDING'; payload: State['selectedBuilding'] }
    | { type: 'SET_ROOM'; payload: State['selectedRoom'] }
    | { type: 'SET_DATE'; payload: State['selectedDate'] }
    | { type: 'SET_ERROR_MESSAGE'; payload: State['errorMessage'] }
    | { type: 'SET_CALENDAR_DATE'; payload: State['calendarDate'] }
    | { type: 'SET_START_TIME'; payload: State['startTime'] }
    | { type: 'SET_USAGE_TIME'; payload: State['selectedUsageTime'] }
    | { type: 'SET_RESERVATIONS'; payload: State['reservations'] };   