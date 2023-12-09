//FrontPage.tsx
import React, { useEffect, useState } from 'react';
import { ActivityCalendar, ScheduleData } from '../components/calendarFeatures/ActivityCalendar';

import { fetchReservations } from '../services/fetchReservations';

const evaluateBookingTime = async (room: string, date: string): Promise<number> => {
  // 当日の8時と22時を表すDateオブジェクトを作成
  const startOfBookingDay = new Date(date).setHours(8, 0, 0, 0);
  const endOfBookingDay = new Date(date).setHours(22, 0, 0, 0);

  // 予約情報を取得
  const events = await fetchReservations(room, new Date(startOfBookingDay).toISOString(), new Date(endOfBookingDay).toISOString());

  let bookedMinutes = 0;

  // 各予約に対して時間を計算
  events.forEach(event => {
    // 予約の開始時間が8時前なら8時に、終了時間が22時後なら22時に丸める
    const startTime = Math.max(new Date(event.startTime).getTime(), startOfBookingDay);
    const endTime = Math.min(new Date(event.endTime).getTime(), endOfBookingDay);
    // 予約時間を分単位で加算
    bookedMinutes += (endTime - startTime) / 60000; // 60000で割ってミリ秒から分に変換
  });

  // 予約時間が13時間を超えていれば、スコアを5に設定
  if (bookedMinutes >= 13 * 60) {
    return 5;
  }

  // 予約がない場合は0
  if (bookedMinutes === 0) {
    return 0;
  }

  // それ以外の場合は予約時間に応じてスコアを1から4まで線形に割り当てる
  const score = Math.ceil((bookedMinutes / (14 * 60)) * 4); // 14時間（8時〜22時）で割る
  return Math.min(score, 4); // スコアが4を超えないようにする
};


const WelcomeComponent: React.FC = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const startDate = new Date('2023-12-09');
      const rooms = ['第2会議室', '体育室A面', '体育室B面', '卓球室', '部屋B']; // ここに必要な場所のリストを追加
      const newScheduleData: ScheduleData[] = [];

      for (const room of rooms) {
        const cellStatuses = [];
        const dayLabels = [];

        for (let i = 0; i < 7; i++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i);
          const dateString = date.toISOString().split('T')[0];

          const score = await evaluateBookingTime(room, dateString);
          cellStatuses.push(score);
          const dayLabelString = `${date.getMonth() + 1}/${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;
          dayLabels.push(dayLabelString);
        }

        newScheduleData.push({
          rowLabel: room,
          cellStatuses,
          dayLabels,
        });
      }

      setScheduleData(newScheduleData);
    };

    loadData();
  }, []);

  return (
    <ActivityCalendar scheduleData={scheduleData} />
  );
};

export default WelcomeComponent;
