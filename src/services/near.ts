import {
  Near, keyStores, utils,
} from 'near-api-js';
import SpecialWallet from 'services/wallet';
import BN from 'bn.js';

import getConfig from './config';

export const getGas = (gas: string) => (gas ? new BN(gas) : new BN('100000000000000'));
export const getAmount = (amount: string) => (amount ? new BN(utils.format.parseNearAmount(amount) ?? 0) : new BN('0'));

export interface Transaction {
  receiverId: string;
  functionCalls: { gas?:
    string; amount?: string;
     methodName: string;
    args?: object;
  }[];
}

const config = getConfig();
const CONTRACT_ID = config.contractId;

export const near = new Near({
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  ...config,
  headers: {},
});

export const wallet = new SpecialWallet(near, CONTRACT_ID);
