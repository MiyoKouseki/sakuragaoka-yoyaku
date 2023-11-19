// src/utils/generateHash.ts

import * as CryptoJS from 'crypto-js';

export const generateHash = (data: string): string => {
  return CryptoJS.SHA256(data).toString();
};
