// services/fetchEvents.ts
import { fetchCollectionData } from '../services/firestoreServices';
import { Reservation } from '../interfaces/Entity';

export const fetchEvents = async () => {
    try {
      const fetchedReservations = await fetchCollectionData<Reservation>('reservations');
      return fetchedReservations.map((reservation: Reservation) => ({
        ...reservation,
        start: new Date(reservation.startTime),
        end: new Date(reservation.endTime),
        title: `${reservation.organizationName} - ${reservation.roomName}`,
      }));
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error; // エラーを再投げる
    }
  };
  