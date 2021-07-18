import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../services'

interface TransactionsProps {
    id: number;
    title: string;
    amount: number;
    type: string,
    category: string,
    createdAt: Date;
}

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: TransactionsProps[],
    createTransaction: (transaction: TransactionInputProps) => Promise<void>;
}

type TransactionInputProps = Omit<TransactionsProps, 'id' | 'createdAt'>

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
)

export function TransactionsProvider({children}: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<TransactionsProps[]>([])

    useEffect(() => {
        api.get('/transactions')
        .then(resp => {
            setTransactions(resp.data.transactions)
        })
    }, [])

    async function createTransaction(transactionInput: TransactionInputProps){
        console.log(transactionInput)
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date().toLocaleDateString()
        });
        const transaction = response.data?.transactions

        setTransactions([...transactions, transaction])
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransaction() {
    const context = useContext(TransactionsContext)

    return context
}

