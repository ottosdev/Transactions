import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface TransactionsProps {
  id: number;
  title: string;
  amount: number;
  category: string;
  type: string;
  createdAt: string;
}

// interface FormTransaction {
//   title: string;
//   amount: number;
//   category: string;
//   type: string;
//   createdAt: string;
// }

type FormTransaction = Omit<TransactionsProps, "id" | "createdAt">;

interface TransactionContextProps {
  transactions: TransactionsProps[];
  createTransaction: (transaction: FormTransaction) => Promise<void>;
}

// Precisa informar o tipo do filho que fica dentro do provider
interface TransactionsProviderProps {
  children: ReactNode;
}

// Qual o valor que devemos passar para transforportar os dados por toda aplicaçao
export const TransactionContext = createContext<TransactionContextProps>(
  {} as TransactionContextProps
);

// Criaçao do meu proprio provider
// Ira ficar por voltar de toda a minha aplicacao que seria no App.tsx
export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);

  useEffect(() => {
    api.get("/transactions").then((response) => {
      setTransactions(response.data.transactions);
    });
  }, []);

  async function createTransaction(transactionInput: FormTransaction) {
    await api
      .post("/transactions", {
        ...transactionInput,
        createdAt: new Date(),
      })
      .then((response) => {
        setTransactions([...transactions, response.data.transaction]);
      });
  }

  return (
    <TransactionContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);

  return context;
}
