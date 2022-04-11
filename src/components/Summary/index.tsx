import { Container } from "./styles";
import Income from "../../assets/income.svg";
import Outcome from "../../assets/outcome.svg";
import Total from "../../assets/total.svg";
import { formatAmount } from "../../utils/formatData";
import { useTransactions } from "../../hooks/useTransactions";
export function Summary() {
  const { transactions } = useTransactions()

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "deposit") {
        acc.deposits += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.withdraws = +transaction.amount;
        acc.total -= transaction.amount;
      }

      return acc;
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0,
    }
  );

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={Income} alt="" />
        </header>
        <strong>{formatAmount(summary.deposits)}</strong>
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img src={Outcome} alt="" />
        </header>
        <strong>-{formatAmount(summary.withdraws)}</strong>
      </div>
      <div style={{ background: "var(--green)", color: "white" }}>
        <header>
          <p>Total</p>
          <img src={Total} alt="" />
        </header>
        <strong>{formatAmount(summary.total)}</strong>
      </div>
    </Container>
  );
}
