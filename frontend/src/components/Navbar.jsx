import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>

      <div>
        <strong>FINPAY</strong>
      </div>

      <div>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          🏠 Dashboard
        </NavLink>

        {" | "}

        <NavLink
          to="/accounts"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          💳 Accounts
        </NavLink>

        {" | "}

        <NavLink
          to="/payments"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          💸 Send Money
        </NavLink>

        {" | "}

        <NavLink
          to="/recharge"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          📱 Recharge
        </NavLink>

        {" | "}

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          📋 Transactions
        </NavLink>

      </div>

      <div>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          👤 Profile
        </NavLink>

      </div>

    </nav>
  );
}

export default Navbar;
