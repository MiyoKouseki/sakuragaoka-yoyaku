//handleSubmitLogic.tsx
import { Entity, Room, Organization } from '../interfaces/Entity';

export const handleSubmitLogic = async (
    entity: Entity,
    onSubmit: (entity: Entity ) => Promise<void>,
    onSuccess: () => void,
    onError: (errorMessage: string) => void
) => {
    try {
        await onSubmit(entity);
        onSuccess();
    } catch (error: unknown) {
        let errorMessage = '登録中にエラーが発生しました';
        if (error instanceof Error) {
            errorMessage += ': ' + error.message;
        }
        onError(errorMessage);
    }
};

export const handleSubmitLogicOrganization = async (
    entity: Organization,
    onSubmit: (entity: Organization ) => Promise<void>,
    onSuccess: () => void,
    onError: (errorMessage: string) => void
) => {
    try {
        await onSubmit(entity);
        onSuccess();
    } catch (error: unknown) {
        let errorMessage = '登録中にエラーが発生しました';
        if (error instanceof Error) {
            errorMessage += ': ' + error.message;
        }
        onError(errorMessage);
    }
};

export const handleSubmitLogicRoom = async (
    entity: Room,
    onSubmit: (entity: Room ) => Promise<void>,
    onSuccess: () => void,
    onError: (errorMessage: string) => void
) => {
    try {
        await onSubmit(entity);
        onSuccess();
    } catch (error: unknown) {
        let errorMessage = '登録中にエラーが発生しました';
        if (error instanceof Error) {
            errorMessage += ': ' + error.message;
        }
        onError(errorMessage);
    }
};