import { useEffect, useState } from "react";

const API_URL = "http://35.154.42.201:8082/accounts";

const bankNames = [
  "FinPay Bank",
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "Punjab National Bank",
  "Bank of Baroda",
  "Canara Bank",
  "Union Bank of India",
];

function Accounts() {
  const [accounts, setAccounts] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [balance, setBalance] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadAccounts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(
          `Failed to load accounts. HTTP ${response.status}`
        );
      }

      const data = await response.json();

      setAccounts(data);
    } catch (err) {
      setError(
        `Unable to load accounts: ${err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const clearForm = () => {
    setCustomerName("");
    setAccountNumber("");
    setBankName("");
    setAccountType("");
    setBalance("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!customerName.trim()) {
      setError("Please enter customer name.");
      return;
    }

    if (!accountNumber.trim()) {
      setError("Please enter account number.");
      return;
    }

    if (!bankName) {
      setError("Please select a bank.");
      return;
    }

    if (!accountType) {
      setError("Please select account type.");
      return;
    }

    if (balance === "" || Number(balance) < 0) {
      setError("Please enter a valid balance.");
      return;
    }

    const newAccount = {
      accountNumber: accountNumber.trim(),
      customerName: customerName.trim(),
      bankName: bankName,
      accountType: accountType,
      balance: Number(balance),
      status: "ACTIVE",
    };

    try {
      setSaving(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAccount),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to create account. HTTP ${response.status}`
        );
      }

      const createdAccount = await response.json();

      setAccounts((currentAccounts) => [
        ...currentAccounts,
        createdAccount,
      ]);

      setMessage(
        `Account ${createdAccount.accountNumber} created successfully.`
      );

      clearForm();
    } catch (err) {
      setError(
        `Unable to create account: ${err.message}`
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1>💳 My Accounts</h1>

      <p>
        Manage your FinPay accounts stored in MongoDB.
      </p>

      <hr />

      <h2>➕ Add New Account</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <strong>Account Holder Name</strong>
          </label>

          <br />

          <input
            type="text"
            placeholder="Enter account holder name"
            value={customerName}
            onChange={(event) =>
              setCustomerName(event.target.value)
            }
          />
        </div>

        <br />

        <div>
          <label>
            <strong>Account Number</strong>
          </label>

          <br />

          <input
            type="text"
            placeholder="Enter account number"
            value={accountNumber}
            onChange={(event) =>
              setAccountNumber(event.target.value)
            }
          />
        </div>

        <br />

        <div>
          <label>
            <strong>Bank Name</strong>
          </label>

          <br />

          <select
            value={bankName}
            onChange={(event) =>
              setBankName(event.target.value)
            }
          >
            <option value="">
              Select Bank
            </option>

            {bankNames.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>
        </div>

        <br />

        <div>
          <label>
            <strong>Account Type</strong>
          </label>

          <br />

          <select
            value={accountType}
            onChange={(event) =>
              setAccountType(event.target.value)
            }
          >
            <option value="">
              Select Account Type
            </option>

            <option value="Savings Account">
              Savings Account
            </option>

            <option value="Current Account">
              Current Account
            </option>
          </select>
        </div>

        <br />

        <div>
          <label>
            <strong>Initial Balance</strong>
          </label>

          <br />

          <input
            type="number"
            min="0"
            placeholder="Enter balance"
            value={balance}
            onChange={(event) =>
              setBalance(event.target.value)
            }
          />
        </div>

        <br />

        <button type="submit" disabled={saving}>
          {saving
            ? "Saving..."
            : "➕ Add Account"}
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

      <hr />

      <h2>🏦 Your Accounts</h2>

      {loading && (
        <p>Loading accounts from MongoDB...</p>
      )}

      {!loading && accounts.length === 0 && (
        <p>No accounts available.</p>
      )}

      {!loading &&
        accounts.map((account) => (
          <div
            key={account.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <h3>{account.customerName}</h3>

            <p>
              <strong>Account Number:</strong>{" "}
              {account.accountNumber}
            </p>

            <p>
              <strong>Bank:</strong>{" "}
              {account.bankName || "Not specified"}
            </p>

            <p>
              <strong>Account Type:</strong>{" "}
              {account.accountType || "Not specified"}
            </p>

            <p>
              <strong>Balance:</strong>{" "}
              ₹{account.balance.toLocaleString("en-IN")}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {account.status}
            </p>
          </div>
        ))}
    </div>
  );
}

export default Accounts;
