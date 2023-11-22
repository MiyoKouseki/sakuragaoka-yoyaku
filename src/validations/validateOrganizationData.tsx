//validateOrganizationData.tsx

import { Organization } from '../interfaces/Entity';

export const validateOrganizationData = (organization: Organization): boolean => {
    const { name, representative, phone } = organization;
    if (!name || !representative || !phone) {
        alert('すべてのフィールドを入力してください。');
        return false;
    }
    
    // 他のバリデーションロジック（必要に応じて）
    return true;
};