import { useState, useCallback } from 'react';

type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

interface ApiState<T> {
  data: T | null;
  error: Error | null;
  status: ApiStatus;
}

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export function useApi<T = any>(options: UseApiOptions = {}) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    error: null,
    status: 'idle',
  });

  const { onSuccess, onError } = options;

  // Reset the state
  const reset = useCallback(() => {
    setState({
      data: null,
      error: null,
      status: 'idle',
    });
  }, []);

  // Execute a GET request
  const get = useCallback(
    async (url: string, config: RequestInit = {}): Promise<T | null> => {
      try {
        setState(prev => ({ ...prev, status: 'loading' }));
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...config.headers,
          },
          ...config,
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        setState({
          data,
          error: null,
          status: 'success',
        });
        
        onSuccess?.(data);
        
        return data;
      } catch (error) {
        const errorObject = error instanceof Error ? error : new Error(String(error));
        
        setState({
          data: null,
          error: errorObject,
          status: 'error',
        });
        
        onError?.(errorObject);
        
        return null;
      }
    },
    [onSuccess, onError]
  );

  // Execute a POST request
  const post = useCallback(
    async (url: string, body: any, config: RequestInit = {}): Promise<T | null> => {
      try {
        setState(prev => ({ ...prev, status: 'loading' }));
        
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...config.headers,
          },
          body: JSON.stringify(body),
          ...config,
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        setState({
          data,
          error: null,
          status: 'success',
        });
        
        onSuccess?.(data);
        
        return data;
      } catch (error) {
        const errorObject = error instanceof Error ? error : new Error(String(error));
        
        setState({
          data: null,
          error: errorObject,
          status: 'error',
        });
        
        onError?.(errorObject);
        
        return null;
      }
    },
    [onSuccess, onError]
  );

  return {
    data: state.data,
    error: state.error,
    isLoading: state.status === 'loading',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
    isIdle: state.status === 'idle',
    status: state.status,
    get,
    post,
    reset,
  };
} 