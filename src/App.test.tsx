import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { AuthProvider } from './contexts/AuthContext'; // AuthProviderをインポート

const theme = createTheme({
  // テーマの設定
});

// AuthProviderをモックする
jest.mock('./contexts/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

test('App コンポーネントが適切にレンダリングされる', () => {
  render(
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  );

  // App コンポーネント内の特定の要素や機能をテスト
  // 例: NavigationBar が存在するか
  // expect(screen.getByText(/特定のテキスト/)).toBeInTheDocument();
});
