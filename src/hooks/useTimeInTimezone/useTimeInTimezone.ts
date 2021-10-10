import { utcToZonedTime, zonedTimeToUtc, format } from 'date-fns-tz';
import { useCallback, useMemo } from 'react';

export type UseTimeInTimezone = [
  time: Date,
  format: (displayFormat: string) => string,
];

export default (
  timeZone: string,
  time: Date,
): UseTimeInTimezone => {
  const zonedTime = useMemo(
    () => {
      const utc = zonedTimeToUtc(time, Intl.DateTimeFormat().resolvedOptions().timeZone);

      return utcToZonedTime(utc, timeZone);
    }, 
    [time, timeZone],
  );

  const formatCallback = useCallback(
    (displayFormat: string) => {
      return format(zonedTime, displayFormat, { timeZone });
    },
    [timeZone, zonedTime],
  );

  return [
    zonedTime,
    formatCallback,
  ]; 
};