import BuildingType from "./buildingTypes";

// fixme!!!
interface Event {
    organizationName: string;
    roomName: string;
    startTime: string;
    endTime: string;
    // 他の必要なフィールド
}

export type Action =
    | { type: 'SET_BUILDING'; payload: BuildingType }
    | { type: 'SET_ROOM'; payload: string }
    | { type: 'SET_DATE'; payload: string | null }
    | { type: 'SET_ERROR_MESSAGE'; payload: string | null }
    | { type: 'SET_CALENDAR_DATE'; payload: Date }
    | { type: 'SET_START_TIME'; payload: Date | null }
    | { type: 'SET_USAGE_TIME'; payload: number | null }
    | { type: 'SET_RESERVATIONS'; payload: Event[] };
