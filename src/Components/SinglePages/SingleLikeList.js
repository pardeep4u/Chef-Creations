import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function SingleLikeList(props) {
  const [newData, setData] = useState();
  console.log(newData);
  const { data } = props;

  useEffect(() => {
    if (data) {
      console.log(data);
      setData(data);
    } else {
      console.log("else");
    }
  }, [data]);

  return (
    <div>
      <>
        {newData &&
          newData.map((item, index) => (
            <div key={index}>
              <NavLink
                to={"single/" + item.generatedID}
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
    </div>
  );
}

export default SingleLikeList;
