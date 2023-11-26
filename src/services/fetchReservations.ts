//fetchReservations.ts
import { fetchCollectionData } from '../services/firestoreServices';

interface Event {
    organizationName: string;
    roomName: string;
    startTime: string;
    endTime: string;
    // 他の必要なフィールド
}

export const fetchReservations = async (
    room: string,
    start: string,
    end: string
): Promise<Event[]> => {
    // roomNameに基づいて検索
    const allEvents = await fetchCollectionData<Event>('reservations', 'roomName', room);

    // startTimeとendTimeの範囲内のイベントをフィルタリング
    const filteredEvents = allEvents.filter(event => {
        const eventStart = new Date(event.startTime);
        const eventEnd = new Date(event.endTime);
        const searchStart = new Date(start);
        const searchEnd = new Date(end);

        return eventStart >= searchStart && eventEnd <= searchEnd;
    });

    return filteredEvents;
};