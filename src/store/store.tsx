import { TokenType } from 'pages/Swap';
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
const INITIAL_POOL_ID = 1;

export const initialState: StoreContextType = {
  wallet: null,
  setWallet: () => {},
  pools: [],
  setPools: () => {},
  currentPool: null,
  setCurrentPool: () => {},
  loading: false,
  setLoading: () => {},
  isAccountModalOpen: false,
  setAccountModalOpen: () => {},
  isLiquidityModalOpen: false,
  setLiquidityModalOpen: () => {},
  isSearchModalOpen: { isOpen: false, tokenType: TokenType.Output },
  setSearchModalOpen: () => {},
  tokens: {},
  setTokens: () => {},
  balances: {},
  setBalances: () => {},
  inputToken: null,
  setInputToken: () => {},
  outputToken: null,
  setOutputToken: () => {},
  updatePool: () => {},
  contract: null,
  setCurrentToken: () => {},
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
  const [isSearchModalOpen, setSearchModalOpen] = useState<{isOpen: boolean, tokenType: TokenType}>(
    initialState.isSearchModalOpen,
  );
  const [balances, setBalances] = useState<{[key:string]: string}>(initialState.balances);
  const [inputToken, setInputToken] = useState<IToken | null>(initialState.inputToken);
  const [outputToken, setOutputToken] = useState<IToken | null>(initialState.outputToken);
  const [currentPool, setCurrentPool] = useState<IPool| null>(initialState.currentPool);

  const setCurrentToken = (tokenAddress: string, tokenType: TokenType) => {
    if (!inputToken || !outputToken) return;
    if (tokenType === TokenType.Output) {
      const outputTokenData = tokens[tokenAddress] ?? null;
      setOutputToken(outputTokenData);
      const availablePool = pools.filter((pool) => pool.tokenAccountIds.includes(tokenAddress)
      && pool.tokenAccountIds.includes(inputToken.contractId)
      && inputToken.contractId !== tokenAddress);
      if (availablePool.length) {
        setCurrentPool(availablePool[0]);
      }
    } else {
      const inputTokenData = tokens[tokenAddress] ?? null;
      setInputToken(inputTokenData);
      const availablePool = pools.filter((pool) => pool.tokenAccountIds.includes(tokenAddress)
      && pool.tokenAccountIds.includes(outputToken.contractId)
      && outputToken.contractId !== tokenAddress);
      if (availablePool.length) {
        setCurrentPool(availablePool[0]);
      }
    }
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
            const balance = await token.contract.ft_balance_of({ account_id: accountId });
            return { contractId: token.contractId, balance };
          }),
        );
        const balancesMap = balancesArray.reduce((acc, curr) => (
          { ...acc, [curr.contractId]: curr.balance }
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
      const initialPool = pools[INITIAL_POOL_ID];
      const outputTokenData = tokens[initialPool.tokenAccountIds[0]] ?? null;
      setOutputToken(outputTokenData);
      const inputTokenData = tokens[initialPool.tokenAccountIds[1]] ?? null;
      setInputToken(inputTokenData);

      setCurrentPool(initialPool);
    }
  }, [pools.length]);

  const updatePool = async (id: number) => {
    try {
      const accountId = nearWallet.getAccountId();

      const poolFee = await contract.get_pool_fee({ pool_id: id }) ?? null;
      const poolVolumes = await contract.get_pool_volumes({ pool_id: id }) ?? null;
      const poolSharePrice = await contract.get_pool_share_price({ pool_id: id }) ?? null;
      const poolShares = await contract.get_pool_shares(
        { pool_id: id, account_id: accountId },
      ) ?? null;
      const poolTotalShares = await contract.get_pool_total_shares({ pool_id: id }) ?? null;
      const newPoolsArray = [...pools];
      const index = pools.findIndex((el) => el.id === id);
      newPoolsArray[index] = {
        ...pools[id], poolFee, poolVolumes, poolSharePrice, poolShares, poolTotalShares,
      };
      setPools(newPoolsArray);
    } catch (e) {
      console.log(e);
    }
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
      currentPool,
      setCurrentPool,
      updatePool,
      contract,
      setCurrentToken,
    }}
    >
      {children}
    </StoreContextHOC.Provider>
  );
};

export const useStore = () => useContext(StoreContextHOC);
