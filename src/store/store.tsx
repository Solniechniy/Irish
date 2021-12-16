import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import getConfig from 'services/config';
import { wallet as nearWallet } from 'services/near';
import SpecialWallet, { createContract } from 'services/wallet';
import { IPool, IToken, StoreContextType } from './interfaces';

const initialState: StoreContextType = {
  wallet: null,
  setWallet: () => {},
  pools: [],
  setPools: () => {},
  loading: false,
  setLoading: () => {},
  isAccountModalOpen: false,
  setAccountModalOpen: () => {},
  tokens: {},
  setTokens: () => {},
};

const StoreContextHOC = createContext<StoreContextType>(initialState);

export const StoreContextProvider = (
  { children }:{ children: JSX.Element },
) => {
  const [wallet, setWallet] = useState<SpecialWallet| null>(initialState.wallet);
  const [loading, setLoading] = useState<boolean>(initialState.loading);
  const [tokens, setTokens] = useState<{[key: string]: IToken}>(initialState.tokens);
  const [pools, setPools] = useState<IPool[]>(initialState.pools);
  const [isAccountModalOpen, setAccountModalOpen] = useState<boolean>(
    initialState.isAccountModalOpen,
  );

  const initialLoading = async () => {
    try {
      setLoading(true);
      const isSignedIn = nearWallet.isSignedIn();
      const config = getConfig();
      if (isSignedIn) {
        setWallet(nearWallet);
      }
      const contract: any = createContract(nearWallet, config.contractId, ['get_pools']);
      const poolsResult = await contract.get_pools({ pool_id: 0, from_index: 0, limit: 100 });
      const tokenAddresses = poolsResult.flatMap((pool: any) => pool.token_account_ids);
      setPools(poolsResult); // TODO: make pool formater which will change obj keys to camelCase
      const tokensMetadata: any[] = await Promise.all(
        tokenAddresses.map(async (address: string) => {
          const ftTokenContract:any = createContract(nearWallet, address, ['ft_metadata']);
          const metadata = await ftTokenContract.ft_metadata();
          return { metadata, contractId: address };
        }),
      );

      setTokens(tokensMetadata.reduce((acc, curr) => ({ ...acc, [curr.contractId]: curr }), {}));
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
      tokens,
      setTokens,
      pools,
      setPools,
    }}
    >
      {children}
    </StoreContextHOC.Provider>
  );
};

export const useStore = () => useContext(StoreContextHOC);
