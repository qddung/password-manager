import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import './index.css'
import App from './App.tsx';
import { AppContextProvider } from './context/AppContext.tsx';
import { createNetworkConfig, lightTheme, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getFullnodeUrl } from '@mysten/sui/client';

const { networkConfig } = createNetworkConfig({
  mainnet: { url: getFullnodeUrl('mainnet') },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <SuiClientProvider networks={networkConfig} defaultNetwork="mainnet">
      <WalletProvider
        theme={lightTheme}
        autoConnect={true}
        storage={localStorage}
        storageKey="sui-wallet"
        preferredWallets={["Sui Wallet"]}
      >
        <StyleProvider layer>
          <ConfigProvider theme={{
            token: {
              colorPrimary: '#ff97d6'
            }
          }}>
            <AppContextProvider>
              <App />
            </AppContextProvider>
          </ConfigProvider>
        </StyleProvider>
      </WalletProvider >,
    </SuiClientProvider >,
  </QueryClientProvider >,
)
