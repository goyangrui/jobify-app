import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import Logo from "./Logo";
import { useState } from "react";

function Navbar() {
  const [showLogout, setShowLogout] = useState(false);
  // global context
  const { toggleSidebar, logoutUser, user } = useAppContext();
  return (
    <Wrapper>
      {/* nav-center container */}
      <div className="nav-center">
        {/* column 1 - toggle button */}
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>

        {/* column 2 - logo or logo text */}
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>

        {/* column 3 - drop down button container */}
        <div className="btn-container">
          {/* drop down button */}
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user && user.name}
            <FaCaretDown />
          </button>

          {/* logout button container */}
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            {/* logout button */}
            <button type="button" className="dropdown-btn" onClick={logoutUser}>
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Navbar;
