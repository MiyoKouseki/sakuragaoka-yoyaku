import React from 'react';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer, Event as CalendarEvent } from 'react-big-calendar';
import useAuthState from '../../hooks/useAuthState';

interface Event {
    organizationName: string;
    roomName: string;
    startTime: string;
    endTime: string;
    // 他の必要なフィールド
}

const localizer = momentLocalizer(moment);

interface SimpleCalendarProps {
    reservations: Event[];
    date: Date;
    // ...他のpropsがあればここに追加...
}

const SimpleCalendar: React.FC<SimpleCalendarProps> = ({ reservations, date }) => {
    const user = useAuthState();
    const events: CalendarEvent[] = reservations.map(reservation => ({
        title: user ? reservation.organizationName : "予約済み",
        start: new Date(reservation.startTime), // `startTime`はISO形式の日付文字列を想定
        end: new Date(reservation.endTime), // `endTime`もISO形式の日付文字列を想定
        allDay: false, // または予約が終日のイベントであるかどうかに基づいて
        // ここに他の必要なプロパティを追加
    }));
    const handleNavigate = (newDate: Date) => {
        // ナビゲーション時の処理をここに記述
      };

    return (
        <div style={{ height: '400px' }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                defaultView='day'
                date={date}
                onNavigate={handleNavigate}
                toolbar={false}
                min={moment().hour(8).minute(0).toDate()}
                max={moment().hour(22).minute(0).toDate()}
            />
        </div>
    );
};

export default SimpleCalendar;
