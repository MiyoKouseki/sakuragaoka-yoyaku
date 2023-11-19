// OrganizationFormFields.tsx
import { TextField, Button } from '@mui/material';
import { Organization } from '../interfaces/Organization';

interface OrganizationFormFieldsProps {
    organization: Organization;
    setOrganization: React.Dispatch<React.SetStateAction<Organization>>;
}

const OrganizationFormFields: React.FC<OrganizationFormFieldsProps> = ({ organization, setOrganization }) => {
    return (
        <>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="団体名"
                name="name"
                value={organization.name}
                onChange={(e) => setOrganization({ ...organization, name: e.target.value })}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="representative"
                label="代表者名"
                name="representative"
                value={organization.representative}
                onChange={(e) => setOrganization({ ...organization, representative: e.target.value })}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="代表者電話番号"
                name="phone"
                value={organization.phone}
                onChange={(e) => setOrganization({ ...organization, phone: e.target.value })}
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

export default OrganizationFormFields;