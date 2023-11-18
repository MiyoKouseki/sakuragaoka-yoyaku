import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import OrganizationForm from './OrganizationForm';
import OrganizationList from './OrganizationList';
import OrganizationEditForm from './OrganizationEditForm';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';

const App: React.FC = () => {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        団体管理アプリ
                    </Typography>
                    <Button color="inherit" component={Link} to="/organization/register">
                        団体登録
                    </Button>
                    <Button color="inherit" component={Link} to="/organization/list">
                        団体一覧
                    </Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Routes>
                    <Route path="/organization/register" element={<OrganizationForm />} />
                    <Route path="/organization/list" element={<OrganizationList />} />
                    <Route path="/organization/edit/:documentId" element={<OrganizationEditForm />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
