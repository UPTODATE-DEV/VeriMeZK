import { FetchZkConfigProvider } from '@midnight-ntwrk/midnight-js-fetch-zk-config-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { networkId } from '@midnight-ntwrk/midnight-js-network-id';
import type { MidnightProviders } from '@/types';
import config from '@/config';

export async function setupProviders(): Promise<MidnightProviders> {
  const zkConfigProvider = new FetchZkConfigProvider({
    zkConfigUrl: config.midnight.rpcUrl,
  });

  const proofProvider = httpClientProofProvider({
    proofServerUrl: config.midnight.rpcUrl,
  });

  const dataProvider = indexerPublicDataProvider({
    indexerUrl: config.midnight.indexerUrl,
  });

  const stateProvider = await levelPrivateStateProvider({
    dbName: 'verimezk-midnight-state',
  });

  const networkIdProvider = networkId(Number(config.midnight.networkId));

  return {
    zkConfigProvider,
    proofProvider,
    dataProvider,
    stateProvider,
    networkId: networkIdProvider,
  };
}

