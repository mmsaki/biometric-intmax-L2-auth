import { Box, Button, VStack, Text, Input, useToast } from '@chakra-ui/react';
import { useAccountContext } from './useAccount';
import zod from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { IntmaxWalletSigner } from 'webmax';

const schema = zod.object({
	to: zod.string(),
	value: zod.string(),
});

export default function Form() {
	const toast = useToast();
	const { account } = useAccountContext();
	const [receipt, setReceipt] = useState<string | null>(null);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(schema),
	});
	if (!account) {
		return null;
	}
	console.log(receipt);
	return (
		<form
			onSubmit={handleSubmit(async ({ to, value }) => {
				const signer = new IntmaxWalletSigner(account);
				const tx = {
					to,
					value,
					gasLimit: 21000,
				};
				const res = await signer.sendTransaction(tx);
				setReceipt(JSON.stringify(res));
				toast({
					title: 'success',
					position: 'top',
					status: 'success',
					isClosable: true,
				});
			})}
		>
			<VStack spacing={4}>
				<Box>
					<Text>to</Text>
					<Input {...register('to')} />
					{errors.to?.message && <Text>{errors.to?.message as string}</Text>}
				</Box>
				<Box>
					<Text>value</Text>
					<Input {...register('value')} />
					{errors.value?.message && (
						<Text>{errors.value?.message as string}</Text>
					)}
				</Box>
				<Button type='submit' disabled={isSubmitting}>
					Submit
				</Button>
				{receipt && (
					<Box wordBreak='break-word' width='500px'>
						<Text>{receipt}</Text>
					</Box>
				)}
			</VStack>
		</form>
	);
}
