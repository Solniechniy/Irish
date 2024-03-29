import React, { useState, useEffect } from 'react';
import { ReactComponent as CloseIcon } from 'assets/images/close.svg';

import styled from 'styled-components';
import { initialState, IToken, useStore } from 'store';
import { formatAmount } from 'utils';
import Big from 'big.js';
import {
  Modal, Layout, ModalBlock, ModalTitle, ModalClose,
} from './styles';

const SearchInput = styled.input`
  background: ${({ theme }) => theme.BgCardGrey};
  border: none;
  border-radius: 4px;
  outline: none;
  width: 100%;
  height: 100%;
  font-style: normal;
  font-weight: normal;
  font-size: 1.75rem;
  line-height: 1.75rem;
  padding: 10px 20px;
  color: ${({ theme }) => theme.globalBlack};
`;

const SearchModalContainer = styled(Modal)`
  max-width: 420px;
  max-height: 80vh;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
`;

const SearchResults = styled(ModalBlock)`
  flex-direction: column;
  justify-content: flex-start;
  overflow: scroll;
  flex: 5;
  margin-bottom:0;
  &>div{
    width: 100%;
  }
`;

const SearchRowContainer = styled.div`
  min-height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 1rem;
  & > img {
    width: 3rem;
    height: 3rem;
  }
`;

const SearchDescriptionBlock = styled.div`
  display: flex; 
  flex-direction: column;
  flex-grow: 2;
  margin: 0 16px;
`;

const SearchTitle = styled.h3`
  font-style: normal;
  font-weight: bold;
  font-size: 1rem;
  line-height: 1rem;
  margin-block-start: 0;
  margin-block-end: 0;
`;

const SearchSubtitle = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: .74rem;
  line-height: .74rem;
  margin-block-start: 0;
  margin-block-end: 0;
  color: ${({ theme }) => theme.globalLightGrey};
`;

const SearchRow = ({
  tokensArray, searchValue,
} : {
  tokensArray: IToken[],
  searchValue: string,
}) => {
  const {
    isSearchModalOpen,
    setSearchModalOpen,
    loading,
    balances,
    setCurrentToken,
  } = useStore();

  if (loading) return <h1>Loading</h1>;

  return (
    <>
      {tokensArray.map((token) => (
        <SearchRowContainer
          key={token.metadata.symbol}
          onClick={() => {
            setCurrentToken(token.contractId, isSearchModalOpen.tokenType);
            setSearchModalOpen(initialState.isSearchModalOpen);
          }}
        >
          <img src={token.metadata.icon} alt={token.metadata.symbol} />
          <SearchDescriptionBlock>
            <SearchTitle>
              {token.metadata.symbol}
            </SearchTitle>
            <SearchSubtitle>{token.metadata.name}</SearchSubtitle>
          </SearchDescriptionBlock>
          {new Big(
            formatAmount(balances[token.contractId] ?? 0, token.metadata.decimals),
          ).toFixed(3)}
          {' '}
          {token.metadata.symbol}
        </SearchRowContainer>
      ))}
    </>
  );
};

export default function SearchModal() {
  const {
    isSearchModalOpen,
    setSearchModalOpen,
    loading,
    tokens,
    balances,
  } = useStore();
  const initialTokens = Object.values(tokens);
  const [tokensArray, setTokensArray] = useState<IToken[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const onChange = ({ target }: {target: HTMLInputElement}) => {
    const newValue = target.value.trim().toLowerCase();
    setSearchValue(newValue);
    const newTokens = newValue !== ''
      ? initialTokens.filter(
        (el) => el.metadata.name.toLowerCase().includes(newValue)
        || el.metadata.symbol.toLowerCase().includes(newValue),
      )
      : initialTokens;
    setTokensArray(newTokens);
  };

  useEffect(() => {
    const newTokens = Object.values(tokens);

    if (newTokens.length !== tokensArray.length) {
      setTokensArray(newTokens);
    }
  }, [tokens, loading]);

  return (
    <>
      {isSearchModalOpen.isOpen && (
      <Layout onClick={() => setSearchModalOpen(initialState.isSearchModalOpen)}>
        <SearchModalContainer onClick={(e) => e.stopPropagation()}>
          <ModalBlock>
            <ModalTitle>
              Select a token
            </ModalTitle>
            <ModalClose onClick={() => setSearchModalOpen(initialState.isSearchModalOpen)}>
              <CloseIcon />
            </ModalClose>
          </ModalBlock>
          <ModalBlock>
            <SearchInput
              value={searchValue}
              onChange={onChange}
              placeholder="Search name"
            />
          </ModalBlock>
          <SearchResults>
            <SearchRow
              tokensArray={tokensArray}
              searchValue={searchValue}
            />
          </SearchResults>
        </SearchModalContainer>
      </Layout>
      )}
    </>
  );
}
