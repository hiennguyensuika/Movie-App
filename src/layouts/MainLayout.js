import React from 'react';
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

function MainLayout() {
  return (
    <div style={{ overflowX: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        style={{
          padding: '1rem',
          boxSizing: 'border-box',
          maxWidth: '100%',
        }}
      >
        <Grid item>
          <MainHeader />
        </Grid>
        <Grid
          item
          xs={12}
          sm={10}
          md={8}
          lg={6}
          style={{
            marginTop: '2rem',
            width: '100%',
          }}
        >
          <Outlet />
        </Grid>
        <Grid item>
          <MainFooter />
        </Grid>
      </Grid>
    </div>
  );
}

export default MainLayout;