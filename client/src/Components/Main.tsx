import React from 'react';
import { Grid } from '@mui/material';
import Navbar from './Navbar.tsx';
import Sidebar from './Sidebar';
import Home from './Home';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Main: React.FC = () => {
  const loading = useSelector((state: RootState) => state.auth.loading);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Home />
        </Grid>
      </Grid>
    </div>
  );
};

export default Main;
