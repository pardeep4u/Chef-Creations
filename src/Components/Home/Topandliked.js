import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebase/config";

function Topandliked() {
  const [items, setItems] = useState([]);

  const collectionRef = collection(db, "blogs");
  const q = query(collectionRef, orderBy("createdAt", "desc"), limit(3));

  useEffect(() => {
    const getit = async () => {
      const collectionRef = collection(db, "blogs");
      const q = query(collectionRef, orderBy("createdAt", "desc"), limit(4));
      const data = await getDocs(q);
      console.log(data);
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getit();
    console.log(items);
  }, []);

  return (
    <div>
      <div className="mainHeading" style={{ paddingTop: "4%" }}>
        Recently Added
      </div>
      <div className="gridmakerformostliked">
        {items && (
          <>
            {items.map((item, index) => (
              <NavLink className="cards" to={"/topliked/" + item.id}>
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

export default Topandliked;

/*
<NavLink className="cards">
          <img src={img} className="imageViewer" alt="foodImage" />
          <h3>This is Title</h3>
        </NavLink>
        <NavLink className="cards">
          <img src={img} className="imageViewer" alt="foodImage" />
          <h3>This is Title</h3>
        </NavLink>
        <NavLink className="cards">
          <img src={img} className="imageViewer" alt="foodImage" />
          <h3>This is Title</h3>
        </NavLink>


        <NavLink className="cards">
          <img src={img} className="imageViewer" alt="foodImage" />
          <h3>This is Title</h3>
        </NavLink>
        <NavLink className="cards">
          <img src={img} className="imageViewer" alt="foodImage" />
          <h3>This is Title</h3>
        </NavLink>
        <NavLink className="cards">
          <img src={img} className="imageViewer" alt="foodImage" />
          <h3>This is Title</h3>
        </NavLink>
*/
