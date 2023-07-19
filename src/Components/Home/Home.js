import React from "react";
import { MdFastfood } from "react-icons/md";
import { HiCake } from "react-icons/hi";
import { IoIosBeer } from "react-icons/io";
import { GiChickenOven } from "react-icons/gi";
import Topandliked from "./Topandliked";
import CategoriesAndCountry from "./CategoriesAndCountry";
import Footer from "./Footer";
import Recently from "./Recently";
import StripeContainer from "../Stripe/StripeContainer";
import StripeComponent from "../Stripe/StripeComponent";

function Home() {
  return (
    <>
      <div className="maintwoitems">
        <div className="mainIcons">
          <MdFastfood className="foodicons"></MdFastfood>
          <HiCake className="foodicons"></HiCake>
          <IoIosBeer className="foodicons"></IoIosBeer>
          <GiChickenOven className="foodicons"></GiChickenOven>
        </div>
        <div className="mainHeading">Chef Creations</div>
      </div>
      <Recently />
      <CategoriesAndCountry />
      <Topandliked />
      <StripeComponent />
      <Footer />
    </>
  );
}

export default Home;
