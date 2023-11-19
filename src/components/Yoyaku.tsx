import React, { useEffect, useState } from 'react';
import { Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import SimpleCalendar from './SimpleCalendar';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { SelectChangeEvent } from '@mui/material/Select';
import { Switch, FormControlLabel } from '@mui/material';

interface Room {
  id: string;
  name: string;
  location: string;
}
interface Organization {
  id: string;
  name: string;
}

const Yoyaku: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [editMode, setEditMode] = useState(false);

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
    const fetchOrganizations = async () => {
      try {
        const firestore = getFirestore();
        const organizationsCollection = collection(firestore, 'organizations');
        const querySnapshot = await getDocs(organizationsCollection);
        const fetchedOrganizations = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            location: data.location // このプロパティは存在すると仮定しています
          };
        });
        setOrganizations(fetchedOrganizations);
        if (fetchedOrganizations.length > 0) {
          setSelectedOrganization(fetchedOrganizations[0].name);
        }
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };
    fetchOrganizations();
  }, []);

  const handleRoomChange = (event: SelectChangeEvent<string>) => {
    setSelectedRoom(event.target.value);
  };

  const handleOrganizationChange = (event: SelectChangeEvent<string>) => {
    setSelectedOrganization(event.target.value);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Box display="flex" alignItems="center">
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
        <FormControl>
          <InputLabel>団体選択</InputLabel>
          <Select
            value={selectedOrganization}
            onChange={handleOrganizationChange}
            style={{ minWidth: '150px' }}
          >
            {organizations.map((organization) => (
              <MenuItem key={organization.id} value={organization.name}>
                {organization.name}
              </MenuItem>
            ))}
          </Select>          
        </FormControl>
      </Box>      
      <FormControlLabel
        control={<Switch checked={editMode} onChange={(e) => setEditMode(e.target.checked)} />}
        label={editMode ? "編集モード" : "閲覧モード"}
      />
      <SimpleCalendar roomName={selectedRoom} editMode={editMode} organizationName={selectedOrganization}/>
    </Box>
  );
};

export default Yoyaku;
