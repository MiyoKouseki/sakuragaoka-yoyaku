// ReservationList.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFirestoreCollection from '../hooks/useFirestoreCollection';
import CustomTable from './CustomTable';
import sortData from '../utils/sortData';
import CommonListContainer from './CommonListContainer';
import { Timestamp } from 'firebase/firestore';

interface Reservation {
    id: string;
    roomName: string;
    organizationName: string;
    startTime: string;
    endTime: string;
    createdTime: Timestamp;
}

interface SortConfig {
    key: keyof Reservation; // ソートするキー（列名）
    direction: 'asc' | 'desc'; // 昇順または降順
}


const ReservationList: React.FC = () => {
    const { data: reservations, deleteItem: deleteReservation } = useFirestoreCollection<Reservation>('reservations');
    const [sortedReservations, setSortedReservations] = useState<Reservation[]>([]);
    const navigate = useNavigate();
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'roomName', direction: 'asc' });

    const columns = [
        {
            id: 'id' as keyof Reservation,
            label: 'ID',
            sortable: true,
            format: (id: string) => id.substring(0, 5) // 表示用にIDの先頭5文字を切り取る
        },
        { id: 'roomName' as keyof Reservation, label: '部屋', sortable: true },
        { id: 'organizationName' as keyof Reservation, label: '予約団体', sortable: true },
        {
            id: 'startTime' as keyof Reservation,
            label: '開始日時',
            sortable: true,
            format: (id: string) => {
                const date = new Date(id);
                return isNaN(date.getTime()) ? '' : date.toLocaleString("ja-JP");
            }
        },
        {
            id: 'endTime' as keyof Reservation,
            label: '終了日時',
            sortable: true,
            format: (id: string) => {
                const date = new Date(id);
                return isNaN(date.getTime()) ? '' : date.toLocaleString("ja-JP");
            }
        },
        {
            id: 'createdTime' as keyof Reservation,
            label: '作成日時',
            sortable: true,
            format: (id: Timestamp) => id?.toDate()?.toLocaleString("ja-JP") || ''
        },
    ];

    useEffect(() => {
        setSortedReservations(sortData(reservations, sortConfig));
    }, [reservations, sortConfig]);

    const handleDelete = async (docId: string) => {
        deleteReservation(docId);
    };

    const handleEdit = (docId: string) => {
        navigate(`/reservations/edit/${docId}`);
    };

    const handleSort = (key: keyof Reservation) => {
        const direction: 'asc' | 'desc' = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        const newSortConfig = { key, direction };
        setSortConfig(newSortConfig);
    };

    return (
        <CommonListContainer
            addButtonLabel="予約追加"
            onAddButtonClick={() => navigate('/reservations/register')}
            addButtonPath="/reservations/register"
        >
            <CustomTable
                data={sortedReservations}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
                sortConfig={sortConfig}
                onSort={handleSort}
            />
        </CommonListContainer>
    );
};

export default ReservationList;
