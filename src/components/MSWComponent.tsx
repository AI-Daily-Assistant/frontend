'use client';

import { useEffect, useState } from 'react';

export const MSWComponent = ({ children }: { children: React.ReactNode }) => {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const { initMsw } = await import('../../mocks/index');
        await initMsw();
        setMswReady(true);
      } catch (error) {
        console.error('MSW initialization failed:', error);
      }
    };

    if (!mswReady) {
      init();
    }
  }, [mswReady]);

  if (!mswReady) return <div>Loading...</div>;

  return <>{children}</>;
};
