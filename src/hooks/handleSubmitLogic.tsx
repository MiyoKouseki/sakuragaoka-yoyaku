//handleSubmitLogic.tsx
import { Organization } from '../interfaces/Organization';

export const handleSubmitLogic = async (
    organization: Organization,
    onSubmit: (organization: Organization) => Promise<void>,
    onSuccess: () => void,
    onError: (errorMessage: string) => void
) => {
    try {
        await onSubmit(organization);
        onSuccess();
    } catch (error: unknown) {
        let errorMessage = '登録中にエラーが発生しました';
        if (error instanceof Error) {
            errorMessage += ': ' + error.message;
        }
        onError(errorMessage);
    }
};