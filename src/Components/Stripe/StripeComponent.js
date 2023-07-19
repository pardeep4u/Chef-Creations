import React from "react";
import { BiDonateHeart } from "react-icons/bi";
import { NavLink } from "react-router-dom";

function StripeComponent() {
  const doanteUs = (e) => {
    e.preventDefault();
  };

  return (
    <div className="stripeHandler">
      <BiDonateHeart className="foodicons" />
      <p>
        We are excited to announce that our food blogging website is now
        accepting donations! Over the years, we have been passionate about
        sharing delicious recipes, culinary tips, and inspiring food stories
        with our wonderful community. We believe that good food has the power to
        bring people together and create memorable experiences. However,
        maintaining and expanding our platform requires resources. By making a
        donation, you can directly contribute to the growth of our website and
        help us continue to provide valuable content to food enthusiasts around
        the world.
      </p>
      <NavLink className="LogInformation" to="/donate">
        Donate Us
      </NavLink>
    </div>
  );
}

export default StripeComponent;
