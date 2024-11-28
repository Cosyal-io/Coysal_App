'use client';
import Image from 'next/image';
import { useEffect } from 'react';
import { Button } from 's/components/ui/button'; // Import Button from Shadcn UI
import { useState } from 'react';
import Footer from 'src/components/Footer';
import CsvUploadModal from 'src/components/CsvUploadModal'; // Import the CsvUploadModal component
import { CreateNft } from 'src/components/createNft';
import { XrplPrivateKeyProvider } from '@web3auth/xrpl-provider';
// // import {
// //   CHAIN_NAMESPACES,
// //   IProvider,
// //   UX_MODE,
// //   WALLET_ADAPTERS,
// //   WEB3AUTH_NETWORK,
// // } from '@web3auth/base';
// import { AuthAdapter } from '@web3auth/auth-adapter';
// import { Web3AuthNoModal } from '@web3auth/no-modal';
import { toast } from 'sonner';
import XrplRPC from 'src/components/xrpl_wallet_modal';

function uiConsole(...args: any[]): void {
  const el = document.querySelector('#console>p');
  if (el) {
    el.innerHTML = JSON.stringify(args || {}, null, 2);
  }
}

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [jsonResponse, setJsonResponse] = useState<any>(null); // State to hold the JSON response
  const [loggedIn, setLoggedIn] = useState(false);
  // const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null);
  // const [provider, setProvider] = useState<IProvider | null>(null);
  const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!;

  useEffect(() => {
    const init = async () => {
      try {
        // const chainConfig = {
        //   chainNamespace: CHAIN_NAMESPACES.XRPL,
        //   chainId: '0x2',
        //   rpcTarget: 'https://testnet-ripple-node.tor.us',
        //   wsTarget: 'wss://s.altnet.rippletest.net',
        //   ticker: 'XRP',
        //   tickerName: 'XRPL',
        //   displayName: 'xrpl testnet',
        //   blockExplorerUrl: 'https://testnet.xrpl.org',
        //   logo: '',
        // };

        // const privateKeyProvider = new XrplPrivateKeyProvider({
        //   config: { chainConfig },
        // });

        // const web3auth = new Web3AuthNoModal({
        //   clientId,
        //   privateKeyProvider,
        //   web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
        // });
        // const authAdapter = new AuthAdapter({
        //   adapterSettings: {
        //     uxMode: UX_MODE.REDIRECT,
        //   },
        // });
        // web3auth.configureAdapter(authAdapter);
        // setWeb3auth(web3auth);

        // await web3auth.init();
        // setProvider(web3auth.provider);
        // if (web3auth.connected) {
        //   setLoggedIn(true);
        // }
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, [clientId]);

  // const login = async () => {
  //   if (!web3auth) {
  //     toast('web3auth not initialized yet');
  //     return;
  //   }
  //   const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.AUTH, {
  //     loginProvider: 'google',
  //   });
  //   setProvider(web3authProvider);
  // };

  // const authenticateUser = async () => {
  //   if (!web3auth) {
  //     toast('web3auth not initialized yet');
  //     return;
  //   }
  //   const idToken = await web3auth.authenticateUser();
  //   toast(idToken.idToken);
  // };

  const handleJsonResponse = (response: any) => {
    setJsonResponse(response); // Set the JSON response from the modal
  };

  const handleCreateNft = async () => {
    if (jsonResponse) {
    } else {
      toast.error('No JSON response available');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center gap-6 p-4">
        <CsvUploadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onResponse={handleJsonResponse} // Pass the response handler to the modal
        />
        <Button
          onClick={handleCreateNft}
          className="bg-black text-white hover:bg-gray-800 transition"
        >
          Create New Nft
        </Button>
      </main>
      <Footer /> 
    </div>
  );
};

export default Home;