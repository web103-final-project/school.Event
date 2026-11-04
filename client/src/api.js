import { useEffect, useState } from 'react';

export function useApi(path) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState({ path, status: 'loading' });

  useEffect(() => {
    const controller = new AbortController();
    setResult({ path, status: 'loading' });

    async function load() {
      try {
        const response = await fetch(path, { signal: controller.signal });
        if (!response.ok) {
          setResult({ path, status: response.status === 404 ? 'missing' : 'error' });
          return;
        }
        const data = await response.json();
        if (!controller.signal.aborted) setResult({ path, status: 'ready', data });
      } catch (error) {
        if (error.name !== 'AbortError') setResult({ path, status: 'error' });
      }
    }

    load();
    return () => controller.abort();
  }, [path, attempt]);

  return {
    ...(result.path === path ? result : { status: 'loading' }),
    retry: () => setAttempt((value) => value + 1),
  };
}
