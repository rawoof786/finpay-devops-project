import { transactions } from "../data";

function Transactions() {
  return (
    <div>
      <h1>📋 Transactions</h1>

      <p>
        View your money transfers and mobile recharge transactions.
      </p>

      <hr />

      {transactions.length === 0 ? (
        <p>No transactions available.</p>
      ) : (
        transactions.map((transaction) => (
          <div
            key={transaction.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            {/* MONEY SENT */}
            {transaction.type === "SENT" && (
              <>
                <h2>💸 Money Sent</h2>

                <p>
                  <strong>Transaction ID:</strong>{" "}
                  {transaction.id}
                </p>

                <p>
                  <strong>From:</strong>{" "}
                  {transaction.from}
                </p>

                <p>
                  <strong>To:</strong>{" "}
                  {transaction.to}
                </p>

                <p>
                  <strong>Amount:</strong>{" "}
                  ₹{transaction.amount.toLocaleString("en-IN")}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {transaction.status}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {transaction.date}
                </p>

                <p>
                  <strong>Time:</strong>{" "}
                  {transaction.time}
                </p>
              </>
            )}

            {/* MONEY RECEIVED */}
            {transaction.type === "RECEIVED" && (
              <>
                <h2>💰 Money Received</h2>

                <p>
                  <strong>Transaction ID:</strong>{" "}
                  {transaction.id}
                </p>

                <p>
                  <strong>From:</strong>{" "}
                  {transaction.from}
                </p>

                <p>
                  <strong>To:</strong>{" "}
                  {transaction.to}
                </p>

                <p>
                  <strong>Amount:</strong>{" "}
                  ₹{transaction.amount.toLocaleString("en-IN")}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {transaction.status}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {transaction.date}
                </p>

                <p>
                  <strong>Time:</strong>{" "}
                  {transaction.time}
                </p>
              </>
            )}

            {/* MOBILE RECHARGE */}
            {transaction.type === "RECHARGE" && (
              <>
                <h2>📱 Mobile Recharge</h2>

                <p>
                  <strong>Transaction ID:</strong>{" "}
                  {transaction.id}
                </p>

                <p>
                  <strong>Mobile Number:</strong>{" "}
                  {transaction.to}
                </p>

                <p>
                  <strong>Operator:</strong>{" "}
                  {transaction.operator}
                </p>

                <p>
                  <strong>Paid From:</strong>{" "}
                  {transaction.from}
                </p>

                <p>
                  <strong>Amount:</strong>{" "}
                  ₹{transaction.amount.toLocaleString("en-IN")}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {transaction.status}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {transaction.date}
                </p>

                <p>
                  <strong>Time:</strong>{" "}
                  {transaction.time}
                </p>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Transactions;
