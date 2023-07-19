import React from "react";
import { NavLink } from "react-router-dom";
import img from "./download.jpg";
import indiaImage from "./India.jpeg";
import italy from "./italy.jpg";
import china from "./china.jpg";
import america from "./america.jpg";

function CategoriesAndCountry() {
  return (
    <div className="twoContainerForCateandCountry">
      <div>
        <div className="leftTiel">Food & Countries</div>
        <div className="categoryandcountrysection">
          <NavLink className="cards" to="/country/india">
            <img src={indiaImage} className="imageViewer" alt="foodImage" />
            <h3>India</h3>
          </NavLink>
          <NavLink className="cards" to="/country/italian">
            <img src={italy} className="imageViewer" alt="foodImage" />
            <h3>Italian</h3>
          </NavLink>
          <NavLink className="cards" to="/country/american">
            <img src={america} className="imageViewer" alt="foodImage" />
            <h3>American</h3>
          </NavLink>
          <NavLink className="cards" to="/country/china">
            <img src={china} className="imageViewer" alt="foodImage" />
            <h3>Chinese</h3>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default CategoriesAndCountry;
