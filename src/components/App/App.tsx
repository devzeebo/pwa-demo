import React from 'react';
import { Grid } from '@material-ui/core';
import { TimeProvider } from '#hooks/useTime';
import Clock from '#components/Clock';

const App = () => {
  return (
    <TimeProvider>
      <Grid container direction="row" spacing={5} justifyContent="center">
        <Grid item>
          <Clock title="Houston" timeZone="America/Chicago" />
        </Grid>
        <Grid item>
          <Clock title="California" timeZone="America/Los_Angeles" />
        </Grid>
        <Grid item>
          <Clock title="Argentina" timeZone="America/Argentina/Cordoba" />
        </Grid>
      </Grid>
    </TimeProvider>
  );
};

export default App;