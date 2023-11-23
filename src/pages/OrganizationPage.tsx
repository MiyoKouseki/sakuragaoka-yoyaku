// OrganizationList.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFirestoreCollection from '../hooks/useFirestoreCollection';
import CustomTable from '../components/common/CustomTable';
import sortData from '../utils/sortData';
import CommonListContainer from '../components/common/CommonListContainer';


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
    navigate(`/organizations/edit/${docId}`);
  };

  const handleSort = (key: keyof Organization) => {
    const direction: 'asc' | 'desc' = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    const newSortConfig = { key, direction };
    setSortConfig(newSortConfig);
  };

  return (
    <CommonListContainer
      addButtonLabel="団体追加"
      onAddButtonClick={() => navigate('/organizations/register')}
      addButtonPath="/organizations/register"
    >
      <CustomTable
        data={sortedOrganizations}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        sortConfig={sortConfig}
        onSort={handleSort}
      />
    </CommonListContainer>

  );
};

export default OrganizationList;
