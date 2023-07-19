import React from "react";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";

function DropDown() {
  const handleLogout = () => {
    signOut(auth).then((value) => {
      console.log(value);
    });
  };

  return (
    <div class="dropdown">
      <span>Mouse over me</span>
      <div class="dropdown-content">
        <div className="dropDownBox">
          <NavLink className="dropDownMeu" to="/liked">
            Liked One
          </NavLink>
        </div>
        <div className="dropDownBox">
          <NavLink className="dropDownMeu" to="/saved">
            Saved Recipe
          </NavLink>
        </div>
        <div className="dropDownBox">
          <NavLink className="dropDownMeu" to="/create">
            Share Recipe
          </NavLink>
        </div>
        <div className="dropDownBox buttondropdown">
          <button className="dropDownMeu specialbutton" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default DropDown;
