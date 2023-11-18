// RoomList.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Table, TableBody, TableCell, Button,
    TableContainer, TableHead, TableRow, Paper, IconButton, TableSortLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

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

const sortRooms = (orgs: Room[], { key, direction }: SortConfig): Room[] => {
  return orgs.sort((a, b) => {
    if (a[key] < b[key]) {
      return direction === 'asc' ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
};


const RoomList: React.FC = () => {
  const [Rooms, setRooms] = useState<Room[]>([]);
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' });

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const firestore = getFirestore();
        const orgsCollection = collection(firestore, 'rooms');
        const querySnapshot = await getDocs(orgsCollection);
        const orgList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }) as Room);
        const sortedOrgs = sortRooms(orgList, sortConfig);
        setRooms(sortedOrgs);
      } catch (error) {
        console.error('Error fetching Rooms:', error);
      }
    };
    fetchRooms();
  }, [sortConfig]);

  const handleDelete = async (docId: string) => {
    try {
      await deleteDoc(doc(getFirestore(), 'rooms', docId));
      setRooms(prevRooms => prevRooms.filter(org => org.id !== docId));
      alert('団体が削除されました。');
    } catch (error) {
      console.error('Error deleting Room:', error);
      alert('削除中にエラーが発生しました。');
    }
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
        <TableContainer style={styles.tableContainer} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'id'}
                    direction={sortConfig.direction}
                    onClick={() => handleSort('id')}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'name'}
                    direction={sortConfig.direction}
                    onClick={() => handleSort('name')}
                  >
                    名前
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'location'}
                    direction={sortConfig.direction}
                    onClick={() => handleSort('location')}
                  >
                    建物名
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Rooms.map((org, index) => (
                <TableRow key={index}>
                  <TableCell>{org.id.substring(0, 5)}</TableCell>
                  <TableCell>{org.name}</TableCell>
                  <TableCell>{org.location}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEdit(org.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(org.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default RoomList;
