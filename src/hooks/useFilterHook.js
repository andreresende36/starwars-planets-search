import { useState } from 'react';

const useFilterHook = (initialState) => {
  const [filter, setFilter] = useState(initialState);
  return {
    filter,
    setFilter,
  };
};

export default useFilterHook;
