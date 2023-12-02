// loadInitialState.ts

import { State } from '../types/reservationState';

export const loadInitialState = (): State => {
  const savedState = sessionStorage.getItem('reservationState');
  
  if (savedState) {
    const parsedState = JSON.parse(savedState);

    // 文字列から Date オブジェクトに変換
    parsedState.selectedDate = new Date(parsedState.selectedDate);
    parsedState.calendarDate = new Date(parsedState.calendarDate);
    parsedState.startTime = new Date(parsedState.startTime);

    return parsedState;
  } else {
    return {
      selectedBuilding: '桜ヶ丘体育館',
      selectedRoom: '体育室A面',
      selectedDate: new Date(),
      calendarDate: new Date(),
      startTime: new Date(),
      selectedUsageTime: 1,
      reservations: [],
      errorMessage: null,
    };
  }
};
