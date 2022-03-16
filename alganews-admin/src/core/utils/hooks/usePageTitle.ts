import { useEffect } from 'react';

export const usePageTitle = (title: string) => {
  const BASE_TITLE = 'Admin';

  useEffect(() => {
    document.title = `${title} - ${BASE_TITLE}`;
  }, []); // eslint-disable-line
};
