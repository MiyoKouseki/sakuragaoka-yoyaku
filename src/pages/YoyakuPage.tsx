// YoyakuPage.tsx
import React, { useEffect, useState, useMemo } from 'react';
import EventCalendar from '../components/calendarFeatures/EventCalendar';
import Container from '@mui/material/Container';
import { fetchEvents } from '../services/fetchEvents';
import { Event } from '../interfaces/Entity';
import Button from '@mui/material/Button';
import '../styles/EventCalendarStyles.css';

const YoyakuPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const availableRoomNames = useMemo(() => ['部屋A', '部屋B', '体育室', '第2会議室'], []);
  const buttonColors = useMemo(() => ['red', 'blue', 'green'], []);
  const [selectedRoomNames, setSelectedRoomNames] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const roomColors = useMemo(() => {
    return availableRoomNames.reduce((acc, roomName, index) => {
      acc[roomName] = buttonColors[index % buttonColors.length];
      return acc;
    }, {} as Record<string, string>);
  }, [availableRoomNames, buttonColors]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const fetchedEvents = await fetchEvents({ collectionName: 'reservations' });
        const filteredEvents = fetchedEvents.filter(event =>
          selectedRoomNames.includes(event.roomName)
        );
        setEvents(filteredEvents);
      } catch (error) {
        // エラー処理
      }
    };
    loadEvents();
    setSelectedColors(selectedRoomNames.map(roomName => roomColors[roomName]));
  }, [selectedRoomNames, roomColors]); 

  const handleRoomSelect = (roomName: string) => {
    setSelectedRoomNames(prev => {
      if (prev.includes(roomName)) {
        return prev.filter(name => name !== roomName);
      } else {
        return prev.length < 3 ? [...prev, roomName] : prev;
      }
    });

    setSelectedColors(prev => {
      const index = selectedRoomNames.length % buttonColors.length;
      return [...prev, buttonColors[index]];
    });
  };

  

  return (
    <Container>
      <div>
        {availableRoomNames.map((roomName, index) => (
          <Button
            key={index}
            variant={selectedRoomNames.includes(roomName) ? "contained" : "outlined"}
            style={{
              backgroundColor: selectedRoomNames.includes(roomName)
                ? selectedColors[selectedRoomNames.indexOf(roomName)]
                : undefined,
              color: selectedRoomNames.includes(roomName) ? 'white' : undefined,
              margin: '5px',
            }}
            onClick={() => handleRoomSelect(roomName)}
          >
            {roomName}
          </Button>
        ))}
      </div>
      <EventCalendar events={events} eventColors={roomColors} />
    </Container>
  );
};

export default YoyakuPage;
