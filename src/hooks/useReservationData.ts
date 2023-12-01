// hooks/useReservationData.ts
import { useState, useEffect } from 'react';
import { fetchReservations } from '../services/fetchReservations';

interface Event {
    organizationName: string;
    roomName: string;
    startTime: string;
    endTime: string;
    // 他の必要なフィールド
}

const useReservationData = (selectedRoom: string, startOfDay: Date, endOfDay: Date) => {
    const [reservations, setReservations] = useState<Event[]>([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchAndSetReservations = async () => {
            try {
                const fetchedReservations = await fetchReservations(selectedRoom, startOfDay.toISOString(), endOfDay.toISOString());
                setReservations(fetchedReservations);
            } catch (error) {
                console.error('Error fetching reservations:', error);
                setErrorMessage('予約情報の取得に失敗しました。');
            }
        };

        fetchAndSetReservations();
    }, [selectedRoom, startOfDay, endOfDay]);

    return { reservations, errorMessage };
};

export default useReservationData;
