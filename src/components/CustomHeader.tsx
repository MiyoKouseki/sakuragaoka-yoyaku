// CustomHeader.tsx

import React from 'react';
import { ToolbarProps, View } from 'react-big-calendar';

const viewNames: Partial<Record<View, string>> = {
    month: '月',
    week: '週',
    day: '日',
    agenda: '予定表',
    // 他のビュー名も必要に応じて追加
};

const CustomHeader: React.FC<ToolbarProps> = ({ label, onNavigate, onView, view, views }) => {
    return (
        <div className="rbc-toolbar">
            <span className="rbc-btn-group">
                <button type="button" onClick={() => onNavigate('PREV')}>前</button>
                <button type="button" onClick={() => onNavigate('TODAY')}>今日</button>
                <button type="button" onClick={() => onNavigate('NEXT')}>次</button>
            </span>
            <span className="rbc-toolbar-label">{label}</span>
            <span className="rbc-btn-group">
                {Object.keys(views).map((key: string) => {
                    const viewTitle = viewNames[key as View] || key; // フォールバックとしてキー自体を使用
                    return (
                        <button
                            type="button"
                            key={key}
                            onClick={() => onView(key as View)}
                            className={view === key ? 'rbc-active' : ''}
                        >
                            {viewTitle}
                        </button>
                    );
                })}
            </span>
        </div>
    );
};

export default CustomHeader;
