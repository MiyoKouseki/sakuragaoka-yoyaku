//EditForm.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditData from '../services/EditData';
import FetchData from '../services/FetchData';

interface RouteParams {
    [key: string]: string | undefined;
}

interface EditFormProps<T extends { [key: string]: any }> {
    defaultEntity: T;
    collectionName: string;
    validateData: (data: T) => boolean;
    FormFieldsComponent: React.ComponentType<FormFieldsProps<T>>;
    navigatePathAfterSuccess: string;
}

interface FormFieldsProps<T> {
    entity: T;
    setEntity: React.Dispatch<React.SetStateAction<T>>;
}

function EditForm<T extends { [key: string]: any }>({
    defaultEntity,
    collectionName,
    validateData,
    FormFieldsComponent,
    navigatePathAfterSuccess
}: EditFormProps<T>): React.ReactElement {
    const { documentId } = useParams<RouteParams>();
    const navigate = useNavigate();
    const [entity, setEntity] = useState<T>(defaultEntity);

    useEffect(() => {
        FetchData<T>(collectionName, documentId, setEntity);
    }, [documentId, collectionName, setEntity]);

    const EditEntity = async (entity: T): Promise<void> => {
        if (documentId) {
            await EditData<T>({
                collectionName,
                data: entity,
                validateData,
                navigate,
                navigatePath: navigatePathAfterSuccess,
                documentId
            });
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        EditEntity(entity);
    };

    return (
        <Container maxWidth="sm">
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <FormFieldsComponent entity={entity} setEntity={setEntity} />
            </Box>
        </Container>
    );
}

export default EditForm;
