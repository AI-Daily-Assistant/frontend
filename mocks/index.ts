export async function initMsw() {
  if (process.env.NEXT_PUBLIC_MOCK_API === 'true') {
    if (typeof window === 'undefined') {
      const { server } = await import('../mocks/server');
      server.listen();
    } else {
      const { worker } = await import('../mocks/browser');
      await worker.start();
    }
  }
}
