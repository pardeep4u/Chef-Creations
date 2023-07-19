import React from "react";
import { useState } from "react";
import { auth, db, storage } from "../../firebase/config";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function Create() {
  const [title, setName] = useState("");
  const [country, setCOuntry] = useState("");
  const [image, setImage] = useState();
  const [description, setDescription] = useState("");
  const [recipe, setRecipe] = useState("");

  const navigate = useNavigate();

  const colectionRef = collection(db, "blogs");

  const handleTitleChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setDescription(event.target.value);
  };
  const handleRecipeChange = (event) => {
    setRecipe(event.target.value);
  };

  const userID = () => {
    onAuthStateChanged(auth, (user) => {
      console.log(user.uid);
      const imageRef = ref(storage, `images/${image.name + v4()}`);
      uploadBytes(imageRef, image)
        .then((uploadresult) => {
          console.log(uploadresult);
          getDownloadURL(imageRef).then((downloadLink) => {
            console.log(downloadLink);
            addDoc(colectionRef, {
              title,
              description,
              recipe,
              likes: 0,
              uid: user.uid,
              image: downloadLink,
              country: country,
              createdAt: Timestamp.now(),
            })
              .then((data) => {
                navigate("/home");
              })
              .catch((err) => {
                console.log(err);
                alert("error");
              });
          });
        })
        .catch((errrr) => {
          console.log(errrr);
        });
    });
  };

  const fileHandler = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    userID();
    // Handle form submission logic here
    console.log("Name:", title);
    console.log("Description  :", description);
    console.log("Recipe:", recipe);
  };

  const optionhandler = (e) => {
    console.log(e.target.value);
    setCOuntry(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="file-upload-field"
          type="file"
          class="file-upload-field"
          onChange={fileHandler}
        />
        <input
          name="title"
          type="text"
          class="feedback-input"
          placeholder="Title"
          onChange={handleTitleChange}
        />
        <textarea
          name="description"
          class="feedback-input"
          placeholder="Description"
          onChange={handleEmailChange}
        ></textarea>
        <textarea
          name="recipe"
          class="feedback-input"
          placeholder="Recipe"
          onChange={handleRecipeChange}
        ></textarea>
        <label for="cars">Choose a Country:</label>
        <select name="cars" id="cars" form="carform" onChange={optionhandler}>
          <option value="">Select One</option>
          <option value="india">India</option>
          <option value="italian">Italian</option>
          <option value="american">American</option>
          <option value="china">Chinese</option>
        </select>
        <input type="submit" value="SUBMIT" />
      </form>
    </div>
  );
}

export default Create;
