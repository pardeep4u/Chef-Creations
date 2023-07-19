import React from "react";
import { BsFillBalloonHeartFill } from "react-icons/bs";

function Footer() {
  return (
    <div class="footer">
      <div class="row">
        <div>
          Made by Pardeep Kumar with{" "}
          <BsFillBalloonHeartFill
            style={{ color: "red", marginLeft: "5px" }}
          ></BsFillBalloonHeartFill>
        </div>
      </div>
    </div>
  );
}

export default Footer;
