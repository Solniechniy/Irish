import React, { Dispatch, SetStateAction, useState } from 'react';
import { ReactComponent as IrishLogo } from 'assets/images/irish-logo.svg';

import { isMobile, isTablet } from 'utils/userAgent';
import { StatusLink } from 'store/store';
import Swap from 'component/Swap';
import {
  Container,
  Header,
  MobileHeader,
  UpperRow,
  LowerRow,
  LogoContainer,
  NavBar,
  NavButton,
  Body,
} from './styles';
import ConnectionButton from './ConnectionButton';

interface INavigation {
  currentTab: StatusLink,
  setCurrentTab: Dispatch<SetStateAction<StatusLink>>,
}

const Navigation = ({ currentTab, setCurrentTab }:INavigation) => (
  <NavBar>
    <NavButton
      isActive={currentTab === StatusLink.Swap}
      onClick={() => setCurrentTab(StatusLink.Swap)}
    >Swap
    </NavButton>
    <NavButton
      isActive={currentTab === StatusLink.Pool}
      onClick={() => setCurrentTab(StatusLink.Pool)}
    >Pool
    </NavButton>
  </NavBar>
);

function CurrentTab({ currentTab }: { currentTab: StatusLink }) {
  switch (currentTab) {
    case StatusLink.Pool:
      return <p>Pool</p>;
    default:
      return <Swap />;
  }
}

export default function Home() {
  const [currentTab, setCurrentTab] = useState<StatusLink>(StatusLink.Swap);

  return (
    <Container>

      {isMobile || isTablet
        ? (
          <MobileHeader>
            <UpperRow>
              <LogoContainer>
                <IrishLogo />
              </LogoContainer>
              <ConnectionButton />
            </UpperRow>
            <LowerRow>
              <Navigation
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
              />
            </LowerRow>
          </MobileHeader>
        )
        : (
          <Header>
            <LogoContainer>
              <IrishLogo />
            </LogoContainer>
            <Navigation
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
            <ConnectionButton />
          </Header>
        )}

      <Body>
        <CurrentTab currentTab={currentTab} />
      </Body>
    </Container>
  );
}
