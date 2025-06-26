export interface ResetRedisDbResponse {
    error: null | Error;
    resetResult?: {
      success: boolean;
      keysBeforeReset: string[];
    };
    initResult?: {
      success: boolean;
      keysAfterReset: string[];
    };
};
