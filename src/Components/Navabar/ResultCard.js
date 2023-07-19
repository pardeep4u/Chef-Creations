import React, { useState } from "react";
import china from "../Home/china.jpg";
import { collection, query, limit, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { NavLink } from "react-router-dom";

function ResultCard(props) {
  const { data } = props;

  console.log("from", data);

  return (
    <>
      <div className="outshowing">
        {data && (
          <>
            {data.map((item, index) => (
              <NavLink to={"/saved/single/:" + item.id}>
                <div className="listjs">
                  <div>
                    <img src={item.image} className="resultImges" />
                  </div>
                  <div>{item.title.slice(0, 15)}</div>
                </div>
              </NavLink>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default ResultCard;
