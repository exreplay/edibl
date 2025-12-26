import type { CacheExchangeOpts } from '@urql/exchange-graphcache';

export type UrqlProviderProps = {
  url: string;
  wsUrls: string[];
  cache?: Partial<CacheExchangeOpts>;
};
