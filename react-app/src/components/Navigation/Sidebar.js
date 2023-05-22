import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { useDispatch, useSelector } from 'react-redux';

function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const sidebarRef = useRef(null);
  const user = useSelector((state) => state.session.user)

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setExpanded(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div className={`sidebar ${expanded ? "expanded" : ""}`} ref={sidebarRef}>
      <div className={`pointerArrow ${expanded ? "expanded" : ""}`} onClick={toggleSidebar}>
        {expanded ? "<" : "Navigation"}
      </div>
      {expanded && (
        <>
          <NavLink exact to={`/profile/${user.username}`} activeClassName="active" className="sidebar-link">
            Profile
          </NavLink>
          <NavLink exact to="/bookmarks" activeClassName="active" className="sidebar-link">
            Bookmarks
          </NavLink>
          <NavLink exact to={`/profile/${user.id}/listings`} activeClassName="active" className="sidebar-link">
            View your listings
          </NavLink>
          <NavLink exact to="/listings/new" activeClassName="active" className="sidebar-link">
            Post a new Listing!
          </NavLink>
          <NavLink exact to="/" activeClassName="active" className="sidebar-link">
            Write a Review!
          </NavLink>
        </>
      )}
    </div>
  );
}

export default Sidebar;
