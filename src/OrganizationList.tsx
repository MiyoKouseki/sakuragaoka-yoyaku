// OrganizationList.tsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
  name: string;
  representative: string;
  phone: string;
}

const OrganizationList: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const firestore = getFirestore();
        const orgsCollection = collection(firestore, 'organizations');
        const querySnapshot = await getDocs(orgsCollection);
        const orgList = querySnapshot.docs.map((doc) => doc.data() as Organization);
        setOrganizations(orgList);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, []);

    const handleDelete = (index: number) => {
	alert('削除しました');
    };    

  return (
    <Container maxWidth="md" style={styles.container}>
      <Paper elevation={3}>
        <Typography variant="h4" gutterBottom style={styles.heading}>
          団体情報一覧
        </Typography>
        <TableContainer style={styles.tableContainer} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>団体名</TableCell>
                <TableCell>代表者</TableCell>
                <TableCell>電話番号</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {organizations.map((org, index) => (
                <TableRow key={index}>
                  <TableCell>{org.name}</TableCell>
                  <TableCell>{org.representative}</TableCell>
                  <TableCell>{org.phone}</TableCell>
		  <TableCell>
		      <IconButton
    		          aria-label="delete"
		          onClick={() => handleDelete(index)}
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
