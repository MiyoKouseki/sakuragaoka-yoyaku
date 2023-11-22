// EventCalendar.tsx

import React, { useEffect, useState, useCallback } from 'react';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ja';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { fetchCollectionData } from '../services/firestoreServices';
import './EventCalendarStyles.css';
import { useMediaQuery } from '@mui/material';
import CustomHeader from './CustomHeader';

moment.locale('ja');

interface Reservation {
  id: string;
  roomName: string;
  organizationName: string;
  startTime: string;
  endTime: string;
}

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

const localizer = momentLocalizer(moment);
const SMALL_SCREEN_SIZE = 800; // マジックナンバーを定数に置き換え

const EventCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const isSmallScreen = useMediaQuery(`(max-width:${SMALL_SCREEN_SIZE}px)`);
  const defaultView: View = isSmallScreen ? 'day' : 'week';

  // リファクタリングされた非同期データフェッチ関数
  const fetchEvents = useCallback(async () => {
    const fetchedReservations = await fetchCollectionData<Reservation>('reservations');
    const mappedEvents = fetchedReservations.map((reservation) => ({
      ...reservation,
      start: new Date(reservation.startTime),
      end: new Date(reservation.endTime),
      title: `${reservation.organizationName} - ${reservation.roomName}`,
    }));
    setEvents(mappedEvents);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <div style={{ height: '700px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={defaultView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        components={{ toolbar: CustomHeader }}
        min={new Date(0, 0, 0, 8, 0, 0)} 
        max={new Date(0, 0, 0, 22, 0, 0)}
      />
    </div>
  );
};

export default EventCalendar;
