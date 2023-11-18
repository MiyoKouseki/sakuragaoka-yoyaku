import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import OrganizationForm from './OrganizationForm';
import OrganizationList from './OrganizationList';
import OrganizationEditForm from './OrganizationEditForm';
import RoomForm from './RoomForm';
import RoomList from './RoomList';
import RoomEditForm from './RoomEditForm';
import Yoyaku from './Yoyaku';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';

const App: React.FC = () => {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        桜ヶ丘体育館予約サイト
                    </Typography>
                    <Button color="inherit" component={Link} to="/organization/list">
                        団体一覧
                    </Button>
                    <Button color="inherit" component={Link} to="/rooms/list">
                        部屋一覧
                    </Button>
                    <Button color="inherit" component={Link} to="/yoyaku">
                        予約一覧
                    </Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Toolbar /> {/* この行を追加 */}
                <Routes>
                    <Route path="/yoyaku" element={<Yoyaku />} />
                    <Route path="/organization/register" element={<OrganizationForm />} />
                    <Route path="/organization/list" element={<OrganizationList />} />
                    <Route path="/organization/edit/:documentId" element={<OrganizationEditForm />} />
                    <Route path="/rooms/register" element={<RoomForm />} />
                    <Route path="/rooms/list" element={<RoomList />} />
                    <Route path="/rooms/edit/:documentId" element={<RoomEditForm />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
