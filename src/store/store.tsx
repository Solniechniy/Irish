import React, {
  createContext, useContext, useEffect,
  Dispatch, SetStateAction,
} from 'react';
import { wallet as nearWallet } from 'services/near';
import SpecialWallet from 'services/wallet';

export enum StatusLink { 'Swap', 'Pool' }

export type StoreContextType = {
  wallet: SpecialWallet | null;
  setWallet: Dispatch<SetStateAction<SpecialWallet | null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  accountId: string;
  setAccountId: Dispatch<SetStateAction<string>>;
  isConnected: boolean;
  setIsConnected: Dispatch<SetStateAction<boolean>>;
}

const initialState: StoreContextType = {
  wallet: null,
  setWallet: () => {},
  loading: false,
  setLoading: () => {},
  accountId: nearWallet.getAccountId(),
  setAccountId: () => {},
  isConnected: nearWallet.isSignedIn(),
  setIsConnected: () => {},
};

const StoreContextHOC = createContext<StoreContextType>(initialState);

export const StoreContextProvider = (
  { children }:{ children: JSX.Element },
) => {
  const [wallet, setWallet] = React.useState<SpecialWallet| null>(initialState.wallet);
  const [loading, setLoading] = React.useState<boolean>(initialState.loading);

  const [accountId, setAccountId] = React.useState<string>(initialState.accountId);
  const [isConnected, setIsConnected] = React.useState<boolean>(initialState.isConnected);

  const initialLoading = async () => {
    try {
      setLoading(true);
      const isSignedIn = nearWallet.isSignedIn();

      if (isSignedIn) {
        setWallet(nearWallet);
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initialLoading();
  }, []);

  return (
    <StoreContextHOC.Provider value={{
      wallet,
      setWallet,
      loading,
      setLoading,
      accountId,
      setAccountId,
      isConnected,
      setIsConnected,
    }}
    >
      {children}
    </StoreContextHOC.Provider>
  );
};

export const useStore = () => useContext(StoreContextHOC);
