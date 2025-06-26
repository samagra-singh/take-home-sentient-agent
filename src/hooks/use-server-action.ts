'use client';

import { useState, useTransition } from 'react';

/**
 * Custom hook that provides manual server action invocation
 * similar to useActionState but without being tied to form actions.
 * Supports actions with or without input parameters.
 *
 * @param action - The server action to wrap (can take optional input)
 * @param initialState - Initial state for the action result
 * @returns [result, executeAction, isPending] - Tuple containing the action result, execution function, and loading state
 */
const useServerAction = <TData, TInput = void>(
  action: TInput extends void
    ? () => Promise<TData>
    : (input: TInput) => Promise<TData>,
  initialState: TData | null = null,
) => {
  const [response, setResponse] = useState<TData | null>(initialState);
  const [isPending, startTransition] = useTransition();

  const executeAction = ((input?: TInput): void => {
    startTransition(async () => {
      /**
       * Server actions should handle their own errors.
       * If not, we rely on error boundaries and other mechanisms to handle unexpected errors.
       */
      const data = await (input !== undefined
        ? (action as (input: TInput) => Promise<TData>)(input)
        : (action as () => Promise<TData>)()
      );
      setResponse(data);
    });
  }) as TInput extends void
    ? () => void
    : (input: TInput) => void;

  return {
    action: executeAction,
    loading: isPending,
    response,
  };
};

export default useServerAction;
