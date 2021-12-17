import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import getConfig from 'services/config';
import { wallet as nearWallet } from 'services/near';
import SpecialWallet, { createContract } from 'services/wallet';
import { formatPool } from 'utils';
import {
  contractMethods, IPool, IToken, StoreContextType,
} from './interfaces';

const config = getConfig();
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
  isLiquidityModalOpen: false,
  setLiquidityModalOpen: () => {},
  isSearchModalOpen: false,
  setSearchModalOpen: () => {},
  tokens: {},
  setTokens: () => {},
  balances: {},
  setBalances: () => {},
  inputToken: null,
  setInputToken: () => {},
  outputToken: null,
  setOutputToken: () => {},
  setPool: () => {},
  updatePool: () => {},
  contract: null,
};

const StoreContextHOC = createContext<StoreContextType>(initialState);

export const StoreContextProvider = (
  { children }:{ children: JSX.Element },
) => {
  const contract: any = createContract(nearWallet, config.contractId, contractMethods);

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
  const [isSearchModalOpen, setSearchModalOpen] = useState<boolean>(
    initialState.isSearchModalOpen,
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

  const updatePool = async (id:number) => {
    try {
      const accountId = nearWallet.getAccountId();

      const poolFee = await contract.get_pool_fee({ pool_id: id }) ?? null;
      const poolVolumes = await contract.get_pool_volumes({ pool_id: id }) ?? null;
      const poolSharePrice = await contract.get_pool_share_price({ pool_id: id }) ?? null;
      const poolShares = await contract.get_pool_shares(
        { pool_id: id, account_id: accountId },
      ) ?? null;
      const poolTotalShares = await contract.get_pool_total_shares({ pool_id: id }) ?? null;
      console.log(pools[id]);
    } catch (e) {
      console.log(e);
    }
    setPools({...pools, pools[id]: updatePool});
  };

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
      isSearchModalOpen,
      setSearchModalOpen,
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
      updatePool,
      contract,
    }}
    >
      {children}
    </StoreContextHOC.Provider>
  );
};

export const useStore = () => useContext(StoreContextHOC);
