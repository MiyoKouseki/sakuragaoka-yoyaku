import React, { useEffect, useState } from 'react';
import { Box, Typography, Tooltip, Button, useMediaQuery } from '@mui/material';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import * as CryptoJS from 'crypto-js';
import KeyboardArrowUpSharpIcon from '@mui/icons-material/KeyboardArrowUpSharp';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import IconButton from '@mui/material/IconButton';
import Legend from './Legend';
import { useAuth } from '../contexts/AuthContext';

const weekDays = ['日', '月', '火', '水', '木', '金', '土'];
const now = new Date(); // 現在の日時

const getWeekDay = (date: Date) => {
    return weekDays[date.getDay()];
};

interface SimpleCalendarProps {
    roomName: string;
    editMode: Boolean;
    organizationName: string;
}

const generateHash = (data: string): string => {
    return CryptoJS.SHA256(data).toString();
};

const SimpleCalendar: React.FC<SimpleCalendarProps> = ({ roomName, editMode, organizationName }) => {
    const [weekStart, setWeekStart] = useState(new Date());
    const [selectedCells, setSelectedCells] = useState<{ [key: string]: boolean }>({});
    const [reservations, setReservations] = useState<{ [key: string]: string }>({});
    const { user } = useAuth();

    const rows = 7;
    const days = Array.from({ length: rows }, (_, i) => {
        return new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + i);
    });
    const hours = Array.from({ length: 15 }, (_, i) => 8 + i); // 8時から22時まで

    const handleNextWeek = () => {
        console.log(weekStart)
        setWeekStart(new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 7));
        console.log(weekStart)
    };

    const handleLastWeek = () => {
        setWeekStart(new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() - 7));
    };

    const handleCellClick = (day: Date, hour: number) => {
        if (!editMode) {
            return;
        }
        const key = `${day.getDate()}-${hour}`;
        setSelectedCells(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const isCellSelected = (day: Date, hour: number) => {
        return selectedCells[`${day.getDate()}-${hour}`];
    };

    const showSelectedInfo = async () => {
        const selectedDates = Object.keys(selectedCells).filter(key => selectedCells[key]);
        if (selectedDates.length === 0) {
            alert("選択されたセルがありません");
            return;
        }

        const calculateTimeBlocks = (selectedDates: string[]): { start: Date; end: Date }[] => {
            const times = selectedDates.map(key => {
                const [date, hour] = key.split("-").map(Number);
                return new Date(weekStart.getFullYear(), weekStart.getMonth(), date, hour);
            });

            times.sort((a, b) => a.getTime() - b.getTime());

            const timeBlocks: { start: Date; end: Date }[] = [];
            let currentBlock: { start: Date; end: Date } | null = null;

            times.forEach((time: Date) => {
                if (!currentBlock || time.getTime() !== currentBlock.end.getTime() + 60 * 60 * 1000) {
                    currentBlock = { start: time, end: new Date(time.getTime()) };
                    timeBlocks.push(currentBlock);
                }
                currentBlock.end = time;
            });

            return timeBlocks;
        };

        const registerReservations = async (
            timeBlocks: { start: Date; end: Date }[],
            roomName: string,
            organizationName: string
        ) => {
            const firestore = getFirestore();

            for (const block of timeBlocks) {
                const reservationData = {
                    roomName,
                    organizationName,
                    startTime: timestampToString(block.start),
                    endTime: timestampToString(block.end)
                };

                // ドキュメントIDを生成（例: 現在のタイムスタンプを使用）
                const dataString = JSON.stringify(reservationData);
                const documentId = generateHash(dataString);
                //const documentId = `${block.start.getTime()}-${block.end.getTime()}`;

                await setDoc(doc(firestore, 'reservations', documentId), reservationData);
            }
        };

        const timestampToString = (timestamp: Date) => {
            const date = new Date(timestamp); // タイムスタンプからDateオブジェクトを生成
            const isoString = date.toISOString(); // ISO 8601形式の文字列に変換
            return isoString//.substring(0, 16); // 秒とミリ秒を除去
        };

        const timeBlocks = calculateTimeBlocks(selectedDates);

        // Firestoreに予約を登録
        await registerReservations(timeBlocks, roomName, organizationName);

        alert("予約が登録されました");
    };

    useEffect(() => {
        const fetchReservations = async () => {
            const firestore = getFirestore();
            const reservationsCollection = collection(firestore, 'reservations');
            const snapshot = await getDocs(reservationsCollection);

            // 型注釈を追加してオブジェクトを初期化
            const fetchedReservations: { [key: string]: string } = {};
            snapshot.docs.forEach(doc => {
                const data = doc.data();
                if (data.roomName === roomName) { // ここで部屋名をチェック
                    const startDate = new Date(`${data.startTime}`);
                    const endDate = new Date(`${data.endTime}`);
                    const organizationName = data.organizationName; // 予約団体名を取得

                    for (let date = new Date(startDate); date <= endDate; date.setHours(date.getHours() + 1)) {
                        const key = `${date.getDate()}-${date.getHours()}`;
                        fetchedReservations[key] = organizationName; // 団体名を保持
                    }
                }
            });
            setReservations(fetchedReservations);
        };
        if (user) {
            fetchReservations();
        }
    }, [roomName, user]);

    const formatDateTime = (day: Date, hour: number) => {
        return `${day.getFullYear()}/${day.getMonth() + 1}/${day.getDate()} ${hour}:00`;
    };
    const isSmallScreen = useMediaQuery('(max-width:800px)');

    if (isSmallScreen) {
        // 画面サイズが800px以下の場合のレンダリング
        return <Typography>画面サイズが小さすぎます</Typography>;
    }
    
    return (
        <Box display="flex" flexDirection="column">
            <Button variant="contained" onClick={showSelectedInfo} disabled={!editMode}>予約申請</Button>
            <Box display="flex">
                <Box
                    width='20%'
                    m={0.2}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <IconButton onClick={handleLastWeek}>
                        <KeyboardArrowUpSharpIcon
                            color="inherit"
                            fontSize="large"
                        />
                    </IconButton>
                </Box>
                {hours.map(hour => (
                    <Box key={hour} width={40} m={0.2} display="flex" justifyContent="center" alignItems="center">
                        <Typography>{hour}時</Typography>
                    </Box>
                ))}
            </Box>
            {days.map(day => (
                <Box key={day.getDate()} display="flex">
                    <Box
                        key={day.getDate()}
                        display="flex"
                        width='20%'
                        m={0.2}
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <Typography style={{ marginRight: '8px', width: '30%', textAlign: 'right' }}>
                            {day.getDate() === 1 || day === days[0] ? `${day.getMonth() + 1}月` : ''}
                        </Typography>
                        <Typography style={{ width: '30%', textAlign: 'right' }}>{`${day.getDate()}日`}</Typography>
                        <Typography style={{ width: '40%', textAlign: 'center' }}>{`(${getWeekDay(day)})`}</Typography>
                    </Box>
                    {hours.map(hour => {
                        const key = `${day.getDate()}-${hour}`;
                        const reservationInfo = reservations[key] ? `${reservations[key]} - ${formatDateTime(day, hour)}` : '';
                        const tooltipTitle = editMode ? '' : reservationInfo;
                        return (
                            <Tooltip key={key} title={tooltipTitle} placement="top">
                                <Box
                                    key={`${day.getDate()}-${hour}`}
                                    width={40}
                                    height={30}
                                    bgcolor={
                                        reservations[`${day.getDate()}-${hour}`]
                                            ? 'pink' // 予約されているセル
                                            : isCellSelected(day, hour)
                                                ? (day < now || (day.getDate() === now.getDate() && hour < now.getHours()) ? 'rgba(144, 238, 144, 0.5)' : 'yellow')
                                                : (day < now || (day.getDate() === now.getDate() && hour < now.getHours()) ? 'darkgrey' : 'lightgreen')
                                    }
                                    m={0.2}
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    onClick={() => handleCellClick(day, hour)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </Tooltip>
                        );
                    })}
                </Box>
            ))}
            <Box display="flex">
                <Box
                    width='20%'
                    m={0.2}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <IconButton onClick={handleNextWeek}>
                        <KeyboardArrowDownSharpIcon
                            color="inherit"
                            fontSize="large"
                        />
                    </IconButton>
                </Box>
                {hours.map(hour => (
                    <Box key={hour} width={40} m={0.2} display="flex" justifyContent="center" alignItems="center">
                        <Typography>{hour}時</Typography>
                    </Box>
                ))}
            </Box>
            <Box display="flex" justifyContent="flex-end">
                <Legend />
            </Box>
        </Box >
    );
};

export default SimpleCalendar;
