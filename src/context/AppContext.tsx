import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { createContext, useMemo } from "react";
import { useResolveSuiNSName } from "@mysten/dapp-kit";

export interface ContextType {
    walletAddress: string | undefined,
    suiName: string | null | undefined,
}

export const AppContext = createContext<ContextType>({
    walletAddress: undefined,
    suiName: undefined,
});

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const client = useSuiClient();
    const account = useCurrentAccount();

    const walletAddress = useMemo(() => {
        return account?.address;
    }, [account]);

    const { data: suiName } = useResolveSuiNSName(walletAddress);

    const contextValue = {
        walletAddress,
        suiName,
    }
    return (
        <>
            <AppContext.Provider
                value={contextValue}
            >
                {children}
            </AppContext.Provider>
        </>
    );
};
