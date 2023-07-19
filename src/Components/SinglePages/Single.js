import React, { useState } from "react";
import india from "../Home/India.jpeg";
import { FcLike } from "react-icons/fc";
import { BsSave } from "react-icons/bs";
import { FcLikePlaceholder } from "react-icons/fc";
import { BsSave2Fill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Home/Footer";
import { db, auth } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import StripeComponent from "../Stripe/StripeComponent";

function Single() {
  const [uuid, SetUuid] = useState();
  const [items, setItems] = useState();
  const [iiked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const { postID } = useParams();

  console.log(uuid);

  function likeHnalder() {
    // To Like a Document
    async function updateDocAndLike() {
      const docRef = doc(db, "users", `${uuid}`);
      const recipeRef = doc(db, "blogs", postID);
      const newdata = await updateDoc(docRef, {
        likedposts: arrayUnion(postID),
      });
      const newRecipe = await updateDoc(recipeRef, { likes: items.likes + 1 });

      console.log(newdata);
    }

    // To REmove a document from liked List.
    async function updateDocAndRemoveLike() {
      const docRef = doc(db, "users", `${uuid}`);
      const recipeRef = doc(db, "blogs", postID);
      const newdata = await updateDoc(docRef, {
        likedposts: arrayRemove(postID),
      });

      const newDocRef = doc(db, "blogs", postID);
      const newLikeData = await getDoc(newDocRef);

      const newRecipe = await updateDoc(recipeRef, {
        likes: newLikeData.data().likes - 1,
      });
      console.log(newdata);
    }

    if (!uuid) {
      toast.success("First Login.");
    } else {
      if (iiked) {
        updateDocAndRemoveLike();
        toast.success("Removed from Liked List");
      } else {
        updateDocAndLike();
        toast.success("Added to Liked List");
      }
      setLiked(!iiked);
    }
  }

  function saveHnalder() {
    // To Like a Document
    async function updateDocAndRemovedFromSaved() {
      const docRef = doc(db, "users", `${uuid}`);
      const newdata = await updateDoc(docRef, {
        savedposts: arrayUnion(postID),
      });
      console.log(newdata);
    }

    // To REmove a document from liked List.
    async function updateDocAndSaved() {
      const docRef = doc(db, "users", `${uuid}`);
      const newdata = await updateDoc(docRef, {
        savedposts: arrayRemove(postID),
      });
      console.log(newdata);
    }

    if (!uuid) {
      toast.success("First Login.");
    } else {
      if (saved) {
        updateDocAndSaved();

        toast.success("Removed from Save List");
      } else {
        updateDocAndRemovedFromSaved();
        toast.success("Added to Save List");
      }
      setSaved(!saved);
    }
  }
  // To fetch blogposts
  useEffect(() => {
    async function getit() {
      const docRef = doc(db, "blogs", postID);
      const data = await getDoc(docRef);
      console.log(data.data());
      setItems(data.data());
    }
    getit();
  }, []);

  // To find user

  // To get the userID
  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if (data) {
        console.log(data);
        SetUuid(data.uid);
      } else {
        SetUuid(null);
      }
    });
  }, []);

  return (
    <>
      {items && (
        <div className="singlePosts">
          <div className="singleTitle">
            <h2> {items.title} </h2>
          </div>
          <div className="singleImage">
            <img src={items.image} className="singleImage" alt="singleIage" />
          </div>
          <div className="singleDiscription">
            <h3>Description</h3>
            <p>{items.description} </p>
          </div>
          <div className="singleRecipe">
            <h3>Recipe</h3>
            <p>{items.recipe}</p>
          </div>
          <div className="likeandsave">
            {iiked ? (
              <>
                <FcLike className="singleIcons" onClick={likeHnalder} />
              </>
            ) : (
              <>
                <FcLikePlaceholder
                  className="singleIcons"
                  onClick={likeHnalder}
                />
              </>
            )}

            {saved ? (
              <>
                <BsSave2Fill className="singleIcons" onClick={saveHnalder} />
              </>
            ) : (
              <>
                <BsSave className="singleIcons" onClick={saveHnalder} />
              </>
            )}
          </div>
          <ToastContainer className="justoremove" />
        </div>
      )}
      <StripeComponent />
      <Footer />
    </>
  );
}

export default Single;
