// RoomList.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Button, Paper } from '@mui/material';
import useFirestoreCollection from '../hooks/useFirestoreCollection';
import CustomTable from './CustomTable';
import sortData from '../utils/sortData';

const styles = {
  container: {
    padding: '20px',
    marginTop: '20px',
  },
  heading: {
    marginBottom: '20px',
  },
  tableContainer: {
    marginTop: '20px',
  },
};

interface Room {
  id: string;
  name: string;
  location: string;
}

interface SortConfig {
  key: keyof Room; // ソートするキー（列名）
  direction: 'asc' | 'desc'; // 昇順または降順
}


const RoomList: React.FC = () => {
  const { data: rooms, deleteItem: deleteRoom } = useFirestoreCollection<Room>('rooms');
  const [sortedRooms, setSortedRooms] = useState<Room[]>([]);
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' });

  const columns = [
    {
      id: 'id' as keyof Room,
      label: 'ID',
      sortable: true,
      format: (id: string) => id.substring(0, 5) // 表示用にIDの先頭5文字を切り取る
    },
    { id: 'name' as keyof Room, label: '名前', sortable: true },
    { id: 'location' as keyof Room, label: '建物名', sortable: true },
  ];

  useEffect(() => {
    setSortedRooms(sortData(rooms, sortConfig));
  }, [rooms, sortConfig]);

  const handleDelete = async (docId: string) => {
    deleteRoom(docId);
  };

  const handleEdit = (docId: string) => {
    navigate(`/rooms/edit/${docId}`);
  };

  const handleSort = (key: keyof Room) => {
    const direction: 'asc' | 'desc' = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    const newSortConfig = { key, direction };
    setSortConfig(newSortConfig);
  };

  return (
    <Container maxWidth="md" style={styles.container}>
      <Paper elevation={3}>
        <Link to="/rooms/register" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" style={{ margin: '20px' }}>
            部屋追加
          </Button>
        </Link>
        <CustomTable
          data={sortedRooms}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      </Paper>
    </Container>
  );
};

export default RoomList;
