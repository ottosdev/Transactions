import { FormEvent, useState } from "react";
import ReactModal from "react-modal";
import { Button, FormContainer, TransactionTypeContainer } from "./styles";
import Closesvg from "../../assets/close.svg";
import incomeimg from "../../assets/income.svg";
import outcome from "../../assets/outcome.svg";
import { useTransactions } from "../../hooks/useTransactions";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const [type, setType] = useState("deposit");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  const { createTransaction } = useTransactions();

  function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    createTransaction({ title, amount, type, category });

    setTitle("");
    setAmount(0);
    setCategory("");
    setType("deposit");

    onRequestClose();
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type="button" onClick={onRequestClose} className="close-modal">
        <img src={Closesvg} alt="Fechar modal" />
      </button>

      <FormContainer onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transaçao</h2>
        <input
          type="text"
          placeholder="Titulo"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <Button
            type="button"
            onClick={() => setType("deposit")}
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={incomeimg} alt="Entrada" />
            <span>Entrada</span>
          </Button>
          <Button
            type="button"
            onClick={() => setType("withdraw")}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcome} alt="Saida" />
            <span>Saida</span>
          </Button>
        </TransactionTypeContainer>
        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </FormContainer>
    </ReactModal>
  );
}
