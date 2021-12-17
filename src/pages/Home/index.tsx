import React, { Dispatch, SetStateAction, useState } from 'react';
import { ReactComponent as IrishLogo } from 'assets/images/irish-logo.svg';
import { ReactComponent as MobileLogo } from 'assets/images/mobile-irish.svg';

import { isMobile } from 'utils/userAgent';
import { StatusLink } from 'store';
import Swap from 'pages/Swap';
import Pool from 'pages/Pool';
import {
  Container,
  Header,
  LeftContainer,
  RightContainer,
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
      return <Pool />;
    default:
      return <Swap />;
  }
}

export default function Home() {
  const [currentTab, setCurrentTab] = useState<StatusLink>(StatusLink.Swap);

  return (
    <Container>

      <Header>
        <LeftContainer>
          {isMobile ? <MobileLogo /> : <IrishLogo />}
        </LeftContainer>
        <Navigation
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        <RightContainer>
          <ConnectionButton />
        </RightContainer>
      </Header>

      <Body>
        <CurrentTab currentTab={currentTab} />
      </Body>
    </Container>
  );
}
