import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Text,
  useToast,
} from '@chakra-ui/react';

import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Connect } from './components/Connect';
import { shortenAddress } from './utils/utils';

function App() {
  const [userAddress, setUserAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);
  const { address, isConnected } = useAccount();
  const toast = useToast()

  async function getTokenBalance() {
    const config = {
      apiKey:  import.meta.env.VITE_ALCHEMY_API_KEY,
      network: Network.ETH_GOERLI,
    };

    setIsLoading(true);
    try {
      const alchemy = new Alchemy(config);
      const data = await alchemy.core.getTokenBalances(userAddress);
      setResults(data);

      const tokenDataPromises = [];

      for (let i = 0; i < data.tokenBalances.length; i++) {
        const tokenData = alchemy.core.getTokenMetadata(
          data.tokenBalances[i].contractAddress
        );
        tokenDataPromises.push(tokenData);
      }

      setTokenDataObjects(await Promise.all(tokenDataPromises));
      setHasQueried(true);
    } catch (error) {
      toast({
        title: 'Failed to fetch token balances.',
        description: "Address doesn't exist or is invalid.",
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top'
      })
    }
    setIsLoading(false);
  }
  return (
    <Box w="100%" overflow={'hidden'}>
      <Connect></Connect>
      <Center>
        <Flex
          alignItems={'center'}
          justifyContent="center"
          flexDirection={'column'}
        >
          <Heading mb={0} fontSize={36}>
            ERC-20 Token Indexer
          </Heading>
          <Text>
            Plug in an address and this website will return all of its ERC-20
            token balances!
          </Text>
        </Flex>
      </Center>
      <Flex
        w="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent={'center'}
      >
        <Heading mt={42}>
          Get all the ERC-20 token balances of this address:
        </Heading>
        <Flex alignItems="center" mt={4}>
          <Input
            onChange={(e) => setUserAddress(e.target.value)}
            value={userAddress}
            color="black"
            w="600px"
            textAlign="center"
            p={4}
            bgColor="white"
            fontSize={20}
          />
          <Button ml={2} colorScheme={"cblue"} fontSize={20} onClick={() => {setUserAddress(address)}} disabled={!isConnected}>
           Use your address
          </Button>
        </Flex>
        
        {console.log(isLoading)}
        <Button colorScheme={"cdarkblue"} fontSize={20} onClick={getTokenBalance} mt={4} isLoading={isLoading} disabled={isLoading}>
          Check ERC-20 Token Balances
        </Button>
      
        <Heading my={8}>ERC-20 token balances:</Heading>

        {hasQueried ? (
          <SimpleGrid w={'90vw'} columns={4} spacing={10} >
            {results?.tokenBalances?.map((tokenBalance, index) => {
              return (
                <Flex
                  flexDir={'column'}
                  color="f"
                  bg="#151E3F"
                  p={2}
                  rounded={'md'}
                  key={tokenBalance.id}
                >
                  <Box>
                    <b>Symbol:</b> ${tokenDataObjects?.[index]?.symbol}&nbsp;
                  </Box>
                  <Box>
                    <b>Balance:</b>&nbsp;
                    {Utils.formatUnits(
                      tokenBalance?.tokenBalance,
                      tokenDataObjects?.[index]?.decimals
                    )}
                  </Box>
                  <Image src={tokenDataObjects?.[index]?.logo} />
                </Flex>
              );
            })}
          </SimpleGrid>
        ) : (
          'Please make a query! This may take a few seconds...'
        )}
      </Flex>
    </Box>
  );
}

export default App;
