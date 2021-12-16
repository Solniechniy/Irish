import React from 'react';
import styled from 'styled-components';
import { isMobile } from 'utils/userAgent';

export enum ButtonVariant {
  Primary,
  Secondary,
  Tertiary,
}

export const ButtonPrimary = styled.button`
  outline: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12.5px 15px;
  border: 2px solid ${({ theme }) => theme.globalBlack};
  border-radius: 8px;
  background: none;

  font-style: normal;
  font-weight: bold;
  font-size: 1.063rem;
  line-height: 1rem;
  color: ${({ theme }) => theme.globalBlack};
  
  :hover {
    cursor: pointer;
  }
  :active {
  }
  :disabled{
  }
`;

export const ButtonSecondary = styled(ButtonPrimary)`
  border: none;
`;

export const ButtonTertiary = styled(ButtonPrimary)`
  border: none;
  background: ${({ theme }) => theme.globalBlack};
  color: ${({ theme }) => theme.globalWhite};
  border-radius: ${isMobile ? '2px' : '8px'};
  padding: 22px;
`;

export function Button({ variant }: { variant: ButtonVariant }) {
  switch (variant) {
    case ButtonVariant.Primary:
      return <ButtonPrimary />;
    case ButtonVariant.Secondary:
      return <ButtonSecondary />;
    case ButtonVariant.Tertiary:
      return <ButtonTertiary />;
    default:
      return <ButtonPrimary />;
  }
}
