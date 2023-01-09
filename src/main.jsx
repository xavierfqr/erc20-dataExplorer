import React from 'react'
import ReactDOM from 'react-dom/client';

import { WagmiConfig, createClient, configureChains, goerli } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

import App from './App'
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient();

const { chains, provider, webSocketProvider } = configureChains(
  [goerli],
  [alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_API_KEY }), publicProvider()],
)

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
  provider,
  webSocketProvider,
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}> 
        <WagmiConfig client={client}>
          <App />
        </WagmiConfig>
      </ChakraProvider> 
    </QueryClientProvider>
  </React.StrictMode>,
)
