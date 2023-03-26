import { Center, Flex, VStack, Text } from '@chakra-ui/react';
import React from 'react';
import Account from './Account';
import Form from './Form';
import { AccountContextProvider } from './useAccount';

function App() {
	return (
		<AccountContextProvider>
			<Flex
				width='100vw'
				height='100vh'
				alignContent='center'
				justifyContent='center'
			>
				<Center>
					<VStack spacing={4} display='flex' flexDirection='column'>
						<Text>Webmax Demo App</Text>
						<Account />
						<Form />
					</VStack>
				</Center>
			</Flex>
		</AccountContextProvider>
	);
}

export default App;
