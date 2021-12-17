import styled from 'styled-components';

export const Layout = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 11;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.layoutBlack};
  backdrop-filter: blur(6px);
`;

export const Modal = styled.div`
  min-width: 540px;
  min-height: 170px;
  background-color: ${({ theme }) => theme.globalWhite};
  border-radius: 16px;
  
  ${({ theme }) => theme.mediaWidth.upToSmall`
      min-width: 80%;
      margin: 0 16px;
      max-height: 100%;
      width: 100%;
  `}
`;

export const ModalBlock = styled.div`
  margin: 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  flex-grow: 0;
  flex-shrink: 0;
`;

export const ModalTitle = styled.h2`
  font-style: normal;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 120%;
  margin-block-start: 0;
  margin-block-end: 0;
  margin: 0 auto;
`;

export const ModalClose = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-style: normal;
  font-weight: bold;
  font-size: 1.0625;
  line-height: 22px;
  letter-spacing: -0.04em;
`;
