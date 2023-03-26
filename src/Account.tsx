import { Button } from '@chakra-ui/button';
import { VStack, Text } from '@chakra-ui/layout';
import { useAccountContext } from './useAccount';
import { IntmaxWalletSigner } from 'webmax';

export default function Account() {
	const { account, setAccount } = useAccountContext();
	const handleConnect = async () => {
		const signer = new IntmaxWalletSigner();
		const response = await signer.connectToAccount();
		setAccount(response);
	};
	return (
		<VStack spacing={4}>
			{account ? (
				<>
					<Text>Your Address: {account.address}</Text>
					<Text>Your ChainID: {account.chainId}</Text>
					<Button
						colorScheme='blue'
						onClick={() => {
							setAccount(null);
						}}
					>
						Disconnect
					</Button>
				</>
			) : (
				<>
					<Text>No Wallet Connected</Text>
					<Button colorScheme='blue' onClick={handleConnect}>
						Connect to IntmaxWallet
					</Button>
				</>
			)}
		</VStack>
	);
}
