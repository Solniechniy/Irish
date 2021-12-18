import rainbowLogo from 'assets/images/rainbow-bridge.png';
import allBridgeLogo from 'assets/images/allbridge.png';

export const BASE = 10;
export interface ITrustedToken {
  logo: string;
  title: string;
}

export const trustedTokens: {[key:string]: ITrustedToken} = {
  'dev-1639816390712-31298106219975': {
    logo: rainbowLogo,
    title: 'Rainbow bridge',
  },
  'dev-1639816884562-67618928163122': {
    logo: allBridgeLogo,
    title: 'Allbridge',
  },
};
