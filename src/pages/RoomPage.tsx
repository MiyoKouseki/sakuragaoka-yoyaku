// RoomList.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFirestoreCollection from '../hooks/useFirestoreCollection';
import CustomTable from '../components/common/CustomTable';
import sortData from '../utils/sortData';
import CommonListContainer from '../components/common/CommonListContainer';
import { Room } from '../interfaces/Entity';

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
    { id: 'category' as keyof Room, label: 'カテゴリー', sortable: true },
    { id: 'owner' as keyof Room, label: '所有者', sortable: true },

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
    <CommonListContainer
      addButtonLabel="部屋追加"
      onAddButtonClick={() => navigate('/rooms/register')}
      addButtonPath="/rooms/register"
    >
      <CustomTable
        data={sortedRooms}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        sortConfig={sortConfig}
        onSort={handleSort}
      />
    </CommonListContainer>
  );
};

export default RoomList;
