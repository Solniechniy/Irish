import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import getConfig from 'services/config';
import { wallet as nearWallet } from 'services/near';
import SpecialWallet, { createContract } from 'services/wallet';
import { formatPool } from 'utils';
import { IPool, IToken, StoreContextType } from './interfaces';

const INITIAL_POOL_ID = 0;
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
  balances: {},
  setBalances: () => {},
  inputToken: null,
  setInputToken: () => {},
  outputToken: null,
  setOutputToken: () => {},
  setPool: () => {},
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
  const [balances, setBalances] = useState<{[key:string]: string}>(initialState.balances);
  const [inputToken, setInputToken] = useState<IToken | null>(initialState.inputToken);
  const [outputToken, setOutputToken] = useState<IToken | null>(initialState.outputToken);

  const setPool = (pool: IPool) => {
    const [inputTokenAddress, outputTokenAddress] = pool.tokenAccountIds;
    const inputTokenData = tokens[inputTokenAddress] ?? null;
    const outputTokenData = tokens[outputTokenAddress] ?? null;

    setInputToken(inputTokenData);
    setOutputToken(outputTokenData);
  };

  const initialLoading = async () => {
    try {
      setLoading(true);
      const isSignedIn = nearWallet.isSignedIn();

      const config = getConfig();

      const contract: any = createContract(nearWallet, config.contractId, ['get_pools']);
      const poolsResult = await contract.get_pools({ from_index: 0, limit: 100 });
      const tokenAddresses = poolsResult.flatMap((pool: any) => pool.token_account_ids);
      const poolArray = poolsResult.map((pool:any) => formatPool(pool));

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
      setPools(poolArray);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initialLoading();
  }, []);

  useEffect(() => {
    if (pools.length) {
      setPool(pools[INITIAL_POOL_ID]);
    }
  }, [pools.length]);

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
      balances,
      setBalances,
      inputToken,
      setInputToken,
      outputToken,
      setOutputToken,
      setPool,
    }}
    >
      {children}
    </StoreContextHOC.Provider>
  );
};

export const useStore = () => useContext(StoreContextHOC);
