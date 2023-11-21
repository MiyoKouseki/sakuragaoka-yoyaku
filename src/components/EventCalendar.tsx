// EventCalendar.tsx

import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ja'; // 日本語のロケールをインポート
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { fetchCollectionData } from '../services/firestoreServices';
import './EventCalendarStyles.css';
import CustomHeader from './CustomHeader';


moment.locale('ja'); // ロケールを日本語に設定


interface Reservation {
  id: string;
  roomName: string;
  organizationName: string;
  startTime: string; // ISO 8601 日付文字列
  endTime: string;
}

const localizer = momentLocalizer(moment);

const EventCalendar: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]); // any型を使用

  useEffect(() => {
    const fetchEvents = async () => {
      const fetchedReservations = await fetchCollectionData<Reservation>('reservations');
      const mappedEvents = fetchedReservations.map(event => ({
        ...event,
        start: new Date(event.startTime),
        end: new Date(event.endTime),
      }));
      setEvents(mappedEvents);
    };

    fetchEvents();
  }, []);

  const messages = {
    allDay: '終日',
    previous: '<',
    next: '>',
    today: '今日',
    month: '月',
    week: '週',
    day: '日',
    agenda: '予定表',
    date: '日付',
    time: '時間',
    event: 'イベント', // または '予定'
    // 他にカスタマイズしたいラベルがあればここに追加
  };

  return (
    <div style={{ height: '700px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages} // カスタマイズしたメッセージを設定
        style={{ height: '100%' }}
      />
    </div>
  );
};

export default EventCalendar;
