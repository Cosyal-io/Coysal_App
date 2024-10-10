'use client';

import { useEffect, useState } from 'react';
import { Web3AuthNoModal } from '@web3auth/no-modal';
import {
  CHAIN_NAMESPACES,
  IProvider,
  UX_MODE,
  WALLET_ADAPTERS,
  WEB3AUTH_NETWORK,
} from '@web3auth/base';
import { AuthAdapter } from '@web3auth/auth-adapter';
import { XrplPrivateKeyProvider } from '@web3auth/xrpl-provider';

import router from 'next/navigation';
import { convertStringToHex } from 'xrpl';

import { configDotenv } from 'dotenv';
import { toast } from 'sonner';
import { supabaseClient } from '../utils/supabase_db';
configDotenv();

const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!;
const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.XRPL,
  chainId: '0x2',
  rpcTarget: 'https://testnet-ripple-node.tor.us',
  wsTarget: 'wss://s.altnet.rippletest.net',
  ticker: 'XRP',
  tickerName: 'XRPL',
  displayName: 'xrpl testnet',
  blockExplorerUrl: 'https://testnet.xrpl.org',
  logo: '',
};

export function Providers({
  children,
  email,
}: {
  children: React.ReactNode;
  email?: string;
}) {
  const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null);
  const [provider, setProvider] = useState<IProvider>();
  const [loggedIn, setLoggedIn] = useState<boolean | null>(false);

  useEffect(() => {
    const init = async () => {
      try {
        const privateKeyProvider = new XrplPrivateKeyProvider({
          config: { chainConfig },
        });
        const web3auth = new Web3AuthNoModal({
          clientId,
          privateKeyProvider,
          web3AuthNetwork: WEB3AUTH_NETWORK.TESTNET,
        });

        const authAdapter = new AuthAdapter({
          adapterSettings: {
            uxMode: UX_MODE.REDIRECT,
          },
        });

        web3auth.configureAdapter(authAdapter);
        setWeb3auth(web3auth);
        await web3auth.init();

        setProvider(web3auth.provider!);
        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      toast('web3auth not initialized yet');
      return;
    }
    const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.AUTH, {
      loginProvider: 'google',
    });
    setProvider(web3authProvider!);

    // checking its for the first time
    // using supabase db
    if (
      (await supabaseClient.auth?.getUser()).data.user?.last_sign_in_at! >=
      new Date().toISOString()
    ) {
      // creating the popup windown in order to sign and create their account
      const offchain_message =
        'Welcome to Coysal, please sign this message to login to your account and approve TOC';
      const hexMsg = convertStringToHex(offchain_message);
      const loginSignature = await provider!.request<object, never>({
        method: 'xrpl_signMessage',
        params: {
          message: hexMsg,
        },
      });

      // and now we are going to send the signature to the backend
      const { data, error } = await supabaseClient.auth.signInWithOtp({
        email: email!,
        options: {
          emailRedirectTo: 'http://localhost:3000/welcome',
          data: {
            signature: loginSignature,
            message: offchain_message,
          },
        },
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success(
          'Check your email for the login link!, welcome to Coysal'
        );
        // storing the signature along with the email into the database named coysal
        await supabaseClient.from('coysal').insert({
          email: email,
          signature: loginSignature,
        });
      }
    }
  };

  return <>{children}</>;
}
