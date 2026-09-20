import { useState } from "react";
import { accounts, transactions } from "../data";

function Payments() {
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!fromAccount) {
      setError("Please select the From Account.");
      return;
    }

    if (!toAccount) {
      setError("Please select the To Account.");
      return;
    }

    if (fromAccount === toAccount) {
      setError("From and To accounts cannot be the same.");
      return;
    }

    const paymentAmount = Number(amount);

    if (!paymentAmount || paymentAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    const sender = accounts.find(
      (account) => account.accountNumber === fromAccount
    );

    const receiver = accounts.find(
      (account) => account.accountNumber === toAccount
    );

    if (!sender || !receiver) {
      setError("Account not found.");
      return;
    }

    if (paymentAmount > sender.balance) {
      setError("Insufficient balance.");
      return;
    }

    sender.balance -= paymentAmount;
    receiver.balance += paymentAmount;

    const newTransaction = {
      id: `TXN${1000 + transactions.length + 1}`,
      type: "SENT",
      from: sender.holderName,
      to: receiver.holderName,
      amount: paymentAmount,
      status: "SUCCESS",
      date: new Date().toLocaleDateString("en-IN"),
      time: new Date().toLocaleTimeString("en-IN"),
    };

    transactions.unshift(newTransaction);

    setMessage(
      `₹${paymentAmount.toLocaleString(
        "en-IN"
      )} sent successfully to ${receiver.holderName}.`
    );

    setFromAccount("");
    setToAccount("");
    setAmount("");
  };

  return (
    <div>
      <h1>💸 Send Money</h1>

      <p>Transfer money from one account to another.</p>

      <hr />

      <form onSubmit={handleSubmit}>

        {/* FROM ACCOUNT */}

        <div>
          <label>
            <strong>From Account</strong>
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
              Select From Account
            </option>

            {accounts.map((account) => (
              <option
                key={account.id}
                value={account.accountNumber}
              >
                {account.holderName} | {account.accountNumber} |{" "}
                {account.bankName}
              </option>
            ))}
          </select>
        </div>

        <br />

        {/* FROM ACCOUNT DETAILS */}

        {fromAccount && (
          <div>
            {(() => {
              const account = accounts.find(
                (item) =>
                  item.accountNumber === fromAccount
              );

              return (
                <div>
                  <p>
                    <strong>Account Holder:</strong>{" "}
                    {account.holderName}
                  </p>

                  <p>
                    <strong>Account Number:</strong>{" "}
                    {account.accountNumber}
                  </p>

                  <p>
                    <strong>Bank:</strong>{" "}
                    {account.bankName}
                  </p>

                  <p>
                    <strong>Available Balance:</strong>{" "}
                    ₹{account.balance.toLocaleString("en-IN")}
                  </p>
                </div>
              );
            })()}
          </div>
        )}

        <hr />

        {/* TO ACCOUNT */}

        <div>
          <label>
            <strong>To Account</strong>
          </label>

          <br />
          <br />

          <select
            value={toAccount}
            onChange={(event) =>
              setToAccount(event.target.value)
            }
          >
            <option value="">
              Select To Account
            </option>

            {accounts.map((account) => (
              <option
                key={account.id}
                value={account.accountNumber}
              >
                {account.holderName} | {account.accountNumber} |{" "}
                {account.bankName}
              </option>
            ))}
          </select>
        </div>

        <br />

        {/* TO ACCOUNT DETAILS */}

        {toAccount && (
          <div>
            {(() => {
              const account = accounts.find(
                (item) =>
                  item.accountNumber === toAccount
              );

              return (
                <div>
                  <p>
                    <strong>Account Holder:</strong>{" "}
                    {account.holderName}
                  </p>

                  <p>
                    <strong>Account Number:</strong>{" "}
                    {account.accountNumber}
                  </p>

                  <p>
                    <strong>Bank:</strong>{" "}
                    {account.bankName}
                  </p>
                </div>
              );
            })()}
          </div>
        )}

        <hr />

        {/* AMOUNT */}

        <div>
          <label>
            <strong>Amount</strong>
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
          💸 Send Money
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

export default Payments;
