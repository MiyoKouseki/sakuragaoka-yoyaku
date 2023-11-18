import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import OrganizationForm from './OrganizationForm';
import OrganizationList from './OrganizationList';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';

const App: React.FC = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            団体管理アプリ
          </Typography>
          <Button color="inherit" component={Link} to="/register-organization">
            団体登録
      </Button>
          <Button color="inherit" component={Link} to="/list-organization">
            団体一覧
          </Button>	  
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/register-organization" element={<OrganizationForm />} />
        </Routes>
	  </Container>
      <Container>
        <Routes>
          <Route path="/list-organization" element={<OrganizationList />} />
        </Routes>
	  </Container>	  
    </Router>
  );
}

export default App;
