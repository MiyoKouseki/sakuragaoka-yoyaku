// OrganizationList.tsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
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

const OrganizationList: React.FC = () => {
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    
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
		setOrganizations(orgList);
	    } catch (error) {
		console.error('Error fetching organizations:', error);
	    }
	};	
	fetchOrganizations();
    }, []);

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
	  <TableCell>ID</TableCell>
                <TableCell>団体名</TableCell>
                <TableCell>代表者</TableCell>
                <TableCell>電話番号</TableCell>
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