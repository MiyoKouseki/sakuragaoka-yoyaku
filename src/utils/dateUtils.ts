//dateUtils.ts
import { format, addDays } from 'date-fns';
import { ja } from 'date-fns/locale';


// 今日から7日間の日付と曜日を生成する関数（日本語）
export const generateDates = () => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
        const date = addDays(today, i);
        return {
            display: format(date, 'M/d(E)', { locale: ja }), // 表示用: "11/26(日)"
            value: format(date, 'yyyy-MM-dd'), // 解析可能な形式: "2023-11-26"
        };
    });
};

export const getNextHalfHourDate = () => {
    const now = new Date();
    const minutes = now.getMinutes();
    const nextHalfHour = minutes >= 30 ? new Date(now.setHours(now.getHours() + 1, 0, 0, 0)) : new Date(now.setMinutes(30, 0, 0));
    return nextHalfHour;
};

export const getStartOfDay = (dateString: string) => {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    return date;
};

export const getEndOfDay = (dateString: string) => {
    const date = new Date(dateString);
    date.setHours(24, 0, 0, 0);
    return date;
};
