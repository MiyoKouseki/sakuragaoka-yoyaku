// OrganizationList.tsx
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

const OrganizationList: React.FC = () => {
  const { data: organizations, deleteItem: deleteOrganization } = useFirestoreCollection<Organization>('organizations');
  const [sortedOrganizations, setSortedOrganizations] = useState<Organization[]>([]);
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' });


  const columns = [
    {
      id: 'id' as keyof Organization,
      label: 'ID',
      sortable: true,
      format: (id: string) => id.substring(0, 5) // 表示用にIDの先頭5文字を切り取る
    },
    { id: 'name' as keyof Organization, label: '名前', sortable: true },
    { id: 'representative' as keyof Organization, label: '代表者', sortable: true },
    { id: 'phone' as keyof Organization, label: '電話番号', sortable: true },
  ];

  useEffect(() => {
    setSortedOrganizations(sortData(organizations, sortConfig));
  }, [organizations, sortConfig]);

  const handleDelete = async (docId: string) => {
    deleteOrganization(docId); // Firestoreのドキュメントを削除
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
        <CustomTable
          data={sortedOrganizations}
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

export default OrganizationList;
