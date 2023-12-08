//ActivityCalendar.tsx
import React from 'react';
import styled from 'styled-components';


// ScheduleCellコンポーネントの定義
type ScheduleCellProps = {
    scheduleStatus: number;
    dayLabel?: string;
};

// ScheduleRowコンポーネントの定義
type ScheduleRowProps = {
    cellStatuses: number[];
    dayLabels?: string[];
    rowLabel?: string;
};



// 凡例の色定義
const legendColors: string[] = [
    '#EBEDF0', // 最も薄い色（活動なし）
    '#9BE9A8', // 薄い色（少ない活動）
    '#40C463', // 中間の色（中程度の活動）
    '#30A14E', // 濃い色（多い活動）
    '#216E39', // 最も濃い色（非常に多い活動）
];
const colors: { [key: number]: string } = {
    0: '#EBEDF0', // 予定なし（淡い緑色）
    1: '#9BE9A8', // 予定があるが空きあり（少し濃い緑色）
    2: '#40C463',
    3: '#30A14E',
    4: '#216E39',
    5: '#FFB6C1', // 予定が埋まっている（淡い赤色）
};


const StyledCell = styled.div<{ $scheduleStatus: number }>`
    width: 30px;
    height: 30px;
    margin: 3px;
    background-color: ${({ $scheduleStatus }) => colors[$scheduleStatus] || 'transparent'};
    border-radius: 4px;
`;

const StyledText = styled.div`
    height: 30px; // StyledCellと同じ高さに設定
    line-height: 30px; // テキストを縦方向の中央に配置
    margin-right: 8px; // テキストとセルの間のマージン
    white-space: nowrap; // テキストを一行で表示
    display: flex;
    align-items: center; // 中央揃え
    justify-content: center; // テキストが中央に来るように
`;

const StyledDayLabel = styled.div`
    text-align: center;
    font-size: 12px;
    margin-bottom: 2px; // 日にちラベルとセルの間のマージン
`;

const StyledRow = styled.div`
    display: flex;
    align-items: center;
`;

// テキストラベルを表示するためのスタイル付きコンポーネント
const LegendLabel = styled.span`
    margin-right: 10px;
    font-size: 12px;
`;

const LegendRow = styled.div`
    display: flex;
    align-items: center; // 子要素を縦方向に中央揃えにする
    margin-bottom: 5px; // 行間のマージンを調整
`;

const ScheduleCell: React.FC<ScheduleCellProps> = ({ scheduleStatus, dayLabel }) => {
    return (
        <div>
            {dayLabel && <StyledDayLabel>{dayLabel}</StyledDayLabel>}
            <StyledCell $scheduleStatus={scheduleStatus} />
        </div>
    );
};

const ScheduleRow: React.FC<ScheduleRowProps> = ({ cellStatuses, dayLabels, rowLabel }) => {
    return (
        <StyledRow>
            {rowLabel && <StyledText>{rowLabel}</StyledText>}
            {cellStatuses.map((status, index) => (
                <ScheduleCell key={index} scheduleStatus={status} dayLabel={dayLabels ? dayLabels[index] : undefined} />
            ))}
        </StyledRow>
    );
};

// 凡例のセルを表示するためのスタイル付きコンポーネント
const LegendCell = styled.div<{ color: string }>`
    width: 20px;
    height: 20px;
    background-color: ${({ color }) => color};
    margin: 2px;
    border-radius: 4px;
`;

// 凡例全体を表示するためのスタイル付きコンポーネント
const LegendWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px; // レイアウトの調整
`;

// 凡例コンポーネント
const ActivityLegend: React.FC = () => {
    return (
        <LegendWrapper>
            <LegendRow>
                <LegendLabel>予約状況</LegendLabel>
                <LegendLabel>少</LegendLabel>
                {legendColors.map((color, index) => (
                    <LegendCell key={index} color={color} />
                ))}
                <LegendLabel>多</LegendLabel>
            </LegendRow>
            <LegendRow>
                <LegendLabel>予約不可</LegendLabel>
                <LegendCell key={'unavailable'} color={'#FFB6C1'} />
            </LegendRow>
        </LegendWrapper>
    );
};


export { ScheduleCell, ScheduleRow, ActivityLegend };
