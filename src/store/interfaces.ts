import {
  Dispatch, SetStateAction,
} from 'react';
import SpecialWallet from 'services/wallet';

import logoInputToken from 'assets/images/outputTokenLogo.svg';
import logoOutputToken from 'assets/images/white-near.svg';
import rainbowLogo from 'assets/images/rainbow-bridge.svg';

export enum StatusLink { 'Swap', 'Pool' }
export interface IPool {
  id: number;
  poolKind: string;
  tokenAccountIds: string[];
  amounts: string[];
  totalFee: number;
  sharesTotalSupply: string;
  poolFee?: string;
  poolVolumes?: string;
  poolSharePrice?: string;
  poolShares?: string;
  poolTotalShares?: string;
}

export interface IToken {
  contract: any;
  contractId: string;
  metadata: ITokenMetadata;
}
export interface ITokenMetadata {
  version:string;
  name:string;
  symbol:string;
  reference:string;
  decimals:number;
  icon: string;
}

export type StoreContextType = {
  wallet: SpecialWallet | null;
  setWallet: Dispatch<SetStateAction<SpecialWallet | null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  isAccountModalOpen: boolean;
  setAccountModalOpen: Dispatch<SetStateAction<boolean>>;
  isLiquidityModalOpen: boolean;
  setLiquidityModalOpen: Dispatch<SetStateAction<boolean>>;
  isSearchModalOpen: boolean;
  setSearchModalOpen: Dispatch<SetStateAction<boolean>>;
  pools: IPool[];
  setPools: Dispatch<SetStateAction<IPool[]>>;
  tokens: {[key: string]: IToken};
  setTokens: Dispatch<SetStateAction<{[key: string]: IToken}>>;
  balances: {[key: string]: string};
  setBalances: Dispatch<SetStateAction<{[key: string]: string}>>;
  inputToken: IToken | null,
  setInputToken: Dispatch<SetStateAction<IToken | null>>,
  outputToken: IToken | null,
  setOutputToken: Dispatch<SetStateAction<IToken | null>>,
  setPool: (pool: IPool) => void
  updatePool: (id: number) => void;
  contract: any;
}

interface IInformation {
  inputTokenBalance: string,
  inputTokenLogo: string, //! fix
  inputTokenName: string,
  inputMinterName?: string,
  inputMinterLogo?: string,

  outputTokenBalance: string,
  outputTokenLogo: string, //! fix
  outputTokenName: string,
  outputMinterName?: string,
  outputMinterLogo?: string,
}

export const information: IInformation = {
  inputTokenBalance: '0.562869',
  inputTokenLogo: logoInputToken, //! fix
  inputTokenName: 'LTC',
  inputMinterName: 'Rainbow Bridge',
  inputMinterLogo: rainbowLogo,

  outputTokenBalance: '0.562869',
  outputTokenLogo: logoOutputToken, //! fix
  outputTokenName: 'NEAR',
  outputMinterName: 'Rainbow Bridge',
  outputMinterLogo: rainbowLogo,
};

export const contractMethods = [
  'get_pools', // from_index: u64, limit: u64

  'get_guardians',
  'get_number_of_pools',

  'get_pool', // pool_id: u64
  'get_pool_fee', // pool_id: u64
  'get_pool_volumes', // pool_id: u64
  'get_pool_share_price', // pool_id: u64
  'get_pool_shares', // pool_id: u64, account_id: ValidAccountId
  'get_pool_total_shares', // pool_id: u64

  // Returns balances of the deposits for given user outside of any pools.
  /// Returns empty list if no tokens deposited.
  'get_deposits', // account_id: ValidAccountId
  // Returns balance of the deposit for given user outside of any pools.
  'get_deposit', // account_id: ValidAccountId, token_id: ValidAccountId
];
