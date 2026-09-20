import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>

      <div>
        <strong>FINPAY</strong>
      </div>

      <div>

        <Link to="/">
          🏠 Dashboard
        </Link>

        {" | "}

        <Link to="/accounts">
          💳 Accounts
        </Link>

        {" | "}

        <Link to="/payments">
          💸 Send Money
        </Link>

	  {" | "}
	  
        <Link to="/recharge">📱 Recharge</Link>

        {" | "}

        <Link to="/transactions">
          📋 Transactions
        </Link>

      </div>

      <div>
        👤 Profile
      </div>

    </nav>
  );
}

export default Navbar;
