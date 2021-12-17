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
  isLiquidityModalOpen: false,
  setLiquidityModalOpen: () => {},
  tokens: {},
  setTokens: () => {},
  balances: {},
  setBalances: () => {},
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
  const [isLiquidityModalOpen, setLiquidityModalOpen] = useState<boolean>(
    initialState.isLiquidityModalOpen,
  );
  const [balances, setBalances] = useState<{[key:string]: string}>(initialState.balances);

  const initialLoading = async () => {
    try {
      setLoading(true);
      const isSignedIn = nearWallet.isSignedIn();

      const config = getConfig();

      const contract: any = createContract(nearWallet, config.contractId, ['get_pools']);
      const poolsResult = await contract.get_pools({ pool_id: 0, from_index: 0, limit: 100 });
      const tokenAddresses = poolsResult.flatMap((pool: any) => pool.token_account_ids);
      setPools(poolsResult); // TODO: make pool formater which will change obj keys to camelCase
      const tokensMetadata: any[] = await Promise.all(
        tokenAddresses.map(async (address: string) => {
          const ftTokenContract:any = createContract(nearWallet, address, ['ft_metadata', 'ft_balance_of']);
          const metadata = await ftTokenContract.ft_metadata();
          return { metadata, contractId: address, contract: ftTokenContract };
        }),
      );
      if (isSignedIn) {
        setWallet(nearWallet);
        const accountId = nearWallet.getAccountId();
        const balancesArray = await Promise.all(
          tokensMetadata.map(async (token) => {
            const balance = token.contract.ft_balance_of({ account_id: accountId });
            return { contractId: token.contractId, balance };
          }),
        );
        const balancesMap = balancesArray.reduce((acc, curr) => (
          { ...acc, [curr.contractId]: curr }
        ), {});
        setBalances(balancesMap);
      }
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
      isLiquidityModalOpen,
      setLiquidityModalOpen,
      tokens,
      setTokens,
      pools,
      setPools,
      balances,
      setBalances,
    }}
    >
      {children}
    </StoreContextHOC.Provider>
  );
};

export const useStore = () => useContext(StoreContextHOC);
