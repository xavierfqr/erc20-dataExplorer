import { Box, Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function Connect() {
  const { connect, connectors, isLoading, pendingConnector } = useConnect();
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect();

  return (
    <Flex alignItems={"center"} justifyContent="flex-end" m={2}>
      {!isConnected ? (
        connectors.map((connector) => (
          <Button colorScheme={"cdarkblue"} disabled={!connector.ready} key={connector.id} onClick={() => connect({ connector })}>
            Connect with {connector.name}
            {!connector.ready && ' (unsupported)'}
            {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
          </Button>
        ))
      ) : (
        <Box mr={4}>Hello {address.substring(0, 5)}...{address.substring(address.length - 5)}</Box>
      )}
      {isConnected ? <Button colorScheme={"red"} onClick={disconnect}>Disconnect</Button> : <div></div>}
    </Flex>
  );
}
