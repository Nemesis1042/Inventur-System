import React from "react";
import "../../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar({ currentTab, setTab, role }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
	<li className="right">
           <span className="role-badge">{role.toUpperCase()}</span>
  	</li>
        {role === "admin" && (
          <>
            <li className={currentTab === "list" ? "active" : ""}>
              <a onClick={() => setTab("list")}>Benutzer</a>
            </li>
            <li className={currentTab === "add" ? "active" : ""}>
              <a onClick={() => setTab("add")}>Hinzufügen</a>
            </li>
          </>
        )}
        <li className="right">
          <a onClick={handleLogout}>Logout</a>
        </li>
      </ul>
    </nav>
  );
}

