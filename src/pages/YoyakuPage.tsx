// YoyakuPage.tsx
import React from 'react';
import EventCalendar from '../components/calendarFeatures/EventCalendar';
import Container from '@mui/material/Container';

const YoyakuPage: React.FC = () => {
  return (
    <Container>
      <EventCalendar />
    </Container>
  );
};

export default YoyakuPage;
