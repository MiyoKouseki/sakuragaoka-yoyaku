import React from 'react';
import { Container, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface CommonListContainerProps {
  addButtonLabel: string;
  onAddButtonClick: () => void;
  addButtonPath: string;
  children: React.ReactNode;
}
  

const CommonListContainer: React.FC<CommonListContainerProps> = ({
  addButtonLabel,
  onAddButtonClick,
  addButtonPath,
  children,
}) => {
  return (
    <Container>
      <Paper elevation={3}>
        <Link to={addButtonPath} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" style={{ margin: '20px' }} onClick={onAddButtonClick}>
            {addButtonLabel}
          </Button>
        </Link>
        {children}
      </Paper>
    </Container>
  );
};

export default CommonListContainer;
