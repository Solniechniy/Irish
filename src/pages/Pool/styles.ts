import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.BgCardGrey};
  display: flex;
  flex-direction: column;
  padding: 33px 24px 24px 24px;
  border-radius: 8px;
`;

export const TokenInformation = styled.div`
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
`;

export const TokenTitle = styled.p`
  grid-area: 1 / 2 / 2 / 3;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 19px;
  display: flex;
  align-items: center;
  margin: 0;
`;

export const TokenLabel = styled.p`
  grid-area: 2 / 2 / 3 / 3;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 11px;
  display: flex;
  align-items: center;
  margin: 0;

`;

export const TokenValue = styled.p`
  grid-area: 1 / 3 / 3 / 4;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 19px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0;
`;

export const Label = styled.div`
  display: flex;
  justify-content: center;
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  line-height: 1rem;
  white-space: nowrap;
  margin-bottom: 28px;
  color: ${({ theme }) => theme.greyPool};
`;
