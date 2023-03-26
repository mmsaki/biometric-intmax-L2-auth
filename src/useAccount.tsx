import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from 'react';
import { IntmaxWalletAccount } from 'webmax';

interface AccountContextType {
	account: IntmaxWalletAccount | null;
	setAccount: Dispatch<SetStateAction<IntmaxWalletAccount | null>>;
}

interface Props {
	children: ReactNode;
}

const AccountContext = createContext<AccountContextType>(
	{} as AccountContextType
);

export const AccountContextProvider = ({ children }: Props) => {
	const [account, setAccount] = useState<IntmaxWalletAccount | null>(null);
	return (
		<AccountContext.Provider value={{ account, setAccount }}>
			{children}
		</AccountContext.Provider>
	);
};

export const useAccountContext = () => {
	return useContext(AccountContext);
};
