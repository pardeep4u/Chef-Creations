import React, { useEffect, useState } from "react";
import { SiCodechef } from "react-icons/si";
import { NavLink } from "react-router-dom";
import { debounce } from "throttle-debounce";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../../firebase/config";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  where,
  query,
  limit,
} from "firebase/firestore";
import DropDown from "./DropDown";
import ResultCard from "./ResultCard";
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar() {
  const [inputValue, setInputValue] = useState("");
  const [mail, setMail] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [users, setusers] = useState([]);
  const collectionRef = collection(db, "users");
  const navigate = useNavigate();
  console.log(searchResult);

  const clickhanlder = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  const getit = async () => {
    const data = await getDocs(collectionRef);
    console.log(data);
    setusers(() => {
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    });
    console.log(users);
  };

  const handleSignin = async () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        const docRef = doc(db, "users", data.user.uid);
        setDoc(docRef, {
          email: data.user.email,
          name: data.user.displayName,
          uid: data.user.uid,
          likedposts: [],
          savedposts: [],
        }).then((sdata) => {
          setMail(data.user.email);
        });
      })
      .catch((reson) => {
        alert("Something Went Wrong!");
      });
    /*  addDoc(collectionRef, data.user.uid, {
          email: data.user.email,
          name: data.user.displayName,
          uid: data.user.uid,
          likedposts: [],
          savedposts: [],
        }).then((sdata) => {
          setMail(data.user.email);
        });
      })
      .catch((reson) => {
        alert("Something Went Wrong!");
      });*/
  };
  const handleKeyDown = (event) => {
    console.log(event.target.value);
    if (event.key === "Enter") {
      getSearchOutput(event.target.value);
      navigate("/search/" + event.target.value);
    }
  };

  async function getSearchOutput(value) {
    const collectionRef = collection(db, "blogs");
    const q2 = query(collectionRef, where("title", "==", value));
    const data = await getDocs(q2);
    console.log(data);
    setSearchResult(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if (data) {
        setMail(data);
      } else {
        setMail(null);
      }
    });
  }, [mail]);

  return (
    <>
      <div className="navbar">
        <div>
          <SiCodechef className="logo" size={80} />
        </div>
        <GiHamburgerMenu className="showMenulogo" onClick={clickhanlder} />

        <div className="linerCenter">
          <NavLink to="/" className="homeText">
            <div className="homeText">Home</div>
          </NavLink>
          <div>
            <input
              className="inputbox"
              onKeyDown={handleKeyDown}
              maxLength={35}
            ></input>
          </div>
        </div>
        <div className="linerCenter">
          {mail ? (
            <DropDown />
          ) : (
            <button className="LogInformation" onClick={handleSignin}>
              Sigin
            </button>
          )}
        </div>
      </div>
      <div
        className={
          isNavExpanded ? "navigation-menu-expanded" : "navigation-menu"
        }
      >
        <div>
          <input
            className="inputbox"
            onKeyDown={handleKeyDown}
            maxLength={35}
          ></input>
        </div>

        {mail ? (
          <DropDown />
        ) : (
          <div className="buttonpressDropDown">
            <NavLink to="/" className="homeText linearCenter">
              <div className="homeText LogInformation">Home</div>
            </NavLink>
            <button className="LogInformation" onClick={handleSignin}>
              Sigin
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
