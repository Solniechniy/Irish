import React, {
  Dispatch, SetStateAction,
} from 'react';
import SpecialWallet from 'services/wallet';

import logoInputToken from 'assets/images/outputTokenLogo.svg';
import logoOutputToken from 'assets/images/white-near.svg';
import rainbowLogo from 'assets/images/rainbow-bridge.svg';

export enum StatusLink { 'Swap', 'Pool' }

export type StoreContextType = {
  wallet: SpecialWallet | null;
  setWallet: Dispatch<SetStateAction<SpecialWallet | null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  isAccountModalOpen: boolean;
  setAccountModalOpen: Dispatch<SetStateAction<boolean>>;
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
