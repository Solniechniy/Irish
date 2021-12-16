import React, {
  createContext, useContext, useEffect,
} from 'react';
import { wallet as nearWallet } from 'services/near';
import SpecialWallet from 'services/wallet';
import { StoreContextType } from './interfaces';

const initialState: StoreContextType = {
  wallet: null,
  setWallet: () => {},
  loading: false,
  setLoading: () => {},
  isAccountModalOpen: false,
  setAccountModalOpen: () => {},
};

const StoreContextHOC = createContext<StoreContextType>(initialState);

export const StoreContextProvider = (
  { children }:{ children: JSX.Element },
) => {
  const [wallet, setWallet] = React.useState<SpecialWallet| null>(initialState.wallet);
  const [loading, setLoading] = React.useState<boolean>(initialState.loading);

  const [isAccountModalOpen, setAccountModalOpen] = React.useState<boolean>(
    initialState.isAccountModalOpen,
  );

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
      isAccountModalOpen,
      setAccountModalOpen,
    }}
    >
      {children}
    </StoreContextHOC.Provider>
  );
};

export const useStore = () => useContext(StoreContextHOC);
