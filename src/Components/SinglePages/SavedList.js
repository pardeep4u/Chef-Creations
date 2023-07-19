import React, { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import SingleLikeList from "./SingleLikeList";

function SavedList() {
  const [uuid, SetUuid] = useState();
  // const [items, setItems] = useState();
  const [dataItems, setDataItems] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, async (data) => {
      // console.log("authing");
      if (data) {
        console.log(data.uid);
        if (data) {
          console.log("getting user");
          const docRef = doc(db, "users", `${data.uid}`);
          const newdata = await getDoc(docRef);
          console.log(newdata.data());
          const metaDaata = newdata.data();
          const dataArray = [];
          /*
            metaDaata.likedposts.forEach(async (values, i) => {
              const ndocRef = doc(db, "blogs", `${values}`);
              const data = await getDoc(ndocRef);
              console.log(data.data());
              dataArray.push(data.data());
              console.log(dataArray);
            });
            */

          for (let ind = 0; ind < metaDaata.savedposts.length; ind++) {
            const element = metaDaata.savedposts[ind];
            const ndocRef = doc(db, "blogs", `${element}`);
            const data = await getDoc(ndocRef);
            console.log(data.data());
            dataArray.push(data.data());
            console.log(dataArray);
          }

          setDataItems(dataArray);
        } else {
          console.log("Soory No Data!");
        }
        SetUuid(data.uid);
      } else {
        SetUuid(null);
      }
    });
  }, []);

  /*
    //  console.log(items);
    // console.log(uuid);
    // console.log(dataItems);
  
    // To get the userID
    useEffect(() => {
      onAuthStateChanged(auth, (data) => {
        // console.log("authing");
        if (data) {
          console.log(data);
          SetUuid(data.uid);
        } else {
          SetUuid(null);
        }
      });
    });
  
    useEffect(() => {
      const dataArray = [];
      if (items) {
        //  console.log("getting all document");
        async function getallPosts() {
          items.forEach(async (values, i) => {
            const docRef = doc(db, "blogs", `${values}`);
            const data = await getDoc(docRef);
            dataArray.push(data.data());
          });
        }
        getallPosts();
      }
      setDataItems(dataArray);
    }, [items]);
  
    // To get All the list
    useEffect(() => {
      if (uuid) {
        async function getit() {
          //  console.log("getting user");
          const docRef = doc(db, "users", `${uuid}`);
          const data = await getDoc(docRef);
          //  console.log(data.data());
          setItems(data.data().likedposts);
          // const collectionref = collection(db, "users");
          // const q = query(collectionref, );
          // const data = await getDocs(q);
          // console.log(data);
          // setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getit();
      } else {
        console.log("uuid not present!");
      }
    }, [uuid]);
  
    */

  return (
    <div className="listouterWRAPPER">
      {dataItems && <SingleLikeList data={dataItems} />}
    </div>
  );
}

export default SavedList;
