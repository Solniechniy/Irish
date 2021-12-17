import styled from 'styled-components';

export const CardBlock = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.BgCardGrey};
  display: flex;
  flex-direction: column;
  padding: 33px 24px 24px 24px;
  border-radius: 8px;
  & > button {
    border-radius: 2px;
    padding: 0.906rem 1.875rem;
  }
`;

export const TokenBock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TokenContainer = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 3.5fr;
  grid-template-rows: repeat(2, 1fr);
  margin-bottom: 1.75rem;
`;

export const TokenLogo = styled.div`
  grid-area: 1 / 1 / 3 / 2;
  margin-right: .5rem;
  & > img {
    width: 48px;
    height: 48px;
  }
  :hover{
    cursor: pointer;
  }
`;

export const TokenTitle = styled.p`
  grid-area: 1 / 2 / 2 / 3;
  font-style: normal;
  font-weight: normal;
  font-size: 1.25rem;
  line-height: 1.25rem;
  display: flex;
  align-items: center;
  margin: 0;
  :hover{
    cursor: pointer;
  }
`;

export const TokenLabel = styled.p`
  grid-area: 2 / 2 / 3 / 3;
  font-style: normal;
  font-weight: normal;
  font-size: .75rem;
  line-height: .75rem;
  display: flex;
  align-items: center;
  margin: 0;
  :hover{
    cursor: pointer;
  }
`;

export const TokenValue = styled.p`
  grid-area: 1 / 3 / 3 / 4;
  font-style: normal;
  font-weight: normal;
  font-size: 1.25rem;
  line-height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0;
`;

export const CurrencyExchange = styled.div`
  display: flex;
  justify-content: center;
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  line-height: 1rem;
  white-space: nowrap;
  margin-bottom: 1.25rem;
  color: ${({ theme }) => theme.greyPool};
`;

export const ProfitBlock = styled.div`
  display: flex;
  flex-direction: column;
  & > div:last-child {
    & > p:first-child {
      font-weight: bold;
    }
    & > p:last-child {
      font-weight: bold;
    }
  }
`;

export const ProfitRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ProfitLabel = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  line-height: 1rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.greyPool};
  margin: .75rem 0;
`;

export const ProfitValue = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  line-height: 1rem;
  color: ${({ theme }) => theme.globalBlack};
  margin: .75rem 0;
`;
