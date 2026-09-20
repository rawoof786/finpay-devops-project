import { useState } from "react";
import { accounts, transactions } from "../data";

function Recharge() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [operator, setOperator] = useState("");
  const [amount, setAmount] = useState("");
  const [fromAccount, setFromAccount] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRecharge = (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!mobileNumber || mobileNumber.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!operator) {
      setError("Please select an operator.");
      return;
    }

    if (!fromAccount) {
      setError("Please select the account for payment.");
      return;
    }

    const rechargeAmount = Number(amount);

    if (!rechargeAmount || rechargeAmount <= 0) {
      setError("Please enter a valid recharge amount.");
      return;
    }

    const account = accounts.find(
      (item) => item.accountNumber === fromAccount
    );

    if (!account) {
      setError("Account not found.");
      return;
    }

    if (rechargeAmount > account.balance) {
      setError("Insufficient balance.");
      return;
    }

    account.balance -= rechargeAmount;

    const newTransaction = {
      id: `TXN${1000 + transactions.length + 1}`,
      type: "RECHARGE",
      from: account.holderName,
      to: mobileNumber,
      operator: operator,
      amount: rechargeAmount,
      status: "SUCCESS",
      date: new Date().toLocaleDateString("en-IN"),
      time: new Date().toLocaleTimeString("en-IN"),
    };

    transactions.unshift(newTransaction);

    setMessage(
      `₹${rechargeAmount.toLocaleString(
        "en-IN"
      )} mobile recharge successful.`
    );

    setMobileNumber("");
    setOperator("");
    setAmount("");
    setFromAccount("");
  };

  return (
    <div>
      <h1>📱 Mobile Recharge</h1>

      <p>Recharge your mobile number easily.</p>

      <hr />

      <form onSubmit={handleRecharge}>

        {/* MOBILE NUMBER */}

        <div>
          <label>
            <strong>Mobile Number</strong>
          </label>

          <br />
          <br />

          <input
            type="tel"
            maxLength="10"
            placeholder="Enter 10-digit mobile number"
            value={mobileNumber}
            onChange={(event) =>
              setMobileNumber(event.target.value)
            }
          />
        </div>

        <br />

        {/* OPERATOR */}

        <div>
          <label>
            <strong>Operator</strong>
          </label>

          <br />
          <br />

          <select
            value={operator}
            onChange={(event) =>
              setOperator(event.target.value)
            }
          >
            <option value="">
              Select Operator
            </option>

            <option value="Jio">
              Jio
            </option>

            <option value="Airtel">
              Airtel
            </option>

            <option value="Vi">
              Vi
            </option>

            <option value="BSNL">
              BSNL
            </option>
          </select>
        </div>

        <br />

        {/* PAYMENT ACCOUNT */}

        <div>
          <label>
            <strong>Pay From Account</strong>
          </label>

          <br />
          <br />

          <select
            value={fromAccount}
            onChange={(event) =>
              setFromAccount(event.target.value)
            }
          >
            <option value="">
              Select Account
            </option>

            {accounts.map((account) => (
              <option
                key={account.id}
                value={account.accountNumber}
              >
                {account.holderName} |{" "}
                {account.accountNumber} |{" "}
                {account.bankName}
              </option>
            ))}
          </select>
        </div>

        <br />

        {/* AMOUNT */}

        <div>
          <label>
            <strong>Recharge Amount</strong>
          </label>

          <br />
          <br />

          <input
            type="number"
            min="1"
            placeholder="Enter amount"
            value={amount}
            onChange={(event) =>
              setAmount(event.target.value)
            }
          />
        </div>

        <br />

        <button type="submit">
          📱 Recharge
        </button>

      </form>

      <br />

      {error && (
        <p>
          <strong>Error:</strong> {error}
        </p>
      )}

      {message && (
        <p>
          <strong>✓ {message}</strong>
        </p>
      )}
    </div>
  );
}

export default Recharge;
