export type GetRedisDataResponse = {
  error: null | Error;
  badSelectedKey?: boolean;
  redisData?: {
    keys: string[];
    selectedKey: null | string;
    value: null | string;
  };
};
