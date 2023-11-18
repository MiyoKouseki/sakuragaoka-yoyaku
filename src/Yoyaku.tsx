import React, { useEffect, useState } from 'react';
import { Box, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import SimpleCalendar from './SimpleCalendar';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { SelectChangeEvent } from '@mui/material/Select';


interface Room {
  id: string;
  name: string;
  location: string;
}

const Yoyaku: React.FC = () => {
  const [weekStart, setWeekStart] = useState(new Date());
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const firestore = getFirestore();
        const roomsCollection = collection(firestore, 'rooms');
        const querySnapshot = await getDocs(roomsCollection);
        const fetchedRooms = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            location: data.location // このプロパティは存在すると仮定しています
          };
        });
        setRooms(fetchedRooms);
        if (fetchedRooms.length > 0) {
          setSelectedRoom(fetchedRooms[0].name);
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
    fetchRooms();
  }, []);

  const handleRoomChange = (event: SelectChangeEvent<string>) => {
    setSelectedRoom(event.target.value);
  };

  const handleNextWeek = () => {
    setWeekStart(new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 7));
  };

  const handleLastWeek = () => {
    setWeekStart(new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() - 7));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Box display="flex" alignItems="center">
        <Button onClick={handleLastWeek}>先週</Button>
        <FormControl>
          <InputLabel>部屋選択</InputLabel>
          <Select
            value={selectedRoom}
            onChange={handleRoomChange}
            style={{ minWidth: '150px' }}
          >
            {rooms.map((room) => (
              <MenuItem key={room.id} value={room.name}>
                {room.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={handleNextWeek}>翌週</Button>
      </Box>
      <SimpleCalendar startDay={weekStart} />
    </Box>
  );
};

export default Yoyaku;
