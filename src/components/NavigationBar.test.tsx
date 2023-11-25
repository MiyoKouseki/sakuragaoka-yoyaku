import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavigationBar from './NavigationBar';
import { BrowserRouter as Router } from 'react-router-dom';


test('ハンバーガーメニューが表示される', () => {
    render(
        < Router >
            <NavigationBar />
        </Router >
    );
    // ハンバーガーメニューアイコンが存在することを確認
    expect(screen.getByTestId('MenuIcon')).toBeInTheDocument();
});

test('ログインボタンが表示される', () => {
    render(
        < Router >
            <NavigationBar />
        </Router >
    );
    // ログインボタンが表示されることを確認
    expect(screen.getByText('ログイン')).toBeInTheDocument();
});

// その他の要素に対するテストも同様に実装
