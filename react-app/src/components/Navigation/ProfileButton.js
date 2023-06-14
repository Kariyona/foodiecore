import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const [errors, setErrors] = useState([]);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  const handleDemoLogin = async (e) => {
    e.preventDefault()
    const demoEmail = "demo@aa.io"
    const demoPassword = "password"

    const data = await dispatch(login(demoEmail, demoPassword))
    if (data) {
      setErrors(data);
    }
  };

  return (
    <>
      <button onClick={openMenu} className="profile-btn">
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            Hi, {user.username}
            <p></p>
            <button onClick={handleLogout} className="cursor-pointer">Log Out</button>

          </>
        ) : (
          <div className="button-group">
          <div className="login-modal-button">
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
</div>
<div className="signup-modal-button">
            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            </div>
            <button onClick={handleDemoLogin}>Demo User</button>
          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
