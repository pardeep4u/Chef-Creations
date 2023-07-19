import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useState } from "react";

function List() {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  console.log(items);
  useEffect(() => {
    async function getit() {
      const collectionref = collection(db, "blogs");
      const q = query(collectionref, where("country", "==", `${id}`));
      const data = await getDocs(q);
      console.log(data);
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getit();
  }, []);

  return (
    <div className="listouterWRAPPER">
      {items && (
        <>
          {items.map((item, index) => (
            <div key={index}>
              <NavLink
                to={"single/" + item.id}
                style={{ textDecoration: "none", color: "black" }}
                className="mixing listwrapper"
              >
                <div className="listImage">
                  <img src={item.image} alt="justImage" className="justImage" />
                </div>

                <div className="listAbout">
                  <h2>{item.title}</h2>
                  <p>
                    {item.description.slice(0, 200)}
                    <i>
                      <b> Read More</b>
                    </i>
                    ...
                  </p>
                </div>
              </NavLink>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default List;
