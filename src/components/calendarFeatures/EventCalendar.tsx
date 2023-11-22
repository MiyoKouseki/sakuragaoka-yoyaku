// EventCalendar.tsx

import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ja';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../styles/EventCalendarStyles.css';
import { useMediaQuery } from '@mui/material';
import CustomHeader from './CustomEventCalendarHeader';
import { fetchEvents } from '../../services/fetchEvents';

moment.locale('ja');

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


  useEffect(() => {
    const loadEvents = async () => {
      try {
        const fetchedEvents = await fetchEvents();
        setEvents(fetchedEvents); // 状態にイベントをセット
      } catch (error) {
        // ユーザーにエラーを通知するロジックをここに追加
      }
    };
    loadEvents();
  }, []);

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
