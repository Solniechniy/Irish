import React from 'react';
import styled from 'styled-components';

export enum ButtonVariant {
  Primary,
  Secondary,
}

export const ButtonPrimary = styled.button`
  max-height: 54px;
  outline: none;
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12.5px 15px;
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  line-height: 19px;
  border: 2px solid ${({ theme }) => theme.globalBlack};
  background: ${({ theme }) => theme.globalBlack};
  color: ${({ theme }) => theme.globalWhite};
  border-radius: 12px;
  :hover {
    cursor: pointer;
    background: ${({ theme }) => theme.globalGrey};
    border: 2px solid ${({ theme }) => theme.globalGrey};
  }
  :active {
  }
  :disabled{
    background: ${({ theme }) => theme.grayHover};
    border: 1px solid ${({ theme }) => theme.grayHover};
  }
`;

export const ButtonSecondary = styled(ButtonPrimary)`
  background: transparent;
  color: ${({ theme }) => theme.globalBlack};
`;

export function Button({ variant }: { variant: ButtonVariant }) {
  switch (variant) {
    case ButtonVariant.Primary:
      return <ButtonPrimary />;
    case ButtonVariant.Secondary:
      return <ButtonSecondary />;
    default:
      return <ButtonPrimary />;
  }
}
