import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import useTime from '#hooks/useTime';
import useTimeInTimezone from '#hooks/useTimeInTimezone';

const formatString = 'hh:mm:ss aa zzz';

export type ClockProps = {
  title: string,
  timeZone: string,
};

const Clock = ({
  title,
  timeZone,
}: ClockProps) => {
  const time = useTime();
  const [, formatTime] = useTimeInTimezone(timeZone, time);

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Typography>
          {title}
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          {formatTime(formatString)}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default Clock;