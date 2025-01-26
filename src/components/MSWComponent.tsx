'use client';

import { useEffect, useState } from 'react';

interface MSWComponentProps {
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
}

export const MSWComponent = ({
  children,
  loadingComponent,
}: MSWComponentProps) => {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      // 환경 변수 체크 (개발 환경에서만 실행)
      if (process.env.NEXT_PUBLIC_MOCK_API === 'true') {
        try {
          const { initMsw } = await import('../../mocks/index');
          await initMsw();
          console.log('MSW initialized');
        } catch (error) {
          console.error('MSW initialization failed:', error);
        }
      } else {
        console.log('MSW is disabled in this environment');
      }
      setMswReady(true);
    };

    init();
  }, []);

  if (!mswReady) return loadingComponent || <div>Loading mock server...</div>;

  return <>{children}</>;
};
