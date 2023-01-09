import { Flex } from '@chakra-ui/react';
import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function Connect() {
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { address, connector, isConnected } = useAccount()
  const { disconnect } = useDisconnect();

  return (
    <Flex>
      {!isConnected ? (
        connectors.map((connector) => (
          <button disabled={!connector.ready} key={connector.id} onClick={() => connect({ connector })}>
            {connector.name}
            {!connector.ready && ' (unsupported)'}
            {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
          </button>
        ))
      ) : (
        <div>Hey {address}</div>
      )}
      <button onClick={disconnect}>Disconnect</button>
    </Flex>
  );
}
