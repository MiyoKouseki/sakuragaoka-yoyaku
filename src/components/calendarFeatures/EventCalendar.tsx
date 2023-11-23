// EventCalendar.tsx

import React from 'react';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ja';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../styles/EventCalendarStyles.css';
import { useMediaQuery } from '@mui/material';
import CustomHeader from './CustomEventCalendarHeader';
import { Event } from '../../interfaces/Entity';
moment.locale('ja');

interface EventCalendarProps {
  events: Event[];
  eventColors: Record<string, string>; // eventColors の型を変更
}

const localizer = momentLocalizer(moment);
const SMALL_SCREEN_SIZE = 800;

const EventCalendar: React.FC<EventCalendarProps> = ({ events, eventColors }) => {
  const isSmallScreen = useMediaQuery(`(max-width:${SMALL_SCREEN_SIZE}px)`);
  const defaultView: View = isSmallScreen ? 'day' : 'week';
  
  const eventStyleGetter = (event: Event) => {
    const backgroundColor = eventColors[event.roomName];
    return {
      style: {
        backgroundColor,
      },
    };
  };

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
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default EventCalendar;
