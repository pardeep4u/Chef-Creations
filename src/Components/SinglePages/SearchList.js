import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, where, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { NavLink } from "react-router-dom";

function SearchList() {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  console.log(items);
  useEffect(() => {
    async function getit() {
      const collectionref = collection(db, "blogs");
      const q = query(collectionref, where("title", "==", `${id}`));
      const data = await getDocs(q);
      console.log(data);
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getit();
  }, []);

  return (
    <div className="listouterWRAPPER">
      {items.length > 0 ? (
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
      ) : (
        <h2>No iTem Found! </h2>
      )}
    </div>
  );
}

export default SearchList;
