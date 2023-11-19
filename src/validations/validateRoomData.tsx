// src/validations/validateRoomData.ts
import { Room } from "../interfaces/Entity";

export const validateRoomData = (entity: Room): boolean => {
  if (!entity.name || !entity.location) {
    alert('すべてのフィールドを入力してください。');
    return false;
  }
  // 他のバリデーションルール
  return true;
};
