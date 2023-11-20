// CustomTable.tsx
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TableSortLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface SortConfig<T> {
    key: keyof T;
    direction: 'asc' | 'desc';
}

interface CustomTableProps<T> {
    data: T[];
    columns: {
        id: keyof T;
        label: string;
        sortable?: boolean;
        format?: (value: any) => string;
    }[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    sortConfig: SortConfig<T>;
    onSort: (key: keyof T) => void;
}

const CustomTable = <T extends { id: string }>({ data, columns, onEdit, onDelete, sortConfig, onSort }: CustomTableProps<T>) => (
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    {columns.map((column) => (
                        <TableCell
                            key={column.id.toString()}
                            style={{
                                display: column.id === 'id' || column.id === 'phone' ? 'none' : 'table-cell'
                            }}
                        >
                            {column.sortable ? (
                                <TableSortLabel
                                    active={sortConfig.key === column.id}
                                    direction={sortConfig.direction}
                                    onClick={() => onSort(column.id)}
                                >
                                    {column.label}
                                </TableSortLabel>
                            ) : (
                                column.label
                            )}
                        </TableCell>
                    ))}
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((item) => (
                    <TableRow key={item.id}>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id.toString()}
                                style={{
                                    display: column.id === 'id' || column.id === 'phone' ? 'none' : 'table-cell'
                                }}
                            >
                                {column.format
                                    ? column.format(item[column.id])
                                    : item[column.id] != null
                                        ? String(item[column.id])
                                        : ''}
                            </TableCell>
                        ))}
                        <TableCell>
                            <IconButton aria-label="edit" onClick={() => onEdit(item.id)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete" onClick={() => onDelete(item.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default CustomTable;
