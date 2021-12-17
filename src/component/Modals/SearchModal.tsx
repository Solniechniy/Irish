import React, { useState } from 'react';
import { ReactComponent as CloseIcon } from 'assets/images/close.svg';
import teatherLogo from 'assets/images/teather.svg';

import styled from 'styled-components';
import { useStore } from 'store';
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
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 1rem;
`;

const SearchDescriptionBlock = styled.div`
  display: flex; 
  flex-direction:column;
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
  logo, title, label, onClick,
} : {
  logo: string,
  title: string,
  label: string,
  onClick: () => void
}) => (
  <SearchRowContainer onClick={onClick}>
    <img src={logo} alt={title} />
    <SearchDescriptionBlock>
      <SearchTitle>
        {title}
      </SearchTitle>
      <SearchSubtitle>{label}</SearchSubtitle>
    </SearchDescriptionBlock>
  </SearchRowContainer>
);

function renderSearchResults(
  loading:boolean,
  searchValue:string,
  onClick: (id:number)=> void,
) {
  const token = {
    id: 1,
    title: 'USDT',
    label: 'Teather',
    logo: teatherLogo,
  };
  return (
    <div>
      <SearchRow
        logo={token.logo}
        title={token.title}
        label={token.label}
        onClick={() => onClick(token.id)}
      />
    </div>
  );
}

export default function SearchModal() {
  const {
    isSearchModalOpen, setSearchModalOpen, loading,
  } = useStore();

  const [searchValue, setSearchValue] = useState<string>('');

  const onChange = ({ target }: {target: HTMLInputElement}) => {
    const newValue = target.value.trim();
    setSearchValue(newValue);
  };

  const onRowClick = (id: number) => {
    setSearchModalOpen(false);
    console.log(id); // TODO: add token to swap
  };

  return (
    <>
      {isSearchModalOpen && (
      <Layout onClick={() => setSearchModalOpen(false)}>
        <SearchModalContainer onClick={(e) => e.stopPropagation()}>
          <ModalBlock>
            <ModalTitle>
              Select a token
            </ModalTitle>
            <ModalClose onClick={() => setSearchModalOpen(false)}>
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
            {renderSearchResults(loading, searchValue, onRowClick)}
          </SearchResults>
        </SearchModalContainer>
      </Layout>
      )}
    </>
  );
}
