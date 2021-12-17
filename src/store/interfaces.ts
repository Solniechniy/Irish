import {
  Dispatch, SetStateAction,
} from 'react';
import SpecialWallet from 'services/wallet';

import logoInputToken from 'assets/images/outputTokenLogo.svg';
import logoOutputToken from 'assets/images/white-near.svg';
import rainbowLogo from 'assets/images/rainbow-bridge.svg';

export enum StatusLink { 'Swap', 'Pool' }
export interface IPool {
  poolKind: string,
  tokenAccountIds: string[],
  amounts: string[],
  totalFee: number,
  sharesTotalSupply: string
}

export interface IToken {
  version:string;
  name:string;
  symbol:string;
  reference:string;
  decimals:number;
  contract: any;
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
  pools: IPool[];
  setPools: Dispatch<SetStateAction<IPool[]>>;
  tokens: {[key: string]: IToken};
  setTokens: Dispatch<SetStateAction<{[key: string]: IToken}>>;
  balances: {[key: string]: string};
  setBalances: Dispatch<SetStateAction<{[key: string]: string}>>;
}

interface IIinformation {
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

export const information: IIinformation = {
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
