import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "menu active" : "menu"
        }
      >
        🏠 Dashboard
      </NavLink>

      <NavLink
        to="/accounts"
        className={({ isActive }) =>
          isActive ? "menu active" : "menu"
        }
      >
        💳 Accounts
      </NavLink>

      <NavLink
        to="/payments"
        className={({ isActive }) =>
          isActive ? "menu active" : "menu"
        }
      >
        💸 Send Money
      </NavLink>

      <NavLink
        to="/transactions"
        className={({ isActive }) =>
          isActive ? "menu active" : "menu"
        }
      >
        📋 Transactions
      </NavLink>

      <div className="menu">
        👤 Profile
      </div>

    </aside>
  );
}

export default Sidebar;
