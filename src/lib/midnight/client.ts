import { MidnightSetupAPI } from '@meshsdk/midnight-setup';
import type { MidnightProviders } from '@/types';
import { setupProviders } from './providers';

let midnightAPI: any = null;
let providers: MidnightProviders | null = null;

export async function getMidnightClient() {
    if (!providers) {
        providers = await setupProviders();
    }
    return providers;
}

export async function initializeMidnightAPI(contractInstance?: any, contractAddress?: string) {
    if (midnightAPI) {
        return midnightAPI;
    }

    const providers = await getMidnightClient();

    if (contractAddress) {
        // Join existing contract
        midnightAPI = await MidnightSetupAPI.joinContract(
            providers,
            contractInstance,
            contractAddress
        );
    } else if (contractInstance) {
        // Deploy new contract
        midnightAPI = await MidnightSetupAPI.deployContract(
            providers,
            contractInstance
        );
    } else {
        throw new Error('Either contractInstance or contractAddress must be provided');
    }

    return midnightAPI;
}

export async function getContractState() {
    if (!midnightAPI) {
        throw new Error('Midnight API not initialized');
    }
    return await midnightAPI.getContractState();
}

export function resetMidnightClient() {
    midnightAPI = null;
    providers = null;
}

