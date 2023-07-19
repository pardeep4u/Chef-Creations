import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useState } from "react";

function Recently() {
  const [items2, setItems2] = useState([]);
  console.log(" recently ", items2);

  useEffect(() => {
    const getit2 = async () => {
      const collectionRef = collection(db, "blogs");
      const q2 = query(collectionRef, orderBy("likes", "desc"), limit(4));
      const data = await getDocs(q2);
      setItems2(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getit2();
  }, []);

  return (
    <div>
      <div className="mainHeading" style={{ paddingTop: "4%" }}>
        Most Liked
      </div>
      <div className="gridmakerformostliked">
        {items2 && (
          <>
            {items2.map((item, index) => (
              <NavLink className="cards" to={"/recently/" + item.id}>
                <img src={item.image} className="imageViewer" alt="foodImage" />
                <h3>{item.title}</h3>
              </NavLink>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Recently;
