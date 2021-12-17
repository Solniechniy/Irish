import rainbowLogo from 'assets/images/rainbow-bridge.png';
import allBridgeLogo from 'assets/images/allbridge.png';

export interface ITrustedToken {
  logo: string;
  title: string;
}

export const trustedTokens: {[key:string]: ITrustedToken} = {
  'token.solniechniy.testnet': {
    logo: rainbowLogo,
    title: 'Rainbow bridge',
  },
  'ref.fakes.testnet': {
    logo: allBridgeLogo,
    title: 'Allbridge',
  },
};
