import React from 'react'
import ReactDOM from 'react-dom/client';

import { WagmiConfig, createClient, configureChains, goerli } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

import App from './App'
import './index.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#030027',
        color: 'white'
      }
    }
  },
  colors: {
    "cred": {
      "50": "#F7EDED",
      "100": "#EACDCE",
      "200": "#DCADAE",
      "300": "#CE8D8E",
      "400": "#C06D6F",
      "500": "#B34C4F",
      "600": "#8F3D3F",
      "700": "#6B2E2F",
      "800": "#471F20",
      "900": "#240F10"
    },
    "corange": {
      "50": "#F9F0EB",
      "100": "#EFD4C7",
      "200": "#E5B8A3",
      "300": "#DB9C80",
      "400": "#D1805C",
      "500": "#C76438",
      "600": "#9F502D",
      "700": "#783C21",
      "800": "#502816",
      "900": "#28140B"
    },
    "cbeige": {
      "50": "#F8F9EC",
      "100": "#ECEEC9",
      "200": "#E1E3A6",
      "300": "#D5D883",
      "400": "#C9CD60",
      "500": "#BDC23D",
      "600": "#979B31",
      "700": "#717425",
      "800": "#4B4E18",
      "900": "#26270C"
    },
    "cdarkblue": {
      "50": "#E7E5FF",
      "100": "#BDB8FF",
      "200": "#938AFF",
      "300": "#685CFF",
      "400": "#3E2EFF",
      "500": "#1400FF",
      "600": "#1000CC",
      "700": "#0C0099",
      "800": "#080066",
      "900": "#040033"
    },
    "cblue": {
      "50": "#ECEFF9",
      "100": "#C9D1ED",
      "200": "#A7B4E2",
      "300": "#8596D6",
      "400": "#6279CB",
      "500": "#405BBF",
      "600": "#334999",
      "700": "#263773",
      "800": "#19244D",
      "900": "#0D1226"
    }
  }
})

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
    <ChakraProvider theme={theme}> 
      <WagmiConfig client={client}>
        <App />
      </WagmiConfig>
    </ChakraProvider> 
  </React.StrictMode>,
)
