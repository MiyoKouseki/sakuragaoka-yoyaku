import { getAuth } from 'firebase/auth';
import { fetchCollectionData } from '../services/firestoreServices';
import { Reservation } from '../interfaces/Entity';

export const fetchEvents = async () => {
  try {
    const fetchedReservations = await fetchCollectionData<Reservation>('reservations');
    const isUserAuthenticated = !!getAuth().currentUser;

    return fetchedReservations.map((reservation: Reservation) => ({
      ...reservation,
      start: new Date(reservation.startTime),
      end: new Date(reservation.endTime),
      title: isUserAuthenticated
        ? `${reservation.organizationName} - ${reservation.roomName}`
        : reservation.roomName,
    }));
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};
