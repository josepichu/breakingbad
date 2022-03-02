import axios from 'axios';
import { Dispatch, useReducer, useEffect } from 'react';
import { apiBaseUrl } from '../config/app';
// models
import { apiOptsInterface } from '../models/Api/apiOptsInterface';
import { apiStatusInterface } from '../models/Api/apiStatusInterface';

const initialDefaultOpts: apiOptsInterface = {
  wait: false,
  requestsCount: 0,
};

const apiOptsReducer = (state: apiOptsInterface, action) => ({
  ...state,
  ...action,
  wait: false,
  requestsCount: (state.requestsCount || 0) + 1,
});

const apiStatusReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'fetch-init':
      return {
        isLoading: true,
      };
    case 'fetch-end':
      return {
        isLoading: false,
        data: payload.data,
        status: payload.status,
      };
    case 'fetch-error':
      return {
        isLoading: false,
        error: payload.error,
      };
    default:
      return state;
  }
};

export function useAPI<T>(
  initialOpts: apiOptsInterface,
  onSuccess?: (data: T, status: number, apiOpts: apiOptsInterface) => void,
  onError?: (
    error: Record<string, unknown>,
    apiOpts: apiOptsInterface
  ) => void,
): {
  apiStatus: apiStatusInterface<T>;
  dispatchAPIOpts: Dispatch<apiOptsInterface>;
} {
  const [apiOpts, dispatchAPIOpts] = useReducer(apiOptsReducer, {
    ...initialDefaultOpts,
    ...initialOpts,
  });
  const [apiStatus, dispatchAPIStatus] = useReducer(apiStatusReducer, {
    data: [],
    isLoading: false,
  });

  useEffect(() => {
    let canceled = false;
    if (apiOpts.wait || canceled) {
      return;
    }

    const handleRequest = async () => {
      try {
        dispatchAPIStatus({ type: 'fetch-init' });

        const response = await axios(`${apiBaseUrl}${apiOpts.url}`);

        dispatchAPIStatus({ type: 'fetch-end', payload: { data: response.data, status: response.status } });

        onSuccess && onSuccess(response.data, response.status, apiOpts);
      } catch (error) {
        dispatchAPIStatus({
          type: 'fetch-error',
          payload: { error },
        });

        onError && onError(error, apiOpts);
      }
    };
    handleRequest();

    // eslint-disable-next-line consistent-return
    return () => {
      canceled = true;
    };
  }, [apiOpts, onError, onSuccess]);

  return { apiStatus, dispatchAPIOpts };
}
