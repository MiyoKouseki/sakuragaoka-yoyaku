//reservationState.ts
import BuildingType from "./buildingTypes";


// fixme!!!!
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
    selectedDate: string | null;
    calendarDate: Date;
    startTime: Date | null;
    selectedUsageTime: number | null;
    reservations: Event[];
    errorMessage: string | null;
};
