// OrganizationList.tsx
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

interface Organization {
  id: string;
  name: string;
  representative: string;
  phone: string;
}

interface SortConfig {
  key: keyof Organization; // ソートするキー（列名）
  direction: 'asc' | 'desc'; // 昇順または降順
}

const sortOrganizations = (orgs: Organization[], { key, direction }: SortConfig): Organization[] => {
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


const OrganizationList: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' });

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const firestore = getFirestore();
        const orgsCollection = collection(firestore, 'organizations');
        const querySnapshot = await getDocs(orgsCollection);
        const orgList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }) as Organization);
        const sortedOrgs = sortOrganizations(orgList, sortConfig);
        setOrganizations(sortedOrgs);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };
    fetchOrganizations();
  }, [sortConfig]);

  const handleDelete = async (docId: string) => {
    try {
      await deleteDoc(doc(getFirestore(), 'organizations', docId));
      setOrganizations(prevOrganizations => prevOrganizations.filter(org => org.id !== docId));
      alert('団体が削除されました。');
    } catch (error) {
      console.error('Error deleting organization:', error);
      alert('削除中にエラーが発生しました。');
    }
  };

  const handleEdit = (docId: string) => {
    navigate(`/organization/edit/${docId}`);
  };

  const handleSort = (key: keyof Organization) => {
    const direction: 'asc' | 'desc' = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    const newSortConfig = { key, direction };
    setSortConfig(newSortConfig);
   };

  return (
    <Container maxWidth="md" style={styles.container}>
      <Paper elevation={3}>      
        <Link to="/organization/register" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" style={{ margin: '20px' }}>
            団体追加
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
                    団体名
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'representative'}
                    direction={sortConfig.direction}
                    onClick={() => handleSort('representative')}
                  >
                    代表者名
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'phone'}
                    direction={sortConfig.direction}
                    onClick={() => handleSort('phone')}
                  >
                    電話番号
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {organizations.map((org, index) => (
                <TableRow key={index}>
                  <TableCell>{org.id.substring(0, 5)}</TableCell>
                  <TableCell>{org.name}</TableCell>
                  <TableCell>{org.representative}</TableCell>
                  <TableCell>{org.phone}</TableCell>
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

export default OrganizationList;