//buildingData.ts
import BuildingType from "../types/buildingTypes";

export const rooms: { [key in BuildingType]: string[] } = {
    '桜ヶ丘体育館': ['体育室A面', '体育室B面', '卓球室', '柔剣道室', '第1会議室', '第2会議室', 'A7'],
    'サンビレッジ': ['テニスコートA面', 'テニスコートB面', 'B3'],
    '建物C': ['C1', 'C2', 'C3']
};