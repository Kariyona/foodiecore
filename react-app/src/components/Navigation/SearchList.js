import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "./search.css"

const SearchList = ({ listings, resetSearch }) => {
  const [showMenu, setShowMenu] = useState(true);
  const history = useHistory();
  const ulRef = useRef();
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current?.contains(e.target)) {
        setShowMenu(false);
        resetSearch()
      }
    };
    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const ulClassName = "searchDropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => {
    setShowMenu(false)
    resetSearch();
  };

  return (
    <>
    <div className={ulClassName} ref={ulRef}>
        {listings.map(listing =>
            <div className="searchList" onClick={() => {
              history.push(`/listings/${listing.id}`)
              closeMenu()
              resetSearch()
              }}>
                <p>{listing.title}</p>
            </div>
        )}
    </div>
    </>
  )
};

export default SearchList;
