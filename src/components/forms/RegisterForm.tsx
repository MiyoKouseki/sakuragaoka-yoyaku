//RegisterForm.tsx
import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SubmitData from '../../services/SubmitData';

interface RegisterFormProps<T extends { [key: string]: any }> {
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

function RegisterForm<T extends { [key: string]: any }>({
    defaultEntity,
    collectionName,
    validateData,
    FormFieldsComponent,
    navigatePathAfterSuccess
}: RegisterFormProps<T>): React.ReactElement {
    const navigate = useNavigate();
    const [entity, setEntity] = useState<T>(defaultEntity);

    const RegisterEntity = async (entity: T): Promise<void> => {
        await SubmitData<T>({
            collectionName,
            data: entity,
            validateData,
            navigate,
            navigatePath: navigatePathAfterSuccess,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        RegisterEntity(entity);
    };

    return (
        <Container maxWidth="sm">
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <FormFieldsComponent entity={entity} setEntity={setEntity} />
            </Box>
        </Container>
    );
}

export default RegisterForm;
