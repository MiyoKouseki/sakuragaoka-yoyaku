// YoyakuPage.tsx
import React from 'react';
import EventCalendar from './EventCalendar';

const YoyakuPage: React.FC = () => {
  return (
    <div>
      <h1>予約カレンダー</h1>
      <EventCalendar />
    </div>
  );
};

export default YoyakuPage;
