import { useWallet, WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks';
import { WalletModalProvider, WalletActionButton } from '@tronweb3/tronwallet-adapter-react-ui';
import '@tronweb3/tronwallet-adapter-react-ui/style.css';
import { WalletDisconnectedError, WalletError, WalletNotFoundError } from '@tronweb3/tronwallet-abstract-adapter';
// @ts-ignore
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import { useEffect } from 'react';
import tronStore from '../../stores/TronStore';
import { observer } from 'mobx-react-lite';

function Wallet() {
  function onError(e: WalletError) {
    if (e instanceof WalletNotFoundError) {
      toast.error(e.message);
    } else if (e instanceof WalletDisconnectedError) {
      toast.error(e.message);
    } else toast.error(e.message);
  }
  return (
    <WalletWrapper>
      <WalletProvider onError={onError}>
        <WalletModalProvider>
          <ConnectButtonWrapper>
            <ConnectComponent></ConnectComponent>
          </ConnectButtonWrapper>
          <Profile></Profile>
        </WalletModalProvider>
      </WalletProvider>
    </WalletWrapper>
  );
}
function ConnectComponent() {
  return <WalletActionButton></WalletActionButton>;
}
function Profile() {
  const { address, connected, wallet } = useWallet();
  useEffect(() => {
    tronStore.setAddress(`${address}`)
  }, [connected])
  return (
      <>
        <Status>Connection Status: {connected ? 'Connected' : 'Disconnected'}</Status>
        <WalletName>Your selected Wallet: {wallet?.adapter.name}</WalletName>
        <Address>Your Address: {address}</Address>
      </>
  );
}

const WalletWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
`;

const ConnectButtonWrapper = styled.div`
  width: 400px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const Status = styled.div`
  width: 400px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const WalletName = styled.div`
  width: 400px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const Address = styled.div`
  width: 400px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 40px;
`;

export default observer(Wallet)
