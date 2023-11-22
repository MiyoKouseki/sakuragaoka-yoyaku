// entityFormFields.tsx
import { TextField, Button } from '@mui/material';
import { Organization } from '../../interfaces/Entity';

interface FormFieldsProps<T> {
    entity: T;
    setEntity: React.Dispatch<React.SetStateAction<T>>;
}

const entityFormFields: React.FC<FormFieldsProps<Organization>> = ({ entity, setEntity }) => {
    return (
        <>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="団体名"
                name="name"
                value={entity.name}
                onChange={(e) => setEntity({ ...entity, name: e.target.value })}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="representative"
                label="代表者名"
                name="representative"
                value={entity.representative}
                onChange={(e) => setEntity({ ...entity, representative: e.target.value })}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="代表者電話番号"
                name="phone"
                value={entity.phone}
                onChange={(e) => setEntity({ ...entity, phone: e.target.value })}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                登録
            </Button>
            {/* その他の共通フィールド */}
        </>
    );
};

export default entityFormFields;