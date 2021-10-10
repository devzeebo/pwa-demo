import React, { 
  createContext,
  PropsWithChildren,
} from 'react';
import useTime from './_useTime';

export const Context = createContext<Date>(null!);

const TimeProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const time = useTime();

  return (
    <Context.Provider value={time}>
      {children}
    </Context.Provider>
  );
};

export default TimeProvider;